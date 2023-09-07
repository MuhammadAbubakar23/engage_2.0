import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InboxContentComponent } from 'src/app/layouts/engage2/inbox-content/inbox-content.component';
import { ResponderGuardGuard } from 'src/app/shared/Guards/responder-guard.guard';
import { InboxResponderComponent } from './components/inbox-responder/inbox-responder.component';
import { InboxesComponent } from './inboxes.component';

const routes: Routes = [
  {
    path: ':flag/:flag2',
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InboxesRoutingModule { }
