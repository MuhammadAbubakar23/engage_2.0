import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApplySentimentService {
  private appliedSentiment = new Subject<any>();
  constructor() { }
  public sendSentiment(sentiment:any) : void{
    this.appliedSentiment.next(sentiment);
  }
  public receiveSentiment(): Observable<any>{
    return this.appliedSentiment.asObservable();
  }
}
