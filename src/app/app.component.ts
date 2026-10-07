import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, OnInit, effect, inject, signal, untracked } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { MusicService } from './core/services/music.service';
import { WeddingStore } from './core/services/wedding.store';
import { CoverComponent } from './features/cover/cover.component';
import { MusicButtonComponent } from './features/music-button/music-button.component';
import { NavComponent } from './features/nav/nav.component';
import { MainPageComponent } from './pages/main/main-page.component';
import { ToastComponent } from './shared/components/toast/toast.component';

/**
 * Root: preloader → invitation cover → main site.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CoverComponent, NavComponent, MainPageComponent, MusicButtonComponent, ToastComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('cover', [
      transition(':leave', [
        animate(
          '1100ms cubic-bezier(0.4, 0, 0.2, 1)',
          style({ opacity: 0, transform: 'scale(1.08)', filter: 'blur(8px)' }),
        ),
      ]),
    ]),
    trigger('main', [
      transition(':enter', [style({ opacity: 0 }), animate('1200ms 150ms ease-out', style({ opacity: 1 }))]),
    ]),
    trigger('loader', [transition(':leave', [animate('500ms ease-in', style({ opacity: 0 }))])]),
  ],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  protected readonly store = inject(WeddingStore);
  private readonly music = inject(MusicService);
  private readonly route = inject(ActivatedRoute);

  protected readonly opened = signal(false);

  /** `?to=Tên khách` personalises the cover. */
  protected readonly guestName = toSignal(
    this.route.queryParamMap.pipe(map((params) => params.get('to')?.trim() || null)),
    { initialValue: null },
  );

  constructor() {
    // Prepare audio + warm the hero image as soon as the configuration is available.
    effect(() => {
      const config = this.store.config();
      if (!config) {
        return;
      }
      untracked(() => {
        this.music.init(config.music.src, config.music.volume, config.music.title);
        if (typeof Image !== 'undefined') {
          new Image().src = config.hero.backgroundImage;
        }
      });
    });
  }

  ngOnInit(): void {
    this.store.load();
  }

  /** Called from the cover's button — inside a user gesture, so audio may start. */
  openInvitation(): void {
    const config = this.store.config();
    if (config?.music.autoplayOnOpen) {
      void this.music.play();
    }
    this.opened.set(true);
  }

  retry(): void {
    this.store.load();
  }
}
