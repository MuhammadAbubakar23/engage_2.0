import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InboxContentComponent } from 'src/app/layouts/engage2/inbox-content/inbox-content.component';
import { ResponderGuardGuard } from 'src/app/shared/Guards/responder-guard.guard';
import { InboxResponderComponent } from './components/inbox-responder/inbox-responder.component';
import { SentItemsComponent } from './components/sent-items/sent-items.component';
import { InboxesComponent } from './inboxes.component';

const routes: Routes = [
  {
    path: '',
    component: InboxContentComponent,
    canDeactivate: [ResponderGuardGuard],
    children: [
      {
        path: 'responder/:channel',
        // loadChildren : () => import('../responder/responder.module').then(f=>f.ResponderModule),
        component: InboxResponderComponent,
        canDeactivate: [ResponderGuardGuard],
      },
      {
        path: '',
        component: InboxesComponent,
        // canDeactivate:[ResponderGuardGuard],
      },
      {
        path:'sent',
        component:SentItemsComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InboxesRoutingModule { }
