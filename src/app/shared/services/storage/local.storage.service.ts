import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'any'
})
export class LocalStorageService {

  constructor() { }
  set(key: string, value: string) {
    localStorage.setItem(key, value);
  }
  get(key: string): string | null {
      return localStorage.getItem(key);
  }
  remove(key: string) {
    localStorage.removeItem(key);
  }
  clean(){
    localStorage.clear();
  }
}
