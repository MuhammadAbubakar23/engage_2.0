import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BotMonitoringService } from '../../services/bot-monitoring.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-chat-bot-stepper',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule, NgxSpinnerModule],
  templateUrl: './chat-bot-stepper.component.html',
  styleUrls: ['./chat-bot-stepper.component.scss']
})
export class ChatBotStepperComponent implements OnInit {
  newPhrase: string = '';
  stepperForm!: FormGroup;
  searchIntent: any = ''
  selectedQueries: any[] = [];
  selectedResponses: any[] = [];
  searchResponse: string = ''
  selectedResponse: any = null;
  selectedQuery: any = null;
  toastermessage: boolean = false;
  AlterMsg: any
  items: any[] = [];
  selectedPhrases: string[] = [];
  responseList: any[] = []
  generatedPhrases: any[] = [];
  phrase: { id: number, label: string }[] = [];
  BotId: any
  stories:any[]  = [ ];

  constructor(private _botService: BotMonitoringService, private spinnerServerice: NgxSpinnerService) {
    this.BotId = localStorage.getItem('bot_id');
  }
  ngOnInit(): void {
    this.intializeForm();
    this.loadBotId()
    this.ResponseList();
    this.getListOfRule()
  }
  intializeForm() {
    this.stepperForm = new FormGroup({
      intent: new FormControl('', [Validators.pattern('^[a-zA-Z0-9 ]+$')]),
      bot_id: new FormControl(''),
      examples: new FormControl(''),
      newPhrase: new FormControl(''),
      response: new FormControl('', [Validators.pattern('^[a-zA-Z0-9 ]+$')]),
      text: new FormControl(''),
      rule: new FormControl(''),
    });
  }
  getListOfRule(){
    if (!this.BotId) {
      console.error('BotId not found in localStorage.');
      return;
    }
    this._botService.GetRuleChatBot(this.BotId).subscribe((res:any)=>{
      this.stories=res

    }, (error) => {
      console.error('Error fetching intent:', error);
    });
  }
  formatUtterance(utterance: string): string {
    return utterance.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  }
  generateAugments() {
    console.log("this.newPhrase", this.stepperForm.value)
    this.BotId = localStorage.getItem('bot_id')
    const obj = new FormData();
    obj.append('intent', this.stepperForm.value.newPhrase);
    obj.append('bot_id', this.BotId)
    this._botService.GenerateAugment(obj).subscribe((res: any) => {
      console.log(res);
      const phrases = res.messages.split('\n').filter((phrase: any) => phrase.trim() !== '');
      this.phrase = phrases.map((phrase: any, index: any) => ({ id: index + 1, label: phrase.trim() }));
      console.log(this.phrase);
      // this.newPhrase = '';
    });
  }
  togglePhraseSelection(phrase: string) {
    const index = this.selectedPhrases.indexOf(phrase);
    if (index !== -1) {
      this.selectedPhrases.splice(index, 1);
    } else {
      this.selectedPhrases.push(phrase);
    }
  }
  selectQuery(query: any) {

    this.selectedQuery = query === this.selectedQuery ? null : query;
  }
  selectResponse(response: any) {

    this.selectedResponse = response === this.selectedResponse ? null : response;
  }
  addManuallyEnteredPhrase() {
    const newPhraseValue = this.stepperForm.value.newPhrase.trim();
    if (newPhraseValue) {
      const newId = this.phrase.length + 1;
      this.phrase.push({ id: newId, label: newPhraseValue });
      this.stepperForm.patchValue({ newPhrase: '' });
    }
  }
  loadBotId() {
    if (!this.BotId) {
      console.error('BotId not found in localStorage.');
      return;
    }
    this._botService.GetIntents(this.BotId).subscribe((res: any) => {
      console.log('Intent data=====>', res)
      this.items = res;
    }, (error) => {
      console.error('Error fetching intent:', error);
    });
  }
  ResponseList() {
    if (!this.BotId) {
      console.error('BotId not found in localStorage.');
      return;
    }
    this.spinnerServerice.show();

    this._botService.GetReponse(this.BotId).subscribe((intent: any) => {
      console.log('Response daya=====>', intent)
      this.spinnerServerice.hide();

      this.responseList = intent;
    }, (error) => {
      console.error('Error fetching intent:', error);
      this.spinnerServerice.hide();

    });
  }
  saveChatbot() {
    console.log('Form Valid:', this.stepperForm.valid);
    console.log('Selected Phrases:', this.selectedPhrases);
    if (this.selectedPhrases.length >= 5) {
      if (this.stepperForm.valid && (this.selectedPhrases.length > 0 || this.phrase.length > 0)) {
        const obj = new FormData();
        obj.append('intent', this.stepperForm.value.intent);
        obj.append('bot_id', this.BotId);
        // Append manually entered phrases
        // this.phrase.forEach(item => {
        //     obj.append('examples', item.label);
        // });
        this.selectedPhrases.forEach(phrase => {
          obj.append('examples', phrase);
        });
        console.log('FormData:', obj);
        this.spinnerServerice.show();

        this._botService.AddIntend(obj).subscribe((res: any) => {
          this.reloadComponent('Intent Create')
          this.spinnerServerice.hide();

          console.log(res);
          this.loadBotId()
          const newIntent = {
            intent: this.stepperForm.value.intent,
            progress: 0,
            label: '0',
            strokeDasharray: '0',
            strokeDashoffset: '0px',
            strokeColor: '#333',
            active: false
          };
          this.items.push(newIntent);
          this.stepperForm.reset();
          this.selectedPhrases = [];
          this.phrase = [];
        }, (error) => {
          console.error('Error saving intent:', error);
          this.spinnerServerice.hide();

        });
      }
    }
    else {
      this.reloadComponent('must 5');
      this.reloadComponent('intent missing')

    }
  }
  SaveResponse() {
    console.log('Form Valid:', this.stepperForm.valid);
    console.log('Selected Phrases:', this.selectedPhrases);
    if (this.stepperForm.valid) {
      const obj = new FormData();
      obj.append('response', this.stepperForm.value.response);
      obj.append('bot_id', this.BotId);
      obj.append('text', this.stepperForm.value.text);
      console.log('FormData:', obj);
      this.spinnerServerice.show();

      this._botService.AddResponse(obj).subscribe((res: any) => {
        this.reloadComponent('Response Create')
        this.spinnerServerice.hide();

        console.log(res);
        this.ResponseList()
        const newResponse = {
          utterance: this.stepperForm.value.response,
        };
        this.responseList.push(newResponse);
        this.stepperForm.reset();
      }, (error) => {
        console.error('Error saving intent:', error);
        this.spinnerServerice.hide();
      this.reloadComponent('Response missing')


      });
    }
    else {

    }
  }
  SaveRule() {
    console.log('Form Valid:', this.stepperForm.valid);
    if (this.stepperForm.valid && this.selectedQuery && this.selectedResponse) {
      const obj = new FormData();
      obj.append('bot_id', this.BotId);
      obj.append('rule', this.stepperForm.value.rule);
      obj.append('intent', this.selectedQuery.intent);
      obj.append('response', this.selectedResponse.utterance);
      this.spinnerServerice.show();

      this._botService.CreateRule(obj).subscribe((res: any) => {
        this.spinnerServerice.hide();

        this.reloadComponent('Rule Create');

        console.log(res);
        this.stepperForm.reset();
        this.selectedQuery = null;
        this.selectedResponse = null;
      }, (error) => {
        console.error('Error saving rule:', error);
      });
    }
    else {
      this.reloadComponent('Rule missing')

    }
  }

  reloadComponent(value: any) {

    if (value == 'must 5') {
      this.toastermessage = true
      this.AlterMsg = "Please select atleast 5 phrases!"
      setTimeout(() => {
        this.toastermessage = false
      }, 2000);

    }
    if (value == 'Rule Create') {
      this.toastermessage = true
      this.AlterMsg = "Rule Created Successfully!"
      setTimeout(() => {
        this.toastermessage = false
      }, 2000);

    }
    if (value == 'Intent Create') {
      this.toastermessage = true
      this.AlterMsg = "Intent Creaed Sucessfully!"
      setTimeout(() => {
        this.toastermessage = false
      }, 2000);

    }
    if (value == 'Response Create') {
      this.toastermessage = true
      this.AlterMsg = "Response Creaed Sucessfully!"
      setTimeout(() => {
        this.toastermessage = false
      }, 2000);

    }
    if (value == 'intent missing') {
      this.toastermessage = true
      this.AlterMsg = "intent is missing please add intent first !"
      setTimeout(() => {
        this.toastermessage = false
      }, 2000);

    }
    if (value == 'Response missing') {
      this.toastermessage = true
      this.AlterMsg = "Response is missing please add Response first !"
      setTimeout(() => {
        this.toastermessage = false
      }, 2000);

    }
    if (value == 'Rule  missing') {
      this.toastermessage = true
      this.AlterMsg = "Rule is missing!"
      setTimeout(() => {
        this.toastermessage = false
      }, 2000);

    }
  }

  closeToaster() {
    this.toastermessage = false;
  }
}
