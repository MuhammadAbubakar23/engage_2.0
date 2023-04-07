import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'inbox-content',
  templateUrl: './inbox-content.component.html',
  styleUrls: ['./inbox-content.component.scss']
})
export class InboxContentComponent implements OnInit {
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
