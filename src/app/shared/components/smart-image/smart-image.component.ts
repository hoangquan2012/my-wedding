import { ChangeDetectionStrategy, Component, effect, input, signal, untracked } from '@angular/core';

/**
 * Image with a shimmering placeholder and a soft fade-in once loaded.
 * Size the host element (aspect ratio / height) from the parent; the image fills it.
 *
 *   <app-img [src]="photo.src" [alt]="photo.alt" class="aspect-[4/5]" />
 */
@Component({
  selector: 'app-img',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'relative block overflow-hidden bg-sand' },
  template: `
    @if (!loaded() && !failed()) {
      <div class="img-skeleton absolute inset-0" aria-hidden="true"></div>
    }
    <img
      [src]="src()"
      [alt]="alt()"
      [attr.loading]="eager() ? 'eager' : 'lazy'"
      [attr.fetchpriority]="eager() ? 'high' : null"
      decoding="async"
      draggable="false"
      class="h-full w-full transition-[opacity,transform] duration-700 ease-luxe"
      [class.object-cover]="fit() === 'cover'"
      [class.object-contain]="fit() === 'contain'"
      [class.opacity-0]="!loaded()"
      [class.opacity-100]="loaded()"
      [style.object-position]="position()"
      (load)="loaded.set(true)"
      (error)="failed.set(true)"
    />
  `,
})
export class SmartImageComponent {
  readonly src = input.required<string>();
  readonly alt = input('');
  readonly fit = input<'cover' | 'contain'>('cover');
  readonly position = input('center');
  readonly eager = input(false);

  protected readonly loaded = signal(false);
  protected readonly failed = signal(false);

  constructor() {
    // Reset the placeholder whenever the source changes (e.g. filtered lists reusing instances).
    effect(
      () => {
        this.src();
        untracked(() => {
          this.loaded.set(false);
          this.failed.set(false);
        });
      },
      { allowSignalWrites: true },
    );
  }
}
