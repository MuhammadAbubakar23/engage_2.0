import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { BotMonitoringService } from '../../services/bot-monitoring.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, FormControl, FormControlName } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderService } from 'src/app/services/HeaderService/header.service';
import { ChatbotIdService } from 'src/app/services/chatBot_idService/chatbot-id.service';
import { Router } from '@angular/router';
import { Modal } from 'bootstrap';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { concatMap } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { BotSubMenusActiveService } from '../../services/bot-sub-menus-active.service';
@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule, ReactiveFormsModule, RouterModule, FormsModule, NgxSpinnerModule],
})
export class ChatBotComponent implements OnInit {
  @ViewChild('chatBody') private chatBody?: ElementRef;
  chatbots: any[] = []
  chatbotForm: FormGroup;
  BotId: any;
  toastermessage: boolean = false;
  AlterMsg: any
  searchQuery: string = ''
  isDeleteAction: boolean = false;
  messages: any[] = [];
  newMessageText = ''
  ChatName: string = 'Chat BOT';
  username: string = 'User'
  isActive: boolean = false;
  senderName: any

  // messages = [
  //   {
  //     id: 1,
  //     userName: 'Fatima Ahmed',
  //     userMessage: 'Hi, I am looking for some solution to update my account settings from the admin panel can you update me on this.',
  //     agentMessage: 'Sure let me share the details how to change your account details from settings.',
  //   },

  //   // Add more message objects as needed
  // ];
  constructor(private _botService: BotMonitoringService,
    private chatBotIdS: ChatbotIdService,
    private route: Router, private spinnerServerice: NgxSpinnerService, private spinnerChat: NgxSpinnerService,
    private formBuilder: FormBuilder, private headerService: HeaderService, private _botSubMenuStatus: BotSubMenusActiveService) {
    this.chatbotForm = new FormGroup({
      name: new FormControl('', Validators.required),
      timeout: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      strictFlow: new FormControl(false)
      // botType: new FormControl('', Validators.required)
    });
    // this.messages.push({ type: 'agent', text: 'Hello! How can I assist you today?' });

  }
  saveBotId(botId: any) {
    sessionStorage.setItem('bot_id', botId);
  }
  ngOnInit(): void {
    this.getChatBotList();
    this.gen();
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

  sendMessage() {

    if (this.newMessageText.trim() === '') {
      return;
    }
    this.spinnerChat.show('google-map-spinner')
    this.messages.push({ type: 'user', text: this.newMessageText });
    this.ChatBotWdidget(this.newMessageText, this.sender_id);
    this.scrollToBottom()
    this.newMessageText = '';
  }
  list: string[] = [];
  sender_id: string = '';
  gen() {
    this.sender_id = uuidv4();
    this.list.push(this.sender_id);
  }
  filteredChatbots() {
    if (!this.searchQuery) {
      return this.chatbots;
    }
    return this.chatbots.filter(bot =>
      bot.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
  getChatBotList() {
    this.spinnerServerice.show();
    this._botService.GetAllChatBot().subscribe((res: any) => {
      this.spinnerServerice.hide();
      this.reloadComponent(res.message)

      this.chatbots = res

      console.log("Bot=====>", this.chatbots)
    },
      (error: any) => {
        this.spinnerServerice.hide();
        console.error(error);
        this.reloadComponent(error.error.message)
      })

  }
  isLoading = false;
  ChatBotWdidget(message: string, sender_id: any) {
    const obj = new FormData();
    obj.append('message', message);
    obj.append('sender_id', sender_id);
    obj.append('bot_id', this.currentBotId);

    this._botService.ChatBotWdidget(obj).subscribe(
      (res: any) => {
        console.log('ChatBot response:', res);
        this.messages.push({ type: 'agent', text: res.messages });
        this.spinnerChat.hide('google-map-spinner');
      },
      (error) => {
        console.error('ChatBot error:', error);
        this.spinnerChat.hide('google-map-spinner')
        this.reloadComponent(error.error.message)
        // Handle error scenario
      }
    );
  }

  showChatbot: boolean = false;
  currentBotId: any
  chatBot(botid: any) {
    this.currentBotId = botid
    this.showChatbot = true;
    this.startNewConversation(botid)
  }
  closeChatBot() {
    this.showChatbot = false;
    this.resetChat();
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
  formatUtterance(utterance: string): string {
    return utterance.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  }
  updatevalue(string: any, value: any, event: Event, name: string) {

    this.headerService.updateMessage(string)
    if (string == 'conversation') {
      this.shareValue(value, event, name)
    }
    else if (string == 'rule-chatBot') {
      this.shareValueStepper(value, event)
    }
    else if (string == 'story-chatBot') {
      this.shareValueStory(value, event)
    }
  }
  viewChatbotDetails(botId: number): void {
    this.spinnerServerice.show();
    this._botService.GetBotDetailsById(botId).subscribe(
      (res: any) => {
        this.spinnerServerice.hide();
        console.log('Chatbot Details: ', res);
        this.chatbotForm.get('name')?.setValue(res.name);
        this.chatbotForm.get('timeout')?.setValue(res.timeout);
        this.chatbotForm.get('name')?.disable();
        this.chatbotForm.get('timeout')?.disable();
      },
      (error: any) => {
        console.error('Error fetching chatbot details: ', error);
        this.spinnerServerice.hide();
      }
    );
  }
  resetForm() {
    this.chatbotForm.reset();
    this.chatbotForm.get('name')?.enable();
    this.chatbotForm.get('timeout')?.enable();
  }
  DeleteChat(botId: any, event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.isDeleteAction = true;
    const confirmation = confirm('Are you sure you want to delete this template?');
    if (confirmation) {
      const obj = new FormData();
      obj.append('bot_id', botId);
      this._botService.DeleteChatBot(obj).subscribe((res: any) => {
        console.log(res);
        this.chatbots = this.chatbots.filter((item: any) => item.bot_id !== botId);
        this.reloadComponent(res.message)
      }, (error: any) => {
        console.error('Error deleting chatbot:', error);
        this.reloadComponent(error.error.message)
      });
    } else {
      this.isDeleteAction = false;
    }
  }
  onCardBodyClick(botId: any) {
    if (!this.isDeleteAction) {
      this.viewChatbotDetails(botId);
      const modalElement = document.getElementById('view-chatbot');
      if (modalElement) {
        const modal = new Modal(modalElement);
        modal.show();
      }
    }
    this.isDeleteAction = false;
  }
  saveChatbot(): void {
    if (this.chatbotForm.valid) {
      const formData = new FormData();
      formData.append('name', this.chatbotForm.value.name);
      formData.append('timeout', this.chatbotForm.value.timeout);
      formData.append('strictFlow', this.chatbotForm.value.strictFlow ? '1' : '0'); 
      // formData.append('botType', this.chatbotForm.value.botType);

      // let endpoint = '';
      // switch (this.chatbotForm.value.botType) {
      //   case 'Flow Bot':
      //     endpoint = environment.flowBot;
      //     break;
      //   case 'Intent Bot':
      //     endpoint = environment.intentBot;
      //     break;
      //   default:
      //     break;
      // }
      this.spinnerServerice.show();

      this._botService.Addbot(formData).subscribe((res: any) => {
        this.getChatBotList();
        this.spinnerServerice.hide();
        this.reloadComponent('created')

        const newChatbot = {
          bot_id: res.bot_id,
          name: this.chatbotForm.value.name,
          progress: 0,
          owned: true
        };
        this.chatbots.push(newChatbot);
        this.chatbotForm.reset();
        console.log('New Chatbot Added:', newChatbot);
      }, (error: any) => {
        console.error('Error:', error);
        this.reloadComponent(error.error.message)
        this.spinnerServerice.hide();

      });
    } else {
      console.log('Form is invalid!');
      this.reloadComponent('form Valid')

    }
  }
  toggleChatBot(botId: string, isActive: boolean) {
    const formData = new FormData();
    formData.append('bot_id', botId);
  
    if (isActive) {
      this._botService.RunChatBot(formData).subscribe(
        (res: any) => {
          console.log('ChatBot started:', res);
        },
        (error: any) => {
          console.error('Error starting chatbot:', error);
          this.reloadComponent(error.error.message)
        }
      );
    } else {
      this._botService.StopChatBot(formData).subscribe(
        (res: any) => {
          console.log('ChatBot stopped:', res);
        },
        (error: any) => {
          console.error('Error stopping chatbot:', error);
          this.reloadComponent(error.error.message)
        }
      );
    }
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
  shareConversation(value: any, event: Event) {
    this.route.navigateByUrl('/bot-monitoring/components')

  }
  shareValue(value: any, event: Event, name: string) {
    this._botSubMenuStatus.setActiveMenu(true)
    event.stopPropagation();
    event.preventDefault();
    this.isDeleteAction = true;
    sessionStorage.setItem('bot_id', value.bot_id)
    this.chatBotIdS.setOption(value.bot_id)
    this.route.navigate(['/bot-monitoring/conversation', name])
    sessionStorage.setItem('name', value.name)
  }
  shareValueStepper(value: any, event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.isDeleteAction = true;
    sessionStorage.setItem('bot_id', value.bot_id)
    this.chatBotIdS.setOption(value.bot_id)
    this.route.navigateByUrl('/bot-monitoring/chatBot-Rule')
    sessionStorage.setItem('name', value.name)

  }
  shareValueStory(value: any, event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.isDeleteAction = true;
    sessionStorage.setItem('bot_id', value.bot_id)
    this.chatBotIdS.setOption(value.bot_id)
    this.route.navigateByUrl('/bot-monitoring/chatBot-Story')
    sessionStorage.setItem('name', value.name)

  }
  reloadComponent(value: any) {

    if (value == 'form Valid') {
      this.toastermessage = true
      this.AlterMsg = "Please fill input fields!"
      setTimeout(() => {
        this.toastermessage = false
      }, 3000);

    }
    if (value == 'created') {
      this.toastermessage = true
      this.AlterMsg = "Chat Bot created Successfully!"
      setTimeout(() => {
        this.toastermessage = false
      }, 3000);

    }
    if (value) {
      this.toastermessage = true
      this.AlterMsg = value
      setTimeout(() => {
        this.toastermessage = false
      }, 3000);

    }
  }
  closeToaster() {
    this.toastermessage = false;
  }

}