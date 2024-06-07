import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResponderRoutingModule } from './responder-routing.module';
import { LayoutsModule } from '../../layouts/layouts.module';
import { ResponderComponent } from './responder.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RouterModule } from '@angular/router';
import { EmailComponent } from './components/email/email.component';
import { ResponderRightSidebarComponentsModule } from './right-sidebar-components/responder-right-sidebar-components.module';
import { RemovewhitespacesPipe } from 'src/app/shared/CustomPipes/removewhitespaces.pipe';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { DispositionFormComponent } from './components/disposition-form/disposition-form.component';
import { PostStatsComponent } from './sharedComponents/post-stats/post-stats.component';
import { ChannelComponent } from './components/responderChannelData/channel.component';
import { CKEditorModule } from 'ckeditor4-angular';
@NgModule({
  declarations: [
    ResponderComponent,
    EmailComponent,
    RemovewhitespacesPipe,
    DispositionFormComponent,
    PostStatsComponent,
    ChannelComponent
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
    CKEditorModule
  ],
  exports:[
    ResponderComponent
  ]
})
export class ResponderModule { }
