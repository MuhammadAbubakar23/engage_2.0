import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ChatVisibilityService } from '../../services/chat-visibility.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { BotMonitoringService } from '../../services/bot-monitoring.service';

@Component({
  selector: 'app-bot-chat',
  templateUrl: './bot-chat.component.html',
  styleUrls: ['./bot-chat.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule],
})
export class BotChatComponent implements OnInit {
  @Input() chat: any = [];
  isMinimized: boolean = false;
  isRemoved: boolean = false;
  removeScreen() {
    let newChat = {
      "from": this.chat[0].customer.phone,
      "to": this.chat[0].client.phone,
    }
    this.chatVisibilityService.notifyNewChatId(newChat);
    this.chatVisibilityService.removeActiveId(this.chat[0].customer.phone);
  }
  toggleMinimized(): void {
    this.isMinimized = !this.isMinimized;
  }
  constructor(private chatVisibilityService: ChatVisibilityService, private renderer: Renderer2) { }

  ngOnInit(): void {
    console.log(" chatArray", this.chat)

  }


}
