import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DayTimelineItem, SectionCopy } from '../../core/models';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { SECTION_IDS } from '../../shared/section-ids';

/**
 * "Order of the day" programme card.
 */
@Component({
  selector: 'app-day-timeline',
  standalone: true,
  imports: [SectionHeadingComponent, RevealDirective, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section [id]="ids.timeline" class="relative overflow-hidden bg-ivory py-24 sm:py-32">
      <div class="pointer-events-none absolute -bottom-32 -right-32 h-[28rem] w-[28rem] rounded-full bg-champagne/30 blur-3xl"></div>

      <div class="container-luxe relative">
        <app-section-heading [eyebrow]="copy().eyebrow" [title]="copy().title" [subtitle]="copy().subtitle" />

        <div class="mx-auto mt-16 max-w-2xl" appReveal="scale" [revealDelay]="150">
          <div class="card-luxe relative px-5 py-10 sm:px-12 sm:py-14">
            <div class="pointer-events-none absolute inset-2.5 border border-gold/40 sm:inset-3" aria-hidden="true"></div>

            <ol class="relative">
              @for (item of items(); track item.id; let i = $index; let last = $last) {
                <li class="relative flex items-stretch gap-4 sm:gap-7" appReveal [revealDelay]="100 + i * 70">
                  <!-- Time -->
                  <div class="w-14 shrink-0 pt-2 text-right sm:w-20">
                    <span class="font-display text-lg tabular-nums text-ink sm:text-2xl">{{ item.time }}</span>
                  </div>

                  <!-- Icon + connector -->
                  <div class="flex shrink-0 flex-col items-center">
                    <span class="relative z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold/60 bg-ivory text-gold sm:h-12 sm:w-12">
                      <app-icon [name]="item.icon" [size]="20" [strokeWidth]="1.3" />
                    </span>
                    @if (!last) {
                      <span class="w-px flex-1 bg-gradient-to-b from-gold/50 to-gold/20" aria-hidden="true"></span>
                    }
                  </div>

                  <!-- Text -->
                  <div class="min-w-0 flex-1 pb-9 pt-2" [class.pb-0]="last">
                    <h3 class="heading-serif text-xl sm:text-2xl">{{ item.title }}</h3>
                    @if (item.description) {
                      <p class="mt-1 font-sans text-sm leading-relaxed text-cocoa/70">{{ item.description }}</p>
                    }
                  </div>
                </li>
              }
            </ol>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class DayTimelineComponent {
  readonly copy = input.required<SectionCopy>();
  readonly items = input.required<DayTimelineItem[]>();
  protected readonly ids = SECTION_IDS;
}
