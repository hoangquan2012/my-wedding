import {
  DestroyRef,
  Directive,
  ElementRef,
  afterNextRender,
  inject,
  input,
  numberAttribute,
  signal,
} from '@angular/core';

export type RevealVariant = 'up' | 'fade' | 'left' | 'right' | 'scale' | 'blur';

/**
 * Scroll-triggered reveal animation.
 *
 * Usage:
 *   <h2 appReveal>…</h2>
 *   <div appReveal="left" [revealDelay]="150">…</div>
 *
 * The directive only toggles classes; the actual transition lives in `styles.scss`
 * (`.reveal`, `.reveal.is-visible`) so it stays cheap and GPU-friendly.
 */
@Directive({
  selector: '[appReveal]',
  standalone: true,
  host: {
    class: 'reveal',
    '[class.is-visible]': 'visible()',
    '[attr.data-reveal]': 'variantOrDefault()',
    '[style.transition-delay.ms]': 'revealDelay()',
  },
})
export class RevealDirective {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  /** Animation variant. Empty string (bare attribute) falls back to "up". */
  readonly variant = input<RevealVariant | ''>('', { alias: 'appReveal' });
  /** Delay in milliseconds before the transition starts. */
  readonly revealDelay = input(0, { transform: numberAttribute });
  /** Portion of the element that must be visible (0..1). */
  readonly revealThreshold = input(0.15, { transform: numberAttribute });
  /** Reveal only once (default) or every time it enters the viewport. */
  readonly revealOnce = input(true);

  readonly visible = signal(false);

  protected variantOrDefault(): RevealVariant {
    return this.variant() || 'up';
  }

  constructor() {
    afterNextRender(() => this.observe());
  }

  private observe(): void {
    if (typeof IntersectionObserver === 'undefined') {
      this.visible.set(true);
      return;
    }

    // Very tall elements can never reach a high visibility ratio — relax the threshold for them.
    const element = this.el.nativeElement;
    const viewportHeight = globalThis.innerHeight || 800;
    const threshold =
      element.offsetHeight > viewportHeight * 0.7 ? Math.min(this.revealThreshold(), 0.05) : this.revealThreshold();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.visible.set(true);
            if (this.revealOnce()) {
              observer.disconnect();
            }
          } else if (!this.revealOnce()) {
            this.visible.set(false);
          }
        }
      },
      { threshold, rootMargin: '0px 0px -8% 0px' },
    );

    observer.observe(element);
    this.destroyRef.onDestroy(() => observer.disconnect());
  }
}
