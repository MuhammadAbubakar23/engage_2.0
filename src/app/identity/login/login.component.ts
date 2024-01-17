import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/identity/AuthService/auth.service';
import { AgentDetailsService } from 'src/app/services/AgentDetailsService/agent-details.service';
import { SignalRService } from 'src/app/services/SignalRService/signal-r.service';
import { LoginDto } from 'src/app/shared/Models/LoginDto';
import { VerificationDto } from 'src/app/shared/Models/verificationDto';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';

// import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user = '1';
  token: any;
  logindto = new LoginDto();
  verificationdto = new VerificationDto();
  isUserLoging: boolean = false;
  baseUrl:string="";

  isVerificationcodeFailed: boolean = false;

  loginForm = new UntypedFormGroup({
    email: new UntypedFormControl(this.logindto.userName),
    userName: new UntypedFormControl(this.logindto.userName),
    password: new UntypedFormControl(this.logindto.password),
    rememberMe: new UntypedFormControl(this.logindto.rememberMe),
  });
  verificationForm = new UntypedFormGroup({
    Verificationemail: new UntypedFormControl(this.verificationdto.email),
    verificationCode: new UntypedFormControl(
      this.verificationdto.verificationCode
    ),
  });
  Verificationemail: any;
  constructor(
    private authService: AuthService,
    private stor: StorageService,
    private router: Router,
    private spinnerService: NgxSpinnerService,
    private signalRService: SignalRService,
    private commonService: CommonDataService
  ) {}

  ngOnInit(): void {
    // this.getAllTags();
    this.baseUrl = window.location.origin;
  }

  login() {
    debugger
    if(this.baseUrl == 'https://engage.jazz.com.pk'){
      
    let obj = {
      userName: this.loginForm.value.userName,
      password: this.loginForm.value.password,
      rememberMe: true,
    };

      this.authService.TwoFA(obj).subscribe(
        (res: any) => {
          this.Verificationemail = res.userName;
          this.isUserLoging = true;
          this.isVerificationcodeFailed = false;
        },
        (error: any) => {
          this.spinnerService.hide();
          this.reloadComponent('loginFailed');
        }
      );
    } else {
      let obj = {
        userName: this.loginForm.value.userName,
        password: this.loginForm.value.password,
        rememberMe: true,
      };
      this.spinnerService.show();
    this.authService.login(obj).subscribe(
      (res: any) => {
        this.stor.store('token', res.accessToken);
        this.stor.store('main', res);
        this.stor.store('nocompass', res.roles[0]);
        localStorage.setItem('agentId', res.userId);
        localStorage.setItem('agentName', res.username);

        this.commonService.UserLogin().subscribe((res: any) => {
          console.log(res);
        },
        (error)=>{
          debugger
          console.log(error)
        });
debugger
        this.router.navigateByUrl('all-inboxes/focused/all');
        this.spinnerService.hide();

        //signalRRequests

        this.signalRService.startConnection();

        this.signalRService.removeTagDataListener();
        this.signalRService.addTagDataListener();
        this.signalRService.unRespondedCountDataListener();
        this.signalRService.updateListAndDetailDataListener();
        this.signalRService.replyDataListener();
        this.signalRService.queryStatusDataListener();
        this.signalRService.bulkQueryStatusDataListener();
        this.signalRService.checkConnectionStatusListener();
        this.signalRService.assignQueryResponseListner();
        this.signalRService.applySentimentListner();
        this.signalRService.updateMessageStatusDataListener();
      },
      (error: any) => {
        this.spinnerService.hide();
        this.reloadComponent('loginFailed');
        this.isVerificationcodeFailed = true;
      }
    );
    }
    // this.authService.login(obj).subscribe(
    //   (res: any) => {

    //     this.isUserLoging=true

    //   },
    //   (error: any) => {
    //     this.spinnerService.hide();
    //     this.reloadComponent('loginFailed');
    //   }
    // );
  }
  Submituser() {
    let obj = {
      userName: this.verificationForm.value.Verificationemail,
      varificationCode: Number(this.verificationForm.value.verificationCode),
    };
    this.spinnerService.show();
    this.authService.submitUser(obj).subscribe(
      (res: any) => {
        this.stor.store('token', res.accessToken);
        this.stor.store('main', res);
        this.stor.store('nocompass', res.roles[0]);
        localStorage.setItem('agentId', res.userId);
        localStorage.setItem('agentName', res.username);

        this.commonService.UserLogin().subscribe((res: any) => {
          console.log(res);
        });

        this.router.navigateByUrl('all-inboxes/focused/all');
        this.spinnerService.hide();

        //signalRRequests

        this.signalRService.startConnection();

        this.signalRService.removeTagDataListener();
        this.signalRService.addTagDataListener();
        this.signalRService.unRespondedCountDataListener();
        this.signalRService.updateListAndDetailDataListener();
        this.signalRService.replyDataListener();
        this.signalRService.queryStatusDataListener();
        this.signalRService.bulkQueryStatusDataListener();
        this.signalRService.checkConnectionStatusListener();
        this.signalRService.assignQueryResponseListner();
        this.signalRService.applySentimentListner();
        this.signalRService.updateMessageStatusDataListener();
      },
      (error: any) => {
        this.spinnerService.hide();
        this.reloadComponent('verificationFailed');
        this.isVerificationcodeFailed = true;
      }
    );
  }
  AlterMsg: any;
  toastermessage: any;
  reloadComponent(type: any) {
    if (type == 'loginFailed') {
      this.AlterMsg = 'Wrong Username or Password!';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'verificationFailed') {
      this.AlterMsg = 'Wrong Verification Code !';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
  }
  closeToaster() {
    this.toastermessage = false;
  }
  VerificationcodeFailed() {
    this.isUserLoging = false;
    this.verificationForm.reset();
  }
  getAllTags() {
    // this.commonService.GetAllTags().subscribe((res:any)=>{
    //   this.stor.store('Tags', res);
    // });
  }
}
