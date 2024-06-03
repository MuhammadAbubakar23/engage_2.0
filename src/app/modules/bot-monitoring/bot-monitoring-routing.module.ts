import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BotChatComponent } from './components/bot-chat/bot-chat.component';
import { BotMonitoringComponent } from './bot-monitoring/bot-monitoring.component';
import { BotMenuComponent } from 'src/app/layouts/engage2/bot-content/bot-menu/bot-menu.component';
import { BotMonitoringMenusComponent } from 'src/app/layouts/engage2/bot-monitoring-content/bot-monitoring-menus/bot-monitoring-menus.component';
// import { MonitoringMenuComponent } from 'src/app/layouts/engage2/bot-monitoring-content/monitoring-menu/monitoring-menu.component';

const routes: Routes = [
  {
    path: '',
    component: BotMonitoringComponent,
    children: [
      {
        path: 'chats',
        loadComponent: () => import('./components/bot-monitering-chat/bot-monitering-chat.component').then(c => c.BotMoniteringChatComponent)
      },
      {
        path: 'chat-bot',
        loadComponent: () => import('./components/chat-bot/chat-bot.component').then(c => c.ChatBotComponent)
      },
      {
        path: 'conversation',
        loadComponent: () => import('./components/conversation/conversation.component').then(c => c.ConversationComponent)
      },
      {
        path: 'upload/download-data',
        loadComponent: () => import('./components/upload/download-data/download-data.component').then(c => c.DownloadDataComponent)
      },{
        path: 'components',
        loadComponent: () => import('./components/components/components.component').then(c => c.ComponentsComponent)
      },
      {
        path: 'bot-monitering-chat',
        loadComponent: () => import('./components/bot-monitering-chat/bot-monitering-chat.component').then(c => c.BotMoniteringChatComponent)
      },
      {
        path: 'chatBot-stepper',
        loadComponent: () => import('./components/chat-bot-stepper/chat-bot-stepper.component').then(c => c.ChatBotStepperComponent)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BotMonitoringRoutingModule { }
