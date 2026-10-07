import { Observable } from 'rxjs';
import {
  BankAccount,
  DayTimelineItem,
  PhotoCategoryInfo,
  PhotoPage,
  PhotoQuery,
  RsvpPayload,
  RsvpResponse,
  StoryMilestone,
  Venue,
  WeddingConfig,
  WeddingEvent,
  Wish,
  WishPayload,
} from '../models';

/**
 * Data access contract for the whole site.
 *
 * The UI only ever talks to this abstract class. Today it is fulfilled by
 * `MockWeddingDataProvider`; later swap the provider in `app.config.ts` to
 * `HttpWeddingDataProvider` (or your own implementation) and the UI keeps working.
 */
export abstract class WeddingDataProvider {
  abstract getConfig(): Observable<WeddingConfig>;
  abstract getStory(): Observable<StoryMilestone[]>;
  abstract getPhotoCategories(): Observable<PhotoCategoryInfo[]>;
  abstract getPhotos(query?: PhotoQuery): Observable<PhotoPage>;
  abstract getEvents(): Observable<WeddingEvent[]>;
  abstract getDayTimeline(): Observable<DayTimelineItem[]>;
  abstract getVenue(): Observable<Venue>;
  abstract getBankAccounts(): Observable<BankAccount[]>;
  abstract getWishes(): Observable<Wish[]>;
  abstract addWish(payload: WishPayload): Observable<Wish>;
  abstract submitRsvp(payload: RsvpPayload): Observable<RsvpResponse>;
}
