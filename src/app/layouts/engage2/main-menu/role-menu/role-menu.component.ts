import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { MenuModel } from '../../menu-state/menu.model';
import {
  getEmargingEqual,
} from '../../menu-state/menu.selectors';
import { MenuState } from '../../menu-state/menu.state';
import { OpensidebarService } from 'src/app/services/openSidebarService/opensidebar.service';
import { PermissionService } from 'src/app/shared/services/permission.service';
import { MenuService } from 'src/app/shared/services/menu.service';
import { SearchFilterService } from 'src/app/services/SearchFilter/search-filter.service';

@Component({
  selector: 'role-menu',
  templateUrl: './role-menu.component.html',
  styleUrls: ['./role-menu.component.scss'],
})
export class RoleMenuComponent implements OnInit {
  // MenuModel = new MenuModel();
  hasConsolePermission: boolean = false;
  hasMonitoringPermission: boolean = false;
  permissions$: any;
  permission$: any;
  menus$!: MenuModel[];
  showAnalytics = false;
  //menu$ :Observable<MenuModel[]>;
  //menu$ :Observable<any>;
  loading$: any;
  activeChannel: string = '';
  activeMenu: string = '';
  baseurl: any;
  // restrictedAgentsString = 'Farah.khalid@abacus-global.com, aniqa.waris@bpo.abacus-global.com, samoom.fatima@bpo.abacus-global.com, Mishal.Javed@abacus-global.com, ambreen.zubair@jazz.com.pk, naveeda.akhtar@jazz.com.pk, sidra.shafiq@jazz.com.pk, muhammad.mansoor@jazz.com.pk, ayesha.sajjad@jazz.com.pk, farrukh.saeed1@jazz.com.pk, hassam.naveed@jazz.com.pk, nadia.shabbir@jazz.com.pk, rizwan.malik@jazz.com.pk, abida.rasheed@jazz.com.pk, saba.riaz@jazz.com.pk, pringle.charles@jazz.com.pk, uzma.hashmat@jazz.com.pk';
  restrictedAgentsString = 'farah.khalid@abacus-global.com, aniqa.waris@bpo.abacus-global.com, samoom.fatima@bpo.abacus-global.com, mishal.javed@abacus-global.com, ambreen.zubair@jazz.com.pk, naveeda.akhtar@jazz.com.pk, sidra.shafiq@jazz.com.pk, muhammad.mansoor@jazz.com.pk, ayesha.sajjad@jazz.com.pk, farrukh.saeed1@jazz.com.pk, hassam.naveed@jazz.com.pk, nadia.shabbir@jazz.com.pk, rizwan.malik@jazz.com.pk, abida.rasheed@jazz.com.pk, pringle.charles@jazz.com.pk, uzma.hashmat@jazz.com.pk';
  restrictedAgent: string = '';

  // onlyAnalyticsTabVisible = 'kashif.waheed@ibex.co, jazzlhrwfm@ibex.co, JazzLHRWFM@ibex.co';
  onlyAnalyticsTabVisible = 'kashif.waheed@ibex.co, jazzlhrwfm@ibex.co, jazzlhrwfm@ibex.co';

  // totalParcoAdminUsers = 'omais.khan@bazaartech.com, faizan.saleem@bazaartech.com, zia.rehman3@ibex.co,waqas.munir@jazz.com.pk, muhammad.qasim@bazaartech.com, waqas.mehmood@bazaartech.com, zohaib.shafique@bazaartech.com, hassan.mustafa@bazaartech.com, waqas.younis@bazaartech.com, hassan.aziz@bazaartech.com, aashir.ahmed@bazaartech.com, shehzad.fareed@bazaartech.com, sajeel.ashraf@bazaartech.com, a.basit@bazaartech.com, danish.alvi@bazaartech.com, toqeer.rehman@bazaartech.com, babar.khan@bazaartech.com, fahad.subzwari@bazaartech.com ,ali.haider4@ibex.co,ali.raza202@ibex.co,ahmed.hassan6@ibex.co,  saba.riaz@jazz.com.pk, ambreen.zubair@jazz.com.pk, uzma.hashmat@jazz.com.pk,mishal.javed@abacus-global.com ,jawad.ahmed@ibex.co ,muhammad.asad3@ibex.co, syeda.asghar@ibex.co, rizwan.ali22@ibex.co, hafiz.zeeshan@ibex.co, taimoor.wajid@ibex.co,zain.aziz11@ibex.co,dua.siddique@abacus-global.com, laiba.fayyaz@abacus-global.com,CCPMOKE@ibex.co,sanam.majeed@ke.com.pk,naushadmalikke@gmail.com,iamahmerzia@gmail.com,zamaan.afaq@gmail.com,khan.waleed.m@gmail.com,hashirahmed646@gmail.com,babbarsher034@gmail.com,jehananwar0@gmail.com,imxeeshan@gmail.com,shahrukh.khangul@3posp.pk,waqar.fayyaz@ke.com.pk,imran.rana@ke.com.pk,rabiya.siddiqui@ke.com.pk,junaidahmed.sohu@gmail.com,roushan.yousuf@ibex.co';
  totalParcoAdminUsers = 'omais.khan@bazaartech.com, faizan.saleem@bazaartech.com, zia.rehman3@ibex.co,waqas.munir@jazz.com.pk, muhammad.qasim@bazaartech.com, waqas.mehmood@bazaartech.com, zohaib.shafique@bazaartech.com, hassan.mustafa@bazaartech.com, waqas.younis@bazaartech.com, hassan.aziz@bazaartech.com, aashir.ahmed@bazaartech.com, shehzad.fareed@bazaartech.com, sajeel.ashraf@bazaartech.com, a.basit@bazaartech.com, danish.alvi@bazaartech.com, toqeer.rehman@bazaartech.com, babar.khan@bazaartech.com, fahad.subzwari@bazaartech.com ,ali.haider4@ibex.co,ali.raza202@ibex.co,ahmed.hassan6@ibex.co,  saba.riaz@jazz.com.pk, ambreen.zubair@jazz.com.pk, uzma.hashmat@jazz.com.pk,mishal.javed@abacus-global.com ,jawad.ahmed@ibex.co ,muhammad.asad3@ibex.co, syeda.asghar@ibex.co, rizwan.ali22@ibex.co, hafiz.zeeshan@ibex.co, taimoor.wajid@ibex.co,zain.aziz11@ibex.co,dua.siddique@abacus-global.com, laiba.fayyaz@abacus-global.com,ccpmoke@ibex.co,sanam.majeed@ke.com.pk,naushadmalikke@gmail.com,iamahmerzia@gmail.com,zamaan.afaq@gmail.com,khan.waleed.m@gmail.com,hashirahmed646@gmail.com,babbarsher034@gmail.com,jehananwar0@gmail.com,imxeeshan@gmail.com,shahrukh.khangul@3posp.pk,waqar.fayyaz@ke.com.pk,imran.rana@ke.com.pk,rabiya.siddiqui@ke.com.pk,junaidahmed.sohu@gmail.com,roushan.yousuf@ibex.co,basil.savio@ke.com.pk,kainaat.fatima.gfx@gmail.com, zamaan.afaq@gmail.com,syed.imad@ke.com.pk ';

  constructor(
    private MenuStore: Store<MenuState>,
    private _route: Router,
    private storage: StorageService,
    private sidebar: OpensidebarService,
    private SearchFilterService: SearchFilterService,
    private _perS: PermissionService,
    private commonService: CommonDataService,
    private _menuS: MenuService
  ) {
    //  this.menu$ = this.MenuStore.select(getEmargingEqual("role_main_left_menu"));
    //  this.menus$ = this.menu$.pipe(share(), startWith(false));
    //  this.loading$ = this.MenuStore.select(getMenusLoading);
    //  this.MenuStore.dispatch(updateMenusList());
    //  this.permission$ = this.PermissionStore.select(getPermissionBySlug("_upur_"));
    //  this.loading$ = this.PermissionStore.select(getPermissionsLoading);
    //  this.PermissionStore.dispatch(updatePermissionsLetters());
  }
  getReportMenus() {
    this.commonService.getReportsMenuByRole({
      "ActorId": sessionStorage.getItem('activeActorId'),
      "Inline": false
    }).subscribe((res: any) => {
      if (res.length > 0) {
        this.showAnalytics = true;
        this._menuS.changeAnalyticsMenu(res);
      }
    });
  }


  ngOnInit(): void {
    this.hasConsolePermission = this.hasPermission('console');
    this.hasMonitoringPermission = this.hasPermission('automation');
    this.baseurl = window.location.origin
    this.activeChannel = this._route.url.split('/')[2];
    let data = this.storage.retrive('main', 'O').local;
    this.restrictedAgent = data.originalUserName.toLowerCase();
    ;
    this.MenuStore.select(getEmargingEqual('7_layout_lft')).subscribe(
      (item: MenuModel[]) => {
        this.menus$ = [...item];
      }
    );

    this.getReportMenus();
  }

  assignedProfile = sessionStorage.getItem('assignedProfile');
  opensidebar() {
    this.activeMenu = this._route.url.split('/')[1];
    this.sidebar.sendsidebarvalue(this.activeMenu);
  }



  update(menuLink: any) {
    this.activeChannel = menuLink.split('/')[1];

    if (
      sessionStorage.getItem('assignedProfile') == null ||
      sessionStorage.getItem('assignedProfile') == '' ||
      sessionStorage.getItem('assignedProfile') == undefined
    ) {
      this._route.navigateByUrl('/' + menuLink);
    } else {
      this.reloadComponent('querryAssigned');
    }
  }
  closeToaster() {
    this.toastermessage = false;
  }



  hasPermission(permissionName: string) {
    const isAccessible = this._perS.hasPermission(permissionName)
    return isAccessible
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
  resetFilters() {
    this.SearchFilterService.resetAllFilter();
  }
}
