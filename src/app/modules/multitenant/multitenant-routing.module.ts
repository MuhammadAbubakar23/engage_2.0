import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompaniesResolver } from './components/companies/companies.resolver';
import { MultitenantComponent } from './multitenant.component';
import { MultitenantGuard } from './multitenant.guard';
import { CompaniesJsonResolver } from './resolver/companies-json.resolver';
import { CompaniesPropResolver } from './resolver/companies-prop.resolver';
import { CompaniesRolesResolver } from './resolver/companies-roles.resolver';
import { CompaniesTeamsResolver } from './resolver/companies-teams.resolver';

const routes: Routes = [{ 
  path: '', 
  component: MultitenantComponent,
  children: [{
    path:'companies',
    loadComponent: () => import('./components/companies/companies.component').then(c => c.CompaniesComponent),
    data: { breadcrumb: 'Companies' },
    canMatch: [MultitenantGuard],
    canLoad: [MultitenantGuard],
    resolve: {
      companyJ: CompaniesJsonResolver,
    },
    children:[]
  },{
    path:'companies/create/:id',
    loadComponent: () => import('./components/companies/create-companies/create-companies.component').then(c => c.CreateCompaniesComponent),
    data: { breadcrumb: 'Companies > Create' },
    //canActivate: [ConsoleRoutingGuard],
    canMatch: [MultitenantGuard],
    // canLoad: [ConsoleRoutingGuard],
    resolve: {
      companiesprops: CompaniesPropResolver,
      companiesroles: CompaniesRolesResolver,
      companiesteams: CompaniesTeamsResolver,
    },
  }] 
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MultitenantRoutingModule { }
