/**
 * Placeholder image helpers (mock data only).
 *
 * All demo photos come from Unsplash. Replace these with your own photos by
 * pointing the data files to `/images/...` (served from the `public/` folder)
 * or to URLs returned by your backend.
 */
export const unsplash = (id: string, width = 1600, height?: number): string => {
  const params = new URLSearchParams({
    auto: 'format',
    fit: 'crop',
    w: String(width),
    q: '80',
  });
  if (height) {
    params.set('h', String(height));
  }
  return `https://images.unsplash.com/photo-${id}?${params.toString()}`;
};

/** Curated Unsplash photo ids used across the mock data. */
export const IMG = {
  cover: '1519741497674-611481863552',
  hero: '1537633552985-df8429e8048b',
  featured: '1532712938310-34cb3982ef74',
  footer: '1546032996-6dfacbacbf3f',
  bride: '1515372039744-b8f02a3ae446',
  groom: '1519085360753-af0119f7cbe7',
  storyMeet: '1494774157365-9e04c6720e47',
  storyTrip: '1544078751-58fee2d8a03b',
  storyProposal: '1529634806980-85c3dd6d34ac',
  storyWedding: '1591604466107-ec97de577aff',
  venue: '1519167758481-83f550bb49b3',
  ceremony: '1469371670807-013ccf25f16a',
  reception: '1519225421980-715cb0215aed',
} as const;
