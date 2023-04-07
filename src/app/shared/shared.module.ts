import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SortPipe } from './CustomPipes/sorting.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MinimizedChatWidgetComponent } from './minimized-chat-widget/minimized-chat-widget.component';
import { GroupbydatePipe } from './CustomPipes/groupbydate.pipe';
import { RightHeaderComponentsComponent } from './right-header-components/right-header-components.component';
import { FilterPipe } from './CustomPipes/filter.pipe';
import { QuickReplySearchFilterPipe } from './CustomPipes/quick-reply-search-filter.pipe';



@NgModule({
  declarations: [
    SortPipe,
    MinimizedChatWidgetComponent,
    GroupbydatePipe,
    RightHeaderComponentsComponent,
    FilterPipe,
    QuickReplySearchFilterPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    RouterModule,
  ],
  exports:[
    SortPipe,
    GroupbydatePipe,
    RightHeaderComponentsComponent,
    FilterPipe,
    QuickReplySearchFilterPipe
  ]
})
export class SharedModule { }
