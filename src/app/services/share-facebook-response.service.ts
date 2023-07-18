import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareFacebookResponseService {

  private res = new Subject<string>();
  
  constructor() { }

   /*
   * @return {Observable<string>} : siblingMsg
   */
   public getMessage(): Observable<string> {
    
    return this.res.asObservable();
  }
  /*
   * @param {string} message : siblingMsg
   */
  public updateMessage(res: string): void {
   
    this.res.next(res);
  }
}
