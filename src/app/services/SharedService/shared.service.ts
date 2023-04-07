import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

 

  private siblingMsg2 = new Subject<string>();

  private userInfo = new Subject<any>();
  private totalCount = new Subject<number>();
  private totalSlaCount = new Subject<number>();
  private wacount = new Subject<number>();
  private smscount = new Subject<number>();
  private fbcount = new Subject<number>();
  private emailcount = new Subject<number>();

  draft:any;
  
  constructor() { }

  public getInfo(info:any){
    this.draft = info
  }

  public updateInfo(){
    return this.draft;
  }
   /*
   * @return {Observable<string>} : siblingMsg
   */
   public getMessage(): Observable<string> {
    return this.siblingMsg2.asObservable();
  }
  /*
   * @param {string} message : siblingMsg
   */
  public updateMessage(message2: string): void {
    
    this.siblingMsg2.next(message2);
  }


  public unRespondedCount(count: number): void{
    this.totalCount.next(count);
  }
  public sendUserInfo(userInfo: any): void{
    this.userInfo.next(userInfo);
  }
  public slaUnRespondedCount(count: number): void{
    this.totalSlaCount.next(count);
  }
  public waUnRespondedCount(count: number): void{
    this.wacount.next(count);
  }
  public smsUnRespondedCount(count: number): void{
    this.smscount.next(count);
  }
  public fbUnRespondedCount(count: number): void{
    this.fbcount.next(count);
  }
  public emailUnRespondedCount(count: number): void{
    this.emailcount.next(count);
  }

  public getCount(): Observable<number>{
    return this.totalCount.asObservable();
  }
  public getuserInfo(): Observable<any>{
    return this.userInfo.asObservable();
  }
  public getSlaCount(): Observable<number>{
    return this.totalSlaCount.asObservable();
  }
  public getWaCount(): Observable<number>{
    return this.wacount.asObservable();
  }
  public getSmsCount(): Observable<number>{
    return this.smscount.asObservable();
  }
  public getFbCount(): Observable<number>{
    return this.fbcount.asObservable();
  }
  public getEmailCount(): Observable<number>{
    return this.emailcount.asObservable();
  }
}
