import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { WeddingConfig } from '../../core/models';
import { OrnamentComponent } from '../../shared/components/ornament/ornament.component';
import { ParallaxDirective } from '../../shared/directives/parallax.directive';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { SECTION_IDS } from '../../shared/section-ids';

/**
 * Cinematic full-bleed photo with a single quote.
 */
@Component({
  selector: 'app-featured-photo',
  standalone: true,
  imports: [RevealDirective, ParallaxDirective, OrnamentComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section [id]="ids.featured" class="relative flex min-h-[85svh] items-center justify-center overflow-hidden bg-ink text-ivory">
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute inset-[-12%] will-change-transform" appParallax="0.22">
          <img
            [src]="featured().image"
            alt=""
            loading="lazy"
            decoding="async"
            class="h-full w-full object-cover"
          />
        </div>
        <div class="absolute inset-0 bg-ink/45"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/40"></div>
      </div>

      <div class="container-luxe relative z-10 flex flex-col items-center py-32 text-center">
        <app-ornament tone="light" appReveal="fade" />
        <blockquote
          class="mt-10 max-w-4xl whitespace-pre-line font-display italic text-3xl leading-snug text-ivory sm:text-5xl lg:text-6xl text-balance"
          appReveal="blur"
          [revealDelay]="150"
        >
          {{ featured().quote }}
        </blockquote>
        @if (featured().author) {
          <p class="mt-8 font-sans text-xs uppercase tracking-luxe text-champagne" appReveal [revealDelay]="350">
            — {{ featured().author }}
          </p>
        }
      </div>
    </section>
  `,
})
export class FeaturedPhotoComponent {
  readonly featured = input.required<WeddingConfig['featured']>();
  protected readonly ids = SECTION_IDS;
}
