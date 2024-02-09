import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, share, startWith } from 'rxjs';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { loadMenusList } from '../../menu-state/menu.actions';
import { MenuModel } from '../../menu-state/menu.model';
import {
  getEmargingEqual,
  getMenusLoading,
} from '../../menu-state/menu.selectors';
import { MenuState } from '../../menu-state/menu.state';
//import { updatePermissionsLetters } from '../../permission-state/permission.actions';
import {
  getPermissionBySlug,
  getPermissionsLoading,
} from '../../permission-state/permission.selectors';
import { PermissionState } from '../../permission-state/permission.state';
import { OpensidebarService } from 'src/app/services/openSidebarService/opensidebar.service';

@Component({
  selector: 'role-menu',
  templateUrl: './role-menu.component.html',
  styleUrls: ['./role-menu.component.scss'],
})
export class RoleMenuComponent implements OnInit {
  // MenuModel = new MenuModel();
  permissions$: any;
  permission$: any;
  menus$!: MenuModel[];
  //menu$ :Observable<MenuModel[]>;
  //menu$ :Observable<any>;
  loading$: any;
  activeChannel: string = '';
  activeMenu: string = '';
  restrictedAgentsString =
    'Farah.khalid@abacus-global.com, aniqa.waris@bpo.abacus-global.com, samoom.fatima@bpo.abacus-global.com, Mishal.Javed@abacus-global.com, ambreen.zubair@jazz.com.pk, naveeda.akhtar@jazz.com.pk, sidra.shafiq@jazz.com.pk, muhammad.mansoor@jazz.com.pk, ayesha.sajjad@jazz.com.pk, farrukh.saeed1@jazz.com.pk, hassam.naveed@jazz.com.pk, nadia.shabbir@jazz.com.pk, rizwan.malik@jazz.com.pk, abida.rasheed@jazz.com.pk, saba.riaz@jazz.com.pk, pringle.charles@jazz.com.pk';
  restrictedAgent: string = '';

  onlyAnalyticsTabVisible =
    'kashif.waheed@ibex.co, jazzlhrwfm@ibex.co, JazzLHRWFM@ibex.co';

  totalParcoAdminUsers = 'omais.khan@bazaartech.com, faizan.saleem@bazaartech.com, muhammad.qasim@bazaartech.com, waqas.mehmood@bazaartech.com, zohaib.shafique@bazaartech.com, hassan.mustafa@bazaartech.com, waqas.younis@bazaartech.com, hassan.aziz@bazaartech.com, aashir.ahmed@bazaartech.com, shehzad.fareed@bazaartech.com, sajeel.ashraf@bazaartech.com, a.basit@bazaartech.com, danish.alvi@bazaartech.com, toqeer.rehman@bazaartech.com, babar.khan@bazaartech.com, taimoor.wajid@ibex.co, fahad.subzwari@bazaartech.com';

  constructor(
    private MenuStore: Store<MenuState>,
    private PermissionStore: Store<PermissionState>,
    private _route: Router,
    private storage: StorageService,
    private sidebar: OpensidebarService
  ) {
    //  this.menu$ = this.MenuStore.select(getEmargingEqual("role_main_left_menu"));
    //  this.menus$ = this.menu$.pipe(share(), startWith(false));
    //  this.loading$ = this.MenuStore.select(getMenusLoading);
    //  this.MenuStore.dispatch(updateMenusList());
    //  this.permission$ = this.PermissionStore.select(getPermissionBySlug("_upur_"));
    //  this.loading$ = this.PermissionStore.select(getPermissionsLoading);
    //  this.PermissionStore.dispatch(updatePermissionsLetters());
  }

  ngOnInit(): void {
    this.activeChannel = this._route.url.split('/')[2];
    let data = this.storage.retrive('main', 'O').local;
    this.restrictedAgent = data.originalUserName;
    ;
    this.MenuStore.select(getEmargingEqual('7_layout_lft')).subscribe(
      (item: MenuModel[]) => {
        this.menus$ = [...item];
      }
    );

    // this.permissions$  = this.PermissionStore.select(getPermissionBySlug("_upur_"));

    // console.log(this.permissions$);
    // .subscribe((item) => {
    //   this.menus$ = item;
    // })
    // console.log(this.menu$);
    // console.log("this.menu$");
  }

  assignedProfile = localStorage.getItem('assignedProfile');
  opensidebar() {
    this.activeMenu = this._route.url.split('/')[1];
    this.sidebar.sendsidebarvalue(this.activeMenu);
  }

  update(menuLink: any) {
    this.activeChannel = menuLink.split('/')[1];

    if (
      localStorage.getItem('assignedProfile') == null ||
      localStorage.getItem('assignedProfile') == '' ||
      localStorage.getItem('assignedProfile') == undefined
    ) {
      this._route.navigateByUrl('/' + menuLink);
    } else {
      this.reloadComponent('querryAssigned');
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
