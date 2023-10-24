import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResponderRoutingModule } from './responder-routing.module';
import { LayoutsModule } from '../../layouts/layouts.module';
import { ResponderComponent } from './responder.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FacebookComponent } from './components/Facebook/facebook.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RouterModule } from '@angular/router';
import { EmailComponent } from './components/email/email.component';
import { InstagramComponent } from './components/instagram/instagram.component';
import { LinkedInComponent } from './components/linked-in/linked-in.component';
import { PhoneComponent } from './components/phone/phone.component';
import { SmsDetailsComponent } from './components/sms-details/sms-details.component';
import { TwitterComponent } from './components/twitter/twitter.component';
import { WebChatComponent } from './components/web-chat/web-chat.component';
import { WhatsappDetailsComponent } from './components/whatsapp-details/whatsapp-details.component';
import { YoutubeComponent } from './components/youtube/youtube.component';
import { ResponderRightSidebarComponentsModule } from './right-sidebar-components/responder-right-sidebar-components.module';
import { RemovewhitespacesPipe } from 'src/app/shared/CustomPipes/removewhitespaces.pipe';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { DispositionFormComponent } from './components/disposition-form/disposition-form.component';
import { FilterPipe } from 'src/app/shared/CustomPipes/filter.pipe';
import { PostStatsComponent } from './sharedComponents/post-stats/post-stats.component';
import { ConsoleTableWithImageComponent } from 'src/app/layouts/engage2/console-table/console-table-with-image/console-table-with-image.component';
import { PlaystoreComponent } from './components/playstore/playstore.component';


@NgModule({
  declarations: [
    ResponderComponent,
    FacebookComponent,
    EmailComponent,
    InstagramComponent,
    LinkedInComponent,
    PhoneComponent,
    SmsDetailsComponent,
    TwitterComponent,
    WebChatComponent,
    WhatsappDetailsComponent,
    YoutubeComponent,
    RemovewhitespacesPipe,
    DispositionFormComponent,
    PostStatsComponent,
    PlaystoreComponent
  ],
  imports: [
    CommonModule,
    ResponderRoutingModule,
    LayoutsModule,
    SharedModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    RouterModule,
    ResponderRightSidebarComponentsModule,
    InfiniteScrollModule,
    FormsModule,
  ],
  exports:[
    ResponderComponent
  ]
})
export class ResponderModule { }
