import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BotChatComponent } from './components/bot-chat/bot-chat.component';
import { BotMonitoringComponent } from './bot-monitoring/bot-monitoring.component';

const routes: Routes = [
  {
    path: '',
  component: BotMonitoringComponent,
  children: [
  {
    path:'chats',
    loadComponent: () => import('./components/bot-chat/bot-chat.component').then(c => c.BotChatComponent)},
]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BotMonitoringRoutingModule { }
