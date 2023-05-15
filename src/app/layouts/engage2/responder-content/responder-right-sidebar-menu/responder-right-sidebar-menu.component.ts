import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { RightNavService } from 'src/app/services/RightNavService/RightNav.service';
import { SharedService } from 'src/app/services/SharedService/shared.service';
import { ToggleService } from 'src/app/services/ToggleService/Toggle.service';
import { loadMenusList } from '../../state/menu.actions';
import { getEmargingEqual, getMenusLoading } from '../../state/menu.selectors';
import { MenuState } from '../../state/menu.state';

@Component({
  selector: 'responder-right-sidebar-menu',
  templateUrl: './responder-right-sidebar-menu.component.html',
  styleUrls: ['./responder-right-sidebar-menu.component.scss']
})
export class ResponderRightSidebarMenuComponent implements OnInit {
  @Output("toggleRightPanel") toggleRightPanelParent: EventEmitter<any> = new EventEmitter();
  menus$ :any = [];
  menu$ :any;
  loading$: any;

  public subscription!: Subscription;
  public subscription2!: Subscription;
  public dynamicPath : string="";
  public dynamicChildPath : string="";
  
  constructor(
    private store: Store<MenuState>, 
    private sharedService : SharedService,
    private toggleService : ToggleService,
    private rightNavService : RightNavService) { 
      this.menu$ = this.store.select(getEmargingEqual("team_inbox_right_menu"));
      this.loading$ = this.store.select(getMenusLoading)
      this.store.dispatch(loadMenusList())
    }

  ngOnInit(): void {
    this.menu$ = this.store.select(getEmargingEqual("team_inbox_right_menu")).subscribe((item) => {
      this.menus$ = item;
    })
   
    // Array.from(document.querySelectorAll('[data-bs-toggle]'))
    // .forEach(tooltipNode => new Tooltip(tooltipNode));
    
   let parent = localStorage.getItem("parent");
   if(parent != "undefined")
   {
       this.subscription = this.sharedService.getMessage().subscribe(msg => { 
         
        
       this.dynamicPath = msg;
       });
   }

    this.subscription2 = this.rightNavService.getChildComponent().subscribe(msg2 => { 
    
      
    this.dynamicChildPath = msg2;
    });
  }

  isOpen = false;
  

  toggleRightBar(child:string) {
  if(localStorage.getItem('child') == child){
    this.toggleService.addTogglePanel('');
  

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
}
