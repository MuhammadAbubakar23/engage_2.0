import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin-panel-content',
  templateUrl: './admin-panel-content.component.html',
  styleUrls: ['./admin-panel-content.component.scss']
})
export class AdminPanelContentComponent implements OnInit {
  showPanel:boolean=false
  toggleLeftBar:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  toggleRightPanel() {
 
    this.showPanel = !this.showPanel;
   }
   toggleSubLeftBar(){

    this.toggleLeftBar = !this.toggleLeftBar;
    // if(this.toggleLeftBar == true){
    //   this.closePanelServices.sendRightBarToggleValue(false);
    // }
   
  }
}
