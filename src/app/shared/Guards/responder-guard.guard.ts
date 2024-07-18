import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ResponderGuardGuard implements CanDeactivate<unknown> {
  private canDeactivateFlag: boolean = true;
  setCanDeactivateFlag(flag: boolean): void {
    this.canDeactivateFlag = flag;
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (
        sessionStorage.getItem('assignedProfile') == null ||
        sessionStorage.getItem('assignedProfile') == '' ||
        sessionStorage.getItem('assignedProfile') == undefined
      ){
        return this.canDeactivateFlag;
      } else {
        alert('Please complete the querry first')
        return false
      }
  }
}
