import { animate, style, transition, trigger } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  effect,
  inject,
  input,
  output,
  untracked,
  viewChild,
} from '@angular/core';
import { ScrollLockService } from '../../../core/services/scroll-lock.service';
import { IconComponent } from '../icon/icon.component';

/**
 * Accessible, animated modal with content projection.
 *
 *   <app-modal [open]="isOpen()" (closed)="isOpen.set(false)" title="…">
 *     …content…
 *   </app-modal>
 */
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('backdrop', [
      transition(':enter', [style({ opacity: 0 }), animate('320ms ease-out', style({ opacity: 1 }))]),
      transition(':leave', [animate('240ms ease-in', style({ opacity: 0 }))]),
    ]),
    trigger('panel', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(24px) scale(0.98)' }),
        animate('420ms cubic-bezier(0.22, 1, 0.36, 1)', style({ opacity: 1, transform: 'translateY(0) scale(1)' })),
      ]),
      transition(':leave', [
        animate('220ms ease-in', style({ opacity: 0, transform: 'translateY(12px) scale(0.98)' })),
      ]),
    ]),
  ],
  template: `
    @if (open()) {
      <div
        class="fixed inset-0 z-[90] flex items-end sm:items-center justify-center p-0 sm:p-6"
        role="dialog"
        aria-modal="true"
        [attr.aria-label]="title() || null"
      >
        <div class="absolute inset-0 bg-ink/70 backdrop-blur-sm" @backdrop (click)="close()"></div>

        <div
          #panel
          tabindex="-1"
          class="relative w-full sm:max-w-md max-h-[92svh] overflow-y-auto bg-ivory shadow-soft outline-none
                 rounded-t-3xl sm:rounded-sm border border-champagne/60"
          @panel
        >
          <button
            type="button"
            class="absolute right-3 top-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full
                   text-cocoa/70 hover:text-ink hover:bg-cream transition-colors"
            (click)="close()"
            aria-label="Đóng"
          >
            <app-icon name="close" [size]="20" />
          </button>

          <div class="px-6 pt-8 pb-8 sm:px-8 sm:pt-10">
            <ng-content />
          </div>
        </div>
      </div>
    }
  `,
})
export class ModalComponent {
  private readonly scrollLock = inject(ScrollLockService);
  private readonly destroyRef = inject(DestroyRef);

  readonly open = input.required<boolean>();
  readonly title = input<string>();
  readonly closed = output<void>();

  private readonly panel = viewChild<ElementRef<HTMLElement>>('panel');
  private locked = false;

  constructor() {
    effect(() => {
      const isOpen = this.open();
      untracked(() => this.syncLock(isOpen));
    });
    this.destroyRef.onDestroy(() => this.syncLock(false));
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.open()) {
      this.close();
    }
  }

  close(): void {
    this.closed.emit();
  }

  private syncLock(isOpen: boolean): void {
    if (isOpen && !this.locked) {
      this.scrollLock.lock();
      this.locked = true;
      setTimeout(() => this.panel()?.nativeElement.focus(), 50);
    } else if (!isOpen && this.locked) {
      this.scrollLock.unlock();
      this.locked = false;
    }
  }
}
