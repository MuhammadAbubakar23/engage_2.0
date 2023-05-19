import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialCallService {

  // private number = new Subject<string>();
  number:any=''

  constructor() { }

  //  /*
  //  * @return {Observable<string>} : siblingMsg
  //  */
  //  public getNumber(): Observable<string> {
  //   return this.number.asObservable();
  // }
  // /*
  //  * @param {string} message : siblingMsg
  //  */
  // public updateNumber(num: string): void {
  //   this.number.next(num);
  // }

  public getNumber() {
      return this.number;
    }
    /*
     * @param {string} message : siblingMsg
     */
    public updateNumber(num: string) {
      
      this.number = num;
    }
}
