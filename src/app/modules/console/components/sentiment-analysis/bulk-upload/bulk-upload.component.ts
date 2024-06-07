// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-bulk-upload',
//   templateUrl: './bulk-upload.component.html',
//   styleUrls: ['./bulk-upload.component.scss']
// })
// export class BulkUploadComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
import { AfterViewInit, Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToggleService } from 'src/app/services/ToggleService/Toggle.service';


import { ChatwithsentimentComponent } from '../right-sidebar-components/chatwithsentiment/chatwithsentiment.component';
import { SentimentService } from '../../../services/sentiment.service';
import { BotService } from '../../../services/bot.service';
@Component({
  selector: 'app-bulk-upload',
  templateUrl: './bulk-upload.component.html',
  styleUrls: ['./bulk-upload.component.scss']
})
export class BulkUploadComponent implements OnInit, AfterViewInit {

  @ViewChild('rightcontainer', { read: ViewContainerRef })
  rightcontainer!: ViewContainerRef;
  panelToggled: any;
  showPanel = false;

  public subscription!: Subscription;

  selectedFile: File | null = null;
  response="";
  language=""
  inputText=""
  trainType="Select Language";
  languages=["roman","urdu"]
  labels:any=["Positive","Negative","Neutral"];
  public stepThreeForm: FormGroup;
  toastermessage: string = "";
  isToaster: boolean = false;

  constructor(private botService:BotService,private senService:SentimentService,private fb: FormBuilder,
    private toggleService: ToggleService,
    private resolver: ComponentFactoryResolver) {
      this.stepThreeForm = this.fb.group(
        {
          sentences: this.fb.array([this.createSentenceControl()]),
        });
  }
  ngOnInit(): void {
    this.senService.login().subscribe((token: any) => {
      localStorage.setItem("token", token.access);
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

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (this.selectedFile) {
      const formData: FormData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);
      this.senService.fileUploadApi(formData).subscribe((res: any) => {


        this.toastermessage = 'File uploaded successfully';
        this.isToaster = true;
        setTimeout(() => {
          this.isToaster = false;
        }, 4000);
      })
    }
  }

  onEnterKeyPressed(event: any) {
    this.response = "Positive";
    this.language = "English";
  }
  createSentenceControl(): FormGroup {
    return this.fb.group({
      sentence: ['', Validators.required],
      review: 'Please Select Review'
    });
  }

  get sentences(): FormArray {
    return this.stepThreeForm.get('sentences') as FormArray;
  }

  addSentence() {
    this.sentences.push(this.createSentenceControl());
  }

  removeSentence(index: number) {
    this.sentences.removeAt(index);
  }
  get labelName() {
    return this.stepThreeForm.get('review');
  }

  submitSenteces() {

    const data = { "data": this.stepThreeForm.value['sentences'] };

    this.senService.postSentimentApi(data).subscribe((res) => {

      this.toastermessage = 'Successfully Added';
      this.isToaster = true;
      setTimeout(() => {
        this.isToaster = false;
      }, 4000);
    })
  }

  trainModel(): void {
    this.senService.trainingApi({ "text": this.trainType }).subscribe((res) => {

      this.toastermessage = 'Trained successfully';
      this.isToaster = true;
      setTimeout(() => {
        this.isToaster = false;
      }, 4000);
    })
  }

  loadComponent(leftSideName: string, rightSideName: string) {
    let componentFactory: any = null;

    switch (leftSideName || rightSideName) {
      case 'sentiment-analysis':
        componentFactory = this.resolver.resolveComponentFactory(
          ChatwithsentimentComponent
        );
        this.rightcontainer.createComponent(componentFactory);
        break;
      default:
        break;
    }
  }
}
