import { AfterViewInit, Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToggleService } from 'src/app/services/ToggleService/Toggle.service';
import { BotService } from '../../services/bot.service';
import { ChatwithintentComponent } from './right-sidebar-components/chatwithintent/chatwithintent.component';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.scss']
})
export class ChatBotComponent implements OnInit, AfterViewInit {

  @ViewChild('rightcontainer', { read: ViewContainerRef })
  rightcontainer!: ViewContainerRef;
  panelToggled: any;
  showPanel = false;

  public subscription!: Subscription;

  intents=[];

  toastermessage: string = '';
  isToaster: boolean = false;
  intentsDetails:any={
    intentName:'',
    questions:[],
    answers:[]
  }
  intentName:any="Please Select Intent"
  location: any;

  constructor(private botService:BotService,private router:Router,
    private toggleService: ToggleService,
    private resolver: ComponentFactoryResolver) { }

  ngOnInit(): void {

    this.botService.login().subscribe((token: any) => {
      console.log(token, token.access);
      localStorage.setItem("token", token.access);
      this.botService.listofIntents().subscribe((res:any)=>{
        this.intents=res;
        this.intentName=res[0];
        this.selectIntent()
        console.log("result",res);
       })
    });

     this.subscription = this.toggleService
      .getTogglePanel()
      .subscribe((msg3) => {
        if (msg3) {
          this.rightcontainer?.clear();
          localStorage.setItem('child', msg3);
          this.showPanel = true;
          this.loadComponent('', msg3);
        } else {
          this.showPanel = false;
          this.rightcontainer?.clear();
          localStorage.setItem('child', '');
        }
      });
  }

  ngAfterViewInit(): void {
    this.subscription = this.toggleService
      .getTogglePanel()
      .subscribe((msg3) => {
        if (msg3) {
          this.rightcontainer?.clear();
          localStorage.setItem('child', msg3);
          this.showPanel = true;
          this.loadComponent('', msg3);
        } else {
          this.showPanel = false;
          this.rightcontainer?.clear();
          localStorage.setItem('child', '');
        }
      });
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
  this.toastermessage = 'Successfully Deleted Intent!';
  this.isToaster = true;
  setTimeout(() => {
    this.isToaster = false;
  }, 4000);
window.location.reload();
})
}
deleteIntentQA(obj: any): void {
  console.log("deleteIntent", obj);
  const data = {'intent': obj.intentName, 'question': obj.question, 'answers': obj.answers};
  this.botService.deleteQA(data).subscribe((res: any) => {
    this.toastermessage = 'Successfully Deleted!';
    this.isToaster = true;
    setTimeout(() => {
      this.isToaster = false;
    }, 4000);
    this.router.navigateByUrl('bot/intents');
    window.location.reload();
  });
}

  updatevalue(string:any){
    // this.headerService.updateMessage(string);
  }

  loadComponent(leftSideName: string, rightSideName: string) {
    let componentFactory: any = null;

    switch (leftSideName || rightSideName) {

      case 'chat':
        componentFactory = this.resolver.resolveComponentFactory(ChatwithintentComponent);
        this.rightcontainer.createComponent(componentFactory);
        break;
      default:
        break;
    }
  }
}
