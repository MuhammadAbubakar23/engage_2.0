import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClosePanelService } from 'src/app/services/ClosePanelServices/close-panel.service';
import { OpensidebarService } from 'src/app/services/openSidebarService/opensidebar.service';
@Component({
  selector: 'analytics-content',
  templateUrl: './analytics-content.component.html',
  styleUrls: ['./analytics-content.component.scss']
})
export class AnalyticsContentComponent implements OnInit {

  toggleLeftBar:boolean = false;
  showPanel:boolean = false;
sidebarvalue:any
  Subscription !: Subscription;
  constructor(
    private closePanelServices:ClosePanelService,
    private sidebarService:OpensidebarService
  ) { }

  ngOnInit(): void {
    this.Subscription = this.closePanelServices.receiveLeftBarToggleValue().subscribe(res=>{
      this.toggleLeftBar = res;
    })
    this.Subscription=this.sidebarService.receivedsidebarvalue().subscribe((res:any)=>{
      this.sidebarvalue=res
   
    })
    if(this.sidebarvalue='analytics'){
      this.toggleLeftBar=true
    }
    else{
      this.toggleLeftBar=false
    }
  }
  toggleSubLeftBar(){

    this.toggleLeftBar = !this.toggleLeftBar;
    if(this.toggleLeftBar == true){
      this.closePanelServices.sendRightBarToggleValue(false);
    }
   
  }
  toggleRightPanel() {
 
   this.showPanel = !this.showPanel;
  }
}
