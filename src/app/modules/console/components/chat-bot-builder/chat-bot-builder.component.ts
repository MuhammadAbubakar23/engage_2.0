import { Component, OnInit } from '@angular/core';
import { BotService } from '../../services/bot.service';
@Component({
  selector: 'app-chat-bot-builder',
  templateUrl: './chat-bot-builder.component.html',
  styleUrls: ['./chat-bot-builder.component.scss']
})
export class ChatBotBuilderComponent implements OnInit {
  IntentName: string = '';
  listofIntent:any=[];
  toastermessage: string="";
  isToaster: boolean=false;
   ngOnInit(): void {
}
constructor(private botService: BotService){
  this.botService.login().subscribe((token: any) => {
    sessionStorage.setItem("token", token.access);
  });
}
preview(step1:any,step2:any,step3:any):void{
this.listofIntent=[];
this.listofIntent.push(step1.value,step2.value,step3.value);
  this.botService.updateintents(this.listofIntent);
}
showtoastr(message:any){
  this.toastermessage = message;
  this.isToaster = true;
  setTimeout(() => {
    this.isToaster = false;
  }, 4000);
}
}
