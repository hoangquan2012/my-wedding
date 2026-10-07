import {
  DestroyRef,
  Directive,
  ElementRef,
  NgZone,
  afterNextRender,
  inject,
  input,
  numberAttribute,
} from '@angular/core';

/**
 * Lightweight vertical parallax.
 *
 * Apply to an oversized element (e.g. an image with `scale-110`) inside an
 * `overflow-hidden` container. Runs outside Angular's zone and is throttled
 * with requestAnimationFrame. Disabled for reduced-motion users and, by
 * default, on small screens where it tends to hurt scroll performance.
 */
@Directive({
  selector: '[appParallax]',
  standalone: true,
})
export class ParallaxDirective {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly zone = inject(NgZone);
  private readonly destroyRef = inject(DestroyRef);

  /** Movement factor; 0.2 means the element moves at 20% of scroll speed. */
  readonly speed = input(0.2, { alias: 'appParallax', transform: (v: unknown) => (v === '' ? 0.2 : numberAttribute(v, 0.2)) });
  readonly parallaxMinWidth = input(768, { transform: numberAttribute });

  private ticking = false;

  constructor() {
    afterNextRender(() => this.setup());
  }

  private setup(): void {
    const reduceMotion = globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      return;
    }

    const element = this.el.nativeElement;

    const update = () => {
      this.ticking = false;
      if (globalThis.innerWidth < this.parallaxMinWidth()) {
        element.style.transform = '';
        return;
      }
      const rect = element.parentElement?.getBoundingClientRect() ?? element.getBoundingClientRect();
      const viewportHeight = globalThis.innerHeight;
      if (rect.bottom < 0 || rect.top > viewportHeight) {
        return;
      }
      const center = rect.top + rect.height / 2 - viewportHeight / 2;
      const offset = -center * this.speed();
      element.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    };

    const onScroll = () => {
      if (!this.ticking) {
        this.ticking = true;
        requestAnimationFrame(update);
      }
    };

    this.zone.runOutsideAngular(() => {
      update();
      globalThis.addEventListener('scroll', onScroll, { passive: true });
      globalThis.addEventListener('resize', onScroll, { passive: true });
    });

    this.destroyRef.onDestroy(() => {
      globalThis.removeEventListener('scroll', onScroll);
      globalThis.removeEventListener('resize', onScroll);
    });
  }
}
