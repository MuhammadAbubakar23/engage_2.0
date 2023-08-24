import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServaComponent } from './serva/serva.component';
import { SurveyComponent } from './survey/survey.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'/all-inboxes',
    pathMatch:'full'
  },
  {
    path:'responder',
    loadChildren : () => import('./responder/responder.module').then(f=>f.ResponderModule),
    data: {preload: true}
  }
  ,{
    path:'all-inboxes',
    loadChildren : () => import('./inboxes/inboxes.module').then(f=>f.InboxesModule),
    data: {preload: true}
  },
  {
    path:'console',
    loadChildren : () => import('./console/console.module').then(f=>f.ConsoleModule),
    data: {preload: true}
  },
  {
    path:'',
    loadChildren : () => import('./web-phone/web-phone.module').then(f=>f.WebPhoneModule),
    data: {preload: false}
  },{
    path:'multitenant',
    loadChildren : () => import('./multitenant/multitenant.module').then(f=>f.MultitenantModule),
    data: {preload: true}
  },
  {
    path:'analytics',
    loadChildren : () => import('./analytics/analytics.module').then(f=>f.AnalyticsModule),
    data: {preload: true}
  },
  {
    path:'c_sat',
    component:ServaComponent,
  },
  {
    path:'survey',
    component:SurveyComponent

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulesRoutingModule { }
