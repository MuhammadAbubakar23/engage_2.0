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
    children: [
    {
      path:'echarts',
      loadComponent: () => import('./components/echarts-testing/echarts-testing.component').then(c => c.EchartsTestingComponent),
    },
    {
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
    {
      path:'inbound-outbound-report',
      loadComponent: () => import('./components/inbound-ontbound-report/inbound-ontbound-report.component').then(c => c.InboundOntboundReportComponent),
    },
    {
      path:'linkedin-report',
      loadComponent: () => import('./components/linked-in-report/linked-in-report.component').then(c => c.LinkedInReportComponent),
    },
    {
      path:'twitter-report',
      loadComponent: () => import('./components/twitter-report/twitter-report.component').then(c => c.TwitterReportComponent),
    },
    {
      path:'performance-report',
      loadComponent: () => import('./components/agent-performance-report/agent-performance-report.component').then(c => c.AgentPerformanceReportComponent),
    },
    {
      path:'shift-report',
      loadComponent: () => import('./components/shift-report/shift-report.component').then(c => c.ShiftReportComponent),
    },
    {
      path:'whatsapp-report',
      loadComponent: () => import('./components/whatsapp-report/whatsapp-report.component').then(c => c.WhatsappReportComponent),
    },
    {
      path:'cast-report',
      loadComponent:()=>import ('./components/csat-raw-data-report/csat-raw-data-report.component').then(c=>c.CsatRawDataReportComponent)

    },
    {
      path:'social-raw-data',
      loadComponent: () => import('./components/social-raw-data/social-raw-data.component').then(c => c.SocialRawDataComponent),
    },
    {
      path:'facebook-report',
      loadComponent:()=>import('./components/facebook-report/facebook-report.component').then(c=>c.FacebookReportComponent)
    },
    {
      path:'instagram-report',
      loadComponent:()=>import('./components/instagram-report/instagram-report.component').then(c=>c.InstagramReportComponent)
    },
    {
      path:'tag-report',
      loadComponent:()=>import('./components/tag-report/tag-report.component').then(c=>c.TagReportComponent)
    },
    {
      path:'querytag-report',
      loadComponent:()=>import('./components/queryTagReport/queryTag-report.component').then(c=>c.QueryTagReportComponent)
    },
    {
     path:'linkedin-report-scrm',
     loadComponent:()=>import('./archive-reports-components/linkedin-report-scrm/linkedin-report-scrm.component').then(c=>c.LinkedinReportScrmComponent)
    },
    {
      path:'facebook-report-scrm',
      loadComponent:()=>import('./archive-reports-components/facebook-report-scrm/facebook-report-scrm.component').then(c=>c.FacebookReportScrmComponent)
    }
    ,
    {
      path:'interaction-report',
      loadComponent:()=>import('./components/interaction-report/interaction-report.component').then(c=>c.InteractionReportComponent)
    },
    {
      path:'wallborad',
      loadComponent:()=>import('./components/wallboard-dashboard/wallboard-dashboard.component').then(c=>c.WallboardDashboardComponent),
    },
    {
      path:'agent-scorecard',
      loadComponent:()=>import('./components/agent-scorecard-dashboard/agent-scorecard-dashboard.component').then(c=>c.AgentScorecardDashboardComponent)
    },
    {
      path:'email-report',
      loadComponent:()=>import('./components/emial-report/emial-report.component').then(c=>c.EmialReportComponent)
    },
  {
      path:'live-interaction-report',
      loadComponent:()=>import('./components/live-interaction-report/live-interaction-report.component').then(c=>c.LiveInteractionReportComponent)
    },

  ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnalyticsRoutingModule { }
