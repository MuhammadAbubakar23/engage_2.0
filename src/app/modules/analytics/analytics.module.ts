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
import { ExcelService } from './services/excel.service';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { InteractionReportComponent } from './components/interaction-report/interaction-report.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { WallboardDashboardComponent } from './components/wallboard-dashboard/wallboard-dashboard.component';
import { AgentScorecardDashboardComponent } from './components/agent-scorecard-dashboard/agent-scorecard-dashboard.component';
import { EmialReportComponent } from './components/emial-report/emial-report.component';
import { LiveInteractionReportComponent } from './components/live-interaction-report/live-interaction-report.component';

@NgModule({
  declarations: [
    AnalyticsComponent,
    ExecutiveDashboardHeaderComponent,
    LiveMonitoringHeaderComponent,

    // InteractionReportComponent,
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
    BsDatepickerModule.forRoot(),
  ],
  providers: [ExcelService,
  DatePipe]
})
export class AnalyticsModule { }
