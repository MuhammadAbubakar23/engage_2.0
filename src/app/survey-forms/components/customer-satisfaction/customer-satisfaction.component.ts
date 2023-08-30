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
  constructor(private commanDateServices: CommonDataService,
    private spinnerService : NgxSpinnerService,
    private router: Router) {}

  ngOnInit(): void {}

  markScore(value: any) {
    this.value = value;
  }

  save() {
    const customerId = this.router.url.split('=')[1];
    let data = {
      customerId: customerId,
      attempts: 0,
      rating: this.value,
    };
    this.spinnerService.show();
    this.commanDateServices.AddCSATSurvey(data).subscribe((res) => {
      this.spinnerService.hide();
      this.feedbackSubmitted = true;
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 1000);
    });
  }

  closeToaster() {
    this.toastermessage = false;
  }
}
