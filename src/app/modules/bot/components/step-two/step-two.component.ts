import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.scss']
})
export class StepTwoComponent implements OnInit {
  public stepTwoForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.stepTwoForm = this.fb.group({
      questions: this.fb.array([
        this.createQuestionControl() // Initialize with one question control
      ],Validators.required)
    });
  }

  ngOnInit(): void {}

  createQuestionControl(): FormGroup {
    return this.fb.group({
      questionText: ['', Validators.required] // Add Validators.required validator
    });
  }

  get questions(): FormArray {
    return this.stepTwoForm.get('questions') as FormArray;
  }

  addQuestion() {
    this.questions.push(this.createQuestionControl());
  }

  removeQuestion(index: number) {
    this.questions.removeAt(index);
  }

  stepTwoSubmit() {
    console.log(this.stepTwoForm.value.questions);
  }
}
