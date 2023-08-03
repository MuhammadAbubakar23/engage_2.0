import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { MenuModel } from 'src/app/layouts/engage2/menu-state/menu.model';
import { TeamsService } from '../../services/teams.service';

@Injectable({
  providedIn: 'root'
})
export class TeamsPermissionsResolver implements  Resolve<MenuModel[]> {
  constructor(private _teams:TeamsService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MenuModel[] | Observable<MenuModel[]> | Promise<MenuModel[]>  {
<<<<<<< HEAD

=======
    // debugger;
>>>>>>> b39740b24974b36de7d7131d7438605d18566d52
    //console.log(route.paramMap.get('id'));
    // return this._teams.getAllParams("accesses", {id:route.paramMap.get('id')});//.subscribe((response:any) => this.resroles = response);
    return this._teams.getMyTeamsPermissions("TeamsAccesses", "In/"+route.paramMap.get('id'));//.subscribe((response:any) => this.resroles = response);
    //return of(true);
  }
}
// Resolve<MenuModel[]> {
//   constructor(private teams:TeamsService){}

//   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MenuModel[] | Observable<MenuModel[]> | Promise<MenuModel[]>  {

//     return this.teams.getMyTeamsPermissions();//.subscribe((response:any) => this.resroles = response);
//     //return of(true);
//   }
// }
