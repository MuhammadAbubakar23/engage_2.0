import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgentDetailsService } from 'src/app/services/AgentDetailsService/agent-details.service';
import { Subscription } from 'rxjs';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { SignalRService } from 'src/app/services/SignalRService/signal-r.service';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { LoginDto } from 'src/app/shared/Models/LoginDto';
import { AuthService } from 'src/app/identity/AuthService/auth.service';

@Component({
  selector: 'right-header-components',
  templateUrl: './right-header-components.component.html',
  styleUrls: ['./right-header-components.component.scss'],
})
export class RightHeaderComponentsComponent implements OnInit {
  isActive = false;
  id = localStorage.getItem('agentId');
  AgentDetails = this.agentDetailsService.agentDetails;

  fullName: string = '';
  email: string = '';
  startBreak = false;

  timer: any;
  // public hubconnection!: signalR.HubConnection;
  public Subscription!: Subscription;

  constructor(
    private storage: StorageService,
    private router: Router,
    private commonService: CommonDataService,
    private agentDetailsService: AgentDetailsService,
    private signalR: SignalRService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    let data = this.storage.retrive('main', 'O').local;
    this.fullName = data.username;
    console.table(data);
    this.email = data.originalUserName;

    this.timer = setInterval(() => {
      // // console.log("signalR state",this.signalR.hubconnection.state)
      // // console.log("signalR conId",this.signalR.hubconnection.connectionId)
      if (this.signalR?.hubconnection?.state == 'Disconnected') {
        // this.signalR.hubconnection
        //   .start()
        //   .then(() => // console.log('Connection started'))
        //   .then(() => this.signalR.getConnectionId())
        //   .catch((err) =>
        //      // console.log('Error while starting connection: ' + err)
        //   );
        this.signalR.startConnection();
      }
    }, 5000);

    this.clickHandler();
  }

  Searchfiltercheck() {
    this.isActive = !this.isActive;
  }

  signOut() {
    if (
      localStorage.getItem('assignedProfile') == null ||
      localStorage.getItem('assignedProfile') == '' ||
      localStorage.getItem('assignedProfile') == undefined
    ) {
      this.commonService.SignOut().subscribe((res:any)=>{
        localStorage.clear();
        this.router.navigateByUrl('/login');
        clearInterval(this.timer);
      },
      (error)=>{
        console.log(error);
        localStorage.clear();
        this.router.navigateByUrl('/login');
        clearInterval(this.timer);
      });
      
      // if (this.signalR.hubconnection?.state == 'Connected') {
      //   this.signalR.hubconnection
      //     .stop()
      //     .then(() =>  console.log('Connection stoped'))
      //     .catch((err) =>
      //        console.log('Error while stopping connection: ' + err)
      //     );
      // }
    } else {
      this.reloadComponent('querryAssigned');
    }
  }
  
  updateBreak() {
    if (
      localStorage.getItem('assignedProfile') == null ||
      localStorage.getItem('assignedProfile') == '' ||
      localStorage.getItem('assignedProfile') == undefined
    ) {
      this.startBreak = true;

      //  this.AgentDetails.onBreak = !this.AgentDetails.onBreak;
      this.commonService.UpdateBreak(this.startBreak).subscribe((res: any) => {
        if (res.status === 'BreakOn') {
          this.clickHandler();
          this.reloadComponent('breakStarted');
          this.timerStart();
        } else if (res.message === 'Breakoff') {
          this.reloadComponent('breakOff');
          this.timerStop();
        }
      });
    } else {
      this.reloadComponent('querryAssigned');
    }
  }

  logindto = new LoginDto();
  encryptedData = this.storage.retrive('main', 'O').local;
  activeAgent = this.encryptedData.originalUserName;

  loginForm = new UntypedFormGroup({
    email: new UntypedFormControl(this.logindto.userName),
    userName: new UntypedFormControl(this.activeAgent),
    password: new UntypedFormControl(this.logindto.password),
    rememberMe: new UntypedFormControl(this.logindto.rememberMe),
  });

  submit() {
    this.authService.login(this.loginForm.value).subscribe(
      (res: any) => {
        this.router.navigateByUrl('/all-inboxes/my_inbox');
        this.resetTimer();
        this.timerStop();
        this.clickHandler();
        this.resetForm();
        
      },
      (error: any) => {
        this.reloadComponent('loginFailed');
      }
    );
  }

  resetForm(){
    this.loginForm.reset({
      userName:this.activeAgent,
      password:"",
      rememberMe:false,
    });
  }
  resetTimer() {
    
    this.break = false;
    this.isBreak = false;
    this.milisecond = 0;
    this.second = 0;
    this.minute = 0;
    this.hour = 0;
    this.day = 0;
  }

  display: any;
  public timerInterval: any;
  break = false;
  milisecond = 0;
  second = 0;
  minute = 0;
  hour = 0;
  day = 0;

  isBreak: any = false;
  breakTimer: any = 0;

  timerStop() {
    this.break = false;
    this.isBreak = false;
    this.startBreak = false;
    clearInterval(this.breakTimer);
  }

  timerStart() {
    this.break = true;
    this.isBreak = true;
    // let minute = 1;
    if (this.isBreak) {
      this.breakTimer = setInterval(() => {
        this.milisecond++;

        if (this.milisecond >= 100) {
          this.second++;
          this.milisecond = 0;
        }
        if (this.second >= 60) {
          this.minute++;
          this.second = 0;
        }
        if (this.minute >= 60) {
          this.hour++;
          this.minute = 0;
        }
        if (this.hour > 24) {
          this.day++;
          this.hour = 0;
        }
      }, 10);
    } else {
      clearInterval(this.breakTimer);
    }
  }

  AlterMsg: any;
  toastermessage: any;

  reloadComponent(type: any) {
    if (type == 'loginFailed') {
      this.AlterMsg = 'You entered a wrong Password!';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'breakStarted') {
      this.AlterMsg = 'Break status is ON now!';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'breakOff') {
      this.AlterMsg = 'Break status is OFF now!';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'querryAssigned') {
      this.AlterMsg = 'Please Complete Querry First!';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
  }
  closeToaster() {
    this.toastermessage = false;
  }

  hh = 0;
  mm = 0;
  ss = 0;
  ms = 0;
  dd = 0;
  // aaa = "";
  isRunning = false;
  timerId: any = 0;

  clickHandler() {
    if (!this.isRunning) {
      // Stop => Running
      this.timerId = setInterval(() => {
        this.ms++;

        if (this.ms >= 100) {
          this.ss++;
          this.ms = 0;
        }
        if (this.ss >= 60) {
          this.mm++;
          this.ss = 0;
        }
        if (this.mm >= 60) {
          this.hh++;
          this.mm = 0;
        }
        if (this.hh > 24) {
          this.dd++;
          this.hh = 0;
        }
      }, 10);
    } else {
      clearInterval(this.timerId);
    }
    this.isRunning = !this.isRunning;
  }

  format(num: number) {
    return (num + '').length === 1 ? '0' + num : num + '';
  }
}
