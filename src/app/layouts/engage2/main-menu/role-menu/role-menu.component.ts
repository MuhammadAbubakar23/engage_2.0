import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MenuDto } from 'src/app/shared/Models/MenuDto';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { loadMenusList } from '../../menu-state/menu.actions';
import { getEmargingEqual, getMenusLoading} from '../../menu-state/menu.selectors';
import { MenuState } from '../../menu-state/menu.state';

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
  constructor(private store: Store<MenuState>) { 
    this.menu$ = this.store.select(getEmargingEqual("role_left_menu"));
    this.loading$ = this.store.select(getMenusLoading)
    this.store.dispatch(loadMenusList())
  }

  ngOnInit(): void {
    this.menu$ = this.store.select(getEmargingEqual("role_left_menu")).subscribe((item) => {
      this.menus$ = item;
    })
    // console.log(this.menu$);
    // console.log("this.menu$");
  }

}
