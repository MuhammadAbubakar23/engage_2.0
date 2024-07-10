import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { HeaderService } from 'src/app/services/HeaderService/header.service';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { TreeGenService } from 'src/app/shared/services/tree-gen/tree-gen.service';
import { loadMenusList } from '../../menu-state/menu.actions';
import { MenuModel } from '../../menu-state/menu.model';
import { getEmargingEqual, getEmargingNotEqual, getMenusLoading } from '../../menu-state/menu.selectors';
import { MenuState } from '../../menu-state/menu.state';
import { PermissionService } from 'src/app/shared/services/permission.service';

@Component({
  selector: 'console-menu',
  templateUrl: './console-menu.component.html',
  styleUrls: ['./console-menu.component.scss']
})
export class ConsoleMenuComponent implements OnInit {

  haschannelPermission: boolean=false;
  hasusersPermission: boolean=false;
  hasteamsPermission: boolean=false;
  hasroutesPermission: boolean=false;
  hasrulesPermission: boolean=false;
  hastemplatesPermission: boolean=false;
  hasbusiness_hoursPermission: boolean=false;
  hastagsPermission: boolean=false;
  hasroles_n_permissionsPermission: boolean=false;
  hassla_policiesPermission: boolean=false;
  hasskillsPermission: boolean=false;
  hascontactsPermission: boolean=false;
  hascase_managementPermission: boolean=false;
  hasdocumentsPermission: boolean=false;
  hasknowledge_basePermission: boolean=false;
  haspreferencesPermission: boolean=false;

  hashelpPermission: boolean=false;
  anymenus$ :any;
  menus$ :any;

  menu$ :any;
  loading$: any;

  SuperTeamSelected:number=0;
  SuperTeamOptions:any=[];
  SuperTeamShow:boolean = true;

  constructor(private store: Store<MenuState>, private treegen: TreeGenService<MenuModel>, private headerService: HeaderService,
    private storage:StorageService,private _perS:PermissionService) {
    // this.menu$ = this.store.select(getEmargingEqual("role_console_left_menu"));
    // this.loading$ = this.store.select(getMenusLoading)
    // this.store.dispatch(loadMenusList())
  }
  checkPermissions(){
    this.haschannelPermission = this.hasPermission('channels');
    this.hasusersPermission = this.hasPermission('users');
    this.hasteamsPermission = this.hasPermission('teams');
    this.hasroutesPermission = this.hasPermission('routes');
    this.hasrulesPermission = this.hasPermission('rules');
    this.hastemplatesPermission = this.hasPermission('templates');
    this.hasbusiness_hoursPermission=this.hasPermission('business-hours');
    this.hastagsPermission = this.hasPermission('tags');
    this.hasroles_n_permissionsPermission = this.hasPermission('roles-permissions');
    this.hasskillsPermission = this.hasPermission('skills');
    this.hascontactsPermission = this.hasPermission('contacts');
    this.hascase_managementPermission = this.hasPermission('case-management');
    this.hasdocumentsPermission = this.hasPermission('console-documents');
    this.hasknowledge_basePermission = this.hasPermission('console-knowledgeBase');
    this.haspreferencesPermission = this.hasPermission('preferences');
    this.hashelpPermission = this.hasPermission('console-help');
    this.hassla_policiesPermission=this.hasPermission('sla-policies')
  }
  ngOnInit(): void {
    this.checkPermissions();
    this.menu$ = this.store.select(getEmargingNotEqual("role_console_left_menu")).subscribe((item) => {
      this.menus$ = item;
      this.menus$ = this.treegen.buildTree(item, 400);
    })

    let main = this.storage.retrive("main","o").local;
    let selectedRole = this.storage.retrive("nocompass","O").local;
    this.SuperTeamSelected = selectedRole.id;
    this.SuperTeamOptions = main.roles;


    if(this.SuperTeamOptions.length >= 2){
      this.SuperTeamShow = false;
    }
  }
  hasPermission(permissionName: string) {

    const isAccessible = this._perS.hasPermission(permissionName)
    return isAccessible
  }
  updatevalue(string:any){

    this.headerService.updateMessage(string);
  }
}
