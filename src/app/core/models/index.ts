/**
 * Domain models for the wedding website.
 *
 * These interfaces are the single contract between the UI and the data layer.
 * The mock provider and the (future) HTTP provider both return these shapes,
 * so swapping data sources never requires touching a component.
 */

export type PersonRole = 'bride' | 'groom';

export interface Person {
  role: PersonRole;
  /** Full name, e.g. "Hoàng Thị Diệu Anh" */
  fullName: string;
  /** Name used in large headings, e.g. "Diệu Anh" */
  shortName: string;
  /** Portrait photo URL */
  photo: string;
  /** Short introduction paragraph */
  bio: string;
  /** Optional parents line, e.g. ["Ông Hoàng Văn A", "Bà Nguyễn Thị B"] */
  parents?: string[];
  /** Optional social links */
  social?: { label: string; url: string }[];
}

export interface SectionCopy {
  eyebrow: string;
  title: string;
  subtitle?: string;
}

export interface ColorSwatch {
  name: string;
  hex: string;
}

export interface WeddingConfig {
  couple: {
    bride: Person;
    groom: Person;
    /** Which name is displayed first across the site */
    displayOrder: 'groom-first' | 'bride-first';
    /** Monogram shown in nav / footer, e.g. "Q & A" */
    monogram: string;
    hashtag?: string;
  };
  wedding: {
    /** ISO 8601 date-time with timezone offset, e.g. 2026-12-20T16:00:00+07:00 */
    date: string;
    /** Display string used on cover / hero, e.g. "20 . 12 . 2026" */
    displayDate: string;
    city: string;
  };
  cover: {
    backgroundImage: string;
    eyebrow: string;
    buttonLabel: string;
    guestGreeting: string;
  };
  hero: {
    backgroundImage: string;
    eyebrow: string;
    invitation: string;
    scrollHint: string;
  };
  music: {
    src: string;
    title: string;
    /** Try to start playback right after the invitation is opened */
    autoplayOnOpen: boolean;
    /** 0..1 */
    volume: number;
  };
  featured: {
    image: string;
    quote: string;
    author?: string;
  };
  dressCode: SectionCopy & {
    description: string;
    palette: ColorSwatch[];
    note?: string;
  };
  gift: SectionCopy & {
    message: string;
    copySuccessMessage: string;
  };
  rsvp: SectionCopy & {
    deadline?: string;
    successTitle: string;
    successMessage: string;
  };
  wishes: SectionCopy & {
    successMessage: string;
  };
  sections: {
    saveTheDate: SectionCopy;
    story: SectionCopy;
    couple: SectionCopy;
    gallery: SectionCopy;
    events: SectionCopy;
    timeline: SectionCopy;
    venue: SectionCopy;
  };
  footer: {
    thankYou: string;
    message: string;
    backgroundImage?: string;
  };
  seo: {
    title: string;
    description: string;
  };
}

export interface StoryMilestone {
  id: string;
  year: string;
  title: string;
  description: string;
  image: string;
  /** Optional precise date label, e.g. "Tháng 3, 2019" */
  dateLabel?: string;
}

export type PhotoCategory = 'pre-wedding' | 'ceremony' | 'reception' | 'details';

export interface PhotoCategoryInfo {
  id: PhotoCategory | 'all';
  label: string;
}

export interface Photo {
  id: string | number;
  /** Large image used in the lightbox */
  src: string;
  /** Smaller image used in grids; falls back to `src` */
  thumb?: string;
  alt: string;
  category: PhotoCategory;
  width?: number;
  height?: number;
}

export interface PhotoQuery {
  category?: PhotoCategory | 'all';
  page?: number;
  pageSize?: number;
}

export interface PhotoPage {
  items: Photo[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export type EventIcon = 'rings' | 'glasses' | 'church' | 'party';

export interface WeddingEvent {
  id: string;
  title: string;
  /** e.g. "16:00" */
  time: string;
  /** Display date, e.g. "20 December 2026" */
  dateLabel: string;
  venueName: string;
  address: string;
  description: string;
  mapUrl: string;
  icon: EventIcon;
}

export type TimelineIcon =
  | 'makeup'
  | 'guests'
  | 'rings'
  | 'camera'
  | 'glasses'
  | 'dinner'
  | 'music';

export interface DayTimelineItem {
  id: string;
  /** e.g. "14:00" */
  time: string;
  title: string;
  description?: string;
  icon: TimelineIcon;
}

export interface Venue {
  name: string;
  address: string;
  description: string;
  image: string;
  /** Embeddable Google Maps URL (iframe src) */
  mapEmbedUrl: string;
  /** Deep link to open Google Maps */
  mapUrl: string;
  /** Directions deep link */
  directionsUrl: string;
  phone?: string;
  note?: string;
}

export interface BankAccount {
  id: string;
  role: PersonRole;
  owner: string;
  bank: string;
  bankShort: string;
  accountNumber: string;
  qrImage: string;
}

export interface Wish {
  id: string;
  name: string;
  message: string;
  /** ISO date-time */
  createdAt: string;
}

export interface WishPayload {
  name: string;
  message: string;
}

export type Attendance = 'yes' | 'no';

export interface RsvpPayload {
  name: string;
  phone?: string;
  attending: Attendance;
  guests: number;
  /** Event ids the guest will attend */
  events: string[];
  note?: string;
}

export interface RsvpResponse {
  success: boolean;
  id: string;
  message: string;
}
