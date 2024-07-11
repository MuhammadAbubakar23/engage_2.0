import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChatVisibilityService } from '../../services/chat-visibility.service';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

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
    debugger
    let newChat =
      {"slug": this.chat[0].slug}

    this.chatVisibilityService.notifyNewChatId(newChat);
    //this.chatVisibilityService.removeActiveId({"slug": this.chat[0].slug});
  }
  toggleMinimized(): void {
    this.isMinimized = !this.isMinimized;
    //this.minimizeToggle.emit(clickedItem)
  }

  constructor(private chatVisibilityService: ChatVisibilityService) { }
  ngOnInit(): void {
    debugger
    console.log("this.chat",this.chat)
  }
}

