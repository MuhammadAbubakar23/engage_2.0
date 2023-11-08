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
import { StorageService } from 'src/app/shared/services/storage/storage.service';
@Component({
  selector: 'team-menu',
  templateUrl: './team-menu.component.html',
  styleUrls: ['./team-menu.component.scss'],
})
export class TeamMenuComponent implements OnInit {
  menus$!: MenuModel[];
  permissions$: any;
  permission$: any;
  menu$: any;
  loading$: any;

  mainMenu: any[] = [];
  activeChannel: string = ''
  menuArray: any[] = [];
  constructor(private MenuStore: Store<MenuState>, private PermissionStore: Store<PermissionState>, private _route: Router,
    private stor: StorageService) {
    // this.menu$ = this.MenuStore.select(getEmargingEqual('team_main_left_menu'));
    // this.loading$ = this.MenuStore.select(getMenusLoading);
    // this.MenuStore.dispatch(loadMenusList());
    // this.permission$ = this.PermissionStore.select(getPermissionBySlug("_upur_"));
    // this.loading$ = this.PermissionStore.select(getPermissionsLoading);
    // this.PermissionStore.dispatch(loadPermissionsLetters());
  }

  ngOnInit() {
    
    this.activeChannel = this._route.url.split('/')[2]

    this.MenuStore
      .select(getEmargingEqual('team_main_left_menu'))
      .subscribe((item: MenuModel[]) => {

        // removing responder menu from list for time being
        this.menuArray = [];
        item.forEach((singleMenu: any) => {
          if ((singleMenu.name != "Responder") && (singleMenu.name != "Draft") && (singleMenu.name != "Snoozed") && (singleMenu.name != "All Inboxes")) {
            if (!this.menuArray.includes(singleMenu)) {
              this.menuArray.push(singleMenu);
            }
          }
        });
        item = this.menuArray;
        // til here
        this.menus$ = [...item];
      });

    const menu = this.stor.retrive('Tags', 'O').local;
    menu.forEach((item: any) => {
      if (item.name == "Engage") {
        item.subTags.forEach((singleMenu: any) => {
          if (!this.mainMenu.includes(singleMenu)) {
            this.mainMenu.push(singleMenu)
          }
        });
      }
    });

  }

  assignedProfile = localStorage.getItem('assignedProfile');

  update(menuLink: any) {
    
    // this.activeChannel = this._route.url.split('/')[2];
    this.activeChannel=menuLink.split('/')[1]


    if (
      localStorage.getItem('assignedProfile') == null ||
      localStorage.getItem('assignedProfile') == '' ||
      localStorage.getItem('assignedProfile') == undefined
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
