import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsRoutingModule } from './analytics-routing.module';
import { AnalyticsComponent } from './analytics.component';
import { ExecutiveDashboardComponent } from './components/executive-dashboard/executive-dashboard.component';
import { LiveMonitoringComponent } from './components/live-monitoring/live-monitoring.component';
import { ExecutiveDashboardHeaderComponent } from './analytics-headers/executive-dashboard-header/executive-dashboard-header.component';
import { LiveMonitoringHeaderComponent } from './analytics-headers/live-monitoring-header/live-monitoring-header.component';

import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { ReportBuilderComponent } from './components/report-builder/report-builder.component';
import { ActionsComponent } from './components/actions/actions.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgChartsModule } from 'ng2-charts';
import { ReportDbSettingsComponent } from './components/report-db-settings/report-db-settings.component';
import { ReportlistingComponent } from './components/reportlisting/reportlisting.component';
import { ExcelService } from './services/excel.service';
import {DragDropModule} from '@angular/cdk/drag-drop';

// import {DndModule} from 'ngx-drag-drop';

@NgModule({
  declarations: [
    AnalyticsComponent,
    ExecutiveDashboardHeaderComponent,
    LiveMonitoringHeaderComponent,

  ],
  imports: [
    CommonModule,
    AnalyticsRoutingModule,
    LayoutsModule,
    FormsModule,
    NgSelectModule,
    NgChartsModule,
    DragDropModule,
    ReactiveFormsModule,
    // DndModule
  ],
  providers: [ExcelService]
})
export class AnalyticsModule { }
