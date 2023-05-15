import { Component, OnInit } from '@angular/core';
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
  constructor(private MenuStore: Store<MenuState>, private PermissionStore: Store<PermissionState>) { 
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

}
