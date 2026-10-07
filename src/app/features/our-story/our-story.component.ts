import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SectionCopy, StoryMilestone } from '../../core/models';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { SmartImageComponent } from '../../shared/components/smart-image/smart-image.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { SECTION_IDS } from '../../shared/section-ids';

/**
 * Editorial love-story timeline: alternating on desktop, single column on mobile.
 */
@Component({
  selector: 'app-our-story',
  standalone: true,
  imports: [SectionHeadingComponent, SmartImageComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './our-story.component.html',
})
export class OurStoryComponent {
  readonly copy = input.required<SectionCopy>();
  readonly milestones = input.required<StoryMilestone[]>();

  protected readonly ids = SECTION_IDS;

  /** Image column: left for even rows, right for odd rows (desktop only). */
  protected imageClass(index: number): string {
    return index % 2 === 0 ? 'md:order-1 md:justify-self-end md:pr-16' : 'md:order-2 md:justify-self-start md:pl-16';
  }

  /** Text column mirrors the image column. */
  protected textClass(index: number): string {
    return index % 2 === 0 ? 'md:order-2 md:pl-16 md:text-left' : 'md:order-1 md:pr-16 md:text-right md:items-end';
  }
}
