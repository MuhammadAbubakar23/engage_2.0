import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.scss']
})
export class StepOneComponent implements OnInit {

  public stepOneForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.stepOneForm = this.fb.group({
      intentName: this.fb.control('', Validators.required),
      description: this.fb.control('')
    });

  }
  stepOneSubmit() {
  }
}
