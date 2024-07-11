import { Component, OnInit } from '@angular/core';
import { BotSubMenusActiveService } from '../../services/bot-sub-menus-active.service';

@Component({
  selector: 'app-chat-bot-header',
  templateUrl: './chat-bot-header.component.html',
  styleUrls: ['./chat-bot-header.component.scss']
})
export class ChatBotHeaderComponent implements OnInit {
  resetMenu() {
    this._botSubMenuStatus.setActiveMenu(false);
}
  constructor(private _botSubMenuStatus:BotSubMenusActiveService) { }

  ngOnInit(): void {
  }

}
