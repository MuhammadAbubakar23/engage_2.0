import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BotMonitoringRoutingModule } from './bot-monitoring-routing.module';
import { BotChatComponent } from './components/bot-chat/bot-chat.component';


@NgModule({
  declarations: [
    BotChatComponent
  ],
  imports: [
    CommonModule,
    BotMonitoringRoutingModule
  ]
})
export class BotMonitoringModule { }
