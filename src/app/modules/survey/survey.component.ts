import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,FormControlName } from '@angular/forms';
@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {

  value:any;

  constructor() { }
  servicesForm=new FormGroup({
    value:new FormControl(''),

  })

  ngOnInit(): void {
  }

numbers:any[]=[ 1,2,3,4,5]

markScore(value:any){
  this.servicesForm.value.value = value
}

save(){
  console.log("the sevices value==>",this.servicesForm.value)
}
}
