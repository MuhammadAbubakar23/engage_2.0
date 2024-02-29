import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'monitoring-content',
  templateUrl: './bot-monitoring-content.component.html',
  styleUrls: ['./bot-monitoring-content.component.scss']
  
})
export class BotMonitoringContentComponent implements OnInit {
  toggleLeftBar:boolean = false;
  showPanel:boolean = false;
  constructor() { }

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
