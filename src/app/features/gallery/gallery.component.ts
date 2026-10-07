import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, OnInit, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EMPTY, Subject, catchError, switchMap, tap } from 'rxjs';
import { Photo, PhotoCategory, PhotoCategoryInfo, PhotoQuery, SectionCopy } from '../../core/models';
import { WeddingDataProvider } from '../../core/services/wedding-data.provider';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { SmartImageComponent } from '../../shared/components/smart-image/smart-image.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { SECTION_IDS } from '../../shared/section-ids';
import { LightboxComponent } from './lightbox/lightbox.component';

type CategoryFilter = PhotoCategory | 'all';

/**
 * Editorial photo grid with category filters, incremental loading and a lightbox.
 *
 * This component talks to `WeddingDataProvider.getPhotos()` using the same
 * paginated contract a REST API would expose, so it scales from 10 to 100+ photos.
 */
@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [SectionHeadingComponent, SmartImageComponent, RevealDirective, LightboxComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fade', [
      transition(':enter', [style({ opacity: 0 }), animate('320ms ease-out', style({ opacity: 1 }))]),
      transition(':leave', [animate('260ms ease-in', style({ opacity: 0 }))]),
    ]),
  ],
  templateUrl: './gallery.component.html',
})
export class GalleryComponent implements OnInit {
  private readonly data = inject(WeddingDataProvider);

  readonly copy = input.required<SectionCopy>();
  readonly categories = input.required<PhotoCategoryInfo[]>();
  readonly pageSize = input(12);

  protected readonly ids = SECTION_IDS;

  protected readonly category = signal<CategoryFilter>('all');
  protected readonly photos = signal<Photo[]>([]);
  protected readonly total = signal(0);
  protected readonly hasMore = signal(false);
  protected readonly loading = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly lightboxIndex = signal<number | null>(null);

  protected readonly skeletons = Array.from({ length: 4 }, (_, i) => i);

  private page = 0;
  private readonly query$ = new Subject<PhotoQuery & { reset: boolean }>();

  constructor() {
    this.query$
      .pipe(
        tap(() => {
          this.loading.set(true);
          this.error.set(null);
        }),
        switchMap((query) =>
          this.data.getPhotos(query).pipe(
            tap((result) => {
              this.photos.update((list) => (query.reset ? result.items : [...list, ...result.items]));
              this.page = result.page;
              this.total.set(result.total);
              this.hasMore.set(result.hasMore);
              this.loading.set(false);
            }),
            // Swallow errors per request so a failed page doesn't kill the stream.
            catchError(() => {
              this.error.set('Không thể tải ảnh. Vui lòng thử lại.');
              this.loading.set(false);
              return EMPTY;
            }),
          ),
        ),
        takeUntilDestroyed(),
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.request(true);
  }

  selectCategory(id: CategoryFilter): void {
    if (id === this.category()) {
      return;
    }
    this.category.set(id);
    this.photos.set([]);
    this.request(true);
  }

  loadMore(): void {
    if (!this.loading() && this.hasMore()) {
      this.request(false);
    }
  }

  retry(): void {
    this.request(this.photos().length === 0);
  }

  openLightbox(index: number): void {
    this.lightboxIndex.set(index);
  }

  closeLightbox(): void {
    this.lightboxIndex.set(null);
  }

  /** Editorial layout pattern that repeats every 8 photos. */
  protected spanClass(index: number): string {
    switch (index % 8) {
      case 0:
        return 'col-span-2 row-span-2';
      case 3:
        return 'row-span-2';
      case 5:
        return 'col-span-2';
      default:
        return '';
    }
  }

  private request(reset: boolean): void {
    if (reset) {
      this.page = 0;
    }
    this.query$.next({
      category: this.category(),
      page: this.page + 1,
      pageSize: this.pageSize(),
      reset,
    });
  }
}
