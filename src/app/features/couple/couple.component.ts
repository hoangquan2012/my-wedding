import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Person, SectionCopy } from '../../core/models';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { SmartImageComponent } from '../../shared/components/smart-image/smart-image.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { SECTION_IDS } from '../../shared/section-ids';

@Component({
  selector: 'app-couple',
  standalone: true,
  imports: [SectionHeadingComponent, SmartImageComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './couple.component.html',
})
export class CoupleComponent {
  readonly copy = input.required<SectionCopy>();
  readonly couple = input.required<[Person, Person]>();

  protected readonly ids = SECTION_IDS;

  protected roleLabel(person: Person): string {
    return person.role === 'bride' ? 'The Bride' : 'The Groom';
  }

  protected roleLabelVi(person: Person): string {
    return person.role === 'bride' ? 'Cô dâu' : 'Chú rể';
  }
}
