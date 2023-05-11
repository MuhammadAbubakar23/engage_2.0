import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    redirectTo:'all-inboxes',
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
  },{
    path:'console',
    loadChildren : () => import('./console/console.module').then(f=>f.ConsoleModule),
    data: {preload: true}
  },
  {
    path:'',
    loadChildren : () => import('./web-phone/web-phone.module').then(f=>f.WebPhoneModule),
    data: {preload: false}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulesRoutingModule { }
