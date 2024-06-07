import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MinimizeChatService {
  private minimizeChat = new Subject<string>();
  constructor() { }
   /*
   * @return {Observable<string>} : siblingMsg
   */
   public getMessage(): Observable<string> {
    return this.minimizeChat.asObservable();
  }
  /*
   * @param {string} message : siblingMsg
   */
  public updateMessage(msg: string): void {
    this.minimizeChat.next(msg);
  }
}
