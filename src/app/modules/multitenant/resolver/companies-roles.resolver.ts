import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { MenuModel } from 'src/app/layouts/engage2/menu-state/menu.model';
import { CompaniesService } from '../services/companies.service';

@Injectable({
  providedIn: 'root'
})
export class CompaniesRolesResolver implements  Resolve<MenuModel[]> {
  constructor(private _companies:CompaniesService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MenuModel[] | Observable<MenuModel[]> | Promise<MenuModel[]>  {
    //console.log(route.paramMap.get('id'));
    return this._companies.getAllParams("permissions", {id:route.paramMap.get('id')});//.subscribe((response:any) => this.resroles = response);
    //return of(true);
  }
}
