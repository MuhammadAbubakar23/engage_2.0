import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BotChatComponent } from './components/bot-chat/bot-chat.component';

const routes: Routes = [
  { path: '', component: BotChatComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BotMonitoringRoutingModule { }
