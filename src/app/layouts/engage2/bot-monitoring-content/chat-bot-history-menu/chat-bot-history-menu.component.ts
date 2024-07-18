import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BotMonitoringService } from 'src/app/modules/bot-monitoring/services/bot-monitoring.service';
import { BotSubMenusActiveService } from 'src/app/modules/bot-monitoring/services/bot-sub-menus-active.service';
import { ChatVisibilityService } from 'src/app/modules/bot-monitoring/services/chat-visibility.service';
import { HeaderService } from 'src/app/services/HeaderService/header.service';
import { SharedService } from 'src/app/services/SharedService/shared.service';


@Component({
  selector: 'app-chat-bot-history-menu',
  templateUrl: './chat-bot-history-menu.component.html',
  styleUrls: ['./chat-bot-history-menu.component.scss']
})
export class ChatBotHistoryMenuComponent implements OnInit {
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
  searchText: any = '';

  activechatBotHistory: any = [];
  defaultchatBotHistory: any = [];
  completedConversation: any[] = [];
  showBotMonitoringContent: boolean = false;
  constructor(private chatVisibilityService: ChatVisibilityService, private _botSubMenuStatus: BotSubMenusActiveService,
    private headerService: HeaderService, private _botService: BotMonitoringService,
    private _route:Router,private _sharedS:SharedService
    ,private _spinner:NgxSpinnerService) {
      console.log("Bot History Menu ")

  }

  ngOnInit(): void {
    this._spinner.show('chat-history-menu');
    this.getChatBotHistory();
    this.chatVisibilityService.thirdActiveHistory$.subscribe((obj: any) => {
      if (obj) {
        const index = this.activechatBotHistory.findIndex((item: any) => item.slug === obj.slug)
        this.activechatBotHistory[index]['active'] = obj.active;
      }

    })
  }
  updatevalue(string: any) {
    debugger
    if (string === 'generative-bot-history') {
      this.showBotMonitoringContent = true;
    }
    else if(string ==="bot-monitoring-chat"){
      this._route.navigateByUrl('/bot-monitoring/bot-monitoring-chat');
    }
     else {
      this.showBotMonitoringContent = false;
      this.headerService.updateMessage(string);
    }
  }
  activeMenu(index: any) {
    this.activeIndex = index;
    this.isActive = true;
    this.updatevalue('component')
  }
  filterResults(text: string) {

    if (!this.searchText) {
      this.activechatBotHistory = this.defaultchatBotHistory.slice();
      return;
    }
    this.activechatBotHistory = this.defaultchatBotHistory.filter(
      (item: any) => item?.name.toLowerCase().includes(this.searchText.toLowerCase())
    );

  }
  toggleChatVisibility(clickedItem: any) {
    debugger
    clickedItem.active = !clickedItem.active;
    this.chatVisibilityService.notifyNewChatIdHistory(clickedItem);
  }
  resetMenu() {
    this._botSubMenuStatus.setActiveMenu(false);
    this.updatevalue('chat')
  }
  goBack() {
    this._sharedS.setShowGenerativeMenu('');
  }
  getChatBotHistory() {

    this._botService.chatBotHistory().subscribe((res: any) => {
      res.slugs.forEach((item: any, index: any) => {
        item.name = "Conversation" + `${index + 1}`
        item['active'] = false;
      })
      if(res.slugs.length>0){
         this._spinner.hide('chat-history-menu');
        this.activechatBotHistory = res.slugs;
      }

      // this.activechatBotHistory = [
      //   {
      //     "createdAt": "2024-07-11T07:31:14.164Z",
      //     "id": 11,
      //     "lastUpdatedAt": "2024-07-11T07:31:14.164Z",
      //     "name": "Chat",
      //     "slug": "746f2cb0-d131-4319-b949-435581d2d514",
      //     "user_id": null,
      //     "workspace_id": 4,
      //     "active": false,
      //   },
      //   {
      //     "createdAt": "2024-07-11T07:31:16.402Z",
      //     "id": 12,
      //     "lastUpdatedAt": "2024-07-11T07:31:16.402Z",
      //     "name": "Chat",
      //     "slug": "ae26f2f1-5829-4f27-8ae1-99df940dbaf9",
      //     "user_id": null,
      //     "workspace_id": 4,
      //     "active": false,
      //   },
      //   {
      //     "createdAt": "2024-07-11T07:31:17.974Z",
      //     "id": 13,
      //     "lastUpdatedAt": "2024-07-11T07:31:17.974Z",
      //     "name": "Chat",
      //     "slug": "c6a3795e-b1a7-4263-9f96-08f6ba7e3c50",
      //     "user_id": null,
      //     "workspace_id": 4,
      //     "active": false,
      //   }
      // ]
    },
      (error: any) => {
        alert('Service unavailable');
      })


    // const data = {
    //   "search": "",
    //   "activeConversation": true,
    //   "clientIdentifier": environment.clientNumber,
    //   "filter": {
    //     "pageNumber": 0,
    //     "pageSize": 0
    //   }
    // }
    // this._botMonitorS.getChats(data).subscribe(chats => {

    //   chats.forEach((chat: any) => {
    //     const existingChatIndex = this.defaultActiveConversation.findIndex(c => c.from === chat.from);
    //     if (existingChatIndex == -1) {
    //       chat.to = environment.clientNumber
    //       chat['completed'] = false;

    //       this.defaultActiveConversation.push(chat)
    //     }
    //   })
    //   this.defaultActiveConversation.forEach((chat: any) => {
    //     const existingChatIndex = chats.findIndex((c: any) => c.from === chat.from);
    //     if (existingChatIndex == -1) {
    //       this.defaultActiveConversation.splice(existingChatIndex, 1)
    //     }
    //   })
    //   this.activeConversation = this.defaultActiveConversation.slice();

    // })
  }
}
