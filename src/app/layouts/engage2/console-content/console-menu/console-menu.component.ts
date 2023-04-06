import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { HeaderService } from 'src/app/services/HeaderService/header.service';
import { MenuDto } from 'src/app/shared/Models/MenuDto';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { loadMenusList } from '../../menu-state/menu.actions';
import { getEmargingEqual, getEmargingNotEqual, getMenusLoading } from '../../menu-state/menu.selectors';
import { MenuState } from '../../menu-state/menu.state';

@Component({
  selector: 'console-menu',
  templateUrl: './console-menu.component.html',
  styleUrls: ['./console-menu.component.scss']
})
export class ConsoleMenuComponent implements OnInit {
  menus$ :any;
  menu$ :any;
  loading$: any;
  constructor(private store: Store<MenuState>, private headerService: HeaderService) { 
    this.menu$ = this.store.select(getEmargingEqual("role_left_menu"));
    this.loading$ = this.store.select(getMenusLoading)
    this.store.dispatch(loadMenusList())
  }

  ngOnInit(): void {
    this.menu$ = this.store.select(getEmargingNotEqual("role_left_menu")).subscribe((item) => {
      this.menus$ = item;
    })
  }
  
  updatevalue(string:any){    
    this.headerService.updateMessage(string);
  }
}
