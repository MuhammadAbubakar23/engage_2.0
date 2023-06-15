import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { loadMenusList } from '../../menu-state/menu.actions';
import { MenuModel } from '../../menu-state/menu.model';
import { getEmargingEqual, getMenusLoading } from '../../menu-state/menu.selectors';
import { MenuState } from '../../menu-state/menu.state';
import { loadPermissionsLetters, updatePermissionsLetters } from '../../permission-state/permission.actions';
import { Router } from '@angular/router';
import { getPermissionBySlug, getPermissionsLoading } from '../../permission-state/permission.selectors';
import { PermissionState } from '../../permission-state/permission.state';
@Component({
  selector: 'team-menu',
  templateUrl: './team-menu.component.html',
  styleUrls: ['./team-menu.component.scss'],
})
export class TeamMenuComponent implements OnInit {
  permissions$ :any;
  permission$ :any;
  menus$: any;
  menu$: any;
  loading$: any;
  constructor(private MenuStore: Store<MenuState>, private PermissionStore: Store<PermissionState>, private _route: Router) {
    // this.menu$ = this.MenuStore.select(getEmargingEqual('team_main_left_menu'));
    // this.loading$ = this.MenuStore.select(getMenusLoading);
    // this.MenuStore.dispatch(loadMenusList());

    // this.permission$ = this.PermissionStore.select(getPermissionBySlug("_upur_"));
    // this.loading$ = this.PermissionStore.select(getPermissionsLoading);
    // this.PermissionStore.dispatch(loadPermissionsLetters());
  }

  ngOnInit() {
    this.MenuStore
      .select(getEmargingEqual('team_main_left_menu'))
      .subscribe((item:any) => {
        debugger
        this.menus$ = [...item];
      });
    
    // // console.log(this.menu$);
    // // console.log("------------------------------------------");
    // // console.log(this.menus$);
    // // console.log("------------------------------------------");
    // // console.log("this.menu$");
  }

  assignedProfile = localStorage.getItem('assignedProfile');

  update(menuLink: any) {
    
    if (
      this.assignedProfile == null ||
      this.assignedProfile == '' ||
      this.assignedProfile == undefined
    ) {
      this._route.navigateByUrl('/' + menuLink);
    } else {
      this.reloadComponent('querryAssigned')
    }
  }
  closeToaster() {
    this.toastermessage = false;
  }

  AlterMsg: any;
  toastermessage: any;

  reloadComponent(type: any) {
    if (type == 'querryAssigned') {
      this.AlterMsg = 'Please Complete Querry First!';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
  }
}
