import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MenuDto } from 'src/app/shared/Models/MenuDto';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { loadMenusList, updateMenusList } from '../../menu-state/menu.actions';
import { getEmargingEqual, getMenusLoading} from '../../menu-state/menu.selectors';
import { MenuState } from '../../menu-state/menu.state';
import { updatePermissionsLetters } from '../../permission-state/permission.actions';

@Component({
  selector: 'role-menu',
  templateUrl: './role-menu.component.html',
  styleUrls: ['./role-menu.component.scss']
})
export class RoleMenuComponent implements OnInit {

 // menuDto = new MenuDto();
  menus$ :any;
  menu$ :any;
  loading$: any;
  constructor(private MenuStore: Store<MenuState>, private PermissionStore: Store<PermissionState>, private _route: Router) { 
    this.menu$ = this.MenuStore.select(getEmargingEqual("role_main_left_menu"));
    this.loading$ = this.MenuStore.select(getMenusLoading);
    this.MenuStore.dispatch(updateMenusList());
    
    this.PermissionStore.dispatch(updatePermissionsLetters());
  }

  ngOnInit(): void {
    this.menu$ = this.MenuStore.select(getEmargingEqual("role_main_left_menu")).subscribe((item) => {
      this.menus$ = item;
    })
    // console.log(this.menu$);
    // console.log("this.menu$");
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
