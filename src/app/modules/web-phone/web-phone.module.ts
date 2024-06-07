import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebPhoneRoutingModule } from './web-phone-routing.module';
import { WebPhoneComponent } from './web-phone.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WebPhoneContactsComponent } from './components/web-phone-contacts/web-phone-contacts.component';
import { WebPhoneCallListComponent } from './components/web-phone-call-list/web-phone-call-list.component';
@NgModule({
  declarations: [
    WebPhoneComponent,
    WebPhoneContactsComponent,
    WebPhoneCallListComponent,
  ],
  imports: [
    CommonModule,
    WebPhoneRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class WebPhoneModule { }
