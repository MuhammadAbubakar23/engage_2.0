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
import { NavigationBackDirective } from './services/navigation/navigation-back.directive';
import { SplitNameFromUrlPipe } from './pipes/split-name-from-url.pipe';
import { GetFileTypeFromUrlPipe } from './pipes/get-file-type-from-url.pipe';
import { TableResponsiveComponent } from './table-responsive/table-responsive.component';
import {MatTableModule} from '@angular/material/table';
import { TagSlugConversionPipe } from './CustomPipes/tag-slug-conversion.pipe';
import { PairsPipe } from './CustomPipes/pairs.pipe';
import { InitialLettersPipe } from './CustomPipes/initial-letters.pipe';
import { BreaklinePipe } from './CustomPipes/replacelineBreaks/breakline.pipe';
import { ChatBotIntentFilterPipe } from './CustomPipes/charBotIntentSearchFilter/chat-bot-intent-filter.pipe';
import { ResponsefilterPipe } from './CustomPipes/charBotIntentSearchFilter/responsefilter.pipe';
import { GifFilterPipe } from './CustomPipes/gifFilter.pipe';
import { ChatWidgetComponent } from './components/chat-widget/chat-widget.component';
@NgModule({
  declarations: [
    SortPipe,
    MinimizedChatWidgetComponent,
    GroupbydatePipe,
    FilterPipe,
    QuickReplySearchFilterPipe,
    GifFilterPipe,
    SafePipe,
    NavigationBackDirective,
    SplitNameFromUrlPipe,
    GetFileTypeFromUrlPipe,
    TagSlugConversionPipe,
    PairsPipe,
    InitialLettersPipe,
    BreaklinePipe,
    ChatBotIntentFilterPipe,
    ResponsefilterPipe,
    ChatWidgetComponent
    // TableResponsiveComponent
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
    GifFilterPipe,
    SafePipe,
    ChatBotIntentFilterPipe,
    ResponsefilterPipe,
    NavigationBackDirective,
    SplitNameFromUrlPipe,
    GetFileTypeFromUrlPipe,
    TagSlugConversionPipe,
    PairsPipe,
    InitialLettersPipe,
    BreaklinePipe
  ]
})
export class SharedModule { }
