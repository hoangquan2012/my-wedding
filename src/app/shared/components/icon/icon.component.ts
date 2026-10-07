import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type IconName =
  | 'rings'
  | 'glasses'
  | 'church'
  | 'party'
  | 'makeup'
  | 'guests'
  | 'camera'
  | 'dinner'
  | 'music'
  | 'map-pin'
  | 'clock'
  | 'calendar'
  | 'phone'
  | 'copy'
  | 'check'
  | 'close'
  | 'chevron-left'
  | 'chevron-right'
  | 'chevron-down'
  | 'zoom-in'
  | 'zoom-out'
  | 'play'
  | 'pause'
  | 'heart'
  | 'quote'
  | 'menu'
  | 'external'
  | 'qr'
  | 'send'
  | 'directions';

/**
 * Inline SVG icon set (thin, 1.5px strokes) so icons inherit text colour and need no extra requests.
 */
@Component({
  selector: 'app-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'inline-flex shrink-0 leading-none', '[style.width.px]': 'size()', '[style.height.px]': 'size()' },
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      [attr.stroke-width]="strokeWidth()"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      class="w-full h-full"
    >
      @switch (name()) {
        @case ('rings') {
          <circle cx="9" cy="13" r="6" />
          <circle cx="15" cy="13" r="6" />
          <path d="M12 3.5 10.5 6h3L12 3.5Z" />
        }
        @case ('glasses') {
          <path d="M8 3h4l-1 7a2.5 2.5 0 0 1-1 2v7h2.5M8 3l1 7a2.5 2.5 0 0 0 1 2v7H7.5" />
          <path d="M14.5 5.5 19 4l-.4 6.2a2.4 2.4 0 0 1-2 2.3l-.6 6.5 2.4.5M14.5 5.5l.7 6.2a2.4 2.4 0 0 0 1.6 1.9" />
        }
        @case ('church') {
          <path d="M12 2v4M10 4h4M4 21V12l8-5 8 5v9M4 21h16M10 21v-5a2 2 0 1 1 4 0v5" />
        }
        @case ('party') {
          <path d="M5 21 9 9l6 6-12 6ZM14 4l1 1M20 10l1 1M18 3l-1 2M21 6l-2 1M12 2l.5 2" />
        }
        @case ('makeup') {
          <path d="M8 21h8M12 21v-4M9 3h6v5a3 3 0 0 1-6 0V3ZM12 11a4 4 0 0 0-4 4v2h8v-2a4 4 0 0 0-4-4Z" />
        }
        @case ('guests') {
          <circle cx="9" cy="8" r="3" />
          <circle cx="17" cy="9" r="2.5" />
          <path d="M3 20a6 6 0 0 1 12 0M15 20a5 5 0 0 1 6-4.9" />
        }
        @case ('camera') {
          <path d="M4 8h3l2-3h6l2 3h3v11H4V8Z" />
          <circle cx="12" cy="13" r="3.5" />
        }
        @case ('dinner') {
          <path d="M5 3v8a2 2 0 0 0 2 2v8M9 3v8a2 2 0 0 1-2 2M7 3v8M18 3c-2 0-3 3-3 7h3v11" />
        }
        @case ('music') {
          <path d="M9 18V6l10-2v12" />
          <circle cx="6.5" cy="18" r="2.5" />
          <circle cx="16.5" cy="16" r="2.5" />
        }
        @case ('map-pin') {
          <path d="M12 22s7-6.3 7-12a7 7 0 1 0-14 0c0 5.7 7 12 7 12Z" />
          <circle cx="12" cy="10" r="2.5" />
        }
        @case ('clock') {
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        }
        @case ('calendar') {
          <rect x="3" y="5" width="18" height="16" rx="1" />
          <path d="M3 10h18M8 3v4M16 3v4" />
        }
        @case ('phone') {
          <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
        }
        @case ('copy') {
          <rect x="9" y="9" width="11" height="11" rx="1" />
          <path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" />
        }
        @case ('check') {
          <path d="m5 12 5 5L20 7" />
        }
        @case ('close') {
          <path d="M6 6l12 12M18 6 6 18" />
        }
        @case ('chevron-left') {
          <path d="m15 5-7 7 7 7" />
        }
        @case ('chevron-right') {
          <path d="m9 5 7 7-7 7" />
        }
        @case ('chevron-down') {
          <path d="m5 9 7 7 7-7" />
        }
        @case ('zoom-in') {
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5M11 8v6M8 11h6" />
        }
        @case ('zoom-out') {
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5M8 11h6" />
        }
        @case ('play') {
          <path d="M7 4v16l13-8L7 4Z" />
        }
        @case ('pause') {
          <path d="M7 4h4v16H7zM13 4h4v16h-4z" />
        }
        @case ('heart') {
          <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z" />
        }
        @case ('quote') {
          <path d="M7 16c-1.7 0-3-1.3-3-3V8h5v5c0 1.7-1.3 3-3 3h1ZM16 16c-1.7 0-3-1.3-3-3V8h5v5c0 1.7-1.3 3-3 3h1Z" />
        }
        @case ('menu') {
          <path d="M4 7h16M4 12h16M4 17h16" />
        }
        @case ('external') {
          <path d="M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
        }
        @case ('qr') {
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <path d="M14 14h3v3h-3zM20 14h1v1h-1M14 20h1v1h-1M18 18h3v3h-3" />
        }
        @case ('send') {
          <path d="m3 11 18-8-8 18-2-8-8-2Z" />
        }
        @case ('directions') {
          <path d="M12 2 2 12l10 10 10-10L12 2Z" />
          <path d="M9 14v-2a2 2 0 0 1 2-2h4m0 0-2-2m2 2-2 2" />
        }
      }
    </svg>
  `,
})
export class IconComponent {
  readonly name = input.required<IconName>();
  readonly size = input(20);
  readonly strokeWidth = input(1.4);
}
