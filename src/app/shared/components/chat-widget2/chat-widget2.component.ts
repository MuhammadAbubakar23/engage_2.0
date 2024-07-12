import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BotMonitoringService } from 'src/app/modules/bot-monitoring/services/bot-monitoring.service';
@Component({
  selector: 'app-chat-widget2',
  templateUrl: './chat-widget2.component.html',
  styleUrls: ['./chat-widget2.component.scss']
})
export class ChatWidget2Component implements OnInit {
  @ViewChild('chatBody') private chatBody?: ElementRef;
  @Input() hasParent: boolean=false;
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
    if (!this.slug) {
      this._botService.chatInit().subscribe(
        (res: any) => {
          this.slug = res.slug;
          this.sendMessage();
        },
        (error: any) => {
          alert('Service unavailable');
        }
      );
    } else {
      this.sendMessage();
    }
  }

  sendMessage() {
    const body = {
      "message": this.chatForm.value['message'],
      "slug": this.slug
    };

    this.messages.push({
      message: this.chatForm.value['message'],
      slug: this.slug,
      type: 'user',
      timestamp: new Date()
    });

    this.chatForm.reset({ message: '' });

    this._botService.ChatBotWdidget(body).subscribe(
      (res: any) => {
        this.messages.push({
          message: res.bot,
          type: 'bot',
          timestamp: new Date()
        });
      },
      (error: any) => {
        alert('Service unavailable');
      }
    );
  }


}



