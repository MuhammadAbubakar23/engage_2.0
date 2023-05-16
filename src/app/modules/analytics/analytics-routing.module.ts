import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalyticsComponent } from './analytics.component';

const routes: Routes = [
  {
    path:'analytics/executive-dashboard',
    component:AnalyticsComponent
  },{
    path:':channel',
    component:AnalyticsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalyticsRoutingModule { }
