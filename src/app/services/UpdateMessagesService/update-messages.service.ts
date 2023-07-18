import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateMessagesService {

  private updateMessages = new Subject<any>();
  
  constructor() { }

  public sendMessage(msg:any) : void{
    
    this.updateMessages.next(msg);
    
  }
  public receiveMessage(): Observable<any>{
    
    return this.updateMessages.asObservable();

  }
}
