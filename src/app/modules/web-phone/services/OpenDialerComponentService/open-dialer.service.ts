import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenDialerService {

  private componentName = new Subject<string>();

  constructor() { }

   /*
   * @return {Observable<string>} : siblingMsg
   */
   public getComponentName(): Observable<string> {
    return this.componentName.asObservable();
  }
  /*
   * @param {string} message : siblingMsg
   */
  public updateComponenetName(name: string): void {
    this.componentName.next(name);
  }
}
