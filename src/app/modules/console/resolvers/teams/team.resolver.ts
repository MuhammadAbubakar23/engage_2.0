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
export class TeamResolver implements Resolve<MenuModel[]> {
  constructor(private _teams:TeamsService){}

  menuModel: MenuModel = { mainId:0,
    name: "",
    emerging:"",
    slug:"",
    link:"",
    desc:"",
    parentId:0,
    baseId:0,
    icon:"",
    indexNo:0,
    isSelected:false,
    isDisabled:false 
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MenuModel[] | Observable<MenuModel[]> | Promise<MenuModel[]>  {
    let id = Number(route.paramMap.get('id'));
    if(id <= 0) return [this.menuModel];
    return this._teams.getMyTeamsPermissions("TeamsAccesses", "Out/"+route.paramMap.get('id'));//.subscribe((response:any) => this.resroles = response);
  }
}