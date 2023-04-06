import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketsComponent } from './tickets/tickets.component';
import { ContactsComponent } from './contacts/contacts.component';
import { LivechatsComponent } from './livechats/livechats.component';
import { EngaegmentsComponent } from './engaegments/engaegments.component';
import { TaskComponent } from './task/task.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { DocumentsComponent } from './documents/documents.component';
import { KnowledgeBaseComponent } from './knowledge-base/knowledge-base.component';
import { KeyboardShortcutsComponent } from './keyboard-shortcuts/keyboard-shortcuts.component';
import { PhoneDialerComponent } from './phone-dialer/phone-dialer.component';
import { HelpComponent } from './help/help.component';
import { CreateNewComponent } from './create-new/create-new.component';
import { FormsModule } from '@angular/forms';
import { ComplaintTicketPanelComponent } from './complaint-ticket-panel/complaint-ticket-panel/complaint-ticket-panel.component';


@NgModule({
  declarations: [
    TicketsComponent,
    ContactsComponent,
    LivechatsComponent,
    EngaegmentsComponent,
    TaskComponent,
    ScheduleComponent,
    DocumentsComponent,
    KnowledgeBaseComponent,
    KeyboardShortcutsComponent,
    PhoneDialerComponent,
    HelpComponent,
    CreateNewComponent,
    ComplaintTicketPanelComponent
  ],
  imports: [
    FormsModule,
    CommonModule
  ]
})
export class RightSidebarComponentsModule { }
