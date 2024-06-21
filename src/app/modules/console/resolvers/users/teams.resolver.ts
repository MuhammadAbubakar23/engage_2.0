import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { MenuModel } from 'src/app/layouts/engage2/menu-state/menu.model';
import { IdNameDto } from 'src/app/shared/Models/IdNameDto';
import { TeamsService } from '../../services/teams.service';
@Injectable({
  providedIn: 'root'
})
export class TeamsResolver implements Resolve<MenuModel[]> {
  constructor(private _teams:TeamsService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  MenuModel[] | Observable<MenuModel[]> | Promise<MenuModel[]>  {
    return this._teams.getMyTeams();//.subscribe((response:any) => this.resroles = response);
    //return of(true);
  }
}
