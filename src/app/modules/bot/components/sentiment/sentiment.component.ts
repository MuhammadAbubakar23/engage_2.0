import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BotService } from '../../services/bot.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SentimentService } from '../../services/sentiment.service';

@Component({
  selector: 'app-sentiment',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.scss']
})
export class SentimentComponent implements OnInit {
  selectedFile: File | null = null;
  response="";
  language=""
  inputText=""
  trainType="Please Select Language Model";
  languages=["roman","urdu"]
  labels:any=["Positive","Negative","Neutral"];
  public stepThreeForm: FormGroup;

  constructor(private botService:BotService,private senService:SentimentService,private fb: FormBuilder) {
    this.stepThreeForm = this.fb.group(
      {
      sentences: this.fb.array([this.createSentenceControl()]),
    });
  }
  ngOnInit(): void {
    this.senService.login().subscribe((token: any) => {
      console.log(token, token.access);
      localStorage.setItem("token", token.access);
    });
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (this.selectedFile) {
      const formData: FormData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);
      this.senService.fileUploadApi(formData).subscribe((res:any)=>{
        alert('File uploaded successfully');
      })
    }
  }

  onEnterKeyPressed(event:any){
    console.log('Enter key pressed',this.inputText);
    this.response="Positive";
    this.language="English";
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

  submitSenteces(){

  const data={"data":this.stepThreeForm.value['sentences']};

  console.log("Submitting...",data);
   this.senService.postSentimentApi(data).subscribe((res)=>{
    console.log("Sentiment",res);
    alert("Success!")
   })
  }

  trainModel():void{
    console.log("Training",this.trainType);
    this.senService.trainingApi({"text":this.trainType}).subscribe((res)=>{
      console.log("Sentiment",res);
      alert("Success!");
    })
  }
}