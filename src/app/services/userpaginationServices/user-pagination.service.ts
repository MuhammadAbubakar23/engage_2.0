import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserPaginationService {
 private paginationObj =new Subject<any>()
  constructor() { }
    public sendpaginationobj(value:any):void{
    this.paginationObj.next(value)
  }
   public receivedpaginationObj():Observable<any>{
    return this.paginationObj.asObservable();
   }
}
