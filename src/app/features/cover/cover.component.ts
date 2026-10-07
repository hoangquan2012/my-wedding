import { ChangeDetectionStrategy, Component, DestroyRef, inject, input, output } from '@angular/core';
import { Person, WeddingConfig } from '../../core/models';
import { ScrollLockService } from '../../core/services/scroll-lock.service';
import { OrnamentComponent } from '../../shared/components/ornament/ornament.component';

/**
 * Full-screen invitation cover shown before the main site.
 * Entrance choreography is pure CSS (staggered `animate-fade-up`) so it plays
 * immediately on first paint without waiting for JS timers.
 */
@Component({
  selector: 'app-cover',
  standalone: true,
  imports: [OrnamentComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // The host itself is the fixed layer so the parent can animate transform/blur on leave.
  host: { class: 'fixed inset-0 z-[70] block' },
  templateUrl: './cover.component.html',
})
export class CoverComponent {
  private readonly scrollLock = inject(ScrollLockService);

  readonly config = input.required<WeddingConfig>();
  readonly couple = input.required<[Person, Person]>();
  readonly guestName = input<string | null>(null);

  readonly opened = output<void>();

  constructor() {
    this.scrollLock.lock();
    inject(DestroyRef).onDestroy(() => this.scrollLock.unlock());
  }

  open(): void {
    this.opened.emit();
  }
}
