import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadMenusList, updateMenusList } from 'src/app/layouts/engage2/menu-state/menu.actions';
import { MenuState } from 'src/app/layouts/engage2/menu-state/menu.state';
import { loadPermissionsLetters, updatePermissionsLetters } from 'src/app/layouts/engage2/permission-state/permission.actions';
import { PermissionModel, PermissionState } from 'src/app/layouts/engage2/permission-state/permission.state';
import { MenuModel } from '../layouts/engage2/menu-state/menu.model';
import { getEmargingEqual, getMenusLoading } from '../layouts/engage2/menu-state/menu.selectors';
import { getPermissionBySlug } from '../layouts/engage2/permission-state/permission.selectors';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss']
})
export class ModulesComponent implements OnInit {
  TeamMenu$: Observable<MenuModel[]>;
  RoleMenu$: Observable<MenuModel[]>;
  Permission$: Observable<boolean>;
  
  constructor(private MenuStore: Store<MenuState>, private PermissionStore: Store<PermissionState>) {
    this.RoleMenu$ = this.MenuStore.select(getEmargingEqual("role_main_left_menu"));
    this.TeamMenu$ = this.MenuStore.select(getEmargingEqual('team_main_left_menu'));
    this.Permission$ = this.PermissionStore.select(getPermissionBySlug("_upur_"));
    //this.RoleMenu$ = this.menu$.pipe(share(), startWith(false));
  }

  ngOnInit() {
    this.MenuStore.dispatch(loadMenusList());
    this.MenuStore.dispatch(updateMenusList());
    this.PermissionStore.dispatch(loadPermissionsLetters());
    this.PermissionStore.dispatch(updatePermissionsLetters());
  }
}
// this.menu$ = this.MenuStore.select(getEmargingEqual('team_main_left_menu'));
// this.loading$ = this.MenuStore.select(getMenusLoading);
// this.MenuStore.dispatch(loadMenusList());

// this.permission$ = this.PermissionStore.select(getPermissionBySlug("_upur_"));
// this.loading$ = this.PermissionStore.select(getPermissionsLoading);
// this.PermissionStore.dispatch(loadPermissionsLetters());

//  this.menu$ = this.MenuStore.select(getEmargingEqual("role_main_left_menu"));
//  this.loading$ = this.MenuStore.select(getMenusLoading);
//  this.MenuStore.dispatch(updateMenusList());
  
//  this.permission$ = this.PermissionStore.select(getPermissionBySlug("_upur_"));
//  this.loading$ = this.PermissionStore.select(getPermissionsLoading);
//  this.PermissionStore.dispatch(updatePermissionsLetters());