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
  baseUrl: any;
  clientLogo:string='';
  clientName:string='';
  constructor(
    private commanDateServices: CommonDataService,
    private spinnerService: NgxSpinnerService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.baseUrl = window.location.origin;

    if (this.baseUrl == 'https://keportal.enteract.live') {
      this.companyId = 651;
      this.clientLogo = '../../../../assets/images/k-electric-vector-logo.svg'
      this.client = 'ke';
      this.clientName = 'K-Electric';
    } else if (this.baseUrl == 'https://engage.jazz.com.pk') {
      this.companyId = 650;
      this.clientLogo = '../../../../assets/images/ibex-enteract-engage.svg'
      this.client = 'jazz';
      this.clientName = 'Jazz';
    } else if (this.baseUrl == 'https://uiengage.enteract.app') {
      this.companyId = 657;
      this.clientLogo = '../../../../assets/images/ibex-enteract-engage.svg'
      this.client = 'stagging';
      this.clientName = 'Ibex';
    } else if (this.baseUrl == 'https://tpplui.enteract.live') {
      this.companyId = 652;
      this.clientLogo = '../../../../assets/images/ibex-enteract-engage.svg'
      this.client = 'tppl';
      this.clientName = 'Total Parco Pvt. Ltd.';
    } else if (this.baseUrl == 'https://waengage.enteract.live') {
      this.companyId = 653;
      this.clientLogo = '../../../../assets/images/ibex-enteract-engage.svg'
      this.client = 'morinaga';
      this.clientName = 'Morinaga';
    } else if (this.baseUrl == 'https://bzengage.enteract.live') {
      this.companyId = 654;
      this.clientLogo = '../../../../assets/images/ibex-enteract-engage.svg'
      this.client = 'bazaar';
      this.clientName = 'Bazaar';
    } else if (this.baseUrl == 'https://uiengagerox.enteract.app') {
      this.companyId = 658;
      this.clientLogo = '../../../../assets/images/ibex-enteract-engage.svg'
      this.client = 'stagging';
      this.clientName = 'Ibex';
    } else if (this.baseUrl == 'http://localhost:4200'){
      this.clientLogo = '../../../../assets/images/ibex-enteract-engage.svg'
      this.client = 'stagging';
      this.clientName = 'Ibex';

    }
  }
  markScore(value: any) {
    this.value = value;
    this.activeButtonIndex = value;
  }
  companyId = 651;
  client:string='';
  save() {
    if (this.baseUrl == 'https://keportal.enteract.live') {
      this.companyId = 651;
    }
    const channel = this.router.url.split(/[=&]/)[1];
    const customerId = this.router.url.split(/[=&]/)[3];
    const AgentId = 0;
    const id = this.companyId;
    const email = this.router.url.split(/[=&]/)[5];
    let data = {
      customerId: customerId,
      attempts: 0,
      agentId: AgentId,
      rating: this.value,
      platform: channel,
      id: id,
      email: email,
    };
    this.spinnerService.show();
    this.commanDateServices.CSATFormForKE(data).subscribe(
      (res: any) => {
        this.spinnerService.hide();
        this.feedbackSubmitted = true;
        this.toastermessage = true;
        setTimeout(() => {
          this.toastermessage = false;
        }, 1000);
      },
      (error: any) => {}
    );
  }
  closeToaster() {
    this.toastermessage = false;
  }
}
