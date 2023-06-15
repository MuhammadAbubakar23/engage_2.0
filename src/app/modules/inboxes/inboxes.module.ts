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
import { InboxResponderComponent } from './components/inbox-responder/inbox-responder.component';
import { ResponderGuardGuard } from 'src/app/shared/Guards/responder-guard.guard';
import { SentItemsComponent } from './components/sent-items/sent-items.component';


@NgModule({
  declarations: [
    InboxesComponent,
    ConversationComponent,
    SlaComponent,
    InboxResponderComponent,
    SentItemsComponent,
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
    ResponderGuardGuard
  ]
})
export class InboxesModule { }
