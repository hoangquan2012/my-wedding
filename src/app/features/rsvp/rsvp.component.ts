import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, computed, effect, inject, input, signal, untracked } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Attendance, RsvpPayload, RsvpResponse, WeddingConfig, WeddingEvent } from '../../core/models';
import { ToastService } from '../../core/services/toast.service';
import { WeddingDataProvider } from '../../core/services/wedding-data.provider';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { SECTION_IDS } from '../../shared/section-ids';

const MAX_GUESTS = 10;

@Component({
  selector: 'app-rsvp',
  standalone: true,
  imports: [ReactiveFormsModule, SectionHeadingComponent, RevealDirective, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('swap', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(16px)' }),
        animate('500ms 120ms cubic-bezier(0.22, 1, 0.36, 1)', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
  templateUrl: './rsvp.component.html',
})
export class RsvpComponent {
  private readonly fb = inject(FormBuilder);
  private readonly data = inject(WeddingDataProvider);
  private readonly toast = inject(ToastService);

  readonly rsvp = input.required<WeddingConfig['rsvp']>();
  readonly events = input<WeddingEvent[]>([]);

  protected readonly ids = SECTION_IDS;
  protected readonly maxGuests = MAX_GUESTS;

  protected readonly submitting = signal(false);
  protected readonly result = signal<RsvpResponse | null>(null);

  protected readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
    phone: ['', [Validators.pattern(/^[0-9+\s().-]{8,16}$/)]],
    attending: ['yes' as Attendance, Validators.required],
    guests: [1, [Validators.required, Validators.min(1), Validators.max(MAX_GUESTS)]],
    events: [[] as string[]],
    note: ['', Validators.maxLength(500)],
  });

  protected readonly attending = signal<Attendance>('yes');
  protected readonly guests = signal(1);
  protected readonly selectedEvents = signal<string[]>([]);

  protected readonly isAttending = computed(() => this.attending() === 'yes');

  /** "2026-12-05" → "05 . 12 . 2026" (non-breaking). */
  protected readonly deadlineLabel = computed(() => {
    const raw = this.rsvp().deadline;
    if (!raw) {
      return '';
    }
    const date = new Date(raw);
    if (Number.isNaN(date.getTime())) {
      return raw;
    }
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    return [dd, mm, date.getFullYear()].join('\u00A0.\u00A0');
  });

  constructor() {
    // Pre-select every event once they arrive.
    effect(
      () => {
        const ids = this.events().map((e) => e.id);
        untracked(() => this.setEvents(ids));
      },
      { allowSignalWrites: true },
    );
  }

  setAttending(value: Attendance): void {
    this.attending.set(value);
    this.form.controls.attending.setValue(value);
  }

  changeGuests(delta: number): void {
    const next = Math.min(MAX_GUESTS, Math.max(1, this.guests() + delta));
    this.guests.set(next);
    this.form.controls.guests.setValue(next);
  }

  toggleEvent(id: string): void {
    const current = this.selectedEvents();
    this.setEvents(current.includes(id) ? current.filter((x) => x !== id) : [...current, id]);
  }

  isEventSelected(id: string): boolean {
    return this.selectedEvents().includes(id);
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    const payload: RsvpPayload = {
      name: value.name.trim(),
      phone: value.phone.trim() || undefined,
      attending: value.attending,
      guests: value.attending === 'yes' ? value.guests : 0,
      events: value.attending === 'yes' ? value.events : [],
      note: value.note.trim() || undefined,
    };

    this.submitting.set(true);
    this.data.submitRsvp(payload).subscribe({
      next: (response) => {
        this.submitting.set(false);
        this.result.set(response);
        this.toast.success(this.rsvp().successTitle);
      },
      error: (err: unknown) => {
        this.submitting.set(false);
        this.toast.error(err instanceof Error ? err.message : 'Gửi xác nhận thất bại. Vui lòng thử lại.');
      },
    });
  }

  reset(): void {
    this.result.set(null);
    this.form.reset({ name: '', phone: '', attending: 'yes', guests: 1, events: this.events().map((e) => e.id), note: '' });
    this.attending.set('yes');
    this.guests.set(1);
    this.selectedEvents.set(this.events().map((e) => e.id));
  }

  protected hasError(control: 'name' | 'phone' | 'note', error?: string): boolean {
    const ctrl = this.form.controls[control];
    return ctrl.touched && (error ? ctrl.hasError(error) : ctrl.invalid);
  }

  private setEvents(ids: string[]): void {
    this.selectedEvents.set(ids);
    this.form.controls.events.setValue(ids);
  }
}
