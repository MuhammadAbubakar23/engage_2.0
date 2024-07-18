import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/services/HeaderService/header.service';
import { BotSubMenusActiveService } from '../../services/bot-sub-menus-active.service';

@Component({
  selector: 'app-conversation-header',
  templateUrl: './conversation-header.component.html',
  styleUrls: ['./conversation-header.component.scss']
})
export class ConversationHeaderComponent implements OnInit {
  setName:any
  constructor( private headerService: HeaderService , private _botSubMenuStatus:BotSubMenusActiveService) { }
  formatUtterance(utterance: string): string {
    return utterance.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  }
  ngOnInit(): void {
    this.setName=sessionStorage.getItem("name")

  }
  updatevalue(string: any) {
      this.resetMenu();
      this.headerService.updateMessage(string);
    }
    resetMenu() {
      this._botSubMenuStatus.setActiveMenu(false);
  }
}
