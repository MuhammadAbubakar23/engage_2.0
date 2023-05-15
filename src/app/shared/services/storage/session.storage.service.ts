import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'any'
})
export class SessionStorageService {

  constructor() { }

  set(key: string, value: string) {
    sessionStorage.setItem(key, value);
  }
  get(key: string) : string | null {
      return sessionStorage.getItem(key);
  }
  remove(key: string) {
    sessionStorage.removeItem(key);
  }
  clean(){
    sessionStorage.clear();
  }
}
