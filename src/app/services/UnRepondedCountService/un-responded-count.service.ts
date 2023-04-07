import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnRespondedCountService {
  
  private unRespondedCount = new Subject<any>();
  
  constructor() { }

  public sendUnRespondedCount(tag:any) : void{
    
    this.unRespondedCount.next(tag);
    
  }
  public getUnRespondedCount(): Observable<any>{
    
    return this.unRespondedCount.asObservable();

  }
}
