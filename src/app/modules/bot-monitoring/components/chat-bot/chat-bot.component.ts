import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BotService } from 'src/app/modules/console/services/bot.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { BotMonitoringService } from '../../services/bot-monitoring.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, FormControl, FormControlName } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderService } from 'src/app/services/HeaderService/header.service';
import { environment } from 'src/environments/environment';
import { ChatbotIdService } from 'src/app/services/chatBot_idService/chatbot-id.service';
import { Router } from '@angular/router';
import { Modal } from 'bootstrap';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule, ReactiveFormsModule, RouterModule, FormsModule, NgxSpinnerModule],
})
export class ChatBotComponent implements OnInit {
  chatbots: any[] = []
  chatbotForm: FormGroup;
  BotId: any;
  isDeleteAction: boolean = false;
  constructor(private _botService: BotMonitoringService,
    private chatBotIdS: ChatbotIdService,
    private route: Router, private spinnerServerice: NgxSpinnerService,
    private formBuilder: FormBuilder, private headerService: HeaderService) {
    this.chatbotForm = new FormGroup({
      name: new FormControl(''),
      timeout: new FormControl(''),
      botType: new FormControl('')
    });
  }
  saveBotId(botId: any) {
    localStorage.setItem('bot_id', botId);
  }
  ngOnInit(): void {
    this.getChatBotList();
  }

  getChatBotList() {
    this.spinnerServerice.show();
    this._botService.GetAllChatBot().subscribe((res: any) => {
      this.spinnerServerice.hide();

      this.chatbots = res
      
      console.log("Bot=====>", this.chatbots)
    },
    (error: any) => {
      this.spinnerServerice.hide();
      console.error(error);
    })
    
  }
  updatevalue(string: any) {
    
    this.headerService.updateMessage(string)
  }
  viewChatbotDetails(botId: number): void {
    this.spinnerServerice.show();
    this._botService.GetBotDetailsById(botId).subscribe((res: any) => {
      this.spinnerServerice.hide();
      console.log('Chatbot Details: ', res);
      this.chatbotForm.get('name')?.setValue(res.name);
      this.chatbotForm.get('timeout')?.setValue(res.timeout);
    }, (error: any) => {
      console.error('Error fetching chatbot details: ', error);
    });
  }
  resetForm(){
    this.chatbotForm.reset();
  }
  DeleteChat(botId: any, event:Event) {
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
      }, (error: any) => {
        console.error('Error deleting chatbot:', error);
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
      formData.append('botType', this.chatbotForm.value.botType);

      let endpoint = '';
      switch (this.chatbotForm.value.botType) {
        case 'Flow Bot':
          endpoint = environment.flowBot;
          break;
        case 'Intent Bot':
          endpoint = environment.intentBot;
          break;
        default:
          break;
      }
      this.spinnerServerice.show();

      this._botService.Addbot(formData).subscribe((res: any) => {
        this.getChatBotList();
        this.spinnerServerice.hide();

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
        this.spinnerServerice.hide();

      });
    } else {
      console.log('Form is invalid!');
    }
  }

  shareValue(value: any, event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.isDeleteAction = true;
    localStorage.setItem('bot_id', value.bot_id)
    this.chatBotIdS.setOption(value.bot_id)
    this.route.navigateByUrl('/bot-monitoring/components')
  }
  shareValueStepper(value: any, event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.isDeleteAction = true;
    localStorage.setItem('bot_id', value.bot_id)
    this.chatBotIdS.setOption(value.bot_id)
    this.route.navigateByUrl('/bot-monitoring/chatBot-Rule')
  }
  shareValueStory(value: any, event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.isDeleteAction = true;
    localStorage.setItem('bot_id', value.bot_id)
    this.chatBotIdS.setOption(value.bot_id)
    this.route.navigateByUrl('/bot-monitoring/chatBot-Story')
  }
}