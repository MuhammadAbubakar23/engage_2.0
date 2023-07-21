import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { BotService } from '../../../services/bot.service';

@Component({
  selector: 'app-step-four',
  templateUrl: './step-four.component.html',
  styleUrls: ['./step-four.component.scss']
})

export class StepFourComponent implements OnInit {
  // public stepFourForm: FormGroup;
  @Output() showToastr=new EventEmitter<any>();
  state: string="";
  intentName=""
  questions=[];
  answers=[];
  constructor(private fb: FormBuilder,private botService:BotService,private router:Router) {

  }

  ngOnInit(): void {
this.botService.intents$.subscribe((res:any)=>{
    console.log(res[0].intentName);
    console.log(res[1].questions)
    this.intentName=res[0].intentName;
    this.questions=res[1].questions.map((qst:any)=>qst.questionText);
    this.answers=res[2].answers.map((qst:any)=>qst.answerText);

});

  }

  stepFourSubmit() {
    this.state = 'done';
  }
  createIntent(): void {
    const finalanswers = [this.answers];
    this.botService.createIntentApi(
      {'intent': this.intentName, 'questions': this.questions, 'answers': finalanswers}
    ).subscribe((res: any) => {
      this.showToastr.emit('Successfully Created!')
      console.log(res);
    });
  }
}
