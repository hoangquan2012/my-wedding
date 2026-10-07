import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Thin decorative divider: line — diamond — line.
 */
@Component({
  selector: 'app-ornament',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'inline-flex' },
  template: `
    <svg
      [attr.width]="width()"
      height="12"
      [attr.viewBox]="'0 0 ' + width() + ' 12'"
      fill="none"
      aria-hidden="true"
      class="overflow-visible"
      [class.text-gold]="tone() === 'dark'"
      [class.text-gold-light]="tone() === 'light'"
    >
      <line x1="0" y1="6" [attr.x2]="width() / 2 - 14" y2="6" stroke="currentColor" stroke-width="0.8" />
      <rect [attr.x]="width() / 2 - 4" y="2" width="8" height="8" [attr.transform]="'rotate(45 ' + width() / 2 + ' 6)'" stroke="currentColor" stroke-width="0.9" />
      <line [attr.x1]="width() / 2 + 14" y1="6" [attr.x2]="width()" y2="6" stroke="currentColor" stroke-width="0.8" />
    </svg>
  `,
})
export class OrnamentComponent {
  readonly width = input(140);
  readonly tone = input<'dark' | 'light'>('dark');
}
