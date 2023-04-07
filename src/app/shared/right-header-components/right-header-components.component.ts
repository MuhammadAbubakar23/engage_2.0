import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonDataService } from '../services/common/common-data.service';
import * as signalR from '@microsoft/signalr';
import { AgentDetailsService } from 'src/app/services/AgentDetailsService/agent-details.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-right-header-components',
  templateUrl: './right-header-components.component.html',
  styleUrls: ['./right-header-components.component.scss'],
})
export class RightHeaderComponentsComponent implements OnInit {
  isActive = false;
  id = localStorage.getItem('agentId');
  AgentDetails = this.agentDetailsService.agentDetails

  public hubconnection!: signalR.HubConnection;
  public Subscription!: Subscription;

  constructor(
    private router: Router,
    private commonService: CommonDataService,
    private agentDetailsService : AgentDetailsService
  ) {}

  ngOnInit(): void {
    
  }

  Searchfiltercheck() {
    this.isActive = !this.isActive;
  }
  signOut() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  

  updateBreak() {
    
    this.AgentDetails.onBreak = !this.AgentDetails.onBreak;
    this.commonService
      .UpdateBreak(this.AgentDetails.onBreak)
      .subscribe((res: any) => {
        if (this.AgentDetails.onBreak == true) {
          this.reloadComponent('breakStarted');
        } else if (this.AgentDetails.onBreak == false) {
          this.reloadComponent('breakOff');
        }
      });
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
  }
  closeToaster() {
    this.toastermessage = false;
  }
}
