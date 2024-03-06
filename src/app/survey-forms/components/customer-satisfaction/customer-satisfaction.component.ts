import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';

@Component({
  selector: 'app-customer-satisfaction',
  templateUrl: './customer-satisfaction.component.html',
  styleUrls: ['./customer-satisfaction.component.scss'],
})
export class CustomerSatisfactionComponent implements OnInit {
  AlterMsg = 'Survey completed Successfully';
  value: any;
  toastermessage: boolean = false;
  feedbackSubmitted = false;
  activeButtonIndex: number | null = null;
  constructor(private commanDateServices: CommonDataService,
    private spinnerService : NgxSpinnerService,
    private router: Router) {}

  ngOnInit(): void {}

  markScore(value: any) {
    this.value = value;
    this.activeButtonIndex = value;
    
  }

  save() {
   
    const channel = this.router.url.split(/[=&]/)[1];
    const customerId = this.router.url.split(/[=&]/)[3];
    const AgentId=Number(this.router.url.split(/[=&]/)[5]);
    const id=Number(this.router.url.split(/[=&]/)[7])
    let data = {

      customerId: customerId,
      attempts: 0,
      agentId: AgentId,
      rating: this.value,
      platform: channel,
      id:id
    };
    this.spinnerService.show();
    this.commanDateServices.CSATFormForKE(data).subscribe((res:any) => {
      this.spinnerService.hide();
      this.feedbackSubmitted = true;
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 1000);
    },
    (error:any)=>{
    });
  }

  closeToaster() {
    this.toastermessage = false;
  }
}
