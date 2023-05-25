import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InboxContentComponent } from 'src/app/layouts/engage2/inbox-content/inbox-content.component';
import { MainComponent } from '../main/main.component';
import { ResponderComponent } from '../responder/responder.component';
import { InboxResponderComponent } from './components/inbox-responder/inbox-responder.component';
import { InboxesComponent } from './inboxes.component';

const routes: Routes = [
  {
    path:'',
    component:InboxContentComponent,
    children:[{
    
      path:'responder/:channel',
      // loadChildren : () => import('../responder/responder.module').then(f=>f.ResponderModule),
      component:InboxResponderComponent
    },
  {
    path:'',
    component:InboxesComponent
  }]
  },
  // {
  //   path:'responder',
  //   loadChildren : () => import('../responder/responder.module').then(f=>f.ResponderModule),
  //   data: {preload: true}
  // }
  // {
  //   path:'responder/:channel',
  //   component:InboxContentComponent,
  // },
  // {
  //   path:':channel',
  //   component:InboxesComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InboxesRoutingModule { }
