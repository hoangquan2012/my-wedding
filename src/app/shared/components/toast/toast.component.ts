import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ToastService } from '../../../core/services/toast.service';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('toast', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(16px) scale(0.96)' }),
        animate('360ms cubic-bezier(0.22, 1, 0.36, 1)', style({ opacity: 1, transform: 'translateY(0) scale(1)' })),
      ]),
      transition(':leave', [animate('240ms ease-in', style({ opacity: 0, transform: 'translateY(8px)' }))]),
    ]),
  ],
  template: `
    <!-- Top on phones (keeps modal buttons visible), bottom on larger screens -->
    <div
      class="pointer-events-none fixed inset-x-0 top-5 z-[100] flex flex-col items-center gap-2 px-4 sm:top-auto sm:bottom-6"
      style="padding-top: env(safe-area-inset-top); padding-bottom: env(safe-area-inset-bottom)"
      aria-live="polite"
    >
      @for (toast of toasts.toasts(); track toast.id) {
        <div
          @toast
          class="pointer-events-auto inline-flex items-center gap-3 rounded-full px-5 py-3 shadow-soft
                 font-sans text-sm text-ivory"
          [class.bg-ink]="toast.kind !== 'error'"
          [class.bg-red-800]="toast.kind === 'error'"
        >
          <span class="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gold/90 text-ink">
            <app-icon [name]="toast.kind === 'error' ? 'close' : 'check'" [size]="14" [strokeWidth]="2" />
          </span>
          <span>{{ toast.message }}</span>
        </div>
      }
    </div>
  `,
})
export class ToastComponent {
  protected readonly toasts = inject(ToastService);
}
