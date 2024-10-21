import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CachingServiceService {
  private cache = new Map<string, any>();
  constructor() { }
  setCache(key: string, data: any) {
    this.cache.set(key, data);
  }

  getCache(key: string): any {
    const cacheEntry = this.cache.get(key);
    if (cacheEntry)
      return cacheEntry.data;
    return null;
  }
  deleteCache(key: string) {
    this.cache.delete(key);
  }
}
