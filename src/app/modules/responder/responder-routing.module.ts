import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResponderComponent } from './responder.component';

const routes: Routes = [
  {
    path:'',
    component:ResponderComponent,
  },
  // {
    
  //   path:':channel/:ticket',
  //   component:ResponderComponent,
  // },
  {
    path:':channel',
    component:ResponderComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResponderRoutingModule { }
