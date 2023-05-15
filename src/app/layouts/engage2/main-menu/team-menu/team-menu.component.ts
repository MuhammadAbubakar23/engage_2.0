import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MenuDto } from 'src/app/shared/Models/MenuDto';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { loadMenusList } from '../../menu-state/menu.actions';
import { MenuModel } from '../../menu-state/menu.model';
import { getEmargingEqual, getMenusLoading } from '../../menu-state/menu.selectors';
import { MenuState } from '../../menu-state/menu.state';
import { loadPermissionsLetters } from '../../permission-state/permission.actions';

@Component({
  selector: 'team-menu',
  templateUrl: './team-menu.component.html',
  styleUrls: ['./team-menu.component.scss']
})
export class TeamMenuComponent implements OnInit {

  menus$ :any;
  menu$ :any;
  loading$: any;
  constructor(private MenuStore: Store<MenuState>, private PermissionStore: Store<PermissionState>) { 
    this.menu$ = this.MenuStore.select(getEmargingEqual("team_main_left_menu"));
    this.loading$ = this.MenuStore.select(getMenusLoading)
    this.MenuStore.dispatch(loadMenusList())

    this.PermissionStore.dispatch(loadPermissionsLetters());
  }

  ngOnInit(): void {
    this.menu$ = this.MenuStore.select(getEmargingEqual("team_main_left_menu")).subscribe((item) => {
      this.menus$ = item;
    })
    // console.log(this.menu$);
    // console.log("------------------------------------------");
    // console.log(this.menus$);
    // console.log("------------------------------------------");
    // console.log("this.menu$");
  }

}
