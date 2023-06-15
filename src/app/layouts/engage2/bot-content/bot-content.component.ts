import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bot-content',
  templateUrl: './bot-content.component.html',
  styleUrls: ['./bot-content.component.scss']
})
export class BotContentComponent implements OnInit {

  toggleLeftBar: boolean = true;
  showPanel: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  toggleSubLeftBar() {
    this.toggleLeftBar = !this.toggleLeftBar;
  }
  toggleRightPanel() {
    this.showPanel = !this.showPanel;
  }
}
