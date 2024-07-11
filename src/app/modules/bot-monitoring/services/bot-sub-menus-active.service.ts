import { Injectable } from '@angular/core';
import { Data } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BotSubMenusActiveService {

  constructor() { }
  private dataSource = new BehaviorSubject<any>('');
  activationStatus = this.dataSource.asObservable();
  setActiveMenu(active:boolean){
    this.dataSource.next(active);
  }

}
