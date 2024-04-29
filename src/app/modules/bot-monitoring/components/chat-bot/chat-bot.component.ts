import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BotService } from 'src/app/modules/console/services/bot.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { BotMonitoringService } from '../../services/bot-monitoring.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, FormControl, FormControlName } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderService } from 'src/app/services/HeaderService/header.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule, ReactiveFormsModule, RouterModule, FormsModule,],
})
export class ChatBotComponent implements OnInit {
  chatbots: any[] = [
    { bot_id: 1, name: 'Hi-Hello', progress: 25, owned: true },
    { bot_id: 2, name: 'Hi-Hello', progress: 25, owned: true },
  ]

  chatbotForm: FormGroup;

  constructor(private _botService: BotMonitoringService, private formBuilder: FormBuilder, private headerService: HeaderService) {
    this.chatbotForm = new FormGroup({
      name: new FormControl(''),
      timeout: new FormControl(''),
      botType: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.getChatBotList();
    // this.initializeForm();
  }

  getChatBotList() {
    this._botService.GetAllChatBot().subscribe((res: any) => {
      this.chatbots = res
      console.log("Bot=====>", this.chatbots)
    })
  }
  updatevalue(string: any) {

    this.headerService.updateMessage(string);

  }
  // initializeForm(): void {

  // }
  viewChatbotDetails(botId: number): void {
    this._botService.GetBotDetailsById(botId).subscribe((res: any) => {
      console.log('Chatbot Details: ', res);
    }, (error: any) => {
      console.error('Error fetching chatbot details: ', error);
    });
  }
  saveChatbot(): void {
    
    debugger
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
        // case 'Q/A Bot':
        //     endpoint = environment.qaBot;
        //     break;
        case 'Intent Bot':
          endpoint = environment.intentBot;
          break;
        default:
          break;
      }

      this._botService.Addbot(formData).subscribe((res: any) => {
        window.location.reload();
        console.log('Form Data:', formData);
        console.log('Response:', res);
      }, (error: any) => {
        console.error('Error:', error);
      });
    } else {
      console.log('Form is invalid!');
    }
  }

}