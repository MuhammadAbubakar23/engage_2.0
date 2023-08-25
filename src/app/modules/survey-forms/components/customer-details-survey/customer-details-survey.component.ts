import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';

@Component({
  selector: 'app-customer-details-survey',
  templateUrl: './customer-details-survey.component.html',
  styleUrls: ['./customer-details-survey.component.scss']
})
export class CustomerDetailsSurveyComponent implements OnInit {
  AlterMsg="Date Add Successfull"
  toastermessage:boolean=false
  constructor( private commondataService:CommonDataService  ) { }
 morinageForm=new FormGroup({
  date:new FormControl('',Validators.required),
  cli:new FormControl('',Validators.required),
  parentName:new FormControl('',Validators.required),
  childsName:new FormControl('',Validators.required),
  kidAge:new FormControl('',Validators.required),
  formulaUser:new FormControl('',Validators.required),
  productName:new FormControl('',Validators.required),
  timeduration1:new FormControl('',Validators.required),
  reason1:new FormControl('',Validators.required),
  otherFoumulauser:new FormControl('',Validators.required),
  timeduration2:new FormControl('',Validators.required),
  reason2:new FormControl('',Validators.required)


 })

  ngOnInit(): void {

  }

  save(){
    let data={
     "createdDate":this.morinageForm.value.date,
     "cli":this.morinageForm.value.cli,
     "parentName":this.morinageForm.value.parentName,
     "childName":this.morinageForm.value.childsName,
     "kidAge":this.morinageForm.value.kidAge,
     "isMorinagaUser":this.morinageForm.value.formulaUser,
     "productName":this.morinageForm.value.productName,
     "duration":this.morinageForm.value.timeduration1,
     "reason":this.morinageForm.value.reason1,
     "otherFormula":this.morinageForm.value.otherFoumulauser,


    }
    debugger
  
    this.commondataService.AddSurvey(data).subscribe((res:any)=>{
   console.log("Add Date Respons===>",res);
    this.toastermessage=true
    setTimeout(()=>{
      this.toastermessage=false
    },1000)
    this.morinageForm.reset()
    })
   
  }
  closeToaster(){
    this.toastermessage=false

  }
  clearForm(){
    this.morinageForm.reset()
  }
}
