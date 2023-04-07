import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RightNavService {

  private siblingMsg1 = new Subject<string>();
  
  constructor() { }

  public getChildComponent(): Observable<string> {
    return this.siblingMsg1.asObservable();
  }
  /*
   * @param {string} message : siblingMsg
   */
  public updateChildComponent(message1: string): void {
    
    this.siblingMsg1.next(message1);
  }
}
