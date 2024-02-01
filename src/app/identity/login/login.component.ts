import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/identity/AuthService/auth.service';
import { AgentDetailsService } from 'src/app/services/AgentDetailsService/agent-details.service';
import { SignalRService } from 'src/app/services/SignalRService/signal-r.service';
import { LoginDto } from 'src/app/shared/Models/LoginDto';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { DatePipe } from '@angular/common';

import { map, timer, takeWhile } from 'rxjs';
import { VerificationDto } from 'src/app/shared/Models/VerificationDto';

// import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  Actors = [
    { id: 1, name: 'Administrator' },
    { id: 2, name: 'Agent' },
    { id: 3, name: 'Manager' },
  ];
  user = '1';
  token: any;
  logindto = new LoginDto();
  verificationdto = new VerificationDto();
  isUserLoging: boolean = false;
  baseUrl: string = '';
  ErrorMessage: any;
  isVerificationcodeFailed: boolean = false;
  loginDisabled: boolean = false;
  matchTime: any;
  BlockuserTime: any;
  timeRemaining: any;
  countdownTime: number = 0;
  loginForm = new UntypedFormGroup({
    // actor: new UntypedFormControl(this.logindto.actor),
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
  @Input() seconds = 500;
  display: any;
  constructor(
    private authService: AuthService,
    private stor: StorageService,
    private router: Router,
    private spinnerService: NgxSpinnerService,
    private signalRService: SignalRService,
    private commonService: CommonDataService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    // this.getAllTags();
    this.baseUrl = window.location.origin;
  }

  login() {
    let obj = {
      // actor: this.loginForm.value.actor,
      userName: this.loginForm.value.userName,
      password: this.loginForm.value.password,
      rememberMe: true,
    };
    this.spinnerService.show();
    this.authService.login(obj).subscribe(
      (res: any) => {
        
        // only for testing purpose, remove after that
        // res = {'loginResponse':res}
        // res = {'loginResponse':res}
        // res['isTwoFAEnabled'] = false;
        // only for testing purpose, remove after that

        if (res.isTwoFAEnabled == false) {
          this.stor.store('token', res.loginResponse.loginResponse.accessToken);
          this.stor.store('main', res.loginResponse.loginResponse);
          this.stor.store(
            'nocompass',
            res.loginResponse.loginResponse.roles[0]
          );
          localStorage.setItem(
            'agentId',
            res.loginResponse.loginResponse.userId
          );
          localStorage.setItem(
            'agentName',
            res.loginResponse.loginResponse.username
          );

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
          this.signalRService.updatePostList();
        } else if (res.isTwoFAEnabled == true) {
          this.Verificationemail =
            res.loginResponse.loginTwoFAResponse.userName;
          this.isUserLoging = true;
          this.isVerificationcodeFailed = false;
          this.spinnerService.hide();
        }
      },
      (error: any) => {
        this.ErrorMessage = error.error;
        if (this.ErrorMessage?.includes('The account is locked out ')) {
          const LockedtiemEndpatteren = /lockoutEndTime = (.+)$/;
          this.matchTime = this.ErrorMessage.match(LockedtiemEndpatteren);
          if (this.matchTime && this.matchTime.length > 1) {
            const lockoutEndTimeString = this.matchTime[1];
            const lockoutEndTime = new Date(lockoutEndTimeString).toISOString();
            this.BlockuserTime = this.datePipe.transform(
              new Date(lockoutEndTime),
              'h:mm:ss'
            );

            const endTimeMinutes = new Date(lockoutEndTime).getMinutes();
            const NowTimeMinutes = new Date().getMinutes();
            const endTimeSeconds = new Date(lockoutEndTime).getSeconds();
            const NowTimeSeconds = new Date().getSeconds();

            const sumofEndTime = endTimeMinutes + endTimeSeconds;
            const sumofNowTime = NowTimeMinutes + NowTimeSeconds;

            this.countdownTime = endTimeMinutes - NowTimeMinutes;
            this.timer(this.countdownTime);

            this.reloadComponent('userblocked');
          }

          this.loginDisabled = true;
          this.spinnerService.hide();
          this.reloadComponent('userblocked');
        } else {
          this.spinnerService.hide();
          this.reloadComponent('loginFailed');
        }
      }
    );
  }
  timer(countdownTime: any) {
    // let minute = 1;
    let seconds: number = countdownTime * 60;
    let textSec: any = '0';
    let statSec: number = 60;

    const prefix = countdownTime < 10 ? '0' : '';

    const timer = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = '0' + statSec;
      } else textSec = statSec;

      this.display = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;
      if (this.display == '00:00') {
        this.loginDisabled = false;
        this.countdownTime = 0;
        // this.login()
      }
      if (seconds == 0) {
        console.log('finished');
        clearInterval(timer);
      }
    }, 1000);
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
        // for new post
        this.signalRService.updatePostList;
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
    if (type == 'userblocked') {
      this.AlterMsg = 'User is Blocked till ' + this.BlockuserTime;
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
