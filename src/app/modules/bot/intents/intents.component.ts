import { Component, OnInit } from '@angular/core';
import { BotService } from '../services/bot.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intents',
  templateUrl: './intents.component.html',
  styleUrls: ['./intents.component.scss']
})
export class IntentsComponent implements OnInit {
  intents=[];
  intentsDetails:any={
    intentName:'',
    questions:[],
    answers:[]
  }
  intentName:any="Please Select Intent"
  location: any;

  constructor(private botService:BotService,private router:Router) { }

  ngOnInit(): void {

    this.botService.login().subscribe((token: any) => {
      console.log(token, token.access);
      localStorage.setItem("token", token.access);
    });
    this.botService.listofIntents().subscribe((res:any)=>{
      this.intents=res;
      console.log("result",res);
     })
  }
  selectIntent(): void {


      this.botService.intentDetails(this.intentName).subscribe((res: any) => {
        console.log(res);
        this.intentsDetails.intentName = "";
        this.intentsDetails.intentName = res.categories[0];

        this.intentsDetails.questions = [];
        this.intentsDetails.answers = [];

        res.conversations.forEach((item: any, index: number) => {
          this.intentsDetails.questions.push(res.conversations[index][0]);

          const conversation = res.conversations[index];
          if (Array.isArray(conversation) && conversation.length > 1) {
            const ans = conversation.slice(1).filter((answer: any) => answer);
            this.intentsDetails.answers.push(ans);
          } else {
            this.intentsDetails.answers.push([]);
          }
        });



    });
  }
  deleteIntent(){
  this.botService.deleteIntent({'intent':this.intentName}).subscribe((res:any)=>{
  alert("Successfully deleted intent")
  window.location.reload();
  })
  }
  deleteIntentQA(obj: any): void {
    console.log("deleteIntent", obj);
    const data = {'intent': obj.intentName, 'question': obj.question, 'answers': obj.answers};
    this.botService.deleteQA(data).subscribe((res: any) => {
      alert("successfully deleted");
      this.router.navigateByUrl('bot/intents');
      window.location.reload();
    });
  }
}
