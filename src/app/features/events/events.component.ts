import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SectionCopy, WeddingEvent } from '../../core/models';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { SECTION_IDS } from '../../shared/section-ids';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [SectionHeadingComponent, RevealDirective, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section [id]="ids.events" class="relative overflow-hidden bg-cream py-24 sm:py-32">
      <div class="container-luxe">
        <app-section-heading [eyebrow]="copy().eyebrow" [title]="copy().title" [subtitle]="copy().subtitle" />

        <div class="mt-16 grid gap-6 md:grid-cols-2 md:gap-8 lg:gap-10">
          @for (event of events(); track event.id; let i = $index) {
            <article
              class="card-luxe group relative flex flex-col items-center px-7 py-12 text-center sm:px-10 sm:py-14"
              [appReveal]="i % 2 === 0 ? 'left' : 'right'"
              [revealDelay]="i * 120"
            >
              <!-- corner accents -->
              <span class="pointer-events-none absolute left-3 top-3 h-6 w-6 border-l border-t border-gold/60" aria-hidden="true"></span>
              <span class="pointer-events-none absolute bottom-3 right-3 h-6 w-6 border-b border-r border-gold/60" aria-hidden="true"></span>

              <span class="inline-flex h-16 w-16 items-center justify-center rounded-full border border-gold/60 text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-ivory">
                <app-icon [name]="event.icon" [size]="30" [strokeWidth]="1.2" />
              </span>

              <h3 class="heading-display mt-7 text-3xl sm:text-4xl">{{ event.title }}</h3>

              <p class="mt-6 font-display text-5xl text-ink sm:text-6xl">{{ event.time }}</p>
              <p class="mt-3 font-sans text-xs uppercase tracking-luxe text-gold">{{ event.dateLabel }}</p>

              <div class="my-7 h-px w-16 bg-gold/50"></div>

              <p class="heading-serif text-xl sm:text-2xl">{{ event.venueName }}</p>
              <p class="mt-2 flex items-start justify-center gap-2 font-sans text-sm text-cocoa/70">
                <app-icon name="map-pin" [size]="16" class="mt-0.5 text-gold" />
                <span>{{ event.address }}</span>
              </p>

              <p class="mt-6 max-w-sm font-sans text-[0.95rem] leading-relaxed text-cocoa/80">{{ event.description }}</p>

              <a [href]="event.mapUrl" target="_blank" rel="noopener noreferrer" class="btn-outline mt-9">
                <app-icon name="map-pin" [size]="16" />
                View Location
              </a>
            </article>
          }
        </div>
      </div>
    </section>
  `,
})
export class EventsComponent {
  readonly copy = input.required<SectionCopy>();
  readonly events = input.required<WeddingEvent[]>();
  protected readonly ids = SECTION_IDS;
}
