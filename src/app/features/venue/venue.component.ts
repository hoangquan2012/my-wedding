import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SectionCopy, Venue, WeddingEvent } from '../../core/models';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { SmartImageComponent } from '../../shared/components/smart-image/smart-image.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { SafeUrlPipe } from '../../shared/pipes/safe-url.pipe';
import { SECTION_IDS } from '../../shared/section-ids';

@Component({
  selector: 'app-venue',
  standalone: true,
  imports: [SectionHeadingComponent, SmartImageComponent, RevealDirective, IconComponent, SafeUrlPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './venue.component.html',
})
export class VenueComponent {
  readonly copy = input.required<SectionCopy>();
  readonly venue = input.required<Venue>();
  readonly events = input<WeddingEvent[]>([]);

  protected readonly ids = SECTION_IDS;
}
