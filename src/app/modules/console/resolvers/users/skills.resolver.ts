import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { MenuModel } from 'src/app/layouts/engage2/menu-state/menu.model';
import { SkillsService } from '../../services/skills.service';

@Injectable({
  providedIn: 'root'
})
export class SkillsResolver implements Resolve<MenuModel[]> {
  constructor(private _skills:SkillsService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  MenuModel[] | Observable<MenuModel[]> | Promise<MenuModel[]>  {
    return this._skills.getMySkills();//.subscribe((response:any) => this.resroles = response);
    //return of(true);
  }
}
