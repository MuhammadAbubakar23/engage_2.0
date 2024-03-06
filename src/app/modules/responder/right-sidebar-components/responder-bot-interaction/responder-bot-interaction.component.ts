import { Component, OnInit } from '@angular/core';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';

@Component({
  selector: 'app-responder-bot-interaction',
  templateUrl: './responder-bot-interaction.component.html',
  styleUrls: ['./responder-bot-interaction.component.scss']
})
export class ResponderBotInteractionComponent implements OnInit {

  constructor(
    private commonData: CommonDataService
  ) { }

  ngOnInit(): void {
    this.WhatsappBotInteraction()
  }
  spinner2running: any;
  messages: any
  WhatsappBotInteraction() {
    const botClientId = localStorage.getItem('senderId')
    const customerId = localStorage.getItem('storeOpenedId');
    const obj = {
      clientIdentifier: Number(botClientId),
      customerIdentifier: Number(customerId),
      filter: {
        pageNumber: 1,
        pageSize: 10
      }
    }
    this.commonData.WhatsappBotInteraction(obj).subscribe((res: any) => {
      this.messages = res
      console.log('bot interaction ====>', this.messages)
    },
      (error: any) => {
        console.error('Error occurred:', error);
      })

  }
}
