import { Injectable } from '@angular/core';
import { Observable ,Subject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CompanyidService {
private companyid =new Subject<any>()
  constructor() { }
  public sendcompanyid(value:any){
    this.companyid.next(value)
  }
  public receivedcompanyid():Observable<any>{
    return this.companyid.asObservable()
  }
}
