import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MusicService } from '../../core/services/music.service';
import { IconComponent } from '../../shared/components/icon/icon.component';

/**
 * Floating play / pause control for the background music.
 */
@Component({
  selector: 'app-music-button',
  standalone: true,
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      class="group fixed bottom-5 right-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full
             border border-gold/60 bg-ivory/90 text-ink shadow-soft backdrop-blur-md transition-transform
             duration-500 ease-luxe hover:scale-105 sm:bottom-7 sm:right-7"
      style="margin-bottom: env(safe-area-inset-bottom)"
      (click)="music.toggle()"
      [attr.aria-pressed]="music.playing()"
      [attr.aria-label]="music.playing() ? 'Tạm dừng nhạc' : 'Phát nhạc'"
      [title]="music.title() || 'Background music'"
    >
      <!-- Spinning vinyl ring -->
      <span
        class="absolute inset-1 rounded-full border border-dashed border-gold/70"
        [class.animate-spin-slow]="music.playing()"
        aria-hidden="true"
      ></span>

      @if (music.playing()) {
        <!-- Equalizer bars -->
        <span class="flex h-4 items-end gap-[3px]" aria-hidden="true">
          <span class="w-[3px] origin-bottom rounded-full bg-gold animate-eq-bar [animation-delay:0ms]" style="height: 100%"></span>
          <span class="w-[3px] origin-bottom rounded-full bg-gold animate-eq-bar [animation-delay:200ms]" style="height: 100%"></span>
          <span class="w-[3px] origin-bottom rounded-full bg-gold animate-eq-bar [animation-delay:400ms]" style="height: 100%"></span>
          <span class="w-[3px] origin-bottom rounded-full bg-gold animate-eq-bar [animation-delay:100ms]" style="height: 100%"></span>
        </span>
      } @else {
        <app-icon name="music" [size]="20" />
      }

      <span
        class="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-ink px-3 py-1.5
               font-sans text-[0.65rem] uppercase tracking-wide2 text-ivory opacity-0 transition-opacity
               group-hover:opacity-100 sm:block"
      >
        {{ music.playing() ? 'Pause' : 'Play music' }}
      </span>
    </button>
  `,
})
export class MusicButtonComponent {
  protected readonly music = inject(MusicService);
}
