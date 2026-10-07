import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, OnInit, computed, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { WeddingConfig, Wish } from '../../core/models';
import { ToastService } from '../../core/services/toast.service';
import { WeddingDataProvider } from '../../core/services/wedding-data.provider';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { TimeAgoPipe } from '../../shared/pipes/time-ago.pipe';
import { SECTION_IDS } from '../../shared/section-ids';

const PAGE = 6;

@Component({
  selector: 'app-wishes',
  standalone: true,
  imports: [ReactiveFormsModule, SectionHeadingComponent, RevealDirective, IconComponent, TimeAgoPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('wish', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(14px)' }),
        animate('480ms cubic-bezier(0.22, 1, 0.36, 1)', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
  templateUrl: './wishes.component.html',
})
export class WishesComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly data = inject(WeddingDataProvider);
  private readonly toast = inject(ToastService);

  readonly wishesCopy = input.required<WeddingConfig['wishes']>();

  protected readonly ids = SECTION_IDS;

  protected readonly wishes = signal<Wish[]>([]);
  protected readonly loading = signal(true);
  protected readonly submitting = signal(false);
  protected readonly visibleCount = signal(PAGE);

  protected readonly visible = computed(() => this.wishes().slice(0, this.visibleCount()));
  protected readonly hasMore = computed(() => this.wishes().length > this.visibleCount());

  protected readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]],
    message: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(600)]],
  });

  protected readonly messageLength = signal(0);

  ngOnInit(): void {
    this.data.getWishes().subscribe({
      next: (list) => {
        this.wishes.set(list);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });

    this.form.controls.message.valueChanges.subscribe((v) => this.messageLength.set(v.length));
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting.set(true);
    this.data.addWish(this.form.getRawValue()).subscribe({
      next: (wish) => {
        this.wishes.update((list) => [wish, ...list]);
        this.visibleCount.update((n) => n + 1);
        this.form.reset({ name: '', message: '' });
        this.submitting.set(false);
        this.toast.success(this.wishesCopy().successMessage);
      },
      error: (err: unknown) => {
        this.submitting.set(false);
        this.toast.error(err instanceof Error ? err.message : 'Không gửi được lời chúc. Vui lòng thử lại.');
      },
    });
  }

  showMore(): void {
    this.visibleCount.update((n) => n + PAGE);
  }

  protected hasError(control: 'name' | 'message'): boolean {
    const ctrl = this.form.controls[control];
    return ctrl.touched && ctrl.invalid;
  }

  protected initials(name: string): string {
    const letters = name
      .trim()
      .split(/\s+/)
      .filter((part) => /\p{L}/u.test(part))
      .slice(-2)
      .map((part) => part.charAt(0).toUpperCase())
      .join('');
    return letters || '♥';
  }
}
