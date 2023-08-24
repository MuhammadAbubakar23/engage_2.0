import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/identity/AuthService/auth.service';
import { AgentDetailsService } from 'src/app/services/AgentDetailsService/agent-details.service';
import { SignalRService } from 'src/app/services/SignalRService/signal-r.service';
import { LoginDto } from 'src/app/shared/Models/LoginDto';
import { StorageService } from 'src/app/shared/services/storage/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user = '1';
  token: any;
  logindto = new LoginDto();

  loginForm = new UntypedFormGroup({
    email: new UntypedFormControl(this.logindto.userName),
    userName: new UntypedFormControl(this.logindto.userName),
    password: new UntypedFormControl(this.logindto.password),
    rememberMe: new UntypedFormControl(this.logindto.rememberMe),
  });

  constructor(
    private authService: AuthService,
    private stor: StorageService,
    private router: Router,
    private spinnerService: NgxSpinnerService,
    private signalRService: SignalRService
  ) {}

  ngOnInit(): void {}

  submit() {
    this.spinnerService.show();
    this.authService.login(this.loginForm.value).subscribe(
      (res: any) => {
        debugger;
        this.stor.store('token', res.accessToken);
        this.stor.store('main', res);
        this.stor.store('nocompass', res.roles[0]);
        localStorage.setItem('agentId', res.userId);
        localStorage.setItem('agentName', res.username);
        this.router.navigateByUrl('all-inboxes/my_inbox');
        this.spinnerService.hide();

        //signalRRequests

        this.signalRService.startConnection();

        this.signalRService.removeTagDataListener();
        this.signalRService.addTagDataListner();
        this.signalRService.unRespondedCountDataListener();
        this.signalRService.updateListAndDetailDataListener();
        this.signalRService.replyDataListener();
        this.signalRService.queryStatusDataListener();
        this.signalRService.bulkQueryStatusDataListener();
        this.signalRService.checkConnectionStatusListener();
        this.signalRService.assignQueryResponseListner();
        this.signalRService.applySentimentListner();
      },
      (error: any) => {
        this.spinnerService.hide();
        this.reloadComponent('loginFailed');
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
  }
  closeToaster() {
    this.toastermessage = false;
  }
}
