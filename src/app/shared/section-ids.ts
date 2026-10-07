/** Anchor ids shared by sections and the navigation. */
export const SECTION_IDS = {
  hero: 'hero',
  saveTheDate: 'save-the-date',
  story: 'story',
  couple: 'couple',
  gallery: 'gallery',
  featured: 'featured',
  events: 'events',
  timeline: 'timeline',
  venue: 'venue',
  dressCode: 'dress-code',
  gifts: 'gifts',
  rsvp: 'rsvp',
  wishes: 'wishes',
} as const;

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS];

export interface NavLink {
  id: SectionId;
  label: string;
}

export const NAV_LINKS: NavLink[] = [
  { id: SECTION_IDS.story, label: 'Our Story' },
  { id: SECTION_IDS.gallery, label: 'Gallery' },
  { id: SECTION_IDS.events, label: 'Wedding Day' },
  { id: SECTION_IDS.venue, label: 'Venue' },
  { id: SECTION_IDS.gifts, label: 'Gifts' },
  { id: SECTION_IDS.rsvp, label: 'RSVP' },
  { id: SECTION_IDS.wishes, label: 'Wishes' },
];
