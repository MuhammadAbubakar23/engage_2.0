import { Component, OnInit } from '@angular/core';
import { Subject, Subscription, interval, takeUntil } from 'rxjs';
import { BotMonitoringService } from '../../services/bot-monitoring.service';
import { ChatVisibilityService } from '../../services/chat-visibility.service';
import { CommonModule } from '@angular/common';
import { BotChatComponent } from "../bot-chat/bot-chat.component";

@Component({
    selector: 'app-bot-monitering-chat',
    templateUrl: './bot-monitering-chat.component.html',
    styleUrls: ['./bot-monitering-chat.component.scss'],
    standalone: true,
    imports: [CommonModule, BotChatComponent]
})
export class BotMoniteringChatComponent implements OnInit {

  chats: any[] = [];
  currentActiveChats: any[] = [];
  private newChatIdSubscription: Subscription | undefined;
  private apiCallInterval$: Subject<void> = new Subject<void>();


  constructor(
    private _chatVisibilityS: ChatVisibilityService,
    private _botMonitorS: BotMonitoringService
  ) { }

  getChatDetails(activeChat: any) {
    {
      const data = {
        clientIdentifier: activeChat.to,
        customerIdentifier: activeChat.from,
        filter: {
          pageNumber: 0,
          pageSize: 0,
        },
      };
      if (this.chats.length > 0) {
        if (this.chats.length == 2) {
          this._chatVisibilityS.notifythirdActive(true);
        }
        const existingChatIndex = this.chats.findIndex(chat => chat[0].customer?.phone === activeChat.from);
        console.log("this.chats", this.chats)
        if (existingChatIndex != -1) {
          const isEqual = this.chats[existingChatIndex][0]['completed'] === activeChat['completed']

          if (isEqual) {
            this.chats.splice(existingChatIndex, 1);
            this._chatVisibilityS.notifythirdActive(false);
          } else {
            this._botMonitorS.getChatDetails(data).subscribe((res) => {

              res[0]['completed'] = activeChat['completed']
              this.chats[existingChatIndex] = res;
              const latObject = {
                clientIdentifier: res[0].client?.phone,
                customerIdentifier: res[0].customer.phone,
                filter: {
                  pageNumber: 0,
                  pageSize: 0,
                },
              };
              this._chatVisibilityS.removeActiveId({
                customerPhone: activeChat.from,
                completed: !this.chats[existingChatIndex][0]['completed'],
              });
              this.currentActiveChats[existingChatIndex] = latObject;
            });
          }
        }
        else if (this.chats.length < 3) {

          this._botMonitorS.getChatDetails(data).subscribe((res) => {
            res[0]['completed'] = activeChat['completed'];
            this.chats.push(res);
            const latObject = {
              clientIdentifier: res[0].client?.phone,
              customerIdentifier: res[0].customer.phone,
              filter: {
                pageNumber: 0,
                pageSize: 0,
              },
            };
            this.currentActiveChats.push(latObject);
          });
        } else {
          alert('The maximum number of visible screens is limited to three.');
          this._chatVisibilityS.removeActiveId({
            customerPhone: activeChat.from,
            completed: activeChat['completed'],
          });
        }
      } else {
        this._botMonitorS.getChatDetails(data).subscribe((res) => {

          console.log(activeChat['completed'])
          res[0]['completed'] = activeChat['completed'];
          this.chats.push(res);
          const latObject = {
            clientIdentifier: res[0].client?.phone,
            customerIdentifier: res[0].customer.phone,
            filter: {
              pageNumber: 0,
              pageSize: 0,
            },
          };
          this.currentActiveChats.push(latObject);
        });
      }
    }
  }

  ngOnInit(): void {
    this.newChatIdSubscription = this._chatVisibilityS.newChatId$.subscribe((newChat: any) => {
      if (newChat) {
        console.log("New chat", newChat['completed'])
        this.getChatDetails(newChat);
      }

      interval(30000)
        .pipe(takeUntil(this.apiCallInterval$))
        .subscribe(() => {
          this.currentActiveChats.forEach((ch) => {
            const existingChatIndex = this.chats.findIndex(chat => chat[0]?.customer?.phone === ch.customerIdentifier);
            if (this.chats[existingChatIndex][0]['isMinimized'] === false || this.chats[existingChatIndex][0]['isMinimized'] === undefined) {
              this._botMonitorS.getChatDetails(ch)
                .pipe(takeUntil(this.apiCallInterval$))
                .subscribe((res) => {
                  if (res && res.length > 0) {
                    if (existingChatIndex !== -1) {
                      const existingChat = this.chats[existingChatIndex][0];
                      res[0]['completed'] = existingChat['completed'];http://localhost:4200/console/home
                      res[0]['isMinimized'] = existingChat['isMinimized'];
                      console.log("res", res)
                      this.chats[existingChatIndex] = res;
                      console.log("this.chats[existingChatIndex]", this.chats[existingChatIndex])
                    }
                  }
                });
            }

          });
        });
    });
  }



  onMinimizeToggle(minimizeItem: any) {
    debugger
    console.log("minimize toggle", minimizeItem, this.chats);
  }
  ngOnDestroy(): void {
    this.apiCallInterval$.next();
    this.apiCallInterval$.complete();
    if (this.newChatIdSubscription) {
      this.newChatIdSubscription.unsubscribe();
    }
  }
}