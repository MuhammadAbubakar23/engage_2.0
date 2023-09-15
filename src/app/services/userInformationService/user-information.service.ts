import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserInformationService {
  
  private userInfo: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  userInfo$: Observable<any> = this.userInfo.asObservable();

  constructor() {}

  shareUserInformation(userInfo: any) {
    this.userInfo.next(userInfo);
  }
}
