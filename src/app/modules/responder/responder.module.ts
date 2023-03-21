import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResponderRoutingModule } from './responder-routing.module';
import { LayoutsModule } from '../../layouts/layouts.module';
import { ResponderComponent } from './responder.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FacebookComponent } from './components/Facebook/facebook.component';
import { ReactiveFormsModule } from '@angular/forms';
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
import { GroupbydatePipe } from 'src/app/shared/CustomPipes/groupbydate.pipe';
import { ResponderRightSidebarComponentsModule } from './right-sidebar-components/responder-right-sidebar-components.module';


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
    YoutubeComponent
  ],
  imports: [
    CommonModule,
    ResponderRoutingModule,
    LayoutsModule,
    SharedModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    RouterModule,
    ResponderRightSidebarComponentsModule
  ],
  exports:[
    ResponderComponent
  ]
})
export class ResponderModule { }
