import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeftsidebarExpandedService {

  private leftsidebar = new Subject<string>();
  
  constructor() { }

   /*
   * @return {Observable<string>} : siblingMsg
   */
   public getMessage(): Observable<string> {
    return this.leftsidebar.asObservable();
  }
  /*
   * @param {string} message : siblingMsg
   */
  public updateMessage(message2: string): void {
   
    this.leftsidebar.next(message2);
  }
}
