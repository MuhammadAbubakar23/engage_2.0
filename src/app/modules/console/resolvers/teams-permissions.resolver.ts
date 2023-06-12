import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { MenuModel } from 'src/app/layouts/engage2/menu-state/menu.model';
import { TeamsService } from '../components/teams/teams.service';

@Injectable({
  providedIn: 'root'
})
export class TeamsPermissionsResolver implements Resolve<MenuModel[]> {
  constructor(private teams:TeamsService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MenuModel[] | Observable<MenuModel[]> | Promise<MenuModel[]>  {

    return this.teams.getMyTeamsPermissions();//.subscribe((response:any) => this.resroles = response);
    //return of(true);
  }
}
