import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'responder-content',
  templateUrl: './responder-content.component.html',
  styleUrls: ['./responder-content.component.scss']
})
export class ResponderContentComponent implements OnInit {
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
