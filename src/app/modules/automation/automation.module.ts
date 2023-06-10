import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutomationRoutingModule } from './automation-routing.module';
import { AutomationComponent } from './automation.component';
import { SentimentAnalysisComponent } from './components/sentiment-analysis/sentiment-analysis.component';
import { ChatBotIntentComponent } from './components/chat-bot-intent/chat-bot-intent.component';


@NgModule({
  declarations: [
    AutomationComponent,
    SentimentAnalysisComponent,
    ChatBotIntentComponent
  ],
  imports: [
    CommonModule,
    AutomationRoutingModule
  ]
})
export class AutomationModule { }
