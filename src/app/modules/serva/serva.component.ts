import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControlName,FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-serva',
  templateUrl: './serva.component.html',
  styleUrls: ['./serva.component.scss']
})
export class ServaComponent implements OnInit {
  AlterMsg="Date Add Successfull"
  toastermessage:boolean=false
  constructor() { }
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
     "CreatedDate":this.morinageForm.value.date,
     "Cli":this.morinageForm.value.cli,
     "ParentName":this.morinageForm.value.parentName,
     "ChildName ":this.morinageForm.value.childsName,
     "KidAge":this.morinageForm.value.kidAge,
     "IsMorinagaUser":this.morinageForm.value.formulaUser,
     "ProductName ":this.morinageForm.value.productName,
     "Duration ":this.morinageForm.value.timeduration1,
     "Reason ":this.morinageForm.value.reason1,
     "otherFormularUser":this.morinageForm.value.otherFoumulauser,


    }
    debugger
    console.log("the value of morinageForm ",data)
    this.toastermessage=true
    setTimeout(()=>{
      this.toastermessage=false
    },1000)
  }
  closeToaster(){
    this.toastermessage=false

  }
  clearForm(){
    this.morinageForm.reset()
  }
}
