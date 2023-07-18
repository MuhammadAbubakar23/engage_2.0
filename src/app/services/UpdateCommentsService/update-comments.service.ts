import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateCommentsService {

  private updateComment = new Subject<any>();
  
  constructor() { }

  public sendComment(cmnt:any) : void{
    
    this.updateComment.next(cmnt);
    
  }
  public receiveComment(): Observable<any>{
    
    return this.updateComment.asObservable();

  }
}
