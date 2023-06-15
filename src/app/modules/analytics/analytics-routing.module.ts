import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalyticsComponent } from './analytics.component';
import { ReportBuilderComponent } from './components/report-builder/report-builder.component';

const routes: Routes = [
   {
    path:':channel',
    component:AnalyticsComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalyticsRoutingModule { }
