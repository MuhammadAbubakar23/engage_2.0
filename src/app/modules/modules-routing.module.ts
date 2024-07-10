import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TagsResolver } from '../shared/resolver/Tags Resolver/tags.resolver';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/all-inboxes/focused/all',
    pathMatch: 'full'
  },
  {
    path: 'responder',
    loadChildren: () => import('./responder/responder.module').then(f => f.ResponderModule),
    data: { preload: true }
  }
  , {
    path: 'all-inboxes',
    loadChildren: () => import('./inboxes/inboxes.module').then(f => f.InboxesModule),
    data: { preload: true },
    resolve: {
      tags: TagsResolver
    }
  },
  {
    path: 'console',
    loadChildren: () => import('./console/console.module').then(f => f.ConsoleModule),
    data: { preload: true }
  },
  {
    path: '',
    loadChildren: () => import('./web-phone/web-phone.module').then(f => f.WebPhoneModule),
    data: { preload: false }
  }, {
    path: 'multitenant',
    loadChildren: () => import('./multitenant/multitenant.module').then(f => f.MultitenantModule),
    data: { preload: true }
  },
  {
    path: 'bot-monitoring', loadChildren: () => import('./bot-monitoring/bot-monitoring.module').then((f) => f.BotMonitoringModule),
  },
  {
    path: 'analytics',
    loadChildren: () => import('./analytics/analytics.module').then(f => f.AnalyticsModule),
    data: { preload: true }
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulesRoutingModule { }
