import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { BotMonitoringRoutingModule } from './bot-monitoring-routing.module';
import { BotMonitoringComponent } from './bot-monitoring/bot-monitoring.component';
import { RouterModule } from '@angular/router';
import { BotChatComponent } from './components/bot-chat/bot-chat.component';
import { ChatBotHeaderComponent } from './monitoring-header/chat-bot-header/chat-bot-header.component';
import { BotMoniteringHeaderComponent } from './monitoring-header/bot-monitering-header/bot-monitering-header.component';
import { ConversationHeaderComponent } from './monitoring-header/conversation-header/conversation-header.component';
import { ComponentsHeaderComponent } from './monitoring-header/components-header/components-header.component';
import { UploadDownloadHeaderComponent } from './monitoring-header/upload-download-header/upload-download-header.component';
import { ChatBotStepperHeaderComponent } from './monitoring-header/chat-bot-stepper-header/chat-bot-stepper-header.component';
import { ChatbotStoryHeaderComponent } from './monitoring-header/chatbot-story-header/chatbot-story-header.component';
import { ChatHistoryComponent } from './components/chat-history/chat-history.component';
import { ChatBotHistoryComponent } from './components/chat-bot-history/chat-bot-history.component';
import { SharedModule } from "../../shared/shared.module";



@NgModule({
  declarations: [
    BotMonitoringComponent,
    ChatBotHeaderComponent,
    BotMoniteringHeaderComponent,
    ConversationHeaderComponent,
    ComponentsHeaderComponent,
    UploadDownloadHeaderComponent,
    ChatBotStepperHeaderComponent,
    ChatbotStoryHeaderComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    BotMonitoringRoutingModule,
    LayoutsModule,
    BotChatComponent,
    SharedModule
],
})
export class BotMonitoringModule { }
