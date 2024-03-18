import { Component, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { BotMonitoringService } from 'src/app/modules/bot-monitoring/services/bot-monitoring.service';
import { ChatVisibilityService } from 'src/app/modules/bot-monitoring/services/chat-visibility.service';
import { environment } from 'src/environments/environment';

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
  activeIdSubscription: Subscription | undefined;
  private apiCallInterval1: Subscription | undefined;
  private apiCallInterval2: Subscription | undefined;
  constructor(private chatVisibilityService: ChatVisibilityService, private _botMonitorS: BotMonitoringService) {
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
    this.getActiveConversation();
    this.apiCallInterval1 = interval(20000).subscribe(() => {
      this.getActiveConversation();
    });
    // this.apiCallInterval2 = interval(3000).subscribe(() => {
    //   this.getCompletedConversation();
    // });

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
}
