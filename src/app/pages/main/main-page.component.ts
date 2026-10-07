import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { WeddingStore } from '../../core/services/wedding.store';
import { CoupleComponent } from '../../features/couple/couple.component';
import { DayTimelineComponent } from '../../features/day-timeline/day-timeline.component';
import { DressCodeComponent } from '../../features/dress-code/dress-code.component';
import { EventsComponent } from '../../features/events/events.component';
import { FeaturedPhotoComponent } from '../../features/featured-photo/featured-photo.component';
import { FooterComponent } from '../../features/footer/footer.component';
import { GalleryComponent } from '../../features/gallery/gallery.component';
import { GiftsComponent } from '../../features/gifts/gifts.component';
import { HeroComponent } from '../../features/hero/hero.component';
import { OurStoryComponent } from '../../features/our-story/our-story.component';
import { RsvpComponent } from '../../features/rsvp/rsvp.component';
import { SaveTheDateComponent } from '../../features/save-the-date/save-the-date.component';
import { VenueComponent } from '../../features/venue/venue.component';
import { WishesComponent } from '../../features/wishes/wishes.component';

/**
 * Composes every section of the one-page site and feeds them from the store.
 * Heavier, interactive sections are deferred until they approach the viewport.
 */
@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    HeroComponent,
    SaveTheDateComponent,
    OurStoryComponent,
    CoupleComponent,
    GalleryComponent,
    FeaturedPhotoComponent,
    EventsComponent,
    DayTimelineComponent,
    VenueComponent,
    DressCodeComponent,
    GiftsComponent,
    RsvpComponent,
    WishesComponent,
    FooterComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './main-page.component.html',
})
export class MainPageComponent {
  protected readonly store = inject(WeddingStore);

  /** Guest name from the invitation link, available for future personalised copy. */
  readonly guestName = input<string | null>(null);
}
