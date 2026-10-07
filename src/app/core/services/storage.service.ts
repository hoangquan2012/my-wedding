import { Injectable } from '@angular/core';

/**
 * Tiny, safe wrapper around localStorage (never throws, works without a browser).
 */
@Injectable({ providedIn: 'root' })
export class StorageService {
  private readonly prefix = 'marry:';

  get<T>(key: string, fallback: T): T {
    try {
      const raw = globalThis.localStorage?.getItem(this.prefix + key);
      return raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
      return fallback;
    }
  }

  set<T>(key: string, value: T): void {
    try {
      globalThis.localStorage?.setItem(this.prefix + key, JSON.stringify(value));
    } catch {
      /* quota exceeded / private mode — ignore */
    }
  }

  remove(key: string): void {
    try {
      globalThis.localStorage?.removeItem(this.prefix + key);
    } catch {
      /* ignore */
    }
  }
}
