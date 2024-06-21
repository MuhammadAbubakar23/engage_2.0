import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private platform = new Subject<string>();
  constructor() { }
  public addTogglePanel(platform: string): void {
    this.platform.next(platform);
  }
  public getTogglePanel(): Observable<string> {
    return this.platform.asObservable();
  }
}
