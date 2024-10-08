import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { HeaderService } from 'src/app/services/HeaderService/header.service';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { TreeGenService } from 'src/app/shared/services/tree-gen/tree-gen.service';
import { loadMenusList } from '../../menu-state/menu.actions';
import { MenuModel } from '../../menu-state/menu.model';
import { getEmargingEqual, getEmargingNotEqual, getMenusLoading } from '../../menu-state/menu.selectors';
import { MenuState } from '../../menu-state/menu.state';
import { Subscription, interval } from 'rxjs';
import { BotMonitoringService } from 'src/app/modules/bot-monitoring/services/bot-monitoring.service';
import { ChatVisibilityService } from 'src/app/modules/bot-monitoring/services/chat-visibility.service';
import { environment } from 'src/environments/environment';
import { BotSubMenusActiveService } from 'src/app/modules/bot-monitoring/services/bot-sub-menus-active.service';
import { SharedService } from 'src/app/services/SharedService/shared.service';


@Component({
  selector: 'app-bot-monitoring-menus',
  templateUrl: './bot-monitoring-menus.component.html',
  styleUrls: ['./bot-monitoring-menus.component.scss']
})
export class BotMonitoringMenusComponent implements OnInit {
  anymenus$: any;
  menus$: any;
  menu$: any;
  loading$: any;
  SuperTeamSelected: number = 0;
  SuperTeamOptions: any = [];
  SuperTeamShow: boolean = true;
  searchText: any = '';
  defaultActiveConversation: any[] = [];
  defaultCompletedConversation: any[] = [];
  activeConversation: any[] = [];
  completedConversation: any[] = [];
  showChats = false;
  showBotMonitoringContent: boolean = false;
  activeIdSubscription: Subscription | undefined;
  private apiCallInterval1: Subscription | undefined;
  private apiCallInterval2: Subscription | undefined;
  activeIndex = 0;
  resetMenu() {
    this._botSubMenuStatus.setActiveMenu(false);
    this.updatevalue('chat')
  }

  isActive = false;

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


  constructor(private chatVisibilityService: ChatVisibilityService, private _botMonitorS: BotMonitoringService, private headerService: HeaderService,
    private _botSubMenuStatus: BotSubMenusActiveService,private _sharedS:SharedService) {
      console.log("Bot Monitor Menu ")
    this._botSubMenuStatus.activationStatus.subscribe(value => {
      this.subMenus[0].isChild = value;
    });


    this.activeIdSubscription = this.chatVisibilityService.activeId$.subscribe((active) => {
      if (active) {
        console.log("active Id ", active);
        const clickedItem1 = this.activeConversation.find(item => item.from === active.customerPhone && item.completed === active.completed);
        if (clickedItem1) {

          clickedItem1.active = false;
        }
        const clickedItem2 = this.completedConversation.find(item => item.from === active.customerPhone && item.completed === active.completed);
        if (clickedItem2) {

          clickedItem2.active = false;
        }


      }
    })
  }
  activeMenu(index: any) {
    this.activeIndex = index;
    this.isActive = true;
    this.updatevalue('component')
  }
  getActiveConversation() {

    const data = {
      "search": "",
      "activeConversation": true,
      "clientIdentifier": environment.clientNumber,
      "filter": {
        "pageNumber": 0,
        "pageSize": 0
      }
    }
    this._botMonitorS.getChats(data).subscribe(chats => {

      chats.forEach((chat: any) => {
        const existingChatIndex = this.defaultActiveConversation.findIndex(c => c.from === chat.from);
        if (existingChatIndex == -1) {
          chat.to = environment.clientNumber
          chat['completed'] = false;

          this.defaultActiveConversation.push(chat)
        }
      })
      this.defaultActiveConversation.forEach((chat: any) => {
        const existingChatIndex = chats.findIndex((c: any) => c.from === chat.from);
        if (existingChatIndex == -1) {
          this.defaultActiveConversation.splice(existingChatIndex, 1)
        }
      })
      this.activeConversation = this.defaultActiveConversation.slice();

    })
  }
  getCompletedConversation() {

    const data = {
      "search": "",
      "activeConversation": false,
      "clientIdentifier": environment.clientNumber,
      "filter": {
        "pageNumber": 0,
        "pageSize": 0
      }
    }
    this._botMonitorS.getChats(data).subscribe(chats => {

      chats.forEach((chat: any) => {
        const existingChatIndex = this.defaultCompletedConversation.findIndex(c => c.from === chat.from);
        if (existingChatIndex == -1) {
          chat.to = environment.clientNumber
          chat['completed'] = true;
          this.defaultCompletedConversation.push(chat)
        }
      })
      this.defaultCompletedConversation.forEach((chat: any) => {
        const existingChatIndex = chats.findIndex((c: any) => c.from === chat.from);
        if (existingChatIndex == -1) {
          this.defaultCompletedConversation.splice(existingChatIndex, 1)
        }
      })
      this.completedConversation = this.defaultCompletedConversation.slice();
    })

  }

  ngOnInit(): void {

  }

  toggleChatVisibility(clickedItem: any) {

    clickedItem.active = !clickedItem.active;

    this.chatVisibilityService.notifyNewChatId(clickedItem);
  }

  filterResults(text: string) {
    if (text === 'active') {
      if (!this.searchText) {
        this.activeConversation = this.defaultActiveConversation.slice();
        return;
      }
      this.activeConversation = this.defaultActiveConversation.filter(
        item => item?.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }

    else {
      if (!this.searchText) {
        this.completedConversation = this.defaultCompletedConversation.slice();
        return;
      }
      this.completedConversation = this.defaultCompletedConversation.filter(
        item => item?.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }

  }

  ngOnDestroy(): void {
    if (this.activeIdSubscription) {
      this.activeIdSubscription.unsubscribe();
    }
    if (this.apiCallInterval1) {
      this.apiCallInterval1.unsubscribe();
    }
    if (this.apiCallInterval2) {
      this.apiCallInterval2.unsubscribe();
    }
  }
  goBack() {
    this._sharedS.setShowGenerativeMenu('');
  }
  updatevalue(string: any) {
    if (string === 'bot-monitering') {
      this.showBotMonitoringContent = true;
    } else {
      this.showBotMonitoringContent = false;
      this.headerService.updateMessage(string);
    }
  }
}
