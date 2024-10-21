import { Injectable } from '@angular/core';
import {HttpResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CachingServiceService {
  private cache = new Map<string, any>();
  constructor() { }
  setCache(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getCache(key: string): any {
    const cacheEntry = localStorage.getItem(key);
    if (cacheEntry)
      return JSON.parse(cacheEntry).data.body;
    return null;
  }
  deleteCache(key: string) {
    this.cache.delete(key);
  }
}
