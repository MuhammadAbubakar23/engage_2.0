import { Component, OnInit } from '@angular/core';
import {
  Router,
  Event,
  NavigationStart,
  RoutesRecognized,
  RouteConfigLoadStart,
  RouteConfigLoadEnd,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
  GuardsCheckStart,
  ChildActivationStart,
  ActivationStart,
  GuardsCheckEnd,
  ResolveStart,
  ResolveEnd,
  ChildActivationEnd,
  ActivationEnd,
  Scroll,
} from '@angular/router';

import { Store } from '@ngrx/store';
import { HeaderService } from 'src/app/services/HeaderService/header.service';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { TreeGenService } from 'src/app/shared/services/tree-gen/tree-gen.service';
import { loadMenusList } from '../../menu-state/menu.actions';
import { MenuModel } from '../../menu-state/menu.model';
import {
  getEmarging,
  getEmargingEqual,
  getEmargingNotEqual,
  getMenusLoading,
} from '../../menu-state/menu.selectors';
import { MenuState } from '../../menu-state/menu.state';
import { ChangeDetectorRef } from '@angular/core';
import { PermissionService } from 'src/app/shared/services/permission.service';
import { MenuService } from 'src/app/shared/services/menu.service';

@Component({
  selector: 'sub-role-menu',
  templateUrl: './sub-role-menu.component.html',
  styleUrls: ['./sub-role-menu.component.scss'],
})
export class SubRoleMenuComponent implements OnInit {
  activeIndex = 0;
  isActive = false;
  menuItems: any[] = [];
  activeMenu(index: any) {
    this.activeIndex = index;
    this.isActive = true;
  }
  toggleCollapse(menu: any) {
    menu.expanded = !menu.expanded;
  }
  SubMenuPages: any = [
    { name: 'Console', slug: 'console', parentId: 400 },
    { name: 'Analytics', slug: 'analytics', parentId: 470 },
    { name: 'MultiTenant', slug: 'multitenant', parentId: 450 },
  ];

  SubMenuPage: any = { name: 'Console', slug: 'console', parentId: 400 };

  EmargeType$?: string;
  EmargeParent$?: number = 400; //470
  EmargeShow$?: boolean = true;
  activeChannels: any;
  anymenus$: any;
  menus$: any;

  menu$: any;
  loading$: any;

  SuperTeamSelected: number = 0;
  SuperTeamOptions: any = [];
  SuperTeamShow: boolean = true;

  myUrl: string = '';
  constructor(
    private store: Store<MenuState>,
    private treegen: TreeGenService<MenuModel>,
    private headerService: HeaderService,
    private storage: StorageService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private _perS: PermissionService,
    private commonService: CommonDataService,
    private _menuS: MenuService
  ) {
    let _self = this;

    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        // _self.SubMenuPage = this.SubMenuPages.filter(function(element:any) {
        //   return event.url.toString().toLowerCase().includes(element.slug);
        // }); // because return array index;
        // if(event.url.toString().toLowerCase().includes("undefined")){

        // }
        // else{
        _self.SubMenuPages.forEach(function (subMenuPage: any) {
          if (event.url.toString().toLowerCase().includes(subMenuPage.slug)) {
            _self.SubMenuPage = subMenuPage;
            //  _self.store.select(getEmarging(subMenuPage.slug)).subscribe((item) => {
            //   _self.menus$ = _self.treegen.buildTree(item, subMenuPage.parentId);
            // });
          }
        });
        //}
      }
    });
  }

  hasPermission(permissionName: string) {
    const isAccessible = this._perS.hasPermission(permissionName);
    return isAccessible;
  }

  getConsoleMenus() {
    this.commonService
      .getConsoleMenuByRole(sessionStorage.getItem('activeActorId'))
      .subscribe((res: any) => {
        this.menuItems = res[0].subMenu;
      });
  }
  ngOnInit(): void {
    this.getConsoleMenus();
    this.menus$ = [];
    let _self = this;
    _self.store
      .select(getEmarging(_self.SubMenuPage.slug))
      .subscribe((item: any) => {
        if (item.length > 0)
          _self.menus$ = _self.treegen.buildTree(
            item,
            _self.SubMenuPage.parentId
          );
      });

    // this.router.events.subscribe((event: Event) => {
    //   if (event instanceof NavigationStart) {
    //     _self.SubMenuPages.forEach(function(subMenuPage:any, index:number) {
    //       if(event.url.toString().toLowerCase().includes(subMenuPage.slug)){
    //         _self.EmargeType$ = subMenuPage.name;
    //         _self.menu$ = _self.store.select(getEmarging(subMenuPage.slug)).subscribe((item) => {
    //           // this.menus$ = item;
    //           _self.menus$ = _self.treegen.buildTree(item, subMenuPage.parentId);
    //         });
    //       }
    //     });
    // let urlValue = event.url.toString().split('/');

    // const resultConsole = event.url.toString().toLowerCase().includes("console");
    // const resultAnalytics = event.url.toString().toLowerCase().includes("analytics");
    // if(resultConsole){
    //   this.HeaderEmargeType="Console";
    //   this.LoadDataEmargeType="console";
    // }
    // if(resultAnalytics){
    //   this.HeaderEmargeType="Analytics";
    //   this.LoadDataEmargeType="analytics";
    // }
    // if(event.url.toString())
    // }
    // });
    // this.menu$ = this.store.select(getEmarging(this.LoadDataEmargeType)).subscribe((item) => {
    //   this.menus$ = item;
    //   this.menus$ = this.treegen.buildTree(item, 400);
    // })

    let main = this.storage.retrive('main', 'o').local;
    let selectedRole = this.storage.retrive('nocompass', 'O').local;
    this.SuperTeamSelected = selectedRole.id;
    this.SuperTeamOptions = main.roles;

    if (this.SuperTeamOptions.length >= 2) {
      this.SuperTeamShow = false;
    }
  }

  updatevalue(menu: any) {
    if (menu.subMenu == null) {
      this.router.navigateByUrl('/console/'+menu.link)
      this.headerService.updateMessage(menu.link);
      this.activeChannels = this.router.url.split('/')[2];
    } else {
      this.toggleCollapse(menu);
    }
    this.cdr.detectChanges();
  }
}
