import { Component, OnInit } from '@angular/core';
import { ChatVisibilityService } from '../../services/chat-visibility.service';
import { BotMonitoringService } from '../../services/bot-monitoring.service';
import { CommonModule } from '@angular/common';
import { ChatHistoryComponent } from '../chat-history/chat-history.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { debounceTime } from 'rxjs/operators';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-chat-bot-history',
  templateUrl: './chat-bot-history.component.html',
  styleUrls: ['./chat-bot-history.component.scss'],
  standalone: true,
  imports: [CommonModule, ChatHistoryComponent, SharedModule,NgxSpinnerModule]
})
export class ChatBotHistoryComponent implements OnInit {
  chats: any[] = [];
  currentActiveChats: any[] = [];
  hasParent: boolean = true;

  constructor(
    private _chatVisibilityS: ChatVisibilityService,
    private _botS: BotMonitoringService,
    private _spinner:NgxSpinnerService
  ) { }

  ngOnInit(): void {

    this._chatVisibilityS.newChatIdHistory$
      .pipe(debounceTime(300))
      .subscribe((newChat: any) => {

        if (newChat) {
          const chatIndex = this.chats.findIndex(chat => chat[0].slug === newChat.slug);
          console.log("chatIndex", chatIndex);
          if (chatIndex !== -1) {
            this.chats.splice(chatIndex, 1);
            this._chatVisibilityS.notifythirdActiveHistory({ active: newChat.active, slug: newChat.slug });
          } else {
            this.getChatDetails(newChat);
          }
        }
      });
  }

  getChatDetails(activeChat: any) {
    {
      const data = { active: activeChat.active, slug: activeChat.slug, name: activeChat.name }
      if (this.chats.length > 0) {
        if (this.chats.length == 2) {
          this.getHistoryDetails(data);
        }
        else if (this.chats.length < 3) {
          this.getHistoryDetails(data);
        } else {
          this._chatVisibilityS.notifythirdActiveHistory({ active: false, slug: activeChat.slug });
          alert('The maximum number of visible screens is limited to three.');

        }
      } else {
        this.getHistoryDetails(data);
      }
    }
  }
  getHistoryDetails(data: any) {
    this._spinner.show('chat-history');
    this._chatVisibilityS.notifythirdActiveHistory({ active: data.active, slug: data.slug });
    this._botS.ChatHistory({ 'slug': data.slug }).subscribe((res: any) => {
      console.log(res);
      if (res[0].history.length > 0) {
        res[0].history[0]['slug'] = data.slug;
        res[0].history[0]['name'] = data.name;
        this.chats.push(res[0].history);
        this._spinner.hide('chat-history');
      }
      else {
        alert("History not found")
      }

    });
  }
  // getHistoryDetails(data: any) {

  //   this._chatVisibilityS.notifythirdActiveHistory({ active: data.active, slug: data.slug });
  //   this._botS.ChatHistory({ 'slug': data.slug }).subscribe((res: any) => {

  //     console.log(res);
  //     if (res[0].history.length > 0) {
  //       res[0].history[0]['slug'] = data.slug;
  //       this.chats.push(res[0].history);
  //     }
  //     else {
  //       alert("History not found")
  //     }
  //     // console.log(activeChat['completed'])
  //     // res[0]['completed'] = activeChat['completed'];
  //     // this.chats.push(res);
  //     // const latObject = {
  //     //   clientIdentifier: res[0].client?.phone,
  //     //   customerIdentifier: res[0].customer.phone,
  //     //   filter: {
  //     //     pageNumber: 0,
  //     //     pageSize: 0,
  //     //   },
  //     // };
  //     //this.currentActiveChats.push(latObject);
  //   });
  // }
  onMinimizeToggle(minimizeItem: any) {
    console.log("minimize toggle", minimizeItem, this.chats);
  }
}
