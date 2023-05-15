import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaximizeChatService {

  private maximizeChat = new Subject<string>();
  
  constructor() { }

   /*
   * @return {Observable<string>} : siblingMsg
   */
   public getMessage(): Observable<string> {
    
    return this.maximizeChat.asObservable();
  }
  /*
   * @param {string} message : siblingMsg
   */
  public updateMessage(msg: string): void {
   
    this.maximizeChat.next(msg);
  }

  id:any;
  platform:any;
  
  setId(userId:any){
       
    this.id = userId;
  }
  getId(){
      
    return this.id;
  }

  setPlatform(platform:any){
       
    this.platform = platform;
  }
  getPlatform(){
      
    return this.platform;
  }
}
