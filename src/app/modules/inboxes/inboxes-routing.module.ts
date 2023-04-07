import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InboxesComponent } from './inboxes.component';

const routes: Routes = [
  {
    path:'',
    component:InboxesComponent,
  },
  // {
    
  //   path:':channel/:ticket',
  //   component:InboxesComponent,
  // },
  {
    path:':channel',
    component:InboxesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InboxesRoutingModule { }
