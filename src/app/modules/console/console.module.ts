import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsoleRoutingModule } from './console-routing.module';
import { ConsoleComponent } from './console.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TemplatesComponent } from './components/templates/templates.component';
import { ConsoleContactsComponent } from './components/contacts/contacts.component';
import { CaseManagementComponent } from './components/case-management/case-management.component';
import { ConsoleDocumentsComponent } from './components/documents/documents.component';
import { ConsoleKnowledgeBaseComponent } from './components/knowledge-base/knowledge-base.component';
import { PreferencesComponent } from './components/preferences/preferences.component';
import { ConsoleHelpComponent } from './components/help/help.component';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { AddPolicyComponent } from './components/sla-policies/add-policy/add-policy.component';
import { CreateContactComponent } from './components/contacts/create-contact/create-contact.component';
import { UserDetailsComponent } from './components/contacts/user-details/user-details.component';
import { DocumentDetailsComponent } from './components/documents/document-details/document-details.component';
import { PostsComponent } from './components/knowledge-base/posts/posts.component';
import { MessagesComponent } from './components/templates/messages/messages.component';
import { CreateMessageTemplatesComponent } from './components/templates/messages/create-message-templates/create-message-templates.component';
import { SignaturesComponent } from './components/templates/signatures/signatures.component';
import { CreateSignatureTemplatesComponent } from './components/templates/signatures/create-signature-templates/create-signature-templates.component';
import { ConnectFormComponent } from './components/connect-form/connect-form.component';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { QuickResponseComponent } from './components/templates/quick-response/quick-response.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { CKEditorModule } from 'ckeditor4-angular';
import { CreateQuickResponseTemplatesComponent } from './components/templates/quick-response/create-quick-response-templates/create-quick-response-templates.component';
import { CreateBusinessHoursComponent } from './components/business-hours/create-business-hours/create-business-hours.component';
import { SentimentAnalysisComponent } from './components/sentiment-analysis/sentiment-analysis.component';
import { ChatBotComponent } from './components/chat-bot/chat-bot.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ChatBotBuilderComponent } from './components/chat-bot-builder/chat-bot-builder.component';
import { StepOneComponent } from './components/chat-bot-builder/step-one/step-one.component';
import { StepTwoComponent } from './components/chat-bot-builder/step-two/step-two.component';
import { StepThreeComponent } from './components/chat-bot-builder/step-three/step-three.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { NgStepperModule } from 'angular-ng-stepper';
import { ChatwithsentimentComponent } from './components/sentiment-analysis/right-sidebar-components/chatwithsentiment/chatwithsentiment.component';
import { ChatwithintentComponent } from './components/chat-bot/right-sidebar-components/chatwithintent/chatwithintent.component';
import { ToastrComponent } from './components/toastr/toastr.component';
import { StepFourComponent } from './components/chat-bot-builder/step-four/step-four.component';
import { UpdateIntentsComponent } from './components/chat-bot/update-intents/update-intents.component';
import { BulkUploadComponent } from './components/sentiment-analysis/bulk-upload/bulk-upload.component';
import { CreateSentimentComponent } from './components/sentiment-analysis/create-sentiment/create-sentiment.component';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    ConsoleComponent,
    TemplatesComponent,
    // ConsoleContactsComponent,
    CaseManagementComponent,
    ConsoleDocumentsComponent,
    ConsoleKnowledgeBaseComponent,
    PreferencesComponent,
    ConsoleHelpComponent,
    AddPolicyComponent,
    CreateContactComponent,
    UserDetailsComponent,
    DocumentDetailsComponent,
    PostsComponent,
    MessagesComponent,
    CreateMessageTemplatesComponent,
    SignaturesComponent,
    CreateSignatureTemplatesComponent,
    ConnectFormComponent,
    QuickResponseComponent,
    CreateQuickResponseTemplatesComponent,
    CreateBusinessHoursComponent,
    SentimentAnalysisComponent,
    ChatBotComponent,
    ChatBotBuilderComponent,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
    StepFourComponent,
    UpdateIntentsComponent,
    ChatwithsentimentComponent,
    ChatwithintentComponent,
    ToastrComponent,
    BulkUploadComponent,
    CreateSentimentComponent,
  ],
  imports: [
    CommonModule,
    ConsoleRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatChipsModule,
    MatIconModule,
    MatSelectModule,
    LayoutsModule,
    AngularEditorModule,
    CKEditorModule,
    NgSelectModule,
    CdkStepperModule,
    NgStepperModule,
    NgxSpinnerModule
  ]
})
export class ConsoleModule { }
