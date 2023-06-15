import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BotbuilderComponent } from './components/botbuilder/botbuilder.component';
import { BotComponent } from './bot.component';
import { IntentsComponent } from './intents/intents.component';
import { UpdateIntentsComponent } from './components/update-intents/update-intents.component';


const routes: Routes = [

  {
    path:'',redirectTo: 'bot-builder', pathMatch: 'full'
  },

  {
    path:':channel',
    component:BotComponent
  },
  {
    path:'intents/:channel',
    component:BotComponent
  }
  // {path:'bot-builder',component:BotbuilderComponent},
  // {
  //   path:'intents',
  //   component:IntentsComponent
  // },
  // {path:'intents/update',component:UpdateIntentsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BotRoutingModule { }
