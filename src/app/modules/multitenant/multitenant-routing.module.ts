import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MultitenantComponent } from './multitenant.component';

const routes: Routes = [{ 
  path: '', 
  component: MultitenantComponent,
  children: [{
    path:'companies',
    loadComponent: () => import('./components/companies/companies.component').then(c => c.CompaniesComponent),
    // data: { breadcrumb: 'Users' },
    // canMatch: [ConsoleRoutingGuard],
    //canLoad: [ConsoleRoutingGuard],
    // resolve: {
    //   submenus: UsersResolver,
    // },
  }] 
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MultitenantRoutingModule { }
