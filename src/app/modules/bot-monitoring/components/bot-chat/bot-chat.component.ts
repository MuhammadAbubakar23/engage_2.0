import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ChatVisibilityService } from '../../services/chat-visibility.service';
import { SharedModule } from 'src/app/shared/shared.module';



@Component({
  selector: 'app-bot-chat',
  templateUrl: './bot-chat.component.html',
  styleUrls: ['./bot-chat.component.scss'],
  standalone: true,
  imports: [CommonModule,SharedModule],
})
export class BotChatComponent implements OnInit {
  @Input() chatId: string | undefined;
  isMinimized: boolean = false;
  isRemoved: boolean = false;
  @ViewChild('chatContainer', { static: true }) chatContainer: ElementRef | undefined;
  activeChat={ 'id': 1, 'name': 'Usman khan', 'lastMessage': "How are you?", 'time': '12:22AM', 'count': 4 }
  removeScreen() {
    this.chatVisibilityService.notifyNewChatId(this.chatId);
    this.chatVisibilityService.removeActiveId(this.chatId);
  }
  toggleMinimized(): void {
    this.isMinimized = !this.isMinimized;
  }
  constructor(private chatVisibilityService: ChatVisibilityService,private renderer: Renderer2) { }




  ngOnInit(): void {
    console.log(" chatId", this.chatId)
  }




  ngAfterViewInit(): void {
    this.scrollToBottom();

  }

  private scrollToBottom(): void {
    // Set the scroll position to the bottom
    if (this.chatContainer) {
      this.renderer.setProperty(this.chatContainer.nativeElement, 'scrollTop', this.chatContainer.nativeElement.scrollHeight);
    }
  }
}
