import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SortPipe } from './CustomPipes/sorting.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MinimizedChatWidgetComponent } from './minimized-chat-widget/minimized-chat-widget.component';
import { GroupbydatePipe } from './CustomPipes/groupbydate.pipe';
import { FilterPipe } from './CustomPipes/filter.pipe';
import { QuickReplySearchFilterPipe } from './CustomPipes/quick-reply-search-filter.pipe';
import { SafePipe } from './pipes/safe.pipe';



@NgModule({
  declarations: [
    SortPipe,
    MinimizedChatWidgetComponent,
    GroupbydatePipe,
    FilterPipe,
    QuickReplySearchFilterPipe,
    SafePipe,
    
    
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
    FilterPipe,
    QuickReplySearchFilterPipe,
    SafePipe,
  ]
})
export class SharedModule { }
