import { StoryMilestone } from '../models';
import { IMG, unsplash } from './images';

export const STORY_MILESTONES: StoryMilestone[] = [
  {
    id: 'first-meeting',
    year: '2019',
    dateLabel: 'Mùa thu, 2019',
    title: 'The First Meeting',
    description:
      'Chúng mình gặp nhau trong một buổi chiều Hà Nội se lạnh, qua lời giới thiệu của một người bạn chung. Một ly cà phê, một câu chuyện dài — và một ánh nhìn mà cả hai đều không quên được.',
    image: unsplash(IMG.storyMeet, 1200, 1500),
  },
  {
    id: 'first-trip',
    year: '2021',
    dateLabel: 'Tháng 6, 2021',
    title: 'Our First Trip',
    description:
      'Chuyến đi đầu tiên cùng nhau đến Đà Lạt. Những con dốc, những buổi sáng sương mù và những buổi tối ngồi bên nhau không nói gì — đó là lúc chúng mình biết, đây là người mình muốn cùng đi tiếp.',
    image: unsplash(IMG.storyTrip, 1200, 1500),
  },
  {
    id: 'proposal',
    year: '2023',
    dateLabel: 'Tháng 12, 2023',
    title: 'The Proposal',
    description:
      'Dưới ánh đèn vàng của một buổi tối mùa đông, anh quỳ xuống với chiếc nhẫn đã giấu suốt ba tháng. Cô đã khóc, đã cười, và đã nói "Em đồng ý".',
    image: unsplash(IMG.storyProposal, 1200, 1500),
  },
  {
    id: 'wedding',
    year: '2026',
    dateLabel: '20\u00A0.\u00A012\u00A0.\u00A02026',
    title: 'Our Wedding',
    description:
      'Và hôm nay, chúng mình chính thức viết tiếp câu chuyện với một chương mới — có gia đình, bạn bè và có bạn ở đó cùng chứng kiến.',
    image: unsplash(IMG.storyWedding, 1200, 1500),
  },
];
