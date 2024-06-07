import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { ChatVisibilityService } from '../../services/chat-visibility.service';
import { SharedModule } from 'src/app/shared/shared.module';
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
  @Output() minimizeToggle: EventEmitter<void> = new EventEmitter<void>();
  removeScreen() {
    let newChat = {
      "from": this.chat[0].customer.phone,
      "to": this.chat[0].client.phone,
      "completed": this.chat[0].completed
    }
    this.chatVisibilityService.notifyNewChatId(newChat);
    this.chatVisibilityService.removeActiveId({ 'customerPhone': this.chat[0].customer.phone, 'completed': this.chat[0].completed });
  }
  toggleMinimized(clickedItem: any): void {
    clickedItem[0]['isMinimized'] = !clickedItem[0].isMinimized;
    this.minimizeToggle.emit(clickedItem)
  }
  // toggleChatVisibility(clickedItem: any) {
  //   //const activeItems = this.activeConversation.filter(item => item.active);
  //   clickedItem.active = !clickedItem.active;
  //   this.chatVisibilityService.notifyNewChatId(clickedItem);
  // }
  constructor(private chatVisibilityService: ChatVisibilityService, private renderer: Renderer2) { }
  ngOnInit(): void {
  }
}
