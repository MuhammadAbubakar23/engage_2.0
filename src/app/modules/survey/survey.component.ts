import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,FormControlName } from '@angular/forms';
import { commentsDto } from 'src/app/shared/Models/concersationDetailDto';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {
  AlterMsg="Survey completed Successfully"
  value:any;
  toastermessage:boolean=false
  constructor(private commanDateServices:CommonDataService) { }

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
  let data={

  }
  
  debugger
  console.log("the sevices value==>",this.servicesForm.value)
  this.commanDateServices.AddCSATSurvey(data).subscribe((res=>{
    console.log("AddCASTSurvey res===>",res)
  }))
  this.toastermessage=true;
  setTimeout(() => {
    this.toastermessage=false
    
  },1000);
}

closeToaster(){
  this.toastermessage=false
}

}
