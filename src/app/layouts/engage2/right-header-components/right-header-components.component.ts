import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { CommonDataService } from '../services/common/common-data.service';
import * as signalR from '@microsoft/signalr';
import { AgentDetailsService } from 'src/app/services/AgentDetailsService/agent-details.service';
import { Subscription } from 'rxjs';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { SignalRService } from 'src/app/services/SignalRService/signal-r.service';

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

  timer : any;
  // public hubconnection!: signalR.HubConnection;
  public Subscription!: Subscription;

  constructor(
    private storage: StorageService,
    private router: Router,
    private commonService: CommonDataService,
    private agentDetailsService: AgentDetailsService,
    private signalR: SignalRService
  ) {}

  ngOnInit(): void {
    debugger
    let data = this.storage.retrive('main', 'O').local;
    this.fullName = data.username;
    console.table(data);
    this.email = data.originalUserName;

    this.timer = setInterval(() => {
      if (this.signalR.hubconnection.state == "Disconnected") {
        debugger
        this.signalR.hubconnection
          .start()
          .then(() => console.log('Connection started'))
          .then(() => this.signalR.getConnectionId())
          .catch((err) =>
             console.log('Error while starting connection: ' + err)
          );
      }
    }, 5000);

    this.clickHandler();
  }

  Searchfiltercheck() {
    this.isActive = !this.isActive;
  }

  signOut() {
    debugger
    if (
      this.assignedProfile == null ||
      this.assignedProfile == '' ||
      this.assignedProfile == undefined
    ) {
      localStorage.clear();
      this.router.navigateByUrl('/login');
      clearInterval(this.timer)
      if(this.signalR.hubconnection.state == "Connected"){
        this.signalR.hubconnection
        .stop()
        .then(() => console.log('Connection stoped'))
        .catch((err) => console.log('Error while stopping connection: ' + err));
      }
      
      
      

      
    } else {
      this.reloadComponent('querryAssigned');
    }
  }

  assignedProfile = localStorage.getItem('assignedProfile');
  updateBreak() {
    debugger
    if (
      this.assignedProfile == null ||
      this.assignedProfile == '' ||
      this.assignedProfile == undefined
    ) {
      this.startBreak = !this.startBreak;
      
    //  this.AgentDetails.onBreak = !this.AgentDetails.onBreak;
      this.commonService
        .UpdateBreak(this.startBreak)
        .subscribe((res: any) => {
          debugger
          if (res.message === "Data Update Successfully") {
            this.clickHandler();
            this.reloadComponent('breakStarted');
            
          } 
          else if (res.message === "Data Update Successfully") {
            this.reloadComponent('breakOff');
          }
        });
    } 
    else {
      this.reloadComponent('querryAssigned');
    }
  }

  AlterMsg: any;
  toastermessage: any;

  reloadComponent(type: any) {
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
  isRunning = false;
  timerId : any = 0;

  clickHandler() {
    debugger
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
          this.ss = 0
        }
        if (this.mm >= 60) {
          this.hh++;
          this.mm = 0
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
