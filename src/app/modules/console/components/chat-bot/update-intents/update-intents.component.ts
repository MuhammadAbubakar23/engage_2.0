import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { BotService } from '../../../services/bot.service';

@Component({
  selector: 'app-update-intents',
  templateUrl: './update-intents.component.html',
  styleUrls: ['./update-intents.component.scss']
})
export class UpdateIntentsComponent implements OnInit {
  formGroup: FormGroup | undefined;
  toastermessage: string = '';
  isToaster: boolean = false;
  oldData={"intent": "","old_question": "string","old_answers": ["string"]};
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,private botService: BotService,private router:Router
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

      this.formGroup?.patchValue({
        intentName: intentName,
        question: question,
      });

      this.setAnswers(answers); // Set the answers array

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

    this.botService.updateIntentApi({"intent": this.formGroup!.value.intentName,"old_question":this.oldData.old_question,"old_answers":this.oldData.old_answers,
     "new_question": this.formGroup!.value.question,
    "new_answers":this.formGroup!.value.answers}).subscribe((res: any) => {

       this.toastermessage = 'Successfully updated!';
      this.isToaster = true;
      setTimeout(() => {
        this.isToaster = false;
      }, 4000);
      this.router.navigateByUrl('console/automation/chat-bot-intent')
      });

  }
}
