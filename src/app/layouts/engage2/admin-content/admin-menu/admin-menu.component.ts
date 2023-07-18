import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { HeaderService } from 'src/app/services/HeaderService/header.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { getEmargingNotEqual } from '../../menu-state/menu.selectors';
import { MenuState } from '../../menu-state/menu.state';

@Component({
  selector: 'admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.scss']
})
export class AdminMenuComponent implements OnInit {

  menus$ :any;
  menu$ :any;
  loading$: any;

  SuperTeamSelected:number=0; 
  SuperTeamOptions:any=[];
  SuperTeamShow:boolean = true;
  
  constructor(private store: Store<MenuState>, private headerService: HeaderService, private storage:StorageService) { 
    // this.menu$ = this.store.select(getEmargingEqual("role_left_menu"));
    // this.loading$ = this.store.select(getMenusLoading)
    // this.store.dispatch(loadMenusList())
  }

  ngOnInit(): void {
    this.menu$ = this.store.select(getEmargingNotEqual("role_multitenant_left_menu")).subscribe((item) => {
      this.menus$ = item;
    })

    // let main = this.storage.retrive("main","o").local;
    // let selectedRole = this.storage.retrive("nocompass","O").local;
    // this.SuperTeamSelected = selectedRole.id;  
    // this.SuperTeamOptions = main.roles;
   

    // if(this.SuperTeamOptions.length >= 2){
    //   this.SuperTeamShow = false;
    // }
  }
  
  updatevalue(string:any){    
    this.headerService.updateMessage(string);
  }

}
