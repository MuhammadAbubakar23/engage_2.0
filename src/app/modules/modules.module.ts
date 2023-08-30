import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModulesRoutingModule } from './modules-routing.module';
import { ModulesComponent } from './modules.component';
import { LayoutsModule } from '../layouts/layouts.module';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ModulesComponent,
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
