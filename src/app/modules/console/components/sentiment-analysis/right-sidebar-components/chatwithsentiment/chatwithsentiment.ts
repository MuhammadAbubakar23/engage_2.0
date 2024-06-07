import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Message } from 'src/app/modules/console/services/bot.service';
import { SentimentService } from 'src/app/modules/console/services/sentiment.service';

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
  });
  this.senService.langconversation.subscribe((val:any) => {
    this.languages = this.languages.concat(val);
  });

}

   getSentiment() {
    this.senService.getSentimentApi(this.senchatForm.value.text!).subscribe((result:any) => {
      const botMessage = new Message('bot',result);
      this.senService.senconversation.next([botMessage]);
      this.senchatForm.reset();
     });
   }
   getLanguage(){
    this.senService.getLanguageApi(this.langchatForm.value.text!).subscribe((result:any) => {
      const botMessage = new Message('bot',result);
      this.senService.langconversation.next([botMessage]);
      this.langchatForm.reset();
     });
   }

//32a4676fbd167365fd7a117cc8616c1c8c64b370
  //  trainModel():void{
  //   this.senService.trainApi().subscribe((result:any) => {
  //     alert("Success!");
  //     },(error:any) => {
  //      alert("Error!");
  //    });

  //  }
}
