import { Component, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { ChatVisibilityService } from '../../services/chat-visibility.service';
import { BotMonitoringService } from '../../services/bot-monitoring.service';
import { CommonModule } from '@angular/common';
import { ChatHistoryComponent } from '../chat-history/chat-history.component';

@Component({
  selector: 'app-chat-bot-history',
  templateUrl: './chat-bot-history.component.html',
  styleUrls: ['./chat-bot-history.component.scss'],
  standalone: true,
  imports: [CommonModule, ChatHistoryComponent]
})
export class ChatBotHistoryComponent implements OnInit {
  chats: any[] = [];
  currentActiveChats: any[] = [];
  private newChatIdSubscription: Subscription | undefined;
  private apiCallInterval$: Subject<void> = new Subject<void>();


  constructor(
    private _chatVisibilityS: ChatVisibilityService,
    private _botS: BotMonitoringService
  ) { }

  ngOnInit(): void {

    this._chatVisibilityS.newChatId$.subscribe((newChat: any) => {
      debugger
      if (newChat) {
        const chatIndex = this.chats.findIndex(chat => chat[0].slug === newChat.slug);
        if (chatIndex !== -1) {
          this.chats.splice(chatIndex, 1);
          this._chatVisibilityS.notifythirdActive({ isActive: false, slug: newChat.slug });
        } else {
          this.getChatDetails(newChat);
        }
      }

    });
  }

  getChatDetails(activeChat: any) {
    {
      const data = { slug: activeChat.slug }
      if (this.chats.length > 0) {
        if (this.chats.length == 2) {
          this.getHistoryDetails(data);
        }
        else if (this.chats.length < 3) {
          this.getHistoryDetails(data);
        } else {
          alert('The maximum number of visible screens is limited to three.');

        }
      } else {
        this.getHistoryDetails(data);
      }
    }
  }
  getHistoryDetails(data: any) {
    this._chatVisibilityS.notifythirdActive({ isActive: false, slug: data.slug });
    this._botS.ChatHistory(data).subscribe((res: any) => {
      debugger
      console.log(res);
      res.history[0]['slug'] = data.slug;
      this.chats.push(res.history);
      // console.log(activeChat['completed'])
      // res[0]['completed'] = activeChat['completed'];
      // this.chats.push(res);
      // const latObject = {
      //   clientIdentifier: res[0].client?.phone,
      //   customerIdentifier: res[0].customer.phone,
      //   filter: {
      //     pageNumber: 0,
      //     pageSize: 0,
      //   },
      // };
      //this.currentActiveChats.push(latObject);
    });
  }
  onMinimizeToggle(minimizeItem: any) {
    console.log("minimize toggle", minimizeItem, this.chats);
  }
}
