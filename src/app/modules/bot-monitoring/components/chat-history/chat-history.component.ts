import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChatVisibilityService } from '../../services/chat-visibility.service';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChatWidget2Component } from 'src/app/shared/components/chat-widget2/chat-widget2.component';
import { BotMonitoringService } from '../../services/bot-monitoring.service';

@Component({
  selector: 'app-chat-history',
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule],
})
export class ChatHistoryComponent implements OnInit {

  @Input() chat: any = { history: [], tags: [] };
  isMinimized: boolean = true;
  isRemoved: boolean = false;
  @Output() minimizeToggle: EventEmitter<void> = new EventEmitter<void>();

  constructor(private chatVisibilityService: ChatVisibilityService, private _botS: BotMonitoringService) { }
  ngOnInit(): void {

    console.log("this.chat", this.chat)
  }
  removeScreen() {

    let newChat =
      { "slug": this.chat[0].slug }
    this.chatVisibilityService.notifyNewChatIdHistory(newChat);
  }
  toggleMinimized(): void {
    this.isMinimized = !this.isMinimized;
  }
  refreshHistory() {

    this._botS.ChatHistory({ 'slug': this.chat[0].slug }).subscribe((res: any) => {
      if (res[0].history.length > 0) {
        res[0].history[0]['slug'] = this.chat[0].slug;
        res[0].history[0]['name'] = this.chat[0].name;
        this.chat = res[0].history;
        //this.chats.push(res[0].history);
      } else {
        alert("History not found");
      }
    }, (error) => {
      console.error(error);
    });
  }
}

