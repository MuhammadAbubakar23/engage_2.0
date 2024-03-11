import { Component, OnInit } from '@angular/core';
import { Subject, Subscription, interval, takeUntil } from 'rxjs';
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
  private newChatIdSubscription: Subscription | undefined;
  private apiCallInterval$: Subject<void> = new Subject<void>();

  constructor(private _chatVisibilityS: ChatVisibilityService, private _botMonitorS: BotMonitoringService) {
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
          }
          else {
            this._botMonitorS.getChatDetails(data).subscribe((res) => {

              res[0]['completed'] = activeChat['completed']
              this.chats[existingChatIndex] = res;
              const latObject = {
                "clientIdentifier": res[0].client?.phone,
                "customerIdentifier": res[0].customer.phone,
                "filter": {
                  "pageNumber": 0,
                  "pageSize": 0
                }
              }
              this._chatVisibilityS.removeActiveId({ 'customerPhone': activeChat.from, 'completed': !this.chats[existingChatIndex][0]['completed'] });
              this.currentActiveChats[existingChatIndex] = latObject;

            })
          }
        }
        else if (this.chats.length < 3) {

          this._botMonitorS.getChatDetails(data).subscribe((res) => {
            res[0]['completed'] = activeChat['completed']
            this.chats.push(res);
            const latObject = {
              "clientIdentifier": res[0].client?.phone,
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
          this._chatVisibilityS.removeActiveId({ 'customerPhone': activeChat.from, 'completed': activeChat['completed'] });
        }
      }
      else {
        this._botMonitorS.getChatDetails(data).subscribe((res) => {

          console.log(activeChat['completed'])
          res[0]['completed'] = activeChat['completed'];
          this.chats.push(res);
          const latObject = {
            "clientIdentifier": res[0].client?.phone,
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
    this.newChatIdSubscription = this._chatVisibilityS.newChatId$.subscribe((newChat: any) => {
      if (newChat) {
        console.log("New chat", newChat['completed'])
        this.getChatDetails(newChat);
      }

      interval(30000)
        .pipe(takeUntil(this.apiCallInterval$))
        .subscribe(() => {
          if (this.currentActiveChats.length > 0) {
            this.currentActiveChats.forEach((ch) => {
              this._botMonitorS.getChatDetails(ch)
                .pipe(takeUntil(this.apiCallInterval$))
                .subscribe((res) => {
                  if (this.currentActiveChats.length > 0) {
                    this.currentActiveChats.forEach((ch) => {
                      this._botMonitorS.getChatDetails(ch).subscribe((res) => {

                        const existingChatIndex = this.chats.findIndex(chat => chat[0].customer?.phone === ch.customerIdentifier);
                        const minimizeToggle = this.chats[existingChatIndex][0]['isMinimized'];
                        const completed = this.chats[existingChatIndex][0]['completed'];
                        res[0]['completed'] = completed;
                        if (minimizeToggle === true) {
                          res[0]['isMinimized'] = true;
                        }
                        else {
                          res[0]['isMinimized'] = false;
                        }
                        if (existingChatIndex !== -1) {
                          this.chats[existingChatIndex] = res;
                        }
                      });
                    });
                  }
                });
            });
          }
        });
    });
  }

  // ngOnInit(): void {
  //   this.newChatIdSubscription = this._chatVisibilityS.newChatId$.subscribe((newChat: any) => {
  //     if (newChat) {
  //       console.log("New chat", newChat['completed'])
  //       this.getChatDetails(newChat);
  //     }

  //     this.apiCallIntervalSubscription = interval(30000).subscribe(() => {
  // if (this.currentActiveChats.length > 0) {
  //   this.currentActiveChats.forEach((ch) => {
  //     this._botMonitorS.getChatDetails(ch).subscribe((res) => {
  //
  //       const existingChatIndex = this.chats.findIndex(chat => chat[0].customer?.phone === ch.customerIdentifier);
  //       const minimizeToggle = this.chats[existingChatIndex][0]['isMinimized'];
  //       const completed = this.chats[existingChatIndex][0]['completed'];
  //       res[0]['completed'] = completed;
  //       if (minimizeToggle === true) {
  //         res[0]['isMinimized'] = true;
  //       }
  //       else {
  //         res[0]['isMinimized'] = false;
  //       }
  //       if (existingChatIndex !== -1) {
  //         this.chats[existingChatIndex] = res;
  //       }
  //     });
  //   });
  // }

  //     });
  //   });


  onMinimizeToggle(activeChat: any) {

    console.log("this.chats", this.chats)
  }
  ngOnDestroy(): void {
    this.apiCallInterval$.next();
    this.apiCallInterval$.complete();
    if (this.newChatIdSubscription) {
      this.newChatIdSubscription.unsubscribe();
    }
  }
}
