import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/SharedService/shared.service';
import { MenuService } from 'src/app/shared/services/menu.service';

@Component({
  selector: 'app-bot-main-menu',
  templateUrl: './bot-main-menu.component.html',
  styleUrls: ['./bot-main-menu.component.scss']
})
export class BotMainMenuComponent implements OnInit {
  menuItems: any[] = [];
  subMenus = [
    {
      "DisplayName": " Chat BOT ",
      "RouteName": "/bot-monitoring/chat-bot",
      "Icon": "",
      "isChild": false,
      "Children": [

        {
          "DisplayName": "Component",
          "RouteName": "/bot-monitoring/chat-bot/components"
        },

      ]
    }
  ];
  activeIndex = 0;
  isActive = false;
  constructor(private _menuS: MenuService, private _sharedS: SharedService) { }

  ngOnInit(): void {
    this._menuS.getBotMenu.subscribe((menu: any) => {

      if (menu) {
        this.menuItems = menu[0]?.subMenu;
      }

    })
  }
  toggleCollapse(menu: any) {
    debugger
    if (menu['link'] === 'generative-bot-history') {
      //this.updatevalue('generative-bot-history');
      this._sharedS.setShowGenerativeMenu('generative');
    }
    else if (menu['link'] === 'bot-monitoring-chat') {
      this._sharedS.setShowGenerativeMenu('bot-monitor');
    }
    else {
      this._sharedS.setShowGenerativeMenu('');
    }

    menu.expanded = !menu.expanded;
  }
}
