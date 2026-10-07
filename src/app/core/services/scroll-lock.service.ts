import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';

/**
 * Reference-counted body scroll lock shared by the cover, modals, lightbox and mobile menu.
 */
@Injectable({ providedIn: 'root' })
export class ScrollLockService {
  private readonly document = inject(DOCUMENT);
  private locks = 0;

  lock(): void {
    this.locks++;
    if (this.locks > 1) {
      return;
    }
    const body = this.document.body;
    const scrollbar = (this.document.defaultView?.innerWidth ?? 0) - this.document.documentElement.clientWidth;
    body.style.overflow = 'hidden';
    if (scrollbar > 0) {
      body.style.paddingRight = `${scrollbar}px`;
    }
  }

  unlock(): void {
    this.locks = Math.max(0, this.locks - 1);
    if (this.locks > 0) {
      return;
    }
    const body = this.document.body;
    body.style.overflow = '';
    body.style.paddingRight = '';
  }
}
