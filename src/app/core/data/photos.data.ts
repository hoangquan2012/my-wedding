import { Photo, PhotoCategory, PhotoCategoryInfo } from '../models';
import { unsplash } from './images';

export const PHOTO_CATEGORIES: PhotoCategoryInfo[] = [
  { id: 'all', label: 'Tất cả' },
  { id: 'pre-wedding', label: 'Pre-wedding' },
  { id: 'ceremony', label: 'Lễ cưới' },
  { id: 'reception', label: 'Tiệc cưới' },
  { id: 'details', label: 'Chi tiết' },
];

type PhotoSeed = [id: string, alt: string, category: PhotoCategory];

/**
 * Add / remove photos here. The gallery layout adapts automatically,
 * from 10 to 100+ photos.
 */
const PHOTO_SEEDS: PhotoSeed[] = [
  ['1546032996-6dfacbacbf3f', 'Nụ hôn dưới tấm voan giữa cánh đồng chiều', 'pre-wedding'],
  ['1465495976277-4387d4b0b4c6', 'Đôi tay và nhẫn cưới bên bó hoa', 'details'],
  ['1460978812857-470ed1c77af0', 'Khoảnh khắc đen trắng dưới tấm voan', 'pre-wedding'],
  ['1511285560929-80b456fea0bc', 'Bóng bay và tiếng cười giữa phố', 'pre-wedding'],
  ['1595407753234-0882f1e77954', 'Bước ra lễ đường trong tiếng vỗ tay', 'ceremony'],
  ['1606800052052-a08af7148866', 'Cặp nhẫn vàng trên nền lụa', 'details'],
  ['1478146896981-b80fe463b330', 'Dạo bước trên con đường núi', 'pre-wedding'],
  ['1519225421980-715cb0215aed', 'Bàn tiệc với hoa tươi', 'reception'],
  ['1529636798458-92182e662485', 'Bó hoa cưới trên tay cô dâu', 'ceremony'],
  ['1544078751-58fee2d8a03b', 'Hai người giữa bãi biển cát đen', 'pre-wedding'],
  ['1515934751635-c81c6bc9a2d8', 'Nhẫn cưới đặt trên cánh hoa', 'details'],
  ['1522413452208-996ff3f3e740', 'Không gian tiệc được trang trí xanh mát', 'reception'],
  ['1532712938310-34cb3982ef74', 'Hai bóng người nhỏ giữa thiên nhiên', 'pre-wedding'],
  ['1594552072238-b8a33785b261', 'Chiếc váy cưới chờ đợi', 'details'],
  ['1469371670807-013ccf25f16a', 'Lối đi lễ đường ngoài trời', 'ceremony'],
  ['1494774157365-9e04c6720e47', 'Hoàng hôn và hai người', 'pre-wedding'],
  ['1525258946800-98cfd641d0de', 'Hoa hồng màu đào', 'details'],
  ['1464366400600-7168b8af9bc3', 'Lều tiệc lung linh', 'reception'],
  ['1591604466107-ec97de577aff', 'Chân dung cô dâu chú rể trong nắng', 'pre-wedding'],
  ['1523438885200-e635ba2c371e', 'Cổng hoa lễ cưới', 'ceremony'],
  ['1545232979-8bf68ee9b1af', 'Bàn tay đan nhau', 'details'],
  ['1519167758481-83f550bb49b3', 'Sảnh tiệc sang trọng', 'reception'],
  ['1550005809-91ad75fb315f', 'Cô dâu và bó hoa trắng', 'pre-wedding'],
  ['1507504031003-b417219a0fde', 'Bảng gỗ Mr & Mrs', 'details'],
  ['1583939003579-730e3918a45a', 'Mưa confetti trong niềm vui', 'ceremony'],
  ['1530023367847-a683933f4172', 'Bàn tiệc dài cho gia đình', 'reception'],
  ['1537633552985-df8429e8048b', 'Cô dâu chú rể bên bờ biển', 'pre-wedding'],
  ['1518895949257-7621c3c786d7', 'Một cành hồng trong bình', 'details'],
  ['1511795409834-ef04bbd61622', 'Ánh nến trên bàn tiệc', 'reception'],
  ['1522673607200-164d1b6ce486', 'Hai chiếc ghế dành cho cô dâu chú rể', 'ceremony'],
  ['1516589178581-6cd7833ae3b2', 'Trái tim bằng tay dưới hoàng hôn', 'pre-wedding'],
  ['1520854221256-17451cc331bf', 'Nắm tay nhau thật chặt', 'details'],
  ['1498931299472-f7a63a5a1cfa', 'Pháo hoa cuối đêm tiệc', 'reception'],
  ['1529634806980-85c3dd6d34ac', 'Nhẫn cưới trên tay', 'details'],
  ['1527529482837-4698179dc6ce', 'Nâng ly chúc mừng', 'reception'],
  ['1519741497674-611481863552', 'Ánh sáng pháo sparkler trong đêm', 'pre-wedding'],
  ['1482575832494-771f74bf6857', 'Khiêu vũ cùng nhau', 'reception'],
  ['1510076857177-7470076d4098', 'Nhà kho được thắp sáng cho tiệc cưới', 'reception'],
];

export const PHOTOS: Photo[] = PHOTO_SEEDS.map(([id, alt, category], index) => ({
  id: index + 1,
  src: unsplash(id, 1800),
  thumb: unsplash(id, 900),
  alt,
  category,
}));
