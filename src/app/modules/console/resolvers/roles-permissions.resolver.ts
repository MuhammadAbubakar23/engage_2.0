import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { MenuDto } from 'src/app/shared/Models/MenuDto';
import { RolesAndPermissionsService } from '../components/roles-and-permissions/roles-and-permissions.service';

@Injectable({
  providedIn: 'root'
})
export class RolesPermissionsResolver implements Resolve<MenuDto[]> {
  constructor(private roles:RolesAndPermissionsService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MenuDto[] | Observable<MenuDto[]> | Promise<MenuDto[]>  {

    return this.roles.getMyRolesPermissions();//.subscribe((response:any) => this.resroles = response);
    //return of(true);
  }
}
