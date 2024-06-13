import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { BotMonitoringService } from '../../services/bot-monitoring.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChatbotIdService } from 'src/app/services/chatBot_idService/chatbot-id.service';
@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule, FormsModule, ReactiveFormsModule],
})
export class ComponentsComponent implements OnInit {
  newPhrase: string = '';
  IntendForm!: FormGroup;
  searchIntent: any = ''

  searchResponse: string = ''
  items: any[] = [];
  selectedPhrases: string[] = [];
  responseList: any[] = []
  generatedPhrases: any[] = [];
  phrase: { id: number, label: string }[] = [];
  BotId: any
  constructor(private _botService: BotMonitoringService, private chatBotIdS: ChatbotIdService) {
    this.BotId = localStorage.getItem('bot_id');
  }
  ngOnInit(): void {
    this.intializeForm();
    this.loadBotId();
    this.ResponseList()
    // this.loadBotId();
  }

  togglePhraseSelection(phrase: string) {
    const index = this.selectedPhrases.indexOf(phrase);
    if (index !== -1) {
      this.selectedPhrases.splice(index, 1);
    } else {
      this.selectedPhrases.push(phrase);
    }
  }
  DeleteIntent(intent: string) {
    const confirmation = confirm('Are you sure you want to delete this template?');
    if (confirmation) {
      this.BotId = localStorage.getItem('bot_id');
      const obj = new FormData();
      obj.append('intent', intent);
      obj.append('bot_id', this.BotId);
      this._botService.IntentDelete(obj).subscribe((res: any) => {
        console.log(res);
        this.items = this.items.filter(item => item.intent !== intent);
      });
    }
  }
  DeleteResponse(response: string) {
    const confirmation = confirm('Are you sure you want to delete this template?');
    if (confirmation) {
      console.log("deleted app==>", response)
      this.BotId = localStorage.getItem('bot_id');
      const obj = new FormData();
      obj.append('response', response);
      obj.append('bot_id', this.BotId);
      this._botService.ResponseDelete(obj).subscribe((res: any) => {
        console.log(res);
        this.responseList = this.responseList.filter(item => item.utterance !== response);

      });
    }
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
  intializeForm() {
    this.IntendForm = new FormGroup({
      intent: new FormControl('', [Validators.pattern('^[a-zA-Z0-9 ]+$')]),
      bot_id: new FormControl(''),
      examples: new FormControl(''),
      newPhrase: new FormControl(''),
      response: new FormControl('', [Validators.pattern('^[a-zA-Z0-9 ]+$')]),
      text: new FormControl('')

    });
  }
  generateAugments() {
    console.log("this.newPhrase", this.IntendForm.value)
    
    this.BotId = localStorage.getItem('bot_id')
    const obj = new FormData();
    obj.append('intent', this.IntendForm.value.newPhrase);
    obj.append('bot_id', this.BotId)

    this._botService.GenerateAugment(obj).subscribe((res: any) => {
      console.log(res);
      const phrases = res.messages.split('\n').filter((phrase: any) => phrase.trim() !== '');
      this.phrase = phrases.map((phrase: any, index: any) => ({ id: index + 1, label: phrase.trim() }));
      console.log(this.phrase);
      // this.newPhrase = '';
    });
  }
  formatUtterance(utterance: string): string {
    return utterance.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  }
  toggleEditingMode() {
    this.IntendForm.get('intent')?.disable();
  }
  addManuallyEnteredPhrase() {
    const newPhraseValue = this.IntendForm.value.newPhrase.trim();
    if (newPhraseValue) {
        const newId = this.phrase.length + 1;
        this.phrase.push({ id: newId, label: newPhraseValue });
        this.IntendForm.patchValue({ newPhrase: '' });
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
  saveChatbot() {
    console.log('Form Valid:', this.IntendForm.valid);
    console.log('Selected Phrases:', this.selectedPhrases);
    if (this.IntendForm.valid && (this.selectedPhrases.length > 0 || this.phrase.length > 0)) {
        const obj = new FormData();
        obj.append('intent', this.IntendForm.value.intent);
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
                intent: this.IntendForm.value.intent,
                progress: 0,
                label: '0',
                strokeDasharray: '0',
                strokeDashoffset: '0px',
                strokeColor: '#333',
                active: false
            };
            this.items.push(newIntent);
            this.IntendForm.reset();
            this.selectedPhrases = [];
            this.phrase = [];
        }, (error) => {
            console.error('Error saving intent:', error);
        });
    }
}

  SaveResponse() {
    console.log('Form Valid:', this.IntendForm.valid);
    console.log('Selected Phrases:', this.selectedPhrases);
    if (this.IntendForm.valid) {
      const obj = new FormData();
      obj.append('response', this.IntendForm.value.response);
      obj.append('bot_id', this.BotId);
      obj.append('text', this.IntendForm.value.text);
      console.log('FormData:', obj);
      this._botService.AddResponse(obj).subscribe((res: any) => {
        console.log(res);
        const newResponse = {
          utterance: this.IntendForm.value.response,
        };
        this.responseList.push(newResponse);
        this.IntendForm.reset();
      }, (error) => {
        console.error('Error saving intent:', error);
      });
    }
  }

}
