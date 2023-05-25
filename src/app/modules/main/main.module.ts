import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from '../main/main.component';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { WebPhoneDialerComponent } from '../web-phone/components/web-phone-dialer/web-phone-dialer.component';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    LayoutsModule
  ],
  providers :[
    DatePipe,
    WebPhoneDialerComponent
  ]
})
export class MainModule { }
