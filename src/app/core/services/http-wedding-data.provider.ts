import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
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
import { WeddingDataProvider } from './wedding-data.provider';

/**
 * Ready-to-use REST implementation for when a backend exists.
 *
 * Expected endpoints (adjust to match your API):
 *   GET  /config
 *   GET  /story
 *   GET  /photos/categories
 *   GET  /photos?category=&page=&pageSize=
 *   GET  /events
 *   GET  /timeline
 *   GET  /venue
 *   GET  /bank-accounts
 *   GET  /wishes
 *   POST /wishes
 *   POST /rsvp
 *
 * Activate it in `app.config.ts`:
 *   { provide: WeddingDataProvider, useClass: HttpWeddingDataProvider }
 */
@Injectable({ providedIn: 'root' })
export class HttpWeddingDataProvider extends WeddingDataProvider {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl.replace(/\/$/, '');

  getConfig(): Observable<WeddingConfig> {
    return this.http.get<WeddingConfig>(`${this.baseUrl}/config`);
  }

  getStory(): Observable<StoryMilestone[]> {
    return this.http.get<StoryMilestone[]>(`${this.baseUrl}/story`);
  }

  getPhotoCategories(): Observable<PhotoCategoryInfo[]> {
    return this.http.get<PhotoCategoryInfo[]>(`${this.baseUrl}/photos/categories`);
  }

  getPhotos(query: PhotoQuery = {}): Observable<PhotoPage> {
    let params = new HttpParams();
    if (query.category && query.category !== 'all') {
      params = params.set('category', query.category);
    }
    if (query.page) {
      params = params.set('page', query.page);
    }
    if (query.pageSize) {
      params = params.set('pageSize', query.pageSize);
    }
    return this.http.get<PhotoPage>(`${this.baseUrl}/photos`, { params });
  }

  getEvents(): Observable<WeddingEvent[]> {
    return this.http.get<WeddingEvent[]>(`${this.baseUrl}/events`);
  }

  getDayTimeline(): Observable<DayTimelineItem[]> {
    return this.http.get<DayTimelineItem[]>(`${this.baseUrl}/timeline`);
  }

  getVenue(): Observable<Venue> {
    return this.http.get<Venue>(`${this.baseUrl}/venue`);
  }

  getBankAccounts(): Observable<BankAccount[]> {
    return this.http.get<BankAccount[]>(`${this.baseUrl}/bank-accounts`);
  }

  getWishes(): Observable<Wish[]> {
    return this.http.get<Wish[]>(`${this.baseUrl}/wishes`);
  }

  addWish(payload: WishPayload): Observable<Wish> {
    return this.http.post<Wish>(`${this.baseUrl}/wishes`, payload);
  }

  submitRsvp(payload: RsvpPayload): Observable<RsvpResponse> {
    return this.http.post<RsvpResponse>(`${this.baseUrl}/rsvp`, payload);
  }
}
