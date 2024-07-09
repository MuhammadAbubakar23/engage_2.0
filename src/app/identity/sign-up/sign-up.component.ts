import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupDto } from 'src/app/shared/Models/SignupDto';
import { AuthService } from '../Services/AuthService/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {


  signupdto=new SignupDto();



  SignupForm=new UntypedFormGroup({
    firstName:new UntypedFormControl(this.signupdto.firstName),
    lastName: new UntypedFormControl(this.signupdto.lastName),
    phone:new UntypedFormControl(this.signupdto.phone),
    email:new UntypedFormControl(this.signupdto.email),
    password:new UntypedFormControl(this.signupdto.password),
    confirmPassword:new UntypedFormControl(this.signupdto.confirmPassword),
  }
    

  );

  constructor(private authService : AuthService,
              private router:Router) { }

  ngOnInit(): void {
  }

  submit(){
   
    this.authService.signup(this.SignupForm.value).subscribe((res : any) =>{

      if(res.succeeded == true && res.errors ==""){
        
        alert("User created successfully")

      }
    },
    ({error}) =>{
      alert("There is some error")
      // this.toaster.error(error.message);
    })
  }

}
