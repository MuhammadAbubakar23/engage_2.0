import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MenuDto } from 'src/app/shared/Models/MenuDto';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { loadMenusList } from '../../state/menu.actions';
import { getEmargingEqual, getMenusLoading } from '../../state/menu.selectors';
import { MenuState } from '../../state/menu.state';

@Component({
  selector: 'role-menu',
  templateUrl: './role-menu.component.html',
  styleUrls: ['./role-menu.component.scss'],
})
export class RoleMenuComponent implements OnInit {
  // menuDto = new MenuDto();
  menus$: any;
  menu$: any;
  loading$: any;
  constructor(private store: Store<MenuState>, private _route: Router) {
    this.menu$ = this.store.select(getEmargingEqual('role_left_menu'));
    this.loading$ = this.store.select(getMenusLoading);
    this.store.dispatch(loadMenusList());
  }

  ngOnInit(): void {
    this.menu$ = this.store
      .select(getEmargingEqual('role_left_menu'))
      .subscribe((item) => {
        this.menus$ = item;
      });
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
