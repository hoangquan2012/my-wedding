import { WeddingConfig } from '../models';
import { IMG, unsplash } from './images';

/** Joins date parts with non-breaking " . " separators so dates never wrap mid-way. */
const dotDate = (...parts: (string | number)[]): string => parts.join('\u00A0.\u00A0');

/**
 * Central wedding configuration (mock).
 *
 * Everything that is "content" lives here: names, dates, copy, images, music.
 * Later this object can be returned by `GET /api/config` without changing the UI.
 */
export const WEDDING_CONFIG: WeddingConfig = {
  couple: {
    groom: {
      role: 'groom',
      fullName: 'Hoàng Quân',
      shortName: 'Hoàng Quân',
      photo: unsplash(IMG.groom, 1000, 1250),
      bio: 'Một người trầm tĩnh, yêu những buổi sáng sớm và những chuyến đi không có kế hoạch. Anh tin rằng hạnh phúc là được nắm tay người mình yêu đi qua từng ngày bình dị.',
      parents: ['Ông Hoàng Văn Minh', 'Bà Nguyễn Thị Hạnh'],
    },
    bride: {
      role: 'bride',
      fullName: 'Hoàng Thị Diệu Anh',
      shortName: 'Diệu Anh',
      photo: unsplash(IMG.bride, 1000, 1250),
      bio: 'Dịu dàng, tinh tế và luôn mang theo nụ cười ấm áp. Cô yêu hoa, yêu những bản nhạc cũ và tin rằng tình yêu đẹp nhất là tình yêu được vun đắp mỗi ngày.',
      parents: ['Ông Hoàng Đức Thành', 'Bà Trần Thị Mai'],
    },
    displayOrder: 'groom-first',
    monogram: 'Q & A',
    hashtag: '#QuanAnhForever',
  },

  wedding: {
    date: '2026-12-20T16:00:00+07:00',
    displayDate: dotDate('20', '12', '2026'),
    city: 'Hà Nội, Việt Nam',
  },

  cover: {
    backgroundImage: unsplash(IMG.cover, 2000),
    eyebrow: 'Our Wedding',
    buttonLabel: 'Mở thiệp cưới',
    guestGreeting: 'Trân trọng kính mời',
  },

  hero: {
    backgroundImage: unsplash(IMG.hero, 2000),
    eyebrow: 'The Wedding Of',
    invitation: 'Together with our families, we invite you to celebrate our wedding.',
    scrollHint: 'Cuộn để khám phá',
  },

  music: {
    // Placeholder track generated for the demo. Replace with your own file in `public/audio/`.
    src: 'audio/wedding-theme.wav',
    title: 'Our Song',
    autoplayOnOpen: true,
    volume: 0.45,
  },

  featured: {
    image: unsplash(IMG.featured, 2200),
    quote: 'Wherever you are,\nthat’s where I belong.',
    author: 'Hoàng Quân & Diệu Anh',
  },

  dressCode: {
    eyebrow: 'Dress Code',
    title: 'Formal / Elegant',
    description:
      'Chúng mình rất mong được đón tiếp bạn trong những bộ trang phục lịch sự, thanh lịch. Hãy chọn những gam màu nhẹ nhàng, ấm áp để cùng hoà vào không gian của buổi lễ.',
    palette: [
      { name: 'Champagne', hex: '#E6D5B8' },
      { name: 'Ivory', hex: '#FFFCF7' },
      { name: 'Earth Tones', hex: '#8A7156' },
      { name: 'Black', hex: '#2B241E' },
    ],
    note: 'Vui lòng hạn chế trang phục màu trắng tinh để dành riêng cho cô dâu.',
  },

  gift: {
    eyebrow: 'With Love',
    title: 'Your presence is the greatest gift.',
    subtitle: 'Sự hiện diện của bạn là món quà quý giá nhất đối với chúng mình.',
    message:
      'Nếu bạn muốn gửi lời chúc hoặc một món quà nhỏ, chúng mình rất trân trọng tấm lòng của bạn.',
    copySuccessMessage: 'Đã sao chép số tài khoản',
  },

  rsvp: {
    eyebrow: 'RSVP',
    title: 'Will you be joining us?',
    subtitle: `Vui lòng xác nhận tham dự trước ngày ${dotDate('05', '12', '2026')} để chúng mình chuẩn bị chu đáo nhất.`,
    deadline: '2026-12-05',
    successTitle: 'Cảm ơn bạn!',
    successMessage:
      'Chúng mình đã nhận được xác nhận của bạn và rất mong được gặp bạn trong ngày trọng đại.',
  },

  wishes: {
    eyebrow: 'Guest Book',
    title: 'Gửi lời chúc',
    subtitle: 'Hãy để lại đôi lời yêu thương dành cho chúng mình nhé.',
    successMessage: 'Cảm ơn bạn, lời chúc đã được gửi đi!',
  },

  sections: {
    saveTheDate: {
      eyebrow: 'Save The Date',
      title: 'Ngày chúng mình về chung một nhà',
    },
    story: {
      eyebrow: 'Our Story',
      title: 'Câu chuyện của chúng mình',
      subtitle: 'Mỗi khoảnh khắc đều là một mảnh ghép đưa chúng mình đến ngày hôm nay.',
    },
    couple: {
      eyebrow: 'Bride & Groom',
      title: 'Hai nửa của một câu chuyện',
    },
    gallery: {
      eyebrow: 'Our Moments',
      title: 'Pre-Wedding Gallery',
      subtitle: 'Những khoảnh khắc được lưu giữ trước ngày trọng đại.',
    },
    events: {
      eyebrow: 'The Wedding Day',
      title: 'Chương trình lễ cưới',
    },
    timeline: {
      eyebrow: 'Order Of The Day',
      title: 'Timeline ngày cưới',
    },
    venue: {
      eyebrow: 'The Venue',
      title: 'Địa điểm tổ chức',
    },
  },

  footer: {
    thankYou: 'Thank you',
    message:
      'Cảm ơn bạn đã dành thời gian ghé thăm và chia sẻ niềm hạnh phúc cùng chúng mình. Hẹn gặp bạn trong ngày vui!',
    backgroundImage: unsplash(IMG.footer, 2000),
  },

  seo: {
    title: 'Hoàng Quân & Diệu Anh — 20 . 12 . 2026',
    description:
      'Trân trọng kính mời bạn đến chung vui trong ngày cưới của Hoàng Quân & Hoàng Thị Diệu Anh — 20 . 12 . 2026.',
  },
};
