import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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


@NgModule({
  declarations: [
    InboxesComponent,
    ConversationComponent,
    SlaComponent,
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
  ]
})
export class InboxesModule { }
