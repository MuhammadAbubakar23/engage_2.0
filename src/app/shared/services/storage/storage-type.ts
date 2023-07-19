import { InjectionToken } from '@angular/core';

export const BROWSER_LOCAL_STORAGE = new InjectionToken<Storage>('Browser Local Storage', {
  providedIn: 'root',
  factory: () => localStorage
});


export const BROWSER_SESSION_STORAGE = new InjectionToken<Storage>('Browser Session Storage', {
    providedIn: 'root',
    factory: () => sessionStorage
  });