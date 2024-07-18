import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActorsInfoService {
  private actorSubject = new BehaviorSubject<any>(null);
  actor$ = this.actorSubject.asObservable();

  constructor() { }

  public setActor(actor: any) {
    
    this.actorSubject.next(actor);
  }

  public getActor() {
    return this.actorSubject.getValue();
  }
}
