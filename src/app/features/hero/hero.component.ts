import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Person, WeddingConfig } from '../../core/models';
import { ParallaxDirective } from '../../shared/directives/parallax.directive';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { SECTION_IDS } from '../../shared/section-ids';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RevealDirective, ParallaxDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.component.html',
})
export class HeroComponent {
  readonly config = input.required<WeddingConfig>();
  readonly couple = input.required<[Person, Person]>();

  protected readonly ids = SECTION_IDS;
}
