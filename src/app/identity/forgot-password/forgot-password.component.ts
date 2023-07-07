import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { VerificationDto } from 'src/app/shared/Models/verificationDto';
import { AuthService } from '../AuthService/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  verificationDto = new VerificationDto();

  verificationForm= new UntypedFormGroup({
    email:new UntypedFormControl(this.verificationDto.email)
  });
  constructor(private authService : AuthService) { }

  ngOnInit(): void {
  }

  sendVerificationCode(){
    
    this.authService.sendVerificationCode(this.verificationForm.value).subscribe((res : any) =>
    {
      
      if (res.message){
        alert("Varification code send successfully on your Email.")
      }
    },
    ({error}) =>{
      alert(error.message)
      // this.toaster.error(error.message);
    });
  }

}
