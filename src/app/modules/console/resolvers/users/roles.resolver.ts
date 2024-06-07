import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { IdNameDto } from 'src/app/shared/Models/IdNameDto';
import { RolesAndPermissionsService } from '../../components/roles-and-permissions/roles-and-permissions.service';
@Injectable({
  providedIn: 'root'
})
export class RolesResolver implements Resolve<IdNameDto[]> {
  constructor(private roles:RolesAndPermissionsService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IdNameDto[] | Observable<IdNameDto[]> | Promise<IdNameDto[]>  {
    return this.roles.getMyRoles();//.subscribe((response:any) => this.resroles = response);
    //return of(true);
  }
}
