import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { environment } from '../environments/environment';
import { HttpWeddingDataProvider } from './core/services/http-wedding-data.provider';
import { MockWeddingDataProvider } from './core/services/mock-wedding-data.provider';
import { WeddingDataProvider } from './core/services/wedding-data.provider';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withInMemoryScrolling({ anchorScrolling: 'disabled', scrollPositionRestoration: 'disabled' })),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),

    /**
     * Data source switch.
     * Mock today → REST tomorrow, without touching a single component.
     */
    {
      provide: WeddingDataProvider,
      useClass: environment.useMockData ? MockWeddingDataProvider : HttpWeddingDataProvider,
    },
  ],
};
