import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from 'src/app/layouts/engage2/main/main.component';
import { ResponderComponent } from '../responder/responder.component';

const routes: Routes = [
  {
    path : 'dashboard',
    component : MainComponent,
  },
  // {
  //   path:':channel/:abc',
  //   component:MainComponent
    
  // },
  // {
  //   path:':channel/:abc',
  //   component:MainComponent
  // },
  // {
  //   path:'responder',
  //   loadChildren : () => import('../responder/responder.module').then(f=>f.ResponderModule),
  //   data: {preload: true}
  // }
  // ,{
  //   path:'',
  //   loadChildren : () => import('../inboxes/inboxes.module').then(f=>f.InboxesModule),
  //   data: {preload: true}
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
