import { Routes } from '@angular/router';

/**
 * The site is a single page; the router is kept so query params (`?to=Tên khách`)
 * work and future pages (e.g. a photo album or admin view) can be added easily.
 */
export const routes: Routes = [
  { path: '', pathMatch: 'full', children: [] },
  { path: '**', redirectTo: '' },
];
