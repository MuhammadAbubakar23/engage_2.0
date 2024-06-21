import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebphoneDialerRoutingModule } from './webphone-dialer-routing.module';
import { WebphoneDialerComponent } from './webphone-dialer.component';
import { DialerComponent } from './dialer/dialer.component';
import { ContactBookContentComponent } from './components/contact-book-content/contact-book-content.component';
import { DialerMenuComponent } from './components/dialer-menu/dialer-menu.component';
import { FavouritesContentComponent } from './components/favourites-content/favourites-content.component';
import { InboundContentComponent } from './components/inbound-content/inbound-content.component';
import { IvrInputContentComponent } from './components/ivr-input-content/ivr-input-content.component';
import { LogsContentComponent } from './components/logs-content/logs-content.component';
import { OutboundContentComponent } from './components/outbound-content/outbound-content.component';
import { SettingsContentComponent } from './components/settings-content/settings-content.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
@NgModule({
  declarations: [
    WebphoneDialerComponent,
    DialerComponent,
    LogsContentComponent,
    DialerMenuComponent,
    InboundContentComponent,
    OutboundContentComponent,
    FavouritesContentComponent,
    ContactBookContentComponent,
    SettingsContentComponent,
    IvrInputContentComponent
  ],
  imports: [
    CommonModule,
    WebphoneDialerRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  exports:[DialerComponent]
})
export class WebphoneDialerModule { }
