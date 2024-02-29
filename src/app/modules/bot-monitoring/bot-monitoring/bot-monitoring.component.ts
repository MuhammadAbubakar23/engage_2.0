import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatVisibilityService } from '../services/chat-visibility.service';

@Component({
  selector: 'app-bot-monitoring',
  templateUrl: './bot-monitoring.component.html',
  styleUrls: ['./bot-monitoring.component.scss']
})
export class BotMonitoringComponent implements OnInit {
  newChatIds: string[] = [];
  private newChatIdSubscription: Subscription;

  constructor(private _chatVisibilityS: ChatVisibilityService) {
    this.newChatIdSubscription = this._chatVisibilityS.newChatId$.subscribe((newChatId) => {
      debugger

      if (newChatId) {
        const index = this.newChatIds.indexOf(newChatId);

        if (index !== -1) {

          this.newChatIds.splice(index, 1);
        } else if (this.newChatIds.length < 3) {

          this.newChatIds.push(newChatId);
        }
        else {
          alert("The maximum number of visible screens is limited to three.");
          this._chatVisibilityS.removeActiveId(newChatId);
        }
      }

    });
  }
  ngOnInit(): void {

  }

  ngOnDestroy() {
    this.newChatIdSubscription.unsubscribe();
  }

}
