import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModulesRoutingModule } from './modules-routing.module';
import { ModulesComponent } from './modules.component';
import { LayoutsModule } from '../layouts/layouts.module';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { SurveyComponent } from './survey/survey.component';
import { ServaComponent } from './serva/serva.component';

@NgModule({
  declarations: [
    ModulesComponent,
    ServaComponent,
    SurveyComponent
  ],
  imports: [
    CommonModule,
    ModulesRoutingModule,
    LayoutsModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ModulesModule { }
