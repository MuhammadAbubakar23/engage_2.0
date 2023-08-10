import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { MenuModel } from 'src/app/layouts/engage2/menu-state/menu.model';
import { RolesAndPermissionsService } from '../../components/roles-and-permissions/roles-and-permissions.service';

@Injectable({
  providedIn: 'root'
})
export class RolesPermissionsResolver implements Resolve<MenuModel[]> {
  constructor(private roles:RolesAndPermissionsService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MenuModel[] | Observable<MenuModel[]> | Promise<MenuModel[]>  {

    return this.roles.getMyRolesPermissions();//.subscribe((response:any) => this.resroles = response);
    //return of(true);
  }
}
