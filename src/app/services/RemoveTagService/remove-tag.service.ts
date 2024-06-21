import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RemoveTagService {
  private removeTags = new Subject<any>();
  constructor() { }
  public sendTags(tag:any) : void{
    this.removeTags.next(tag);
  }
  public receiveTags(): Observable<any>{
    return this.removeTags.asObservable();
  }
}
