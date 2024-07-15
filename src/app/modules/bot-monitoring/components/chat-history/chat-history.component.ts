import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChatVisibilityService } from '../../services/chat-visibility.service';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChatWidget2Component } from 'src/app/shared/components/chat-widget2/chat-widget2.component';

@Component({
  selector: 'app-chat-history',
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule],
})
export class ChatHistoryComponent implements OnInit {

  @Input() chat: any = [];
  isMinimized: boolean = true;
  isRemoved: boolean = false;
  @Output() minimizeToggle: EventEmitter<void> = new EventEmitter<void>();
  removeScreen() {
    
    let newChat =
      { "slug": this.chat[0].slug }
    this.chatVisibilityService.notifyNewChatIdHistory(newChat);
  }
  toggleMinimized(): void {
    this.isMinimized = !this.isMinimized;
  }

  constructor(private chatVisibilityService: ChatVisibilityService) { }
  ngOnInit(): void {
    
    console.log("this.chat", this.chat)
  }
}

