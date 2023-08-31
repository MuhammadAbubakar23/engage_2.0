import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './identity/AuthService/auth.guard';
import { ModulesResolver } from './shared/resolver/modules.resolver';


const routes: Routes = [
 {
   path:'',
   redirectTo:'/all-inboxes/my_inbox',
   pathMatch:'full',
 },
 {
  path:'all-inboxes',
  redirectTo:'/all-inboxes/my_inbox',
  pathMatch:'full',
},
  {
    path: '',
    loadChildren: () => import('./identity/identity.module').then(f => f.IdentityModule)
  },
  {
    path:'',
    loadChildren : () => import('./modules/modules.module').then(f=>f.ModulesModule), canActivate: [AuthGuard],
    data: {preload: true},
    resolve: {
      modeuls: ModulesResolver
    },
  },
  {
    path:'survey',
    loadChildren : () => import('./survey-forms/survey-forms.module').then(f=>f.SurveyFormsModule),
  },
  // { path: 'administration', loadChildren: () => import('./administration/administration.module').then(m => m.AdministrationModule) },
  // { path: '404', component : NotFoundComponent}, 
  // { path: '**', redirectTo: '/404', pathMatch: 'full'},



]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
