import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { WeddingConfig } from '../../core/models';
import { OrnamentComponent } from '../../shared/components/ornament/ornament.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { SECTION_IDS } from '../../shared/section-ids';

@Component({
  selector: 'app-dress-code',
  standalone: true,
  imports: [RevealDirective, OrnamentComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section [id]="ids.dressCode" class="relative overflow-hidden bg-ivory py-24 sm:py-32">
      <div class="container-luxe flex flex-col items-center text-center">
        <p class="eyebrow" appReveal="fade">{{ dressCode().eyebrow }}</p>
        <app-ornament class="mt-4" appReveal="fade" [revealDelay]="100" />

        <h2 class="heading-display mt-8 text-4xl sm:text-5xl lg:text-6xl" appReveal [revealDelay]="150">
          {{ dressCode().title }}
        </h2>
        @if (dressCode().subtitle) {
          <p class="mt-4 font-serif italic text-xl text-mocha sm:text-2xl" appReveal [revealDelay]="200">{{ dressCode().subtitle }}</p>
        }

        <p class="mt-7 max-w-prose font-sans text-[0.95rem] leading-relaxed text-cocoa/80 sm:text-base" appReveal [revealDelay]="250">
          {{ dressCode().description }}
        </p>

        <!-- Palette -->
        <ul class="mt-14 flex flex-wrap items-start justify-center gap-8 sm:gap-12" appReveal [revealDelay]="300">
          @for (swatch of dressCode().palette; track swatch.hex; let i = $index) {
            <li class="flex w-24 flex-col items-center gap-4 sm:w-28">
              <span
                class="h-20 w-20 rounded-full border border-champagne-dark/60 shadow-card transition-transform duration-500 ease-luxe hover:scale-105 sm:h-24 sm:w-24"
                [style.background-color]="swatch.hex"
                [attr.aria-label]="swatch.name"
              ></span>
              <span class="font-sans text-[0.7rem] uppercase tracking-wide2 text-cocoa">{{ swatch.name }}</span>
            </li>
          }
        </ul>

        @if (dressCode().note) {
          <p class="mt-12 font-serif italic text-base text-taupe sm:text-lg" appReveal [revealDelay]="350">{{ dressCode().note }}</p>
        }
      </div>
    </section>
  `,
})
export class DressCodeComponent {
  readonly dressCode = input.required<WeddingConfig['dressCode']>();
  protected readonly ids = SECTION_IDS;
}
