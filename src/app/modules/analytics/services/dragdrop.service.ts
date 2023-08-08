import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DragDropService {
  private itemSource = new BehaviorSubject<string>('');
  public item$ = this.itemSource.asObservable();

  constructor() { }

  setItem(item: string) {
    this.itemSource.next(item);
  }
}
