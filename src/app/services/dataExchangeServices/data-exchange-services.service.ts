import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class DataExchangeServicesService {
  private userData = new Subject<any>();
  private wordCloudDatetime = new Subject<any>();
  private adminpenalEndPoint = new Subject<any>();

  constructor() {}
  public sendData(newValue: any): void {
    return this.userData.next(newValue);
  }
  public receivedData(): Observable<any> {
    return this.userData.asObservable();
  }
  public sendWordCloudDateTime(dateValue: any): void {
    return this.wordCloudDatetime.next(dateValue);
  }
  public receivedWordCloudDateTime() {
    return this.wordCloudDatetime.asObservable();
  }

  public sendAdminPenalEndPoint(adminPenalEndPoint: any): void {
    debugger;
    return this.adminpenalEndPoint.next(adminPenalEndPoint);
  }
  public receivedAdminPenalEndPoint() {
    debugger;
    return this.adminpenalEndPoint.asObservable();
  }
}
