import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReplyService {

  private reply = new Subject<any>();
  
  constructor() { }

  public sendReply(reply:any) : void{
    
    this.reply.next(reply);
    
  }
  public receiveReply(): Observable<any>{
    
    return this.reply.asObservable();

  }
}
