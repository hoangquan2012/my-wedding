import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  HostListener,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
  untracked,
} from '@angular/core';
import { Photo } from '../../../core/models';
import { ScrollLockService } from '../../../core/services/scroll-lock.service';
import { IconComponent } from '../../../shared/components/icon/icon.component';

const SWIPE_THRESHOLD = 48;

/**
 * Full-screen photo viewer with keyboard, swipe and tap-to-zoom support.
 */
@Component({
  selector: 'app-lightbox',
  standalone: true,
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  templateUrl: './lightbox.component.html',
})
export class LightboxComponent {
  private readonly scrollLock = inject(ScrollLockService);

  readonly photos = input.required<Photo[]>();
  readonly index = input.required<number>();

  readonly indexChange = output<number>();
  readonly closed = output<void>();

  protected readonly loaded = signal(false);
  protected readonly zoomed = signal(false);
  protected readonly origin = signal('50% 50%');

  protected readonly current = computed(() => this.photos()[this.index()]);
  protected readonly count = computed(() => this.photos().length);

  private touchStartX = 0;
  private touchStartY = 0;

  constructor() {
    this.scrollLock.lock();
    inject(DestroyRef).onDestroy(() => this.scrollLock.unlock());

    // Reset viewer state and warm the cache for neighbours whenever the photo changes.
    effect(
      () => {
        const i = this.index();
        const photos = this.photos();
        untracked(() => {
          this.loaded.set(false);
          this.zoomed.set(false);
          this.origin.set('50% 50%');
          this.preload(photos, i + 1);
          this.preload(photos, i - 1);
        });
      },
      { allowSignalWrites: true },
    );
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Escape':
        this.close();
        break;
      case 'ArrowLeft':
        this.prev();
        break;
      case 'ArrowRight':
        this.next();
        break;
      case '+':
      case '=':
        this.zoomed.set(true);
        break;
      case '-':
        this.zoomed.set(false);
        break;
    }
  }

  close(): void {
    this.closed.emit();
  }

  prev(): void {
    const n = this.count();
    this.indexChange.emit((this.index() - 1 + n) % n);
  }

  next(): void {
    const n = this.count();
    this.indexChange.emit((this.index() + 1) % n);
  }

  toggleZoom(event?: MouseEvent): void {
    if (event) {
      this.updateOrigin(event);
    }
    this.zoomed.update((z) => !z);
  }

  onPointerMove(event: PointerEvent): void {
    if (this.zoomed()) {
      this.updateOrigin(event);
    }
  }

  onTouchStart(event: TouchEvent): void {
    const touch = event.changedTouches[0];
    this.touchStartX = touch.clientX;
    this.touchStartY = touch.clientY;
  }

  onTouchEnd(event: TouchEvent): void {
    if (this.zoomed()) {
      return;
    }
    const touch = event.changedTouches[0];
    const dx = touch.clientX - this.touchStartX;
    const dy = touch.clientY - this.touchStartY;
    if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy) * 1.5) {
      if (dx < 0) {
        this.next();
      } else {
        this.prev();
      }
    } else if (dy > SWIPE_THRESHOLD * 2 && Math.abs(dx) < SWIPE_THRESHOLD) {
      this.close();
    }
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  private updateOrigin(event: { clientX: number; clientY: number; currentTarget: EventTarget | null }): void {
    const target = event.currentTarget as HTMLElement | null;
    if (!target) {
      return;
    }
    const rect = target.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    this.origin.set(`${x.toFixed(1)}% ${y.toFixed(1)}%`);
  }

  private preload(photos: Photo[], i: number): void {
    const n = photos.length;
    if (n === 0 || typeof Image === 'undefined') {
      return;
    }
    const photo = photos[((i % n) + n) % n];
    const img = new Image();
    img.src = photo.src;
  }
}
