import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from 'src/app/shared/services/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserInformationService {
  
  private userInfo: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  userInfo$: Observable<any> = this.userInfo.asObservable();

  constructor(private stor: StorageService) {}

  shareUserInformation(userInfo: any) {
    this.stor.store('userInfo', userInfo);
    this.userInfo.next(userInfo);
  }
}
