import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AddTagService {
  private addTags = new Subject<any>();
  constructor() { }
  public sendTags(tag:any) : void{
    this.addTags.next(tag);
  }
  public receiveTags(): Observable<any>{
    return this.addTags.asObservable();
  }
}
