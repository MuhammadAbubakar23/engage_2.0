import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BotRoutingModule } from './bot-routing.module';
import { BotbuilderComponent } from './components/botbuilder/botbuilder.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { NgStepperModule } from 'angular-ng-stepper';
import { StepOneComponent } from './components/step-one/step-one.component';
import { StepTwoComponent } from './components/step-two/step-two.component';
import { StepThreeComponent } from './components/step-three/step-three.component';
import { StepFourComponent } from './components/step-four/step-four.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BotComponent } from './bot.component';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { ChatComponent } from './components/chat/chat.component';
import { IntentsComponent } from './intents/intents.component';

import { UpdateIntentsComponent } from './components/update-intents/update-intents.component';
import { BotSettingsComponent } from './components/bot-settings/bot-settings.component';

import { SentimentComponent } from './components/sentiment/sentiment.component';
import {ChatWithSentimentComponent} from './components/chatwithsentiment/chatwithsentiment';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  declarations: [
    BotbuilderComponent,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
    StepFourComponent,
    BotComponent,
    ChatComponent,
    IntentsComponent,
    UpdateIntentsComponent,
    BotSettingsComponent,
    SentimentComponent,
    ChatWithSentimentComponent,

  ],
  imports: [
    CommonModule,
    BotRoutingModule,
    CdkStepperModule,
    NgStepperModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutsModule,
    NgSelectModule,
    MatSlideToggleModule

  ],
  providers: [

  ]
})
export class BotModule { }
