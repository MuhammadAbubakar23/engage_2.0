import { Injectable } from '@angular/core';
import { Observable,Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataExchangeServicesService {
private userData=new Subject<any>()
  constructor() { }
public  sendData(newValue:any):void{
    return this.userData.next(newValue)
  }
  public receivedData():Observable<any>{
   return this.userData.asObservable()
  }
}
