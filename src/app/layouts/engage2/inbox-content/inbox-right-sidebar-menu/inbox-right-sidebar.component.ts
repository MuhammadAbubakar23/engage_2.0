import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { ToggleService } from 'src/app/services/ToggleService/Toggle.service';
import { RightNavService } from 'src/app/services/RightNavService/RightNav.service';
import { Store } from '@ngrx/store';
import { MenuState } from '../../menu-state/menu.state';
import { getEmargingEqual, getInSubEmarging } from '../../menu-state/menu.selectors';
import { Router,Event, NavigationEnd } from '@angular/router';

@Component({
  selector: 'inbox-right-sidebar',
  templateUrl: './inbox-right-sidebar.component.html',
  styleUrls: ['./inbox-right-sidebar.component.scss']
})

export class InboxRightSidebarComponent implements OnInit {
  public keyword:string = "inbox";
  public subscription!: Subscription;
  public subscription2!: Subscription;
  public dynamicPath : string="";
  public dynamicChildPath : string="";

  //MenuModel = new MenuModel();
  //menus$ :any[] = [];
  @Output("toggleRightPanel") toggleRightPanelParent: EventEmitter<any> = new EventEmitter();
  menus$ :any = [];
  menu$ :any;
  loading$: any;
  constructor(private store: Store<MenuState>,
    private toggleService : ToggleService,
    private rightNavService : RightNavService,
    private router: Router) {    
      let _self = this;      
      router.events.subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {          
            console.log(event.url.toString());
            if(event.url.toString().toLowerCase().includes(this.keyword)){
              this.keyword = "inbox";
            }
            else{
              this.keyword = "responder";
            }            
        }
      });

    }

  ngOnInit(): void {
    this.menus$ =[];
    this.menu$ = this.store.select(getInSubEmarging(this.keyword, "right_menu")).subscribe((item:any) => {
      for(let key in item) {
        let obj = {
          emerging: item[key].emerging,
          mainId: item[key].mainId,
          baseId: item[key].baseId,
          icon: item[key].icon,
          name: item[key].name,
          slug: item[key].slug,
          link: item[key].link,
          indexNo: item[key].indexNo
        };
        Object.assign(obj, {dival: item[key].slug+"-rightbar-dashboard"});
          if(!this.menus$.includes(obj))
            this.menus$.push(obj);
        }
      // this.menus$ = item;
    });
    console.log(this.menus$);
    // Array.from(document.querySelectorAll('[data-bs-toggle]'))
    // .forEach(tooltipNode => new Tooltip(tooltipNode))
    // this.getRightMenu();

    let parent = localStorage.getItem("parent");

    this.subscription2 = this.rightNavService.getChildComponent().subscribe(msg2 => {
      this.dynamicChildPath = msg2;
    });
  }

  isOpen = false;

  // getRightMenu(){

  //   this.MenuModel = {
  //     emerging : "",
  //     equal : 0,
  //     id : "",
  //     sub : "",
  //     base : ""
  //   }
  //   this.commonService.GetMenu("team", this.MenuModel).subscribe((res:any)=> {

  //     res.forEach((menu:any) => {
  //       if(menu.emerging == "right_menu" && (menu.name != "Complaints")){
  //         this.menus$.push(menu)
  //       }
  //     });
  //     // console.log(this.menus$)
  //   })
  // }

  toggleRightBar(child:string) {

    // this.parentFun.emit();
    if(localStorage.getItem('child') == child){
      this.toggleRightPanelParent.emit();
      this.toggleService.addTogglePanel('');
    } else{
      this.toggleService.addTogglePanel(child);
    }



//     let routr = this._route.url.split('/')[1];
//  let parent = localStorage.getItem("parent");

//  if (localStorage.getItem('child') == child){
//   this.isOpen = false;
//   localStorage.setItem('child','')
//  } else {
//   this.isOpen = true;
//  }


//     if(this.isOpen){
//       this._route.navigateByUrl(routr+'/'+ parent+'/'+child);

//       this.toggleService.addTogglePanel("panelToggled");

//     }else{
//       this._route.navigateByUrl(routr+'/'+ parent);
//       this.toggleService.addTogglePanel("");

//     }

  }

}
