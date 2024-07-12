import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BotChatComponent } from './components/bot-chat/bot-chat.component';
import { BotMonitoringComponent } from './bot-monitoring/bot-monitoring.component';
import { BotMenuComponent } from 'src/app/layouts/engage2/bot-content/bot-menu/bot-menu.component';

// import { MonitoringMenuComponent } from 'src/app/layouts/engage2/bot-monitoring-content/monitoring-menu/monitoring-menu.component';
import { BotMonitoringMenusComponent } from 'src/app/layouts/engage2/bot-monitoring-content/bot-monitoring-menus/bot-monitoring-menus.component';
const routes: Routes = [
  {
    path: '',
    component: BotMonitoringComponent,
    children: [
      {
        path: 'generative-bot-history',
        loadComponent: () => import('./components/chat-bot-history/chat-bot-history.component').then(c => c.ChatBotHistoryComponent)
      },
      {
        path: 'chat-bot',
        loadComponent: () => import('./components/chat-bot/chat-bot.component').then(c => c.ChatBotComponent)
      },
      {
        path: 'conversation/:name',
        loadComponent: () => import('./components/conversation/conversation.component').then(c => c.ConversationComponent)
      },
      // {
      //   path: 'conversation',
      //   loadComponent: () => import('./components/conversation/conversation.component').then(c => c.ConversationComponent)
      // },
      {
        path: 'upload/download-data',
        loadComponent: () => import('./components/upload/download-data/download-data.component').then(c => c.DownloadDataComponent)
      }, {
        path: 'chat-bot/components',
        loadComponent: () => import('./components/components/components.component').then(c => c.ComponentsComponent)
      },
      {
        path: 'bot-monitoring-chat',
        loadComponent: () => import('./components/bot-monitering-chat/bot-monitering-chat.component').then(c => c.BotMoniteringChatComponent)
      },
      {
        path: 'conversation/:name/Rule',
        loadComponent: () => import('./components/chat-bot-stepper/chat-bot-stepper.component').then(c => c.ChatBotStepperComponent)
      },
      {
        path: 'conversation/:name/Story',
        loadComponent: () => import('./components/chat-bot-story/chat-bot-story.component').then(c => c.ChatBotStoryComponent)
      },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BotMonitoringRoutingModule { }
