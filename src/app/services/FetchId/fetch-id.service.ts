import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { userIdsDto } from 'src/app/shared/Models/fetchUserIdsDto';
@Injectable({
  providedIn: 'root'
})
export class FetchIdService {
  constructor(
  ) { }
  id:any;
  userId:any;
  slaId:any;
  platform:any;
  private res = new Subject<any>();
  private autoAssignedId = new Subject<any>();
  private _userIdsDto = new userIdsDto;
  setSlaId(userId:any){
    this.slaId = userId;
  }
  getSlaId(){
    return this.slaId;
  }
  setPlatform(platform:any){
    this.platform = platform;
  }
  getPlatform(){
    return this.platform;
  }
  setOption(authorId:any){
    this.id = authorId;
    this.sendAutoAssignedId(authorId);
  }
  getOption(){
    return this.id;
  }
  public sendAutoAssignedId(userId:any) : void{
    this.autoAssignedId.next(userId);
  }
  public getAutoAssignedId(): Observable<any>{
    return this.autoAssignedId.asObservable();
  }
  setIds(authorId:any, userId:any, conversationType:any){
    this._userIdsDto.authorUserId = authorId;
    this._userIdsDto.profileId = userId;
    this._userIdsDto.profilePageId = userId;
    this._userIdsDto.conversationType = conversationType;
  }
  getIds(){
    return this._userIdsDto;
  }
  getResponse(response:any){
    this.res.next(response);
  }
  public updateResponse(): Observable<any> {
    return this.res.asObservable();
  }
}
