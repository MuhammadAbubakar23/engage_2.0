import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FetchPostTypeService {
 postType:any;
  private postTypeAsObservable = new Subject<any>();
  constructor() { }
  sendPostType(postType:any){
    this.postType = postType;
    this.sendPostTypeAsObservable(postType)
  }
  getPostType(){
    return this.postType;
  }
  public sendPostTypeAsObservable(postType:any) : void{
    this.postTypeAsObservable.next(postType);
  }
  public getPostTypeAsObservable(): Observable<any>{
    return this.postTypeAsObservable.asObservable();
  }
}
