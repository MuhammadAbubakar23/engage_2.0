import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JoinGroupService {

  private groupName = new Subject<any>();
  
  constructor() { }

  public sendSkillAndCompanyId(groupName:any) : void{
    
    this.groupName.next(groupName);
    
  }
  public receiveSkillAndCompanyId(): Observable<any>{
    
    return this.groupName.asObservable();

  }
}
