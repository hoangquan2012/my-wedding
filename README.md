# Hoàng Quân & Diệu Anh — Wedding Website

Website thiệp cưới cá nhân theo phong cách **luxury / editorial**, xây dựng bằng **Angular 18 (standalone + signals)** và **Tailwind CSS**.
Toàn bộ dữ liệu hiện tại là mock data; kiến trúc đã sẵn sàng để thay bằng API mà **không cần sửa UI**.

## Chạy dự án

```bash
npm install
npm start          # http://localhost:4200
npm run build      # build production → dist/marry
```

Mở link dạng `http://localhost:4200/?to=Gia%20đình%20anh%20Tuấn` để cá nhân hoá tên khách mời trên thiệp.

## Tính năng

| Section | Ghi chú |
| --- | --- |
| Cover (mở thiệp) | Ảnh full-screen, slow zoom, text xuất hiện từng phần, khung thiệp, nút "Mở thiệp cưới", tên khách từ `?to=` |
| Hero | Parallax + slow zoom + overlay, tên cô dâu/chú rể, lời mời, ngày cưới |
| Save the Date | Ngày lớn, thứ (EN/VI), countdown chạy từng giây, nút "Thêm vào lịch" (Google Calendar) |
| Our Story | Timeline so le trên desktop, 1 cột trên mobile, reveal theo scroll |
| Couple | Portrait khung vòm, tên, bố mẹ, giới thiệu |
| Gallery | Editorial grid (large / tall / wide lặp mỗi 8 ảnh), lọc theo category, "Xem thêm" phân trang, lightbox full-screen (←/→, Esc, swipe, click để zoom, số thứ tự) |
| Featured Photo | Ảnh cinematic + quote |
| Wedding Day | Card Ceremony / Reception + "View Location" |
| Timeline | Chương trình ngày cưới dạng thiệp in |
| Venue | Ảnh, địa chỉ, giờ, hotline, Google Maps embed (lazy) + Chỉ đường |
| Dress Code | Palette màu minh hoạ |
| Gifts | 2 card tài khoản, QR VietQR, modal QR lớn, nút Copy số tài khoản (toast) |
| RSVP | Reactive form: tên, SĐT, tham dự/không, số khách, chọn sự kiện, lời nhắn, trạng thái thành công |
| Wishes | Sổ lưu bút: gửi lời chúc + danh sách (mock lưu localStorage) |
| Footer | Thank you, hashtag |
| Khác | Nav nổi (active section, menu mobile full-screen), nút nhạc nền play/pause, toast, preloader, `@defer` cho section nặng |

## Cấu trúc thư mục

```
src/app
├── core
│   ├── models/            # Interface dùng chung (WeddingConfig, Photo, Wish, RsvpPayload, …)
│   ├── data/              # MOCK DATA — sửa nội dung ở đây
│   │   ├── wedding.config.ts   # tên, ngày, ảnh cover/hero, copy từng section, nhạc, dress code…
│   │   ├── story.data.ts       # Our Story
│   │   ├── photos.data.ts      # Gallery (thêm/bớt ảnh tại PHOTO_SEEDS)
│   │   ├── events.data.ts      # Ceremony/Reception, timeline ngày cưới, venue
│   │   ├── bank-accounts.data.ts
│   │   └── wishes.data.ts
│   └── services/
│       ├── wedding-data.provider.ts       # Abstract contract (UI chỉ phụ thuộc vào đây)
│       ├── mock-wedding-data.provider.ts  # Implementation hiện tại (mock + localStorage)
│       ├── http-wedding-data.provider.ts  # Implementation REST sẵn sàng dùng khi có backend
│       ├── wedding.store.ts               # Signal store cho nội dung tĩnh
│       ├── music.service.ts, toast.service.ts, scroll-lock.service.ts, storage.service.ts
├── shared
│   ├── directives/        # appReveal (scroll reveal), appParallax
│   ├── components/        # section-heading, ornament, icon, modal, toast, smart-image (app-img)
│   └── pipes/             # safeUrl, timeAgo
├── features/              # Mỗi section là một standalone component (presentational, nhận dữ liệu qua input)
├── pages/main/            # Ghép các section, nối store → inputs
└── app.component.*        # Preloader → Cover → Main
```

## Thay nội dung & ảnh

1. **Tên, ngày, lời mời, copy các section** → `src/app/core/data/wedding.config.ts`.
2. **Ảnh**: đặt file vào `public/images/…` rồi trỏ đường dẫn (ví dụ `'images/hero.jpg'`) trong các file data.
   Ảnh demo hiện lấy từ Unsplash qua helper `unsplash()` trong `core/data/images.ts`.
3. **Gallery**: thêm dòng vào `PHOTO_SEEDS` (hoặc thay toàn bộ mảng `PHOTOS`). Layout tự thích ứng 10 → 100+ ảnh.
4. **QR chuyển khoản**: `bank-accounts.data.ts` — hiện dùng VietQR image API, có thể thay bằng ảnh QR tự upload.
5. **Nhạc nền**: thay `public/audio/wedding-theme.wav` (file demo được sinh tự động) bằng file của bạn và cập nhật `music.src` trong config.
6. **Màu sắc / font**: `tailwind.config.js` (ivory, cream, champagne, gold, mocha…) và Google Fonts trong `src/index.html`.

## Tích hợp Backend sau này

UI chỉ phụ thuộc vào abstract class `WeddingDataProvider`:

```ts
getConfig()  getStory()  getPhotoCategories()  getPhotos(query)  getEvents()
getDayTimeline()  getVenue()  getBankAccounts()  getWishes()  addWish(payload)  submitRsvp(payload)
```

Khi có API:

1. Sửa `src/environments/environment.ts`: `useMockData: false`, `apiUrl: 'https://your-api/api'`.
2. `app.config.ts` sẽ tự đăng ký `HttpWeddingDataProvider` (đã viết sẵn, map vào các endpoint REST `GET /config`, `GET /photos?category=&page=&pageSize=`, `POST /wishes`, `POST /rsvp`, …).
3. Trả về đúng shape trong `core/models` — không cần đụng vào component nào.

Nếu backend có contract khác, chỉ cần viết một class mới `extends WeddingDataProvider` và đổi `useClass` trong `app.config.ts`.

## Ghi chú kỹ thuật

- Animation scroll dùng `IntersectionObserver` + CSS transition (`.reveal`), parallax chạy ngoài Angular zone và tự tắt trên mobile / `prefers-reduced-motion`.
- Các section nặng (gallery, venue, gifts, rsvp, wishes) được `@defer (on viewport; prefetch on idle)`.
- Nhạc nền chỉ bắt đầu sau khi khách bấm "Mở thiệp cưới" (tuân thủ autoplay policy); nút nhạc nổi cho phép bật/tắt.
- Build production ~116 kB (gzip) cho initial bundle, không cảnh báo budget.
