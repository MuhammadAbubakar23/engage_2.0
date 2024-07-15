import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { BotMonitoringService } from '../../services/bot-monitoring.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { concatMap, forkJoin } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderService } from 'src/app/services/HeaderService/header.service';
@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule, FormsModule, ReactiveFormsModule, NgxSpinnerModule],
})
export class ConversationComponent implements OnInit {
  intents: any = [];
  rules: any[] = [];
  BotId: any
  stories: any[] = [];
  showChatbot: boolean = false;
  messages: any[] = [];
  newMessageText = ''
  ChatName: string = 'Chat BOT';
  username: string = 'User'
  currentConversationName: string = ""
  sender_id: string = '';
  list: string[] = [];
  searchQuery: string = ''
  toastermessage: boolean = false;
  AlterMsg: any
  isOpen = false;

  constructor(private headerService: HeaderService, private _botService: BotMonitoringService, private spinnerServerice: NgxSpinnerService, private _activeRoute: ActivatedRoute) { }
  @ViewChild('chatBody') private chatBody?: ElementRef;
  ngOnInit(): void {
    this._activeRoute.params.
      subscribe((param) => {
        this.currentConversationName = param['name'];
      })
    this.BotId = localStorage.getItem('bot_id');
    if (this.BotId) {
      this.fetchData();
    } else {
      console.error('BotId not found in localStorage.');
    }
    this.gen()
  }
  filteredChatbots() {
    if (!this.searchQuery) {
      return this.intents;
    }
    return this.intents.filter((bot: any) =>
      (bot.rule || bot.story).toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }


  fetchData(): void {
    this.spinnerServerice.show()
    forkJoin({
      rules: this._botService.GetRuleChatBot(this.BotId),
      stories: this._botService.GetStoriesChatBot(this.BotId)
    }).subscribe(
      ({ rules, stories }) => {
        this.spinnerServerice.hide()
        this.rules = rules;
        this.stories = stories;
        this.intents = this.rules.concat(this.stories);
        console.log('this.intents', this.intents);
      },
      error => {
        console.error('Error fetching data:', error);
        this.spinnerServerice.hide()

      }
    );
  }
  openChat() {
    this.isOpen = true;
  }
  closeChat() {
    this.isOpen = false;
    this.messages = [];
  }
  trainBot(botId: string) {
    const formData = new FormData();
    formData.append('bot_id', botId);
    this.spinnerServerice.show();
    this._botService.CreateBotTrain(formData).pipe(
      concatMap(() => this._botService.BotTrain(formData)),
      concatMap((res: any) => {
        this.spinnerServerice.hide();
        this.reloadComponent(res.messages);
        console.log(res);
        return this._botService.RunChatBot(formData);
      })
    ).subscribe(
      (res: any) => {
        this.spinnerServerice.hide();
        console.log('RunChatBot response:', res);
      },
      (error) => {
        console.error('Error training bot:', error);
        this.spinnerServerice.hide();
        console.log('Error message:', error.error.messages);
        this.reloadComponent(error.error.message);
      }
    );
  }
  updatevalue(string: any) {
    this.headerService.updateMessage(string);
  }
  closeChatBot() {
    this.showChatbot = false;
    this.resetChat();
  }
  chatBot(botid: any) {
    this.BotId = botid
    this.showChatbot = true;
    this.startNewConversation(botid)
  }
  startNewConversation(bot_id: string) {
    this.messages = [];
    this.showChatbot = true;
    this.newMessageText = '';
    // Additional logic to handle bot_id if needed
  }
  resetChat() {
    this.messages = [];
    this.newMessageText = '';
    this.sender_id = uuidv4();
  }
  gen() {
    this.sender_id = uuidv4();
    this.list.push(this.sender_id);
  }
  sendMessage() {

    if (this.newMessageText.trim() === '') {
      return;
    }
    // this.spinnerChat.show('google-map-spinner')
    // this.messages.push({ type: 'user', text: this.newMessageText });
    this.ChatBotWdidget(this.newMessageText, this.sender_id);
    this.scrollToBottom()
    this.newMessageText = '';
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
  ChatBotWdidget(message: string, sender_id: any) {
    const obj = new FormData();
    obj.append('message', message);
    this.messages.push({ message: message, type: 'user', timestamp: new Date() });
    obj.append('sender_id', sender_id);
    obj.append('bot_id', this.BotId);

    this._botService.ChatBotWdidget(obj).subscribe(
      (res: any) => {
        console.log('ChatBot response:', res);
        this.messages.push({ message: res.messages, type: 'bot', timestamp: new Date() });
        // this.spinnerChat.hide('google-map-spinner');
      },
      (error) => {
        console.error('ChatBot error:', error);
        // this.spinnerChat.hide('google-map-spinner')
        this.reloadComponent(error.error.message)
        // Handle error scenario
      }
    );
  }
  formatUtterance(utterance: string): string {
    return utterance.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  }
  DeleteRule(rule: string, event: Event) {
    
    event.stopPropagation();
    const confirmation = confirm('Are you sure you want to delete this Rule?');
    if (confirmation) {
      this.BotId = localStorage.getItem('bot_id');
      const obj = new FormData();
      obj.append('rule', rule);
      obj.append('bot_id', this.BotId);
      this._botService.RuleDelete(obj).subscribe(
        (res: any) => {
          console.log(res);
          // Filter out the deleted rule from the list
          this.rules = this.rules.filter(x => x.rule !== rule);
          this.reloadComponent(res.messages);
        },
        (error) => {
          console.error('Error deleting rule:', error);
          this.spinnerServerice.hide();
          console.log("error message====>", error.error.messages);
          this.reloadComponent(error.error.messages);
        }
      );
    }
  }
  DeleteStory(story: string, event: Event) {
    
    event.stopPropagation();
    const confirmation = confirm('Are you sure you want to delete this story?');
    if (confirmation) {
      this.BotId = localStorage.getItem('bot_id');
      const obj = new FormData();
      obj.append('story', story);
      obj.append('bot_id', this.BotId);
      this._botService.StoryDelete(obj).subscribe(
        (res: any) => {
          console.log(res);
          // Filter out the deleted story from the list
          this.stories = this.stories.filter(x => x.story !== story);
          this.reloadComponent(res.messages);
        },
        (error) => {
          console.error('Error deleting story:', error);
          this.spinnerServerice.hide();
          console.log("error message====>", error.error.messages);
          this.reloadComponent(error.error.messages);
        }
      );
    }
  }
  reloadComponent(value: any) {
    if (value) {
      this.toastermessage = true
      this.AlterMsg = value
      setTimeout(() => {
        this.toastermessage = false
      }, 4000);
    }
  }

  closeToaster() {
    this.toastermessage = false;
  }
}
