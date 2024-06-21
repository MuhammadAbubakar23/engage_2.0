import { Component, OnInit } from '@angular/core';
import { ChatVisibilityService } from 'src/app/modules/bot-monitoring/services/chat-visibility.service';

@Component({
  selector: 'monitoring-content',
  templateUrl: './bot-monitoring-content.component.html',
  styleUrls: ['./bot-monitoring-content.component.scss']

})
export class BotMonitoringContentComponent implements OnInit {
  toggleLeftBar:boolean = false;
  showPanel:boolean = false;
  thirdActive:boolean = false;
  constructor(private _chatVS:ChatVisibilityService) {
    this._chatVS.thirdActive$.subscribe((third:any)=>{
      this.thirdActive=third;
    })
  }

  ngOnInit(): void {

  }

  toggleSubLeftBar(){

    this.toggleLeftBar = !this.toggleLeftBar;
    // if(this.toggleLeftBar == true){
    //   this.closePanelServices.sendRightBarToggleValue(false);
    // }

  }
  toggleRightPanel() {

   this.showPanel = !this.showPanel;
  }
}
