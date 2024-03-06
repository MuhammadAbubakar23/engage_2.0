import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { BotMonitoringRoutingModule } from './bot-monitoring-routing.module';
import { BotMonitoringComponent } from './bot-monitoring/bot-monitoring.component';
import { RouterModule } from '@angular/router';
import { BotChatComponent } from './components/bot-chat/bot-chat.component';



@NgModule({
  declarations: [
    BotMonitoringComponent,

  ],
  imports: [
    RouterModule,
    CommonModule,
    BotMonitoringRoutingModule,
    LayoutsModule,
    BotChatComponent
  ],
})
export class BotMonitoringModule { }
