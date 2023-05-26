import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './identity/AuthService/auth.guard';


const routes: Routes = [
 {
   path:'',
   redirectTo:'/all-inboxes',
   pathMatch:'full',
 },
//  {
//   path:'**',
//   redirectTo:'/dashboard/all-inboxes',
//   pathMatch:'full',
// },
  {
    path: '',
    loadChildren: () => import('./identity/identity.module').then(f => f.IdentityModule)
  },
  {
    path:'',
    loadChildren : () => import('./modules/modules.module').then(f=>f.ModulesModule), canActivate: [AuthGuard],
    data: {preload: true}
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
