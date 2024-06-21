import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UpdateListService {
  private updateList = new Subject<any>();
  constructor() { }
  public sendList(msg:any) : void{
    this.updateList.next(msg);
  }
  public receiveList(): Observable<any>{
    return this.updateList.asObservable();
  }
}
