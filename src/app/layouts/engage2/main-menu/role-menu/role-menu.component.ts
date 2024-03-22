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
  baseurl:any;
  restrictedAgentsString =
    'Farah.khalid@abacus-global.com, aniqa.waris@bpo.abacus-global.com, samoom.fatima@bpo.abacus-global.com, Mishal.Javed@abacus-global.com, ambreen.zubair@jazz.com.pk, naveeda.akhtar@jazz.com.pk, sidra.shafiq@jazz.com.pk, muhammad.mansoor@jazz.com.pk, ayesha.sajjad@jazz.com.pk, farrukh.saeed1@jazz.com.pk, hassam.naveed@jazz.com.pk, nadia.shabbir@jazz.com.pk, rizwan.malik@jazz.com.pk, abida.rasheed@jazz.com.pk, saba.riaz@jazz.com.pk, pringle.charles@jazz.com.pk, uzma.hashmat@jazz.com.pk';
    restrictedAgent: string = '';

  onlyAnalyticsTabVisible =
    'kashif.waheed@ibex.co, jazzlhrwfm@ibex.co, JazzLHRWFM@ibex.co';

  totalParcoAdminUsers = 'omais.khan@bazaartech.com, faizan.saleem@bazaartech.com, zia.rehman3@ibex.co,waqas.munir@jazz.com.pk, muhammad.qasim@bazaartech.com, waqas.mehmood@bazaartech.com, zohaib.shafique@bazaartech.com, hassan.mustafa@bazaartech.com, waqas.younis@bazaartech.com, hassan.aziz@bazaartech.com, aashir.ahmed@bazaartech.com, shehzad.fareed@bazaartech.com, sajeel.ashraf@bazaartech.com, a.basit@bazaartech.com, danish.alvi@bazaartech.com, toqeer.rehman@bazaartech.com, babar.khan@bazaartech.com, fahad.subzwari@bazaartech.com ,ali.haider4@ibex.co,ali.raza202@ibex.co,ahmed.hassan6@ibex.co,  saba.riaz@jazz.com.pk, ambreen.zubair@jazz.com.pk, uzma.hashmat@jazz.com.pk,mishal.javed@abacus-global.com ,jawad.ahmed@ibex.co ,muhammad.asad3@ibex.co, syeda.asghar@ibex.co, Rizwan.Ali22@ibex.co, hafiz.zeeshan@ibex.co, taimoor.wajid@ibex.co,zain.aziz11@ibex.co,dua.siddique@abacus-global.com, laiba.fayyaz@abacus-global.com,CCPMOKE@ibex.co,sanam.majeed@ke.com.pk,naushadmalikke@gmail.com,iamahmerzia@gmail.com,zamaan.afaq@gmail.com,khan.waleed.m@gmail.com,hashirahmed646@gmail.com,babbarsher034@gmail.com,jehananwar0@gmail.com,imxeeshan@gmail.com,shahrukh.khangul@3posp.pk,waqar.fayyaz@ke.com.pk,imran.rana@ke.com.pk,rabiya.siddiqui@ke.com.pk,junaidahmed.sohu@gmail.com,roushan.yousuf@ibex.co';

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
    this.baseurl=window.location.origin
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
