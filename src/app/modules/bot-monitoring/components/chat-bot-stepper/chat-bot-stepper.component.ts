import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BotMonitoringService } from '../../services/bot-monitoring.service';
import { SharedModule } from 'src/app/shared/shared.module';
@Component({
  selector: 'app-chat-bot-stepper',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule],
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
  items: any[] = [];
  selectedPhrases: string[] = [];
  responseList: any[] = []
  generatedPhrases: any[] = [];
  phrase: { id: number, label: string }[] = [];
  BotId: any
  constructor(private _botService: BotMonitoringService,) {
    this.BotId = localStorage.getItem('bot_id');
  }
  ngOnInit(): void {
    this.intializeForm();
    this.loadBotId()
    this.ResponseList()
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
      const phrases = res.split('\n').filter((phrase: any) => phrase.trim() !== '');
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
    debugger
    this.selectedQuery = query === this.selectedQuery ? null : query;
  }
  selectResponse(response: any) {
    debugger
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
    this._botService.GetReponse(this.BotId).subscribe((intent: any) => {
      console.log('Response daya=====>', intent)
      this.responseList = intent;
    }, (error) => {
      console.error('Error fetching intent:', error);
    });
  }
  saveChatbot() {
    console.log('Form Valid:', this.stepperForm.valid);
    console.log('Selected Phrases:', this.selectedPhrases);
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
      this._botService.AddIntend(obj).subscribe((res: any) => {
        console.log(res);
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
      });
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
      this._botService.AddResponse(obj).subscribe((res: any) => {
        console.log(res);
        const newResponse = {
          utterance: this.stepperForm.value.response,
        };
        this.responseList.push(newResponse);
        this.stepperForm.reset();
      }, (error) => {
        console.error('Error saving intent:', error);
      });
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
      this._botService.CreateRule(obj).subscribe((res: any) => {
        console.log(res);
        this.stepperForm.reset();
        this.selectedQuery = null;
        this.selectedResponse = null;
      }, (error) => {
        console.error('Error saving rule:', error);
      });
    }
  }
}
