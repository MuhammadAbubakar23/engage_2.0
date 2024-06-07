import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResponderComplaintTicketPanelComponent } from './responder-complaint-ticket-panel/responder-complaint-ticket-panel.component';
import { ResponderContactsComponent } from './responder-contacts/responder-contacts.component';
import { ResponderCreateNewComponent } from './responder-create-new/responder-create-new.component';
import { ResponderDocumentsComponent } from './responder-documents/responder-documents.component';
import { ResponderEngagementsComponent } from './responder-engagements/responder-engagements.component';
import { ResponderHelpComponent } from './responder-help/responder-help.component';
import { ResponderKeyboardShortcutsComponent } from './responder-keyboard-shortcuts/responder-keyboard-shortcuts.component';
import { ResponderKnowledgeBaseComponent } from './responder-knowledge-base/responder-knowledge-base.component';
import { ResponderLivechatsComponent } from './responder-livechats/responder-livechats.component';
import { ResponderPhoneDialerComponent } from './responder-phone-dialer/responder-phone-dialer.component';
import { ResponderTicketsComponent } from './responder-tickets/responder-tickets.component';
import { ResponderTaskComponent } from './responder-task/responder-task.component';
import { ResponderScheduleComponent } from './responder-schedule/responder-schedule.component';
import { ResponderHistoryComponent } from './responder-history/responder-history.component';
import { ResponderProfileComponent } from './responder-profile/responder-profile.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from 'src/app/shared/shared.module';
import { ResponderCustomerProfilingComponent } from './responder-customer-profiling/responder-customer-profiling.component';
import { ResponderBotInteractionComponent } from './responder-bot-interaction/responder-bot-interaction.component';
@NgModule({
  declarations: [
    ResponderComplaintTicketPanelComponent,
    ResponderContactsComponent,
    ResponderCreateNewComponent,
    ResponderDocumentsComponent,
    ResponderEngagementsComponent,
    ResponderHelpComponent,
    ResponderKeyboardShortcutsComponent,
    ResponderKnowledgeBaseComponent,
    ResponderLivechatsComponent,
    ResponderPhoneDialerComponent,
    ResponderTicketsComponent,
    ResponderTaskComponent,
    ResponderScheduleComponent,
    ResponderHistoryComponent,
    ResponderProfileComponent,
    ResponderCustomerProfilingComponent,
    ResponderBotInteractionComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ResponderRightSidebarComponentsModule { }
