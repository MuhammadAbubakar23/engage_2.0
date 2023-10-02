import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalyticsComponent } from './analytics.component';


const routes: Routes = [
  // {
  //   path: ':channel',
  //   component: AnalyticsComponent,
  // },
  // {
  //   path: 'db-settings/create',
  //   component:ReportDbSettingsComponent
  // },

  {
    path: '',
    component: AnalyticsComponent,
    children: [{
      path:'report-designer',
      loadComponent: () => import('./components/report-designer/report-designer.component').then(c => c.ReportDesignerComponent),

    },
    {
      path:'reports',
      loadComponent: () => import('./components/reportlisting/reportlisting.component').then(c => c.ReportlistingComponent),

    },
    {
      path:'dashbaord-designer',
      loadComponent: () => import('./components/dashboard-designer/dashboard-designer.component').then(c => c.DashboardDesignerComponent),

    },
    {
      path:'db-settings',
      loadComponent: () => import('./components/dblisting/dblisting.component').then(c => c.DblistingComponent),

    },
    {
      path:'db-settings/create',
      loadComponent: () => import('./components/report-db-settings/report-db-settings.component').then(c => c.ReportDbSettingsComponent),

    },
    {
      path:'db-settings/update/:id',
      loadComponent: () => import('./components/report-db-settings/report-db-settings.component').then(c => c.ReportDbSettingsComponent),
    },
    {
      path:'live-monitoring',
      loadComponent: () => import('./components/live-monitoring/live-monitoring.component').then(c => c.LiveMonitoringComponent),
    },
    {
      path:'dashboard',
      loadComponent: () => import('./components/analytics-dashboard/analytics-dashboard.component').then(c => c.AnalyticsDashboardComponent),
    },
    {
      path:'executive-dashboard',
      loadComponent: () => import('./components/executive-dashboard/executive-dashboard.component').then(c => c.ExecutiveDashboardComponent),
    },
    {
      path:'route-to-agent',
      loadComponent: () => import('./components/route-to-agent/route-to-agent.component').then(c => c.RouteToAgentComponent),
    },
    {
      path: 'unique-customers',
      loadComponent: () => import('./components/unique-customers/unique-customers.component').then(c => c.UniqueCustomersComponent),
    },
    {
      path: 'handled-bot',
      loadComponent: () => import('./components/handled-by-bot/handled-by-bot.component').then(c => c.HandledByBotComponent),
    },
  ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnalyticsRoutingModule { }
