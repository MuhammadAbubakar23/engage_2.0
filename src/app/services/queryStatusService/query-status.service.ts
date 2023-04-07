import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QueryStatusService {
  private queryStatus = new Subject<any>();
  private bulkQueryStatus = new Subject<any>();

  constructor() {}

  public sendQueryStatus(status: any): void {
    this.queryStatus.next(status);
  }
  public receiveQueryStatus(): Observable<any> {
    return this.queryStatus.asObservable();
  }

  public bulkSendQueryStatus(status: any): void {
    this.bulkQueryStatus.next(status);
  }
  public bulkReceiveQueryStatus(): Observable<any> {
    return this.bulkQueryStatus.asObservable();
  }
}
