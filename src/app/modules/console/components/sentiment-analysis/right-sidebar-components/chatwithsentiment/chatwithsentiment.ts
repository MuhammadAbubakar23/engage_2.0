import { Component, OnInit } from '@angular/core';
import { BotService, Message } from '../../services/bot.service';
import { FormControl, FormGroup } from '@angular/forms';
import { SentimentService } from '../../services/sentiment.service';

@Component({
  selector: 'app-sentimentchat',
  templateUrl: './chatwithsentiment.component.html',
  styleUrls: ['./chatwithsentiment.component.scss']
})
export class ChatWithSentimentComponent implements OnInit {
  sentiments: Message[] = [];
  languages: Message[] = [];
  expired: boolean = false;
  text: string='';
  senchatForm = new FormGroup({

    text: new FormControl(''),
  });
  langchatForm = new FormGroup({

    text: new FormControl(''),
  });
  constructor(private senService: SentimentService) {

   }
   ngOnInit() {
    this.senService.senconversation.subscribe((val:any) => {
    this.sentiments = this.sentiments.concat(val);
    console.log("this.sentiments",this.sentiments);
  });
  this.senService.langconversation.subscribe((val:any) => {
    this.languages = this.languages.concat(val);
    console.log("this.languages",this.languages);
  });

}

   getSentiment() {
    this.senService.getSentimentApi(this.senchatForm.value.text!).subscribe((result:any) => {
      console.log("sentiment",result);
      const botMessage = new Message('bot',result);
      this.senService.senconversation.next([botMessage]);
      this.senchatForm.reset();
     });
   }
   getLanguage(){
    this.senService.getLanguageApi(this.langchatForm.value.text!).subscribe((result:any) => {
      console.log("Language",result);
      const botMessage = new Message('bot',result);
      this.senService.langconversation.next([botMessage]);
      this.langchatForm.reset();
     });
   }

//32a4676fbd167365fd7a117cc8616c1c8c64b370
  //  trainModel():void{
  //   this.senService.trainApi().subscribe((result:any) => {
  //     console.log("Train",result);
  //     alert("Success!");
  //     },(error:any) => {
  //      alert("Error!");
  //    });

  //  }
}
