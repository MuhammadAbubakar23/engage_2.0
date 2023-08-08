import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { CacheStorageService } from "../services/storage/cache.storage.service";

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
    constructor(private cacheService: CacheStorageService) {}
 
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       if (req.method !== 'GET') {
          this.cacheService.invalidateCache();
          return next.handle(req);
       }
 
       const cached = this.cacheService.retrieve(req.url);
       if (cached) {
          console.log('[CacheInterceptor] - Returning cached response.');
          return of(cached);
       }
 
       console.log('[CacheInterceptor] - Request not found in cache.');
       console.log('[CacheInterceptor] - Executing request...');
       return next.handle(req).pipe(
          tap(event => {
             if (event instanceof HttpResponse) {
                this.cacheService.store(req.url, event);
                console.log('[CacheInterceptor] - Response stored in cache.');
             }
          })
       );
    }
 }

export const CacheInterceptorProvider = { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true }