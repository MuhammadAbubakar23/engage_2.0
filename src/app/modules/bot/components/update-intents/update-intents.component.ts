import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { BotService } from '../../services/bot.service';

@Component({
  selector: 'app-update-intents',
  templateUrl: './update-intents.component.html',
  styleUrls: ['./update-intents.component.scss']
})
export class UpdateIntentsComponent implements OnInit {
  formGroup: FormGroup | undefined;
  oldData={"intent": "","old_question": "string","old_answers": ["string"]};
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,private botService: BotService
  ) {}

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      intentName: '',
      question: '',
      answers: this.formBuilder.array([])
    });

    this.route.queryParams.subscribe(params => {
      const intentName = params['intentName'];
      const question = params['question'];
      const answers = params['answers'];
      this.oldData.intent=intentName;
      this.oldData.old_question=question;
      this.oldData.old_answers=answers;
      // console.log("this.oldData",this.oldData);

      this.formGroup?.patchValue({
        intentName: intentName,
        question: question,
      });

      this.setAnswers(answers); // Set the answers array

      // console.log("this", this.formGroup);
    });
  }

  setAnswers(answers: string[]) {
    const answerArray = this.formGroup!.get('answers') as FormArray;
    answerArray.clear();
    answers.forEach(answer => {
      answerArray.push(this.formBuilder.control(answer));
    });
  }

  get answersControls() {
    return (this.formGroup!.get('answers') as FormArray).controls;
  }

  update(): void {
    // {
    //   "intent": "string",
    //   "old_question": "string",
    //   "old_answers": [
    //     "string"
    //   ],
    //   "new_question": "string",
    //   "new_answers": [
    //     "string"
    //   ]
    // }
    this.botService.updateIntentApi({"intent": this.formGroup!.value.intentName,"old_question":this.oldData.old_question,"old_answers":this.oldData.old_answers,
     "new_question": this.formGroup!.value.question,
    "new_answers":this.formGroup!.value.answers}).subscribe((res: any) => {
      // console.log(res);
       alert("Success!");
      });
  }
}
