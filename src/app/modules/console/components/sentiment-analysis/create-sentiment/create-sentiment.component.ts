// import { Component, OnInit } from '@angular/core';
// @Component({
//   selector: 'app-create-sentiment',
//   templateUrl: './create-sentiment.component.html',
//   styleUrls: ['./create-sentiment.component.scss']
// })
// export class CreateSentimentComponent implements OnInit {
//   constructor() { }
//   ngOnInit(): void {
//   }
// }
import { AfterViewInit, Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToggleService } from 'src/app/services/ToggleService/Toggle.service';
import { BotService } from '../../../services/bot.service';
import { SentimentService } from '../../../services/sentiment.service';
import { ChatwithsentimentComponent } from '../right-sidebar-components/chatwithsentiment/chatwithsentiment.component';
import { ClosePanelService } from 'src/app/services/ClosePanelServices/close-panel.service';
@Component({
  selector: 'app-create-sentiment',
  templateUrl: './create-sentiment.component.html',
  styleUrls: ['./create-sentiment.component.scss']
})
export class  CreateSentimentComponent implements OnInit, AfterViewInit {
  @ViewChild('rightcontainer', { read: ViewContainerRef })
  rightcontainer!: ViewContainerRef;
  panelToggled: any;
  showPanel = false;
  public subscription!: Subscription;
  response="";
  language=""
  inputText=""
  trainType="Select Language";
  languages=["roman","urdu"]
  labels:any=["Positive","Negative","Neutral"];
  public stepThreeForm: FormGroup;
  toastermessage: string = "";
  isToaster: boolean = false;
  constructor(private senService:SentimentService,private fb: FormBuilder,
    private toggleService: ToggleService,
    private closePanelServices :ClosePanelService,
    private resolver: ComponentFactoryResolver) {
      this.stepThreeForm = this.fb.group(
        {
          sentences: this.fb.array([this.createSentenceControl()])
        }, );
  }
  ngOnInit(): void {
    this.senService.login().subscribe((token: any) => {
      sessionStorage.setItem("token", token.access);
    });
    this.subscription = this.toggleService
      .getTogglePanel()
      .subscribe((msg3) => {
        if (msg3) {
          this.rightcontainer?.clear();
          sessionStorage.setItem('child', msg3);
          this.showPanel = true;
          this.closePanelServices.sendLeftBarToggleValue(false)
          this.loadComponent('', msg3);
        } else {
          this.showPanel = false;
          this.rightcontainer?.clear();
          sessionStorage.setItem('child', '');
        }
      });
      this.subscription = this.closePanelServices.receiveRightBarToggleValue().subscribe(res=>{
        this.showPanel = res;
      })
  }
  ngAfterViewInit(): void {
    this.subscription = this.toggleService
      .getTogglePanel()
      .subscribe((msg3) => {
        if (msg3) {
          this.rightcontainer?.clear();
          sessionStorage.setItem('child', msg3);
          this.showPanel = true;
          this.closePanelServices.sendLeftBarToggleValue(false)
          this.loadComponent('', msg3);
        } else {
          this.showPanel = false;
          this.rightcontainer?.clear();
          sessionStorage.setItem('child', '');
        }
      });
  }
  onEnterKeyPressed(event: any) {
    this.response = "Positive";
    this.language = "English";
  }
  createSentenceControl(): FormGroup {
    return this.fb.group({
      sentence: ['', Validators.required],
      review: 'Select Review'
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
