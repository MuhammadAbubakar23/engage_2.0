import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { SharedService } from 'src/app/services/SharedService/shared.service';
import { ToggleService } from 'src/app/services/ToggleService/Toggle.service';
import { RightNavService } from 'src/app/services/RightNavService/RightNav.service';
import { Tooltip } from 'bootstrap';
@Component({
  selector: 'right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss']
})
export class RightSidebarComponent implements OnInit {
  public subscription!: Subscription;
  public subscription2!: Subscription;
  public dynamicPath : string="";
  public dynamicChildPath : string="";
  constructor(
    private sharedService : SharedService,
    private toggleService : ToggleService,
    private rightNavService : RightNavService) { }
  ngOnInit(): void {
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
  toggle(child:string) {
  if(localStorage.getItem('child') == child){
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
