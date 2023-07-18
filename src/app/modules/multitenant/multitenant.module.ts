import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MultitenantRoutingModule } from './multitenant-routing.module';
import { MultitenantComponent } from './multitenant.component';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
//import { CompaniesComponent } from './components/companies/companies.component';


@NgModule({
  declarations: [
    MultitenantComponent
  ],
  imports: [
    CommonModule,
    MultitenantRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    LayoutsModule
  ]
})
export class MultitenantModule { }
