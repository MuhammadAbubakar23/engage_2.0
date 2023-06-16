import { Component, OnInit } from '@angular/core';
import {
  Router, Event, NavigationStart, RoutesRecognized,
  RouteConfigLoadStart, RouteConfigLoadEnd,
  NavigationEnd, NavigationCancel, NavigationError, GuardsCheckStart, ChildActivationStart, ActivationStart, GuardsCheckEnd, ResolveStart, ResolveEnd, ChildActivationEnd, ActivationEnd, Scroll
} from '@angular/router';


import { Store } from '@ngrx/store';
import { HeaderService } from 'src/app/services/HeaderService/header.service';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { TreeGenService } from 'src/app/shared/services/tree-gen/tree-gen.service';
import { loadMenusList } from '../../menu-state/menu.actions';
import { MenuModel } from '../../menu-state/menu.model';
import { getEmarging, getEmargingEqual, getEmargingNotEqual, getMenusLoading } from '../../menu-state/menu.selectors';
import { MenuState } from '../../menu-state/menu.state';

@Component({
  selector: 'sub-role-menu',
  templateUrl: './sub-role-menu.component.html',
  styleUrls: ['./sub-role-menu.component.scss']
})
export class SubRoleMenuComponent implements OnInit {
  SubMenuPages:any = [
    {name:"Console", slug:"console", parentId:400},
    {name:"Analytics", slug:"analytic", parentId:470},
  //  {name:"All Inbox", slug:"all-inbox", parentId:470},
  ];
  SubMenuPage:any = {name:"Console", slug:"console", parentId:400} ;

  EmargeType$?:string;
  EmargeParent$?:number=400;//470
  EmargeShow$?:boolean=true;

  
  anymenus$ :any;
  menus$ :any;

  menu$ :any;
  loading$: any;

  SuperTeamSelected:number=0; 
  SuperTeamOptions:any=[];
  SuperTeamShow:boolean = true;
  
  myUrl:string = "";
  constructor(private store: Store<MenuState>, 
    private treegen: TreeGenService<MenuModel>, 
    private headerService: HeaderService, 
    private storage:StorageService, 
    private router: Router) {
    
    let _self = this;
    
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        // _self.SubMenuPage = this.SubMenuPages.filter(function(element:any) {
        //   return event.url.toString().toLowerCase().includes(element.slug);
        // }); // because return array index;
        //console.log(_self.SubMenuPage);
        if(event.url.toString().toLowerCase().includes("undefined")){
         
        }
        this.myUrl = event.url.toString().toLowerCase();
        // else{
          _self.SubMenuPages.forEach(function(subMenuPage:any) {
            if(event.url.toString().toLowerCase().includes(subMenuPage.slug)){
              _self.SubMenuPage = subMenuPage;
              console.log(subMenuPage);
              //  _self.store.select(getEmarging(subMenuPage.slug)).subscribe((item) => {
              //   console.log(item);
              //   _self.menus$ = _self.treegen.buildTree(item, subMenuPage.parentId);
              //   console.log(_self.menus$);
              // });
            }
          });
       // }
        
    
      }
    });
  }
  ngOnInit(): void {
   
    if(this.myUrl.includes("undefined")){

    }else{
      this.menus$ = [];
      let _self = this;
      console.log(_self.SubMenuPage);
      _self.store.select(getEmarging(_self.SubMenuPage.slug)).subscribe((item:any) => {
        console.log(item);
        
        if(item.length > 0)
          _self.menus$ = _self.treegen.buildTree(item, _self.SubMenuPage.parentId);
        
          console.log(_self.menus$);
      });
  


    }
    
    // this.router.events.subscribe((event: Event) => {
    //   if (event instanceof NavigationStart) {
        
    //     _self.SubMenuPages.forEach(function(subMenuPage:any, index:number) {
    //       console.log(subMenuPage);
    //       if(event.url.toString().toLowerCase().includes(subMenuPage.slug)){
    //         console.log(subMenuPage);
    //         _self.EmargeType$ = subMenuPage.name;
    //         _self.menu$ = _self.store.select(getEmarging(subMenuPage.slug)).subscribe((item) => {
    //           // this.menus$ = item;
    //           console.log(item);
    //           _self.menus$ = _self.treegen.buildTree(item, subMenuPage.parentId);
    //           console.log(_self.menus$);
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
        // console.log(resultConsole);
        // console.log(resultAnalytics);
        // console.log(event.url.toString().split('/'));
        // if(event.url.toString())
        // console.log('NavigationStart --- ', event.url);
      // }
    // });
    // this.menu$ = this.store.select(getEmarging(this.LoadDataEmargeType)).subscribe((item) => {
    //   this.menus$ = item;
    //   console.log(item);
    //   this.menus$ = this.treegen.buildTree(item, 400);
    //   console.log(this.anymenus$);
    // })
    
    let main = this.storage.retrive("main","o").local;
    let selectedRole = this.storage.retrive("nocompass","O").local;
    this.SuperTeamSelected = selectedRole.id;  
    this.SuperTeamOptions = main.roles;
    //console.log(this.SuperTeamOptions);
   

    if(this.SuperTeamOptions.length >= 2){
      this.SuperTeamShow = false;
    }
  }
  
  updatevalue(string:any){    
    this.headerService.updateMessage(string);
  }
}