import { Injectable, signal } from '@angular/core';

/**
 * Background music controller.
 *
 * Browsers only allow audio to start inside a user gesture, so `play()` is
 * called from the "open invitation" click and from the floating music button.
 */
@Injectable({ providedIn: 'root' })
export class MusicService {
  private audio: HTMLAudioElement | null = null;

  readonly playing = signal(false);
  readonly available = signal(false);
  readonly title = signal('');

  init(src: string, volume = 0.5, title = ''): void {
    if (this.audio || typeof Audio === 'undefined' || !src) {
      return;
    }

    const audio = new Audio();
    audio.src = src;
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = Math.min(Math.max(volume, 0), 1);

    audio.addEventListener('play', () => this.playing.set(true));
    audio.addEventListener('pause', () => this.playing.set(false));
    audio.addEventListener('canplaythrough', () => this.available.set(true), { once: true });
    audio.addEventListener('error', () => {
      console.warn('[MusicService] could not load audio from', src);
      this.available.set(false);
    });

    this.audio = audio;
    this.title.set(title);
    this.available.set(true);
  }

  async play(): Promise<boolean> {
    if (!this.audio) {
      return false;
    }
    try {
      await this.audio.play();
      return true;
    } catch {
      // Autoplay blocked or file missing — the floating button lets the user retry.
      this.playing.set(false);
      return false;
    }
  }

  pause(): void {
    this.audio?.pause();
  }

  toggle(): void {
    if (this.playing()) {
      this.pause();
    } else {
      void this.play();
    }
  }
}
