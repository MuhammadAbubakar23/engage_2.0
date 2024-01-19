import { Injectable } from '@angular/core';
import { Observable, Subject,observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GetNewPostService {
private newPost= new Subject<any>()
  constructor() { }
  public sendnewPost(newpost:any):void{
    
    this.newPost.next(newpost);
  }
  public recivedNewPost():Observable<any>{
    return this.newPost.asObservable();
  }
}
