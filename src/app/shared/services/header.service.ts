import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private headerSubject:BehaviorSubject<any> = new BehaviorSubject(null);
  setHeader(obj: any): void {
    this.headerSubject.next(obj);
  }

  getHeader(): BehaviorSubject<any> {
    return this.headerSubject;
  }
  constructor() { }

}
