import { Component} from '@angular/core';

import { FormControl, FormGroup } from '@angular/forms';

import { BotService,Message } from '../../services/bot.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent{
  messages: Message[] = [];
  expired: boolean = false;
  text: string='';
  chatForm = new FormGroup({

    text: new FormControl(''),
  });
  constructor(private botService: BotService) {

   }

   ngOnInit() {
    this.botService.conversation.subscribe((val:any) => {
    this.messages = this.messages.concat(val);
    // console.log("this.messages",this.messages);
  });
}

   sendMessage() {
    this.botService.chat(this.chatForm.value.text!).subscribe((result:any) => {
      const botMessage = new Message('bot',result);
      this.botService.conversation.next([botMessage]);
      this.chatForm.reset();
     },(error:any) => {
      alert("Error Occured")
    });
   }
   trainModel():void{
    this.botService.trainApi().subscribe((result:any) => {
      // console.log("Train",result);
      alert("Success!");
      },(error:any) => {
       alert("Error!");
     });

   }


}
