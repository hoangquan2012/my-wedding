import { animate, style, transition, trigger } from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  NgZone,
  afterNextRender,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { ScrollLockService } from '../../core/services/scroll-lock.service';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { NAV_LINKS, NavLink, SECTION_IDS, SectionId } from '../../shared/section-ids';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('menu', [
      transition(':enter', [
        style({ opacity: 0, clipPath: 'circle(0% at calc(100% - 2.5rem) 2rem)' }),
        animate('560ms cubic-bezier(0.22, 1, 0.36, 1)', style({ opacity: 1, clipPath: 'circle(150% at calc(100% - 2.5rem) 2rem)' })),
      ]),
      transition(':leave', [animate('320ms ease-in', style({ opacity: 0 }))]),
    ]),
  ],
  templateUrl: './nav.component.html',
})
export class NavComponent {
  private readonly document = inject(DOCUMENT);
  private readonly zone = inject(NgZone);
  private readonly destroyRef = inject(DestroyRef);
  private readonly scrollLock = inject(ScrollLockService);

  readonly monogram = input.required<string>();
  readonly displayDate = input.required<string>();
  readonly links = input<NavLink[]>(NAV_LINKS);

  protected readonly scrolled = signal(false);
  protected readonly menuOpen = signal(false);
  protected readonly activeId = signal<SectionId>(SECTION_IDS.hero);

  /** Transparent over the hero, frosted ivory once the page is scrolled. */
  protected readonly headerClass = computed(() => {
    if (this.menuOpen()) {
      return 'text-ink';
    }
    return this.scrolled()
      ? 'text-ink bg-ivory/90 backdrop-blur-md border-b border-champagne/60 shadow-card'
      : 'text-ivory';
  });

  private ticking = false;

  constructor() {
    afterNextRender(() => this.bindScroll());
    this.destroyRef.onDestroy(() => {
      if (this.menuOpen()) {
        this.scrollLock.unlock();
      }
    });
  }

  toggleMenu(): void {
    const next = !this.menuOpen();
    this.menuOpen.set(next);
    if (next) {
      this.scrollLock.lock();
    } else {
      this.scrollLock.unlock();
    }
  }

  closeMenu(): void {
    if (this.menuOpen()) {
      this.toggleMenu();
    }
  }

  scrollTo(id: string, event?: Event): void {
    event?.preventDefault();
    this.closeMenu();
    const target = this.document.getElementById(id);
    if (!target) {
      return;
    }
    // Wait for the menu overlay to release the scroll lock before scrolling.
    setTimeout(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', `#${id}`);
    }, 30);
  }

  private bindScroll(): void {
    const update = () => {
      this.ticking = false;
      const y = globalThis.scrollY || 0;
      const scrolled = y > 40;
      if (scrolled !== this.scrolled()) {
        this.zone.run(() => this.scrolled.set(scrolled));
      }
      this.updateActive();
    };

    const onScroll = () => {
      if (!this.ticking) {
        this.ticking = true;
        requestAnimationFrame(update);
      }
    };

    this.zone.runOutsideAngular(() => {
      update();
      globalThis.addEventListener('scroll', onScroll, { passive: true });
    });
    this.destroyRef.onDestroy(() => globalThis.removeEventListener('scroll', onScroll));
  }

  private updateActive(): void {
    const probe = globalThis.innerHeight * 0.4;
    let current: SectionId = SECTION_IDS.hero;
    for (const link of this.links()) {
      const el = this.document.getElementById(link.id);
      if (el && el.getBoundingClientRect().top <= probe) {
        current = link.id;
      }
    }
    if (current !== this.activeId()) {
      this.zone.run(() => this.activeId.set(current));
    }
  }
}
