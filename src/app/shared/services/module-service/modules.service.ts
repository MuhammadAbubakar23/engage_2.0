import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModulesService {

  private loadModule = new Subject<string>();

  constructor() { }

  public getModule(): Observable<string> {
    return this.loadModule.asObservable();
  }
  /*
   * @param {string} message : siblingMsg
   */
  public updateModule(moduleName: string): void {

    this.loadModule.next(moduleName);
  }
}
