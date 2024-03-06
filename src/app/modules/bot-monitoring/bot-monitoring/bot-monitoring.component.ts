import { Component, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { ChatVisibilityService } from '../services/chat-visibility.service';
import { BotMonitoringService } from '../services/bot-monitoring.service';

@Component({
  selector: 'app-bot-monitoring',
  templateUrl: './bot-monitoring.component.html',
  styleUrls: ['./bot-monitoring.component.scss']
})
export class BotMonitoringComponent implements OnInit {
  chats: any[] = [];
  currentActiveChats: any[] = [];
  private newChatIdSubscription: Subscription;
  constructor(private _chatVisibilityS: ChatVisibilityService, private _botMonitorS: BotMonitoringService) {
    this.newChatIdSubscription = this._chatVisibilityS.newChatId$.subscribe((newChat) => {
      if (newChat) {
        this.getChatDetails(newChat)
      }
      if (this.currentActiveChats.length > 0) {

        const apiCallInterval1 = interval(10000);
        apiCallInterval1.subscribe(() => {
          this.currentActiveChats.forEach((ch) => {

            this._botMonitorS.getChatDetails(ch).subscribe((res) => {

              const existingChatIndex = this.chats.findIndex(chat => chat[0].customer.phone === ch.customerIdentifier);
              if (existingChatIndex !== -1) {
                console.log("existingChatIndex", existingChatIndex)
                this.chats[existingChatIndex] = res;
              }
            })
          })
        });

      }
    });
  }
  getChatDetails(activeChat: any) {

    {
      const data = {
        "clientIdentifier": activeChat.to,
        "customerIdentifier": activeChat.from,
        "filter": {
          "pageNumber": 0,
          "pageSize": 0
        }
      }
      if (this.chats.length > 0) {
        const existingChatIndex = this.chats.findIndex(chat => chat[0].customer.phone === activeChat.from);

        if (existingChatIndex != -1) {
          this.chats.splice(existingChatIndex, 1);
        }
        else if (this.chats.length < 3) {
          this._botMonitorS.getChatDetails(data).subscribe((res) => {
            this.chats.push(res);
            const latObject = {
              "clientIdentifier": res[0].client.phone,
              "customerIdentifier": res[0].customer.phone,
              "filter": {
                "pageNumber": 0,
                "pageSize": 0
              }
            }
            this.currentActiveChats.push(latObject);
          })
        } else {

          alert("The maximum number of visible screens is limited to three.");
          this._chatVisibilityS.removeActiveId(activeChat.from);
        }
      }
      else {
        this._botMonitorS.getChatDetails(data).subscribe((res) => {
          this.chats.push(res);
          const latObject = {
            "clientIdentifier": res[0].client.phone,
            "customerIdentifier": res[0].customer.phone,
            "filter": {
              "pageNumber": 0,
              "pageSize": 0
            }
          }
          this.currentActiveChats.push(latObject);
        })
      }
    }
  }
  ngOnInit(): void {

  }

  ngOnDestroy() {
    this.newChatIdSubscription.unsubscribe();
  }

}
