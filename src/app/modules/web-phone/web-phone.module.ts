import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebPhoneRoutingModule } from './web-phone-routing.module';
import { WebPhoneComponent } from './web-phone.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    WebPhoneComponent
  ],
  imports: [
    CommonModule,
    WebPhoneRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class WebPhoneModule { }
