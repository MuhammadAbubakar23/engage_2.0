import { Injectable } from '@angular/core';
import { Observable,Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ChatbotIdService {
  // private chatBotId = new Subject<any>();
  chatBotId:any
  constructor() { }
  // public sendChatbotId(newValue:any) : void{
  //   this.chatBotId.next(newValue);
  // }
  // public recieveChatBitId(): Observable<any>{
  //   return this.chatBotId.asObservable();
  // }
  setOption(authorId:any){
       
    this.chatBotId = authorId;
    this.getOption(this.chatBotId);
    
  }
  getOption(value:any){
      
    return value;
  }
}
