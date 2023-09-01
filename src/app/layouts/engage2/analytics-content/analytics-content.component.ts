import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClosePanelService } from 'src/app/services/ClosePanelServices/close-panel.service';

@Component({
  selector: 'analytics-content',
  templateUrl: './analytics-content.component.html',
  styleUrls: ['./analytics-content.component.scss']
})
export class AnalyticsContentComponent implements OnInit {

  toggleLeftBar:boolean = false;
  showPanel:boolean = false;

  Subscription !: Subscription;
  constructor(
    private closePanelServices:ClosePanelService
  ) { }

  ngOnInit(): void {
    this.Subscription = this.closePanelServices.receiveLeftBarToggleValue().subscribe(res=>{
      this.toggleLeftBar = res;
    })
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
