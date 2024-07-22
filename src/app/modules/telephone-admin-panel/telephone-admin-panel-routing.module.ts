import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TelephoneAdminPanelComponent } from './telephone-admin-panel/telephone-admin-panel.component';


const routes: Routes = [
{
  path: 'admin',
component:TelephoneAdminPanelComponent,
children:[
  {
      path:'',
      loadComponent: () => import('./components/admin-panel/admin-panel.component').then(c=>c.AdminPanelComponent),

    },
]
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TelephoneAdminPanelRoutingModule { }
