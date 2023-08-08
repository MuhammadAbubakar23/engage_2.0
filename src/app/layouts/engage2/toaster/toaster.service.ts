import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, Observable } from 'rxjs';
import { Toaster } from './toaster';
import { ToasterType } from './toaster.type';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  subject: BehaviorSubject<Toaster|null>;// = new BehaviorSubject<Toaster>(null);
  toaster$: Observable<Toaster|null>;

  constructor() {
    this.subject = new BehaviorSubject<Toaster|null>(null);
    this.toaster$ = this.subject.asObservable()
      .pipe(filter(toaster => toaster !== null));
  }

  show(type: ToasterType, title?: string, body?: string, delay?: number) {
    this.subject.next({ type, title, body, delay });
  }
}
