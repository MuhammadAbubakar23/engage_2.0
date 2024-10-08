import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ToggleService {
  private siblingMsg3 = new Subject<string>();
  private dispositionForm = new Subject<string>();
  constructor() { }
  public addTogglePanel(message3: string): void {
    this.siblingMsg3.next(message3);
  }
  public getTogglePanel(): Observable<string> {
    return this.siblingMsg3.asObservable();
  }
  public updateDispositionForm(msg: string): void {
    this.dispositionForm.next(msg);
  }
  public getDispositionForm(): Observable<string> {
    return this.dispositionForm.asObservable();
  }
}
