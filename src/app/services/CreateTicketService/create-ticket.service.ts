import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreateTicketService {

  commentId:any;
  constructor() { }

  setCommentId(cmntId:any){
    
    this.commentId = cmntId;
  }
  getCommentId(){
      
    return this.commentId;
  }
}
