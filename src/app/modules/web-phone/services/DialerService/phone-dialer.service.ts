import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { SipPhone } from '../../phone/SipPhone';
@Injectable({
  providedIn: 'root',
})
export class PhoneDialerService {
  SipPhone! : SipPhone;
  constructor(private http: HttpClient) {}
  private eventObject = new Subject<Object>();
  private wsEventObject = new Subject<Object>();
  private phoneLogs = new Subject<any>();
  private isLoaded:boolean = false;

  encodeQuery(data : any){
    let query = ""
    for (let d in data)
         query += encodeURIComponent(d) + '='
                  + encodeURIComponent(data[d]) + '&'
    return query.slice(0, -1)
  }
  eventDispatcher(baseUrl:string, queryParams:any){
    let params = this.encodeQuery(queryParams);
    return this.http.get(baseUrl + '/event/dispatch?' + params)
  }

  getEvent(): Observable<Object>{
    return this.eventObject.asObservable();
  }
  getWsEvent(): Observable<Object>{
    return this.wsEventObject.asObservable();
  }

  getPhoneLogs(): Observable<Object>{
    return this.phoneLogs.asObservable();
  }

  public updateEvent(event:string, data:any): void {
    // console.log({ event: event, ...data})
    this.eventObject.next({ event: event, ...data});

  }

  public updateWsEvent(event:string, data:any){
    // console.log({ event: event, data})
    this.wsEventObject.next({ event: event, data});

  }


  public updatePhoneLogs(text:any){
    // console.log("Update" + text)
    this.phoneLogs.next(text);
  }

  public setSipPhone(sipPhone : SipPhone){
    this.SipPhone = sipPhone;
    console.log(this.SipPhone);
  }

  public getSipPhone(): SipPhone{
    console.log(this.SipPhone);
    return this.SipPhone;
  }

  public setIsLoaded(value:boolean):void{
    this.isLoaded = value;
  }

  public getIsLoaded():boolean{
    return this.isLoaded;
  }
}
