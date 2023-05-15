import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Tooltip } from 'bootstrap';
import { Subscription } from 'rxjs';
import { HeaderService } from 'src/app/services/HeaderService/header.service';
import { LeftsidebarExpandedService } from 'src/app/services/LeftSideBar-Expanded/leftsidebar-expanded.service';
import { MaximizeChatService } from 'src/app/services/maximize-chat.service';
import { SharedService } from 'src/app/services/SharedService/shared.service';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { ModulesService } from '../../../shared/services/module-service/modules.service';
// import { loadPermissionsList } from '../permission-state/permission.actions';
// import { loadMenusList, updateMenusList } from '../menu-state/menu.actions';
import { MenuModel } from '../menu-state/menu.model';
// import { getMenuById, getMenusLoading } from '../menu-state/menu.selectors';
import { MenuState } from '../menu-state/menu.state';

@Component({
  selector: 'main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent implements OnInit {
  menus$: any;
  permissions$: any;
  agent$: boolean = true;
  header$: string = "page";
  submenu$: MenuModel[] = [];
  loading$: any;
  menu$: any;
    
  public Subscription!: Subscription;

  menu: any = [];
  UnResponded: number = 0;
  pageNumber: any = 0;
  pageSize: any = 0;
  UserDetails: any[]=[];
  id: any;

  constructor(
    private headerService: HeaderService,
    private _sharedData: SharedService,
    private leftsidebar: LeftsidebarExpandedService,
    private maximizeChatService : MaximizeChatService,
    private moduleService : ModulesService,
    private commonService : CommonDataService,
    private store: Store<MenuState>
  ) { 
    // this.menu$ = this.store.select(getMenuById(2));
    // this.loading$ = this.store.select(getMenusLoading)
    // this.store.dispatch(loadMenusList());
    // this.store.dispatch(updateMenusList());
    //this.menu$ = this.store.select(getMenuById(2));
    // this.loading$ = this.store.select(getMenusLoading)
    // this.store.dispatch(loadPermissionsList())

  }

  ngOnInit(): void {
    // this.menu$ = this.store.select(getMenuById(2)).subscribe((item) => {
    //   this.menus$ = item;
    // })
    // console.log(this.menu$);
    // console.log("this.menu$");
    // Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    // .forEach(tooltipNode => new Tooltip(tooltipNode));
    
    this.Subscription = this._sharedData.getCount().subscribe((res) => {
      this.UnResponded = res;
    });

    // this.getUserInfo();

    this.Subscription = this._sharedData.getuserInfo().subscribe((res) => {
      
      if (this.UserDetails.length == 0) {
        this.UserDetails.push(res);
      //  // console.log('user details', this.UserDetails);
      } else if (this.UserDetails.length > 0) {
        var item = this.UserDetails.find((x) => x.userId == res.userId);
        if (item == null || item == undefined) {
          this.UserDetails.push(res);
      //    // console.log('user details', this.UserDetails);
        }
      }
    });
  }
  // getUserInfo(){
  //   
  //   if (this.UserDetails.length == 0) {
  //     this.UserDetails.push(this._sharedData.draft);
  //     // console.log('user details', this.UserDetails);
  //   } else if (this.UserDetails.length > 0) {
  //     var item = this.UserDetails.find((x) => x.userId == this._sharedData.draft.userId);
  //     if (item == null || item == undefined) {
  //       this.UserDetails.push(this._sharedData.draft);
  //       // console.log('user details', this.UserDetails);
  //     }
  //   }
  // }

  updatevalue(string: any, leftsidebar: string) {
    this.headerService.updateMessage(string);
    this.leftsidebar.updateMessage(leftsidebar);
  }

  maximizeChat(id: any, platform: any) {
    
    this.maximizeChatService.updateMessage('maximizeChat');
    this.maximizeChatService.setId(id);
    this.maximizeChatService.setPlatform(platform);
  }

  setValue(value: any) {
    this.moduleService.updateModule(value);
  }
}
