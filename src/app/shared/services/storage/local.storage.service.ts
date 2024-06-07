import { Inject, Injectable, InjectionToken } from '@angular/core';
import { BROWSER_LOCAL_STORAGE } from './storage-type';
@Injectable({
  providedIn: 'any'
})
export class LocalStorageService {
  constructor(@Inject(BROWSER_LOCAL_STORAGE) public storage: Storage) {}
  set(key: string, value: string) {
    this.storage.setItem(key, value);
  }
  get(key: string): string | null {
      return this.storage.getItem(key);
  }
  remove(key: string) {
    this.storage.removeItem(key);
  }
  clean(){
    this.storage.clear();
  }
}
