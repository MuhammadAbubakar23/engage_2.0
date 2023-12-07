import { Injectable } from '@angular/core';
import { Observable,Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OpensidebarService {
private opensidebar= new Subject<any>()
  constructor() { }
  public sendsidebarvalue(value:any):void{
    debugger
    this.opensidebar.next(value)
  }
  public receivedsidebarvalue(){
    return this.opensidebar.asObservable()
  }
}
