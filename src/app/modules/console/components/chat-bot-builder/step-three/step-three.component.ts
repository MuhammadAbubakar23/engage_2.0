import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.scss']
})

export class StepThreeComponent implements OnInit {
  public stepThreeForm: FormGroup;

  @Output() childEventpreview: EventEmitter<any> = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
    this.stepThreeForm = this.fb.group({
      answers: this.fb.array([
        this.createAnswerControl()
      ])
    });
  }

  ngOnInit(): void {}

  createAnswerControl(): FormGroup {
    return this.fb.group({
      answerText: ''
    },Validators.required);
  }

  get answers(): FormArray {
    return this.stepThreeForm.get('answers') as FormArray;
  }

  addAnswer() {
    this.answers.push(this.createAnswerControl());
  }

  removeAnswer(index: number) {
    this.answers.removeAt(index);
  }

  stepThreeSubmit() {
    console.log(this.stepThreeForm.value.answers);
  }
  priview(){
  this.childEventpreview.emit();
  }
}
