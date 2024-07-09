import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private analyticsMenu = new BehaviorSubject<[]>([]);
  getAnalyticsMenu = this.analyticsMenu.asObservable();

  constructor() { }

  changeAnalyticsMenu(data: []) {
    this.analyticsMenu.next(data);
  }
}
