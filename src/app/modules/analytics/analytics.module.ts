import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsRoutingModule } from './analytics-routing.module';
import { AnalyticsComponent } from './analytics.component';
import { ExecutiveDashboardComponent } from './components/executive-dashboard/executive-dashboard.component';
import { LiveMonitoringComponent } from './components/live-monitoring/live-monitoring.component';
import { ExecutiveDashboardHeaderComponent } from './analytics-headers/executive-dashboard-header/executive-dashboard-header.component';
import { LiveMonitoringHeaderComponent } from './analytics-headers/live-monitoring-header/live-monitoring-header.component';
import { ReportBuilderHeaderComponent } from './analytics-headers/report-builder-header/report-builder-header.component';
import { LayoutsModule } from 'src/app/layouts/layouts.module';


@NgModule({
  declarations: [
    AnalyticsComponent,
    ExecutiveDashboardComponent,
    LiveMonitoringComponent,
    ExecutiveDashboardHeaderComponent,
    LiveMonitoringHeaderComponent,
    ReportBuilderHeaderComponent
  ],
  imports: [
    CommonModule,
    AnalyticsRoutingModule,
    LayoutsModule
  ]
})
export class AnalyticsModule { }
