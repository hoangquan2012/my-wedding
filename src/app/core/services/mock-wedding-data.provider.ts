import { Injectable, inject } from '@angular/core';
import { Observable, delay, of, throwError } from 'rxjs';
import {
  BANK_ACCOUNTS,
  DAY_TIMELINE,
  PHOTOS,
  PHOTO_CATEGORIES,
  STORY_MILESTONES,
  VENUE,
  WEDDING_CONFIG,
  WEDDING_EVENTS,
  WISHES,
} from '../data';
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
import { StorageService } from './storage.service';
import { WeddingDataProvider } from './wedding-data.provider';

const WISHES_KEY = 'wishes';
const RSVP_KEY = 'rsvp';
const DEFAULT_PAGE_SIZE = 12;

/**
 * In-memory implementation backed by the files in `core/data`.
 * Simulates network latency and persists guest-generated data (wishes, RSVP)
 * to localStorage so the demo feels real across reloads.
 */
@Injectable({ providedIn: 'root' })
export class MockWeddingDataProvider extends WeddingDataProvider {
  private readonly storage = inject(StorageService);
  private readonly latency = 350;

  getConfig(): Observable<WeddingConfig> {
    return this.respond(WEDDING_CONFIG);
  }

  getStory(): Observable<StoryMilestone[]> {
    return this.respond(STORY_MILESTONES);
  }

  getPhotoCategories(): Observable<PhotoCategoryInfo[]> {
    return this.respond(PHOTO_CATEGORIES);
  }

  getPhotos(query: PhotoQuery = {}): Observable<PhotoPage> {
    const { category = 'all', page = 1, pageSize = DEFAULT_PAGE_SIZE } = query;
    const filtered = category === 'all' ? PHOTOS : PHOTOS.filter((p) => p.category === category);
    const start = (page - 1) * pageSize;
    const items = filtered.slice(start, start + pageSize);

    return this.respond({
      items,
      total: filtered.length,
      page,
      pageSize,
      hasMore: start + items.length < filtered.length,
    });
  }

  getEvents(): Observable<WeddingEvent[]> {
    return this.respond(WEDDING_EVENTS);
  }

  getDayTimeline(): Observable<DayTimelineItem[]> {
    return this.respond(DAY_TIMELINE);
  }

  getVenue(): Observable<Venue> {
    return this.respond(VENUE);
  }

  getBankAccounts(): Observable<BankAccount[]> {
    return this.respond(BANK_ACCOUNTS);
  }

  getWishes(): Observable<Wish[]> {
    const saved = this.storage.get<Wish[]>(WISHES_KEY, []);
    const all = [...saved, ...WISHES].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
    return this.respond(all);
  }

  addWish(payload: WishPayload): Observable<Wish> {
    const name = payload.name.trim();
    const message = payload.message.trim();
    if (!name || !message) {
      return throwError(() => new Error('Vui lòng nhập tên và lời chúc.'));
    }

    const wish: Wish = {
      id: `local-${Date.now()}`,
      name,
      message,
      createdAt: new Date().toISOString(),
    };

    const saved = this.storage.get<Wish[]>(WISHES_KEY, []);
    this.storage.set(WISHES_KEY, [wish, ...saved]);

    return this.respond(wish, 600);
  }

  submitRsvp(payload: RsvpPayload): Observable<RsvpResponse> {
    if (!payload.name.trim()) {
      return throwError(() => new Error('Vui lòng nhập tên của bạn.'));
    }

    const response: RsvpResponse = {
      success: true,
      id: `rsvp-${Date.now()}`,
      message:
        payload.attending === 'yes'
          ? 'Hẹn gặp bạn trong ngày vui!'
          : 'Cảm ơn bạn đã phản hồi. Chúng mình rất tiếc vì bạn không thể tham dự.',
    };

    this.storage.set(RSVP_KEY, { ...payload, submittedAt: new Date().toISOString() });

    return this.respond(response, 800);
  }

  private respond<T>(value: T, ms = this.latency): Observable<T> {
    return of(value).pipe(delay(ms));
  }
}
