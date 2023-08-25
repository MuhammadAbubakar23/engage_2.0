import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDetailsSurveyComponent } from './components/customer-details-survey/customer-details-survey.component';
import { CustomerSatisfactionComponent } from './components/customer-satisfaction/customer-satisfaction.component';

const routes: Routes = [
  {
    path:'customer_satisfaction',
    component:CustomerSatisfactionComponent
  },
  {
    path:'customer_details',
    component:CustomerDetailsSurveyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurveyFormsRoutingModule { }
