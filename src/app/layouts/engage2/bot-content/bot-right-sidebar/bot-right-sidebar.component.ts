import { Component, OnInit } from '@angular/core';
import { ToggleService } from 'src/app/services/ToggleService/Toggle.service';

@Component({
  selector: 'bot-right-sidebar',
  templateUrl: './bot-right-sidebar.component.html',
  styleUrls: ['./bot-right-sidebar.component.scss']
})
export class BotRightSidebarComponent implements OnInit {

  constructor(
    private toggleService : ToggleService) {
    }

  ngOnInit(): void {
  }

  isOpen = false;

  toggle(child:string) {
    if(localStorage.getItem('child') == child){
      this.toggleService.addTogglePanel('');
    } else{
      this.toggleService.addTogglePanel(child);
    }
  }
}
