import { Inject, Injectable } from '@angular/core';
import { BROWSER_SESSION_STORAGE } from './storage-type';

@Injectable({
  providedIn: 'any'
})
export class SessionStorageService {

  constructor(@Inject(BROWSER_SESSION_STORAGE) public storage: Storage) {}

  set(key: string, value: string) {
    this.storage.setItem(key, value);
  }
  get(key: string) : string | null {
      return this.storage.getItem(key);
  }
  remove(key: string) {
    this.storage.removeItem(key);
  }
  clean(){
    this.storage.clear();
  }
}
