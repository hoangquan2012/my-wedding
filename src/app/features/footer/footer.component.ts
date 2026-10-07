import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Person, WeddingConfig } from '../../core/models';
import { OrnamentComponent } from '../../shared/components/ornament/ornament.component';
import { ParallaxDirective } from '../../shared/directives/parallax.directive';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RevealDirective, ParallaxDirective, OrnamentComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="relative overflow-hidden bg-ink text-ivory">
      @if (config().footer.backgroundImage; as bg) {
        <div class="absolute inset-0 overflow-hidden">
          <div class="absolute inset-[-12%] will-change-transform" appParallax="0.15">
            <img [src]="bg" alt="" loading="lazy" decoding="async" class="h-full w-full object-cover" />
          </div>
          <div class="absolute inset-0 bg-ink/75"></div>
          <div class="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink"></div>
        </div>
      }

      <div class="container-luxe relative z-10 flex flex-col items-center py-28 text-center sm:py-36">
        <p class="font-script text-5xl text-gold-light sm:text-7xl" appReveal="scale">{{ config().footer.thankYou }}</p>

        <app-ornament tone="light" class="mt-8" appReveal="fade" [revealDelay]="100" />

        <h2 class="heading-display mt-8 !text-ivory text-3xl sm:text-5xl text-balance" appReveal [revealDelay]="150">
          {{ couple()[0].shortName }} <span class="mx-2 font-script text-gold-light sm:mx-4">&amp;</span> {{ couple()[1].shortName }}
        </h2>

        <p class="mt-5 font-serif text-xl tracking-[0.3em] text-champagne" appReveal [revealDelay]="200">
          {{ config().wedding.displayDate }}
        </p>

        <p class="mt-8 max-w-prose font-sans text-[0.95rem] leading-relaxed text-ivory/75 sm:text-base" appReveal [revealDelay]="250">
          {{ config().footer.message }}
        </p>

        @if (config().couple.hashtag) {
          <p class="mt-8 font-sans text-xs uppercase tracking-luxe text-gold-light" appReveal [revealDelay]="300">
            {{ config().couple.hashtag }}
          </p>
        }
      </div>

      <div class="relative z-10 border-t border-ivory/10 py-6 text-center font-sans text-[0.65rem] uppercase tracking-wide2 text-ivory/40"
           style="padding-bottom: max(1.5rem, env(safe-area-inset-bottom))">
        {{ config().couple.monogram }} · Made with love · {{ year }}
      </div>
    </footer>
  `,
})
export class FooterComponent {
  readonly config = input.required<WeddingConfig>();
  readonly couple = input.required<[Person, Person]>();
  protected readonly year = new Date().getFullYear();
}
