import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { InboxesRoutingModule } from './inboxes-routing.module';
import { InboxesComponent } from './inboxes.component';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { ConversationComponent } from './components/conversation/conversation.component';
import { SlaComponent } from './components/SLA/sla.component';
import { RouterModule } from '@angular/router';
import { RightSidebarComponentsModule } from './right-sidebar-components/right-sidebar-components.module';
import { WebPhoneDialerComponent } from '../web-phone/components/web-phone-dialer/web-phone-dialer.component';
import { InboxResponderComponent } from './components/inbox-responder/inbox-responder.component';


@NgModule({
  declarations: [
    InboxesComponent,
    ConversationComponent,
    SlaComponent,
    InboxResponderComponent,
  ],
  imports: [
    CommonModule,
    InboxesRoutingModule,
    LayoutsModule,
    SharedModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    RouterModule,
    RightSidebarComponentsModule
  ],
  providers: [
    DatePipe,
    WebPhoneDialerComponent
  ]
})
export class InboxesModule { }
