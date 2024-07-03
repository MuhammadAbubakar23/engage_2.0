import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BotMonitoringService } from 'src/app/modules/bot-monitoring/services/bot-monitoring.service';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-chat-widget',
  templateUrl: './chat-widget.component.html',
  styleUrls: ['./chat-widget.component.scss']
})
export class ChatWidgetComponent implements OnInit {
  @ViewChild('chatBody') private chatBody?: ElementRef;
  messages: any[] = [];
  isOpen = false;
  chatForm: FormGroup = new FormGroup({
    message: new FormControl('', [Validators.required])
  })
  constructor(private _botService: BotMonitoringService) { }

  ngOnInit(): void {

  }
  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      if (this.chatBody) {
        this.chatBody.nativeElement.scrollTop = this.chatBody.nativeElement.scrollHeight;
      }
    } catch (err) { }
  }
  openChat() {
    this.isOpen = true;
  }
  closeChat() {
    this.isOpen = false;
    this.messages=[];
  }
  submitMessage() {
    const senderId = uuidv4();
    const body = new FormData();
    body.append('message', this.chatForm.value['message']);
    this.messages.push({ message: this.chatForm.value['message'], type: 'user', timestamp: new Date() });
    this.chatForm.reset({ message: '' })
    body.append('sender_id', senderId);
    body.append('bot_id', "57");
    this._botService.ChatBotWdidget(body).subscribe((res: any) => {
      this.messages.push({ message: res.messages, type: 'bot', timestamp: new Date() });
    });
  }
}



