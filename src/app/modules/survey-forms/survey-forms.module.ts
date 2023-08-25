import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SurveyFormsRoutingModule } from './survey-forms-routing.module';
import { CustomerSatisfactionComponent } from './components/customer-satisfaction/customer-satisfaction.component';
import { CustomerDetailsSurveyComponent } from './components/customer-details-survey/customer-details-survey.component';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [
    CustomerSatisfactionComponent,
    CustomerDetailsSurveyComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SurveyFormsRoutingModule,
    NgxSpinnerModule
  ]
})
export class SurveyFormsModule { }
