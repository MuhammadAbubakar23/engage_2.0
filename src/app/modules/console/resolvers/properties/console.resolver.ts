import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { MenuModel } from 'src/app/layouts/engage2/menu-state/menu.model';
import { ConsoleService } from '../../services/console.service';
@Injectable({
  providedIn: 'root'
})
export class ConsoleResolver implements Resolve<MenuModel[]> {
  constructor(private _console:ConsoleService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  MenuModel[] | Observable<MenuModel[]> | Promise<MenuModel[]>  {
    return this._console.channels();//.subscribe((response:any) => this.resroles = response);
    //return of(true);
  }
}
