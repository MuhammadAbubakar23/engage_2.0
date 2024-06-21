import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HeaderCountService {
  private count: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  count$: Observable<any> = this.count.asObservable();
  constructor() {}
  shareUnresponedCount(count:any) {
    this.count.next(count);
  }
}
