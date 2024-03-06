import { Component, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { BotMonitoringService } from 'src/app/modules/bot-monitoring/services/bot-monitoring.service';
import { ChatVisibilityService } from 'src/app/modules/bot-monitoring/services/chat-visibility.service';

@Component({
  selector: 'app-monitoring-menu',
  templateUrl: './monitoring-menu.component.html',
  styleUrls: ['./monitoring-menu.component.scss']
})
export class MonitoringMenuComponent implements OnInit {
  searchText: any = '';
  defaultActiveConversation: any[] = [];
  defaultCompletedConversation: any[] = [];
  activeConversation: any[] = [];
  completedConversation: any[] = [];
  showChats = false;
  currentOpenActiveChats: any[] = [];
  currentOpenCompletedChats: any[] = [];
  activeIdSubscription: Subscription | undefined;
  constructor(private chatVisibilityService: ChatVisibilityService, private _botMonitorS: BotMonitoringService) {
    this.activeIdSubscription = this.chatVisibilityService.activeId$.subscribe((activeId) => {
      if (activeId) {
        const clickedItem = this.activeConversation.find(item => item.from === activeId) || this.completedConversation.find(item => item.from === activeId);
        clickedItem.active = false;
      }
    })
  }
  getActiveConversation() {
    this.defaultActiveConversation = [];
    this.activeConversation = [];
    const data = {
      "search": "",
      "activeConversation": true,
      "filter": {
        "pageNumber": 0,
        "pageSize": 0
      }
    }
    this._botMonitorS.getChats(data).subscribe(chats => {
      console.log("Chats", chats)
      chats.forEach((chat: any) => {
        const existingChatIndex = this.currentOpenActiveChats.findIndex(c => c.from === chat.from);
        if (existingChatIndex != -1) {
          chat.active = true;
        }
      })
      this.defaultActiveConversation = chats;
      this.activeConversation = this.defaultActiveConversation.slice();
    })
  }
  getCompletedConversation() {
    this.defaultCompletedConversation = [];
    this.completedConversation = [];
    const data = {
      "search": "",
      "activeConversation": false,
      "filter": {
        "pageNumber": 0,
        "pageSize": 0
      }
    }
    this._botMonitorS.getChats(data).subscribe(chats => {
      chats.forEach((chat: any) => {
        chat.to = '923112744502'
      })
      console.log("Chats", chats)
      chats.forEach((chat: any) => {
        const existingChatIndex = this.currentOpenCompletedChats.findIndex(c => c.from === chat.from);
        if (existingChatIndex != -1) {
          chat.active = true;
        }
      })
      this.defaultCompletedConversation = chats;
      this.completedConversation = this.defaultCompletedConversation.slice();
    })
  }

  ngOnInit(): void {
    const apiCallInterval1 = interval(10000);
    const apiCallInterval2 = interval(10000);
    apiCallInterval1.subscribe(() => {
      const currentOpenActive = this.defaultActiveConversation.filter(conversation => conversation.active)
      this.currentOpenActiveChats = currentOpenActive;
      this.getActiveConversation();
    });
    apiCallInterval2.subscribe(() => {
      const currentOpenCompleted = this.defaultCompletedConversation.filter(conversation => conversation.active)
      this.currentOpenCompletedChats = currentOpenCompleted;
      this.getCompletedConversation();
    });

  }

  toggleChatVisibility(clickedItem: any) {
    console.log("ActiveConversation", this.activeConversation)
    //const activeItems = this.activeConversation.filter(item => item.active);
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


}
