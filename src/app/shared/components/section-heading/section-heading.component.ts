import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';
import { OrnamentComponent } from '../ornament/ornament.component';

/**
 * Editorial section heading: eyebrow → ornament → title → optional subtitle.
 */
@Component({
  selector: 'app-section-heading',
  standalone: true,
  imports: [RevealDirective, OrnamentComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header
      class="flex flex-col gap-4"
      [class.items-center]="align() === 'center'"
      [class.text-center]="align() === 'center'"
      [class.items-start]="align() === 'left'"
    >
      <p class="eyebrow" [class.text-gold-light]="tone() === 'light'" appReveal="fade">{{ eyebrow() }}</p>
      <app-ornament [tone]="tone()" appReveal="fade" [revealDelay]="100" />
      <h2
        class="heading-display text-[2rem] sm:text-4xl md:text-5xl lg:text-[3.4rem] max-w-3xl text-balance"
        [class.text-ivory]="tone() === 'light'"
        appReveal
        [revealDelay]="150"
      >
        {{ title() }}
      </h2>
      @if (subtitle()) {
        <p
          class="font-serif italic text-lg sm:text-xl md:text-2xl max-w-prose text-balance"
          [class.text-mocha]="tone() === 'dark'"
          [class.text-champagne]="tone() === 'light'"
          appReveal
          [revealDelay]="250"
        >
          {{ subtitle() }}
        </p>
      }
    </header>
  `,
})
export class SectionHeadingComponent {
  readonly eyebrow = input.required<string>();
  readonly title = input.required<string>();
  readonly subtitle = input<string | undefined>();
  readonly align = input<'center' | 'left'>('center');
  readonly tone = input<'dark' | 'light'>('dark');
}
