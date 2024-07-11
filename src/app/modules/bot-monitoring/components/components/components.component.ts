import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { BotMonitoringService } from '../../services/bot-monitoring.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChatbotIdService } from 'src/app/services/chatBot_idService/chatbot-id.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule, FormsModule, ReactiveFormsModule, NgxSpinnerModule],
})
export class ComponentsComponent implements OnInit {
  newPhrase: string = '';
  IntendForm!: FormGroup;
  searchIntent: any = ''
  toastermessage: boolean = false;
  AlterMsg: any
  searchResponse: string = ''
  items: any[] = [];
  selectedPhrases: string[] = [];
  responseList: any[] = []
  generatedPhrases: any[] = [];
  phrase: { id: number, label: string }[] = [];
  Enterphrase: { id: number, label: string }[] = [];
  BotId: any
  selectedIntent: any = null;
  isIntentSelected: boolean = false;
  isResponseSelected: boolean = false;

  isViewMode: boolean = false;
  isResponseView: boolean = false;
  constructor(private _botService: BotMonitoringService, private chatBotIdS: ChatbotIdService, private spinnerServerice: NgxSpinnerService) {
    this.BotId = localStorage.getItem('bot_id');
  }
  ngOnInit(): void {
    this.intializeForm();
    this.loadBotId();
    this.ResponseList()
    // this.loadBotId();
    this.setName = localStorage.getItem('name')

  }

  togglePhraseSelection(phrase: string) {

    const index = this.selectedPhrases.indexOf(phrase);
    if (index !== -1) {
      this.selectedPhrases.splice(index, 1);
    } else {
      this.selectedPhrases.push(phrase);
    }
  }
  DeleteIntent(intent: string, event: Event) {
    event.stopPropagation();
    const confirmation = confirm('Are you sure you want to delete this template?');
    if (confirmation) {
      this.BotId = localStorage.getItem('bot_id');
      const obj = new FormData();
      obj.append('intent', intent);
      obj.append('bot_id', this.BotId);
      this._botService.IntentDelete(obj).subscribe((res: any) => {
        this.reloadComponent('intent delete');
        console.log(res);
        this.items = this.items.filter(item => item.intent !== intent);
      }
        , (error) => {
          console.error('Error fetching intent:', error);
          console.log(error)
          this.spinnerServerice.hide();
          console.log("error message====>", error.error.messages)
          this.reloadComponent(error.error.messages)
        });

    }
  }


  DeleteResponse(response: string, event: Event) {
    event.stopPropagation();

    const confirmation = confirm('Are you sure you want to delete this template?');
    if (confirmation) {
      console.log("deleted app==>", response)
      this.BotId = localStorage.getItem('bot_id');
      const obj = new FormData();
      obj.append('response', response);
      obj.append('bot_id', this.BotId);
      this._botService.ResponseDelete(obj).subscribe((res: any) => {
        this.reloadComponent('Response delete');
        console.log(res);
        this.responseList = this.responseList.filter(item => item.utterance !== response);
      }, (error) => {
        console.error('Error fetching intent:', error);
        console.log(error)
        this.spinnerServerice.hide();
        console.log("error message====>", error.error.messages)
        this.reloadComponent(error.error.messages)
      });
    }
    // else {
    //   this.reloadComponent('cannot delete')

    // }
  }


  selectIntent(item: any) {
    this.isViewMode = true;
    this.isIntentSelected = true;
    this.IntendForm.get('intent')?.disable();
    this._botService.ViewIntent(this.BotId).subscribe((res: any) => {
      const intentDetails = res.find((intent: any) => intent.intent === item.intent);
      if (intentDetails) {
        const examplesArray = intentDetails.examples.split('\n').map((example: string) => example.trim()).filter((example: string) => example);
        this.IntendForm.patchValue({
          intent: intentDetails.intent,
          newPhrase: ''
        });
        this.selectedPhrases = examplesArray;
        this.phrase = examplesArray.map((example: string, index: number) => ({
          id: index + 1,
          label: example
        }));
      }
    }, (error) => {
      console.error('Error fetching intent details:', error);
    });
  }
  cancelIntentSelection() {
    this.isViewMode = false;
    this.isIntentSelected = false;
    this.selectedIntent = null;
    this.IntendForm.patchValue({
      intent: '',
      newPhrase: '',
      examples: ''
    });
    this.IntendForm.get('intent')?.enable();
    this.selectedPhrases = [];
    this.phrase = [];
  }

  cancelResponseSelection() {
    this.isResponseView = false;
    this.isResponseSelected = false;

    this.IntendForm.patchValue({
      response: '',
      text: ''
    });
    this.IntendForm.get('response')?.enable();
    this.IntendForm.get('text')?.enable();
  }

  viewResponse(response: any) {
    this.isResponseSelected = true;
    this.isResponseView = true;
    this.IntendForm.get('response')?.disable();
    this.IntendForm.get('text')?.disable();
    this._botService.ViewResponse(this.BotId).subscribe((res: any) => {
      const selectedResponse = res.find((item: any) => item.utterance === response.utterance);
      if (selectedResponse) {
        this.IntendForm.patchValue({
          response: selectedResponse.utterance,
          text: selectedResponse.response
        });
      }
    }, (error) => {
      console.error('Error fetching response details:', error);
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
      this.spinnerServerice.hide();
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
  setName: any
  getName() {
  }
  generateAugments() {

    console.log("this.newPhrase", this.IntendForm.value)

    this.BotId = localStorage.getItem('bot_id')
    const obj = new FormData();
    obj.append('intent', this.IntendForm.value.newPhrase);
    obj.append('bot_id', this.BotId)

    this._botService.GenerateAugment(obj).subscribe((res: any) => {
      console.log(res);
      const phrases = res.messages?.split('\n').filter((phrase: any) => phrase.trim() !== '');
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
    
    this.phrase=[]
    const newPhraseValue = this.IntendForm.value.newPhrase.trim();
    if (newPhraseValue) {
      const newId = this.phrase.length + 1;
      this.Enterphrase.push({ id: newId, label: newPhraseValue });
      this.IntendForm.patchValue({ newPhrase: '' });
    }
  }
  loadBotId() {
    if (!this.BotId) {
      console.error('BotId not found in localStorage.');
      return;
    }
    this.spinnerServerice.show();

    this._botService.GetIntents(this.BotId).subscribe((res: any) => {
      this.spinnerServerice.hide();
      console.log('Intent data=====>', res)
      this.items = res;

    }, (error) => {
      console.error('Error fetching intent:', error);
    });
  }
  saveChatbot() {

    console.log('Form Valid:', this.IntendForm.valid);
    console.log('Selected Phrases:', this.selectedPhrases);
    if (this.selectedPhrases.length >= 5) {

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
        this.spinnerServerice.show()
        this._botService.AddIntend(obj).subscribe((res: any) => {
          console.log(res);
          this.spinnerServerice.hide()
          this.loadBotId();
          const newIntent = {
            intent: this.IntendForm.value.intent,
            progress: 0,
            label: '0',
            strokeDasharray: '0',
            strokeDashoffset: '0px',
            strokeColor: '#333',
            active: false
          };
          this.reloadComponent('Intent Create')

          this.items.push(newIntent);
          this.IntendForm.reset();
          this.selectedPhrases = [];
          this.phrase = [];
        }, (error) => {
          console.error('Error saving intent:', error);
        });
      }
    }
    else {

      this.reloadComponent('must 5')
      this.reloadComponent('intent missing')

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
      this.spinnerServerice.show()
      this._botService.AddResponse(obj).subscribe((res: any) => {
        this.spinnerServerice.hide()
        this.ResponseList()

        console.log(res);
        const newResponse = {
          utterance: this.IntendForm.value.response,
        };
        this.reloadComponent('Response Create')

        this.responseList.push(newResponse);
        this.IntendForm.reset();
      }, (error) => {
        console.error('Error saving intent:', error);
      });
    }
    else {
      this.reloadComponent('Response missing')

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
    else
      if (value == 'Intent Create') {
        this.toastermessage = true
        this.AlterMsg = "Intent Creaed Sucessfully!"
        setTimeout(() => {
          this.toastermessage = false
        }, 2000);

      }
      else
        if (value == 'Response Create') {
          this.toastermessage = true
          this.AlterMsg = "Response Creaed Sucessfully!"
          setTimeout(() => {
            this.toastermessage = false
          }, 2000);

        }
        else if (value == 'intent missing') {
          this.toastermessage = true
          this.AlterMsg = "intent is missing please add intent first !"
          setTimeout(() => {
            this.toastermessage = false
          }, 2000);

        }
        else if (value == 'Response missing') {
          this.toastermessage = true
          this.AlterMsg = "Response is missing please add Response first !"
          setTimeout(() => {
            this.toastermessage = false
          }, 2000);

        }
        else if (value == 'Response delete') {
          this.toastermessage = true
          this.AlterMsg = "Response Deleted Successfully !"
          setTimeout(() => {
            this.toastermessage = false
          }, 2000);

        }
        else if (value == 'intent delete') {
          this.toastermessage = true
          this.AlterMsg = "Intent Deleted Successfully !"
          setTimeout(() => {
            this.toastermessage = false
          }, 2000);

        }
        else if (value == 'cannot delete') {
          this.toastermessage = true
          this.AlterMsg = "An error occurred: intent already exists in a rule!"
          setTimeout(() => {
            this.toastermessage = false
          }, 2000);

        }

        else if (value) {
          this.toastermessage = true
          this.AlterMsg = value
          setTimeout(() => {
            this.toastermessage = false
          }, 4000);

        }
  }

  closeToaster() {
    this.toastermessage = false;
  }

}
