import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'analytics-content',
  templateUrl: './analytics-content.component.html',
  styleUrls: ['./analytics-content.component.scss']
})
export class AnalyticsContentComponent implements OnInit {

  toggleLeftBar:boolean = true;
  showPanel:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  toggleSubLeftBar(){
    this.toggleLeftBar = !this.toggleLeftBar;
  }
  toggleRightPanel() {
   this.showPanel = !this.showPanel;
  }
}
