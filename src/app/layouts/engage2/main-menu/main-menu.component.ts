import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Tooltip } from 'bootstrap';
import { Subscription } from 'rxjs';
import { HeaderService } from 'src/app/services/HeaderService/header.service';
import { LeftsidebarExpandedService } from 'src/app/services/LeftSideBar-Expanded/leftsidebar-expanded.service';
import { MaximizeChatService } from 'src/app/services/maximize-chat.service';
import { SharedService } from 'src/app/services/SharedService/shared.service';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { ModulesService } from '../../../shared/services/module-service/modules.service';
import { loadMenusList, updateMenusList } from '../menu-state/menu.actions';
// import { loadPermissionsList } from '../permission-state/permission.actions';
// import { loadMenusList, updateMenusList } from '../menu-state/menu.actions';
import { MenuModel } from '../menu-state/menu.model';
// import { getMenuById, getMenusLoading } from '../menu-state/menu.selectors';
import { MenuState } from '../menu-state/menu.state';
import { loadPermissionsLetters, updatePermissionsLetters } from '../permission-state/permission.actions';

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

  // restrictedAgents = [
  //   {id:1, email: 'aniqa.waris@bpo.abacus-global.com'},
  //   {id:2, email: 'samoom.fatima@bpo.abacus-global.com'},
  //   {id:3, email: 'Mishal.Javed@abacus-global.com'},
  //   {id:4, email: 'ambreen.zubair@jazz.com.pk'},
  //   {id:5, email: 'naveeda.akhtar@jazz.com.pk'},
  //   {id:6, email: 'sidra.shafiq@jazz.com.pk'},
  //   {id:7, email: 'muhammad.mansoor@jazz.com.pk'},
  //   {id:8, email: 'ayesha.sajjad@jazz.com.pk'},
  //   {id:9, email: 'farrukh.saeed1@jazz.com.pk'},
  //   {id:10, email: 'hassam.naveed@jazz.com.pk'},
  //   {id:11, email: 'nadia.shabbir@jazz.com.pk'},
  //   {id:12, email: 'rizwan.malik@jazz.com.pk'},
  //   {id:13, email: 'abida.rasheed@jazz.com.pk'},
  //   {id:14, email: 'saba.riaz@jazz.com.pk'},
  //   {id:15, email: 'pringle.charles@jazz.com.pk'}
  // ]

  restrictedAgentsString = "aniqa.waris@bpo.abacus-global.com, samoom.fatima@bpo.abacus-global.com, Mishal.Javed@abacus-global.com, ambreen.zubair@jazz.com.pk, naveeda.akhtar@jazz.com.pk, sidra.shafiq@jazz.com.pk, muhammad.mansoor@jazz.com.pk, ayesha.sajjad@jazz.com.pk, farrukh.saeed1@jazz.com.pk, hassam.naveed@jazz.com.pk, nadia.shabbir@jazz.com.pk, rizwan.malik@jazz.com.pk, abida.rasheed@jazz.com.pk, saba.riaz@jazz.com.pk, pringle.charles@jazz.com.pk"
  constructor(
    private headerService: HeaderService,
    private _sharedData: SharedService,
    private leftsidebar: LeftsidebarExpandedService,
    private maximizeChatService : MaximizeChatService,
    private moduleService : ModulesService,
    private commonService : CommonDataService,
    private MenuStore: Store<MenuState>,
    private PermissionStore: Store<PermissionState>,
    private storage : StorageService,
    private router: Router
  ) { 
    // this.MenuStore.dispatch(loadMenusList());
    // this.MenuStore.dispatch(updateMenusList());
    // this.PermissionStore.dispatch(loadPermissionsLetters());
    // this.PermissionStore.dispatch(updatePermissionsLetters());
    // this.menu$ = this.store.select(getMenuById(2));
    // this.loading$ = this.store.select(getMenusLoading)
    // this.store.dispatch(loadMenusList());
    // this.store.dispatch(updateMenusList());
    //this.menu$ = this.store.select(getMenuById(2));
    // this.loading$ = this.store.select(getMenusLoading)
    // this.store.dispatch(loadPermissionsList())

  }
  restrictedAgent:string='';

  ngOnInit(): void {
    let data = this.storage.retrive('main', 'O').local;
    this.restrictedAgent = data.originalUserName;

    if(this.restrictedAgentsString.includes(this.restrictedAgent)){
      this.router.navigateByUrl('all-inboxes/completed/all')
    }

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
