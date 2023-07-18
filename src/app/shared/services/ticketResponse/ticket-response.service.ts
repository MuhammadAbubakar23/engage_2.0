import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketResponseService {

  private ticketResponse = new Subject<any>();

  constructor() { }

  public getTicketId(): Observable<any> {
    return this.ticketResponse.asObservable();
  }
  /*
   * @param {string} message : siblingMsg
   */
  public sendTicketId(ticketid: any): void {

    this.ticketResponse.next(ticketid);
  }
}
