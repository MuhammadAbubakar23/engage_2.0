import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ClosePanelService {
  private righttoggleValue = new Subject<any>();
  private lefttoggleValue = new Subject<any>();
  constructor() { }
  public sendRightBarToggleValue(newValue:any) : void{
    this.righttoggleValue.next(newValue);
  }
  public receiveRightBarToggleValue(): Observable<any>{
    return this.righttoggleValue.asObservable();
  }
  public sendLeftBarToggleValue(newValue:any) : void{
    this.lefttoggleValue.next(newValue);
  }
  public receiveLeftBarToggleValue(): Observable<any>{
    return this.lefttoggleValue.asObservable();

  }
}
