import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RemoveAssignedQuerryService {
  private removeAssignedQuerry = new Subject<any>();
  constructor() { }
  public sendAssignedQuerry(query:any) : void{
    this.removeAssignedQuerry.next(query);
  }
  public receiveAssignedQuerry(): Observable<any>{
    return this.removeAssignedQuerry.asObservable();
  }
}
