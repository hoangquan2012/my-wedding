import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, timer } from 'rxjs';
import { SectionCopy, WeddingConfig } from '../../core/models';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { OrnamentComponent } from '../../shared/components/ornament/ornament.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { SECTION_IDS } from '../../shared/section-ids';

interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  finished: boolean;
}

const diffToParts = (target: Date, now: number): CountdownParts => {
  const distance = target.getTime() - now;
  if (distance <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, finished: true };
  }
  return {
    days: Math.floor(distance / 86_400_000),
    hours: Math.floor((distance / 3_600_000) % 24),
    minutes: Math.floor((distance / 60_000) % 60),
    seconds: Math.floor((distance / 1000) % 60),
    finished: false,
  };
};

@Component({
  selector: 'app-save-the-date',
  standalone: true,
  imports: [RevealDirective, OrnamentComponent, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './save-the-date.component.html',
})
export class SaveTheDateComponent {
  readonly config = input.required<WeddingConfig>();
  readonly copy = input.required<SectionCopy>();
  readonly location = input<string>('');

  protected readonly ids = SECTION_IDS;

  protected readonly date = computed(() => new Date(this.config().wedding.date));
  protected readonly day = computed(() => this.date().getDate().toString().padStart(2, '0'));
  protected readonly month = computed(() => this.date().toLocaleDateString('en-US', { month: 'long' }));
  protected readonly year = computed(() => this.date().getFullYear());
  protected readonly weekday = computed(() => this.date().toLocaleDateString('en-US', { weekday: 'long' }));
  protected readonly weekdayVi = computed(() => this.date().toLocaleDateString('vi-VN', { weekday: 'long' }));
  protected readonly timeLabel = computed(() =>
    this.date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
  );

  private readonly now = toSignal(timer(0, 1000).pipe(map(() => Date.now())), { initialValue: Date.now() });

  protected readonly countdown = computed(() => diffToParts(this.date(), this.now()));

  protected readonly units = computed(() => {
    const c = this.countdown();
    return [
      { label: 'Days', labelVi: 'Ngày', value: c.days },
      { label: 'Hours', labelVi: 'Giờ', value: c.hours },
      { label: 'Minutes', labelVi: 'Phút', value: c.minutes },
      { label: 'Seconds', labelVi: 'Giây', value: c.seconds },
    ];
  });

  protected readonly calendarUrl = computed(() => {
    const start = this.date();
    const end = new Date(start.getTime() + 5 * 3_600_000);
    const fmt = (d: Date) => d.toISOString().replace(/[-:]|\.\d{3}/g, '');
    const cfg = this.config();
    const text = `Wedding of ${cfg.couple.groom.shortName} & ${cfg.couple.bride.shortName}`;
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text,
      dates: `${fmt(start)}/${fmt(end)}`,
      details: cfg.hero.invitation,
      location: this.location(),
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  });

  protected pad(value: number): string {
    return value.toString().padStart(2, '0');
  }
}
