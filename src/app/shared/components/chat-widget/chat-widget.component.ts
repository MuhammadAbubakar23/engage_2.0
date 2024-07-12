import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BotMonitoringService } from 'src/app/modules/bot-monitoring/services/bot-monitoring.service';
@Component({
  selector: 'app-chat-widget',
  templateUrl: './chat-widget.component.html',
  styleUrls: ['./chat-widget.component.scss']
})
export class ChatWidgetComponent implements OnInit {
  @ViewChild('chatBody') private chatBody?: ElementRef;
  messages: any[] = [];
  isOpen = false;
  slug = "";
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
    //this.messages = [];
  }
  submitMessage() {
    const body = {
      "message": this.chatForm.value['message']
    };

    this.messages.push({ message: this.chatForm.value['message'], type: 'user', timestamp: new Date() });
    this.chatForm.reset({ message: '' });

    this._botService.ChatWdidget(body).subscribe(
      (res: any) => {
        this.messages.push({ message: res.bot, type: 'bot', timestamp: new Date() });
      },
      (error: any) => {
        alert('Service unavailable')
      }
    );
  }



}



