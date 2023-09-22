import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AnalyticsRoutingModule } from './analytics-routing.module';
import { AnalyticsComponent } from './analytics.component';
import { ExecutiveDashboardHeaderComponent } from './analytics-headers/executive-dashboard-header/executive-dashboard-header.component';
import { LiveMonitoringHeaderComponent } from './analytics-headers/live-monitoring-header/live-monitoring-header.component';

import { LayoutsModule } from 'src/app/layouts/layouts.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgChartsModule } from 'ng2-charts';
import { ReportDbSettingsComponent } from './components/report-db-settings/report-db-settings.component';
import { ReportlistingComponent } from './components/reportlisting/reportlisting.component';
import { ExcelService } from './services/excel.service';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { ReportDesignerComponent } from './components/report-designer/report-designer.component';
import { TwitterReportComponent } from './components/twitter-report/twitter-report.component';


// import {DndModule} from 'ngx-drag-drop';

@NgModule({
  declarations: [
    AnalyticsComponent,
    ExecutiveDashboardHeaderComponent,
    LiveMonitoringHeaderComponent
  ],
  imports: [
    CommonModule,
    AnalyticsRoutingModule,
    LayoutsModule,
    FormsModule,
    NgSelectModule,
    NgChartsModule,
    DragDropModule,
    ReactiveFormsModule
    // DndModule
  ],
  providers: [ExcelService,
  DatePipe]
})
export class AnalyticsModule { }
