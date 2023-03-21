import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './identity/AuthService/auth.guard';


const routes: Routes = [
 {
   path:'',
   redirectTo:'/all-inboxes/conversation',
   pathMatch:'full',
 },
//   {
//     path:'',
//     loadChildren : () => import('./modules/dashboard/dashboard.module').then(f=>f.DashboardModule), canActivate: [AuthGuard],
//     data: {preload: true}
//   },
  {
    path: '',
    loadChildren: () => import('./identity/identity.module').then(f => f.IdentityModule)
  },
  {
    path:'',
    loadChildren : () => import('./modules/modules.module').then(f=>f.ModulesModule), canActivate: [AuthGuard],
    data: {preload: true}
  },
  // { path: '404', component : NotFoundComponent}, 
  // { path: '**', redirectTo: '/404', pathMatch: 'full'},



]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
