import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'any'
})
export class CacheStorageService {
    private cache: Record<string, HttpResponse<any> | undefined> = {};

    constructor() {}
    
    set(url: string, response: HttpResponse<any>): void {
            this.cache[url] = response;
    }
    get(url: string): HttpResponse<any> | undefined {
        return this.cache[url];
    }
    remove(url: string): void {
    delete this.cache[url];
    }
    clean(): void {
        this.cache= {};
    }
    store(url: string, response: HttpResponse<any>): void {
        this.cache[url] = response;
    }

    retrieve(url: string): HttpResponse<any> | undefined {
        return this.cache[url];
    }

    invalidateUrl(url: string): void {
        delete this.cache[url];
    }
    invalidateCache(): void {
        this.cache= {};
    }
}
