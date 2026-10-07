import { DayTimelineItem, Venue, WeddingEvent } from '../models';
import { IMG, unsplash } from './images';

const VENUE_ADDRESS = '136 Nguyễn Chí Thanh, Láng Thượng, Đống Đa, Hà Nội';
const VENUE_QUERY = encodeURIComponent(VENUE_ADDRESS);

export const VENUE: Venue = {
  name: 'Almaz Center — Grand Ballroom',
  address: VENUE_ADDRESS,
  description:
    'Không gian sảnh tiệc ấm cúng với tông màu kem và ánh đèn vàng dịu nhẹ, nằm ngay trung tâm thành phố và thuận tiện di chuyển.',
  image: unsplash(IMG.venue, 1600, 1100),
  mapEmbedUrl: `https://www.google.com/maps?q=${VENUE_QUERY}&output=embed`,
  mapUrl: `https://www.google.com/maps/search/?api=1&query=${VENUE_QUERY}`,
  directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${VENUE_QUERY}`,
  phone: '+84 24 1234 5678',
  note: 'Có bãi đỗ xe ô tô và xe máy miễn phí cho khách mời tại tầng hầm B1.',
};

export const WEDDING_EVENTS: WeddingEvent[] = [
  {
    id: 'ceremony',
    title: 'Ceremony',
    time: '16:00',
    dateLabel: '20 December 2026',
    venueName: VENUE.name,
    address: VENUE.address,
    description:
      'Lễ thành hôn được cử hành trong không gian trang trọng và ấm cúng, với sự chứng kiến của hai bên gia đình và những người thân yêu.',
    mapUrl: VENUE.mapUrl,
    icon: 'rings',
  },
  {
    id: 'reception',
    title: 'Reception',
    time: '18:00',
    dateLabel: '20 December 2026',
    venueName: VENUE.name,
    address: VENUE.address,
    description:
      'Tiệc mừng với bữa tối thân mật, những lời chúc và những điệu nhảy kéo dài đến khuya. Hãy đến và cùng chúng mình tận hưởng đêm vui.',
    mapUrl: VENUE.mapUrl,
    icon: 'glasses',
  },
];

export const DAY_TIMELINE: DayTimelineItem[] = [
  { id: 't1', time: '14:00', title: 'Bride Preparation', description: 'Cô dâu trang điểm và chuẩn bị', icon: 'makeup' },
  { id: 't2', time: '15:30', title: 'Guest Arrival', description: 'Đón khách & chụp ảnh lưu niệm', icon: 'guests' },
  { id: 't3', time: '16:00', title: 'Wedding Ceremony', description: 'Lễ thành hôn', icon: 'rings' },
  { id: 't4', time: '17:30', title: 'Photo Session', description: 'Chụp ảnh cùng gia đình & bạn bè', icon: 'camera' },
  { id: 't5', time: '18:30', title: 'Reception', description: 'Khai tiệc & nâng ly chúc mừng', icon: 'glasses' },
  { id: 't6', time: '19:00', title: 'Dinner', description: 'Bữa tối thân mật', icon: 'dinner' },
  { id: 't7', time: '20:30', title: 'Celebration', description: 'Âm nhạc & khiêu vũ', icon: 'music' },
];
