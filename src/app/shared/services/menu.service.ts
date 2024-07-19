import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor() { }
  private analyticsMenu = new BehaviorSubject<[]>([]);
  getAnalyticsMenu = this.analyticsMenu.asObservable();
  changeAnalyticsMenu(data: []) {
    this.analyticsMenu.next(data);
  }

  private botMenu = new BehaviorSubject<[]>([]);
  getBotMenu = this.botMenu.asObservable();
  changeBotMenu(data: []) {
    this.botMenu.next(data);
  }
}
