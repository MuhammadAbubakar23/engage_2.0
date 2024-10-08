import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './identity/Services/AuthGuardService/auth.guard';
import { ModulesResolver } from './shared/resolver/modules.resolver';
import { ChatWidgetComponent } from './shared/components/chat-widget/chat-widget.component';
import { ChatWidget2Component } from './shared/components/chat-widget2/chat-widget2.component';
// import { MonitoringMenuComponent } from './layouts/engage2/bot-monitoring-content/monitoring-menu/monitoring-menu.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/all-inboxes/focused/all',
    pathMatch: 'full',
  },
  {
    path: 'all-inboxes',
    redirectTo: '/all-inboxes/focused/all',
    pathMatch: 'full',
  },
  {
    path: 'console',
    redirectTo: '/console/home',
    pathMatch: 'full',
  },
  {
    path: 'bot-monitoring',
    redirectTo: 'bot-monitoring/chat-bot',
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () =>
      import('./identity/identity.module').then((f) => f.IdentityModule),
  },
  {
    path: 'survey',
    loadChildren: () =>
      import('./survey-forms/survey-forms.module').then(
        (f) => f.SurveyFormsModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/modules.module').then((f) => f.ModulesModule),
    canActivate: [AuthGuard],
    data: { preload: true },
    resolve: {
      modeuls: ModulesResolver,
    },
  },
  {
    path: 'engage/chat',
    component: ChatWidgetComponent
  },
  {
    path: 'engage/chat-v2',
    component: ChatWidget2Component
  }
  // { path: 'administration', loadChildren: () => import('./administration/administration.module').then(m => m.AdministrationModule) },
  // { path: '404', component : NotFoundComponent},
  // { path: '**', redirectTo: '/404', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
