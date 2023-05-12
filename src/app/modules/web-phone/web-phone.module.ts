import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebPhoneRoutingModule } from './web-phone-routing.module';
import { WebPhoneComponent } from './web-phone.component';


@NgModule({
  declarations: [
    WebPhoneComponent
  ],
  imports: [
    CommonModule,
    WebPhoneRoutingModule,
  ]
})
export class WebPhoneModule { }
