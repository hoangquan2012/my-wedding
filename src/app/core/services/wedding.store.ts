import { Injectable, computed, inject, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { forkJoin } from 'rxjs';
import {
  BankAccount,
  DayTimelineItem,
  Person,
  PhotoCategoryInfo,
  StoryMilestone,
  Venue,
  WeddingConfig,
  WeddingEvent,
} from '../models';
import { WeddingDataProvider } from './wedding-data.provider';

/**
 * Signal-based store holding the "static" wedding content.
 *
 * Sections receive their data through inputs from the page component, so they
 * stay presentational and do not care where the data originated.
 */
@Injectable({ providedIn: 'root' })
export class WeddingStore {
  private readonly data = inject(WeddingDataProvider);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  readonly config = signal<WeddingConfig | null>(null);
  readonly story = signal<StoryMilestone[]>([]);
  readonly events = signal<WeddingEvent[]>([]);
  readonly dayTimeline = signal<DayTimelineItem[]>([]);
  readonly venue = signal<Venue | null>(null);
  readonly bankAccounts = signal<BankAccount[]>([]);
  readonly photoCategories = signal<PhotoCategoryInfo[]>([]);

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly ready = computed(() => this.config() !== null && !this.loading());

  /** Guest name from `?to=` query param, used to personalise the invitation. */
  readonly guestName = signal<string | null>(null);

  readonly weddingDate = computed(() => {
    const cfg = this.config();
    return cfg ? new Date(cfg.wedding.date) : null;
  });

  /** Couple ordered according to `displayOrder`. */
  readonly couple = computed<[Person, Person] | null>(() => {
    const cfg = this.config();
    if (!cfg) {
      return null;
    }
    const { bride, groom, displayOrder } = cfg.couple;
    return displayOrder === 'bride-first' ? [bride, groom] : [groom, bride];
  });

  load(): void {
    if (this.loading() || this.config()) {
      return;
    }
    this.loading.set(true);
    this.error.set(null);

    forkJoin({
      config: this.data.getConfig(),
      story: this.data.getStory(),
      events: this.data.getEvents(),
      dayTimeline: this.data.getDayTimeline(),
      venue: this.data.getVenue(),
      bankAccounts: this.data.getBankAccounts(),
      photoCategories: this.data.getPhotoCategories(),
    }).subscribe({
      next: (result) => {
        this.config.set(result.config);
        this.story.set(result.story);
        this.events.set(result.events);
        this.dayTimeline.set(result.dayTimeline);
        this.venue.set(result.venue);
        this.bankAccounts.set(result.bankAccounts);
        this.photoCategories.set(result.photoCategories);
        this.applySeo(result.config);
        this.loading.set(false);
      },
      error: (err: unknown) => {
        console.error('[WeddingStore] failed to load content', err);
        this.error.set('Không thể tải nội dung thiệp cưới. Vui lòng thử lại.');
        this.loading.set(false);
      },
    });
  }

  private applySeo(config: WeddingConfig): void {
    this.title.setTitle(config.seo.title);
    this.meta.updateTag({ name: 'description', content: config.seo.description });
    this.meta.updateTag({ property: 'og:title', content: config.seo.title });
    this.meta.updateTag({ property: 'og:description', content: config.seo.description });
    this.meta.updateTag({ property: 'og:image', content: config.hero.backgroundImage });
  }
}
