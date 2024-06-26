import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BotMonitoringService } from '../../services/bot-monitoring.service';
import { SharedModule } from "../../../../shared/shared.module";
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-chat-bot-story',
  templateUrl: './chat-bot-story.component.html',
  styleUrls: ['./chat-bot-story.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, SharedModule, NgxSpinnerModule]
})
export class ChatBotStoryComponent implements OnInit {
  newPhrase: string = '';
  storyForm!: FormGroup;
  searchIntent: any = ''
  selectedQueries: any[] = [];
  selectedResponses: any[] = [];
  searchResponse: string = ''
  selectedResponse: any = null;
  selectedQuery: any = null;
  items: any[] = [];
  selectedPhrases: string[] = [];
  toastermessage: boolean = false;
  AlterMsg: any
  responseList: any[] = []
  generatedPhrases: any[] = [];
  phrase: { id: number, label: string }[] = [];
  queriesResponseArray: any[] = []
  BotId: any
  selectedQueriesArray: any[] = [];
  selectedResponsesArray: any[] = [];
  stories:any[]  = [ ];
  isFormVisible: boolean = false;
  constructor(private _botService: BotMonitoringService, private spinnerServerice: NgxSpinnerService) {
    this.BotId = localStorage.getItem('bot_id');
  }
  ngOnInit(): void {
    this.intializeForm();
    this.loadBotId()
    this.ResponseList()
    this.addmore();
    this.getListOfRule();
  }
  addmore() {
    const newFormGroup = this.createRule();
    this.addQueryResponse.push(newFormGroup);
    this.selectedQueriesArray.push(null);
    this.selectedResponsesArray.push(null);
    console.log("addQueryResponse===>", this.addQueryResponse);
  }
  intializeForm() {
    this.storyForm = new FormGroup({
      intent: new FormControl('', [Validators.pattern('^[a-zA-Z0-9 ]+$')]),
      bot_id: new FormControl(''),
      examples: new FormControl(''),
      newPhrase: new FormControl(''),
      response: new FormControl('', [Validators.pattern('^[a-zA-Z0-9 ]+$')]),
      text: new FormControl(''),
      story: new FormControl(''),
      storyFlow: new FormControl(''),
      addQueryReponse: new FormArray([])
    });
  }
  getListOfRule(){
    if (!this.BotId) {
      console.error('BotId not found in localStorage.');
      return;
    }
    this._botService.GetStoriesChatBot(this.BotId).subscribe((res:any)=>{
      this.stories=res

    }, (error) => {
      console.error('Error fetching intent:', error);
    });
  }
  createRule() {
    return new FormGroup({
      queries: new FormControl('', [Validators.required]),
      responses: new FormControl('', Validators.required),
    })
  }
  removeCard(index: number) {
    if (index > 0) {
      this.addQueryResponse.removeAt(index);
    }
  }
  get addQueryResponse(): FormArray {
    return this.storyForm.get('addQueryReponse') as FormArray
  }
  formatUtterance(utterance: string): string {
    return utterance.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  }
  generateAugments() {
    console.log("this.newPhrase", this.storyForm.value)
    this.BotId = localStorage.getItem('bot_id')
    const obj = new FormData();
    obj.append('intent', this.storyForm.value.newPhrase);
    obj.append('bot_id', this.BotId)
    this._botService.GenerateAugment(obj).subscribe((res: any) => {
      console.log(res);
      const phrases = res.messages.split('\n').filter((phrase: any) => phrase.trim() !== '');
      this.phrase = phrases.map((phrase: any, index: any) => ({ id: index + 1, label: phrase.trim() }));
      console.log(this.phrase);
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

  selectQuery(query: any, index: number) {

    this.selectedQueriesArray[index] = query;

  }
  selectResponse(response: any, index: number) {

    this.selectedResponsesArray[index] = response;

  }
  addManuallyEnteredPhrase() {
    const newPhraseValue = this.storyForm.value.newPhrase.trim();
    if (newPhraseValue) {
      const newId = this.phrase.length + 1;
      this.phrase.push({ id: newId, label: newPhraseValue });
      this.storyForm.patchValue({ newPhrase: '' });
    }
  }
  loadBotId() {
    if (!this.BotId) {
      console.error('BotId not found in localStorage.');
      return;
    }
    this.spinnerServerice.show();

    this._botService.GetIntents(this.BotId).subscribe((res: any) => {
      console.log('Intent data=====>', res)
      this.spinnerServerice.hide();

      this.items = res;
    }, (error) => {
      console.error('Error fetching intent:', error);
      this.spinnerServerice.hide();

    });
  }
  ResponseList() {
    if (!this.BotId) {
      console.error('BotId not found in localStorage.');
      return;
    }
    this.spinnerServerice.show();

    this._botService.GetReponse(this.BotId).subscribe((intent: any) => {
      this.spinnerServerice.hide();

      console.log('Response daya=====>', intent)
      this.responseList = intent;
    }, (error) => {
      console.error('Error fetching intent:', error);
      this.spinnerServerice.hide();

    });
  }
  saveChatbot() {
    console.log('Form Valid:', this.storyForm.valid);
    console.log('Selected Phrases:', this.selectedPhrases);
    if (this.selectedPhrases.length >= 5) {
      if (this.storyForm.touched && (this.selectedPhrases.length > 0 || this.phrase.length > 0)) {
        const obj = new FormData();
        obj.append('intent', this.storyForm.value.intent);
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

          console.log(res);
          this.spinnerServerice.hide();

          this.loadBotId()
          const newIntent = {
            intent: this.storyForm.value.intent,
            progress: 0,
            label: '0',
            strokeDasharray: '0',
            strokeDashoffset: '0px',
            strokeColor: '#333',
            active: false
          };
          this.items.push(newIntent);
          this.storyForm.reset();
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
    console.log('Form Valid:', this.storyForm.valid);
    console.log('Selected Phrases:', this.selectedPhrases);
    if (this.storyForm.touched) {
      const obj = new FormData();
      obj.append('response', this.storyForm.value.response);
      obj.append('bot_id', this.BotId);
      obj.append('text', this.storyForm.value.text);
      console.log('FormData:', obj);
      this.spinnerServerice.show();

      this._botService.AddResponse(obj).subscribe((res: any) => {
        this.reloadComponent('Response Create')

        console.log(res);
        this.ResponseList()
        this.spinnerServerice.hide();

        const newResponse = {
          utterance: this.storyForm.value.response,
        };
        this.responseList.push(newResponse);
        this.storyForm.reset();
      }, (error) => {
        console.error('Error saving intent:', error);
        this.spinnerServerice.hide();

      });
    }
    else {
      this.reloadComponent('Response missing')

    }
  }
  CreateStory() {

    console.log('Form Valid:', this.storyForm.valid);
    if (this.storyForm.touched
      && this.selectedQueriesArray && this.selectedResponsesArray) {
      const obj = new FormData();
      obj.append('bot_id', this.BotId);
      obj.append('story', this.storyForm.value.story);

      const storyFlowArray: string[] = [];
      this.addQueryResponse.controls.forEach((control, i) => {
        if (this.selectedQueriesArray[i]) {
          storyFlowArray.push(this.selectedQueriesArray[i].intent);
        }
        if (this.selectedResponsesArray[i]) {
          storyFlowArray.push(this.selectedResponsesArray[i].utterance);
        }
      });

      storyFlowArray.forEach((flow) => {
        obj.append('storyFlow', flow);
      });
      this.spinnerServerice.show();

      this._botService.CreateStory(obj).subscribe((res: any) => {

        this.reloadComponent('Story Create')

        this.getListOfRule();

        this.spinnerServerice.hide();

        console.log(res);
        this.storyForm.reset();
        this.selectedQuery = null;
        this.selectedResponse = null;
        this.selectedQueriesArray = [];
        this.selectedResponsesArray = [];
      }, (error) => {
        console.error('Error saving rule:', error);
        this.spinnerServerice.hide();
        this.reloadComponent('intent same')


      });
    }
    else {
      this.reloadComponent('Story  missing')


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
    if (value == 'Story Create') {
      this.toastermessage = true
      this.AlterMsg = "Story Created Successfully!"
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
    if (value == 'Story  missing') {
      this.toastermessage = true
      this.AlterMsg = "Story is missing!"
      setTimeout(() => {
        this.toastermessage = false
      }, 2000);

    }
    if (value == 'intent same') {
      this.toastermessage = true
      this.AlterMsg = "Intent with that name already exists in a rule!"
      setTimeout(() => {
        this.toastermessage = false
      }, 2000);

    }

  }
  toggleFormVisibility() {
    this.isFormVisible = true;
  }
  closeToaster() {
    this.toastermessage = false;
  }

}
