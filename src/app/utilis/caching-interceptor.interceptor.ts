import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import {Observable, of, tap} from 'rxjs';
import {CachingServiceService} from "./caching-service.service";

@Injectable()
export class CachingInterceptorInterceptor implements HttpInterceptor {

  constructor(private cacheService: CachingServiceService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<any> {
    const cacheKey = this.createCacheKey(request.urlWithParams, request.body);
    const cachedResponse = this.cacheService.getCache(cacheKey);
    if (cachedResponse) {
      return of(new HttpResponse({status: 200, body: cachedResponse}));
    }

    return next.handle(request).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          this.cacheService.setCache(cacheKey, {data: event});
        }
      })
    );
  }

  // hash method i get it from https://mohanbyte.medium.com/caching-api-requests-in-angular-better-faster-and-stronger-b3aa7c675be4
  private simpleHash(str: string): string {
    let hash = 0;
    if (str.length === 0) return hash.toString();
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash.toString();
  }

  private createCacheKey(url: string, body: any): string {
    const bodyHash = this.simpleHash(JSON.stringify(body)).toString();

    return `${url}_${bodyHash}`;
  }
}
