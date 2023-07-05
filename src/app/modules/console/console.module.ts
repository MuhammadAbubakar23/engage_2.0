import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsoleRoutingModule } from './console-routing.module';
import { ConsoleComponent } from './console.component';
import { HomeComponent } from './components/home/home.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TemplatesComponent } from './components/templates/templates.component';
import { ConsoleContactsComponent} from './components/contacts/contacts.component';
import { CaseManagementComponent } from './components/case-management/case-management.component';
import { ConsoleDocumentsComponent } from './components/documents/documents.component';
import { ConsoleKnowledgeBaseComponent} from './components/knowledge-base/knowledge-base.component';
import { PreferencesComponent } from './components/preferences/preferences.component';
import { ConsoleHelpComponent } from './components/help/help.component';
// import { BulkUsersAddComponent } from './components/users/bulk-users-add/bulk-users-add.component';
// import { CreateUserComponent } from './components/users/create-user/create-user.component';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
// import { CreateTeamComponent } from './components/teams/create-team/create-team.component';
// import { AddTeamMembersComponent } from './components/teams/add-team-members/add-team-members.component';
import { CreateTagsComponent } from './components/tags/create-tags/create-tags.component';
// import { CreateRolesComponent } from './components/roles-and-permissions/create-roles/create-roles.component';
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
import { SharedModule } from 'src/app/shared/shared.module';
import { ConsoleTableComponent } from 'src/app/layouts/engage2/console-table/console-table.component';
import { QuickResponseComponent } from './components/templates/quick-response/quick-response.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { CKEditorModule } from 'ckeditor4-angular';
import { CreateQuickResponseTemplatesComponent } from './components/templates/quick-response/create-quick-response-templates/create-quick-response-templates.component';
import { CreateBusinessHoursComponent } from './components/business-hours/create-business-hours/create-business-hours.component';
// import { CreateSkillsComponent } from './components/skills/create-skills/create-skills.component';
// import { AddSkillMembersComponent } from './components/skills/add-skill-members/add-skill-members.component';


@NgModule({
  declarations: [
    ConsoleComponent,
  //  ConsoleTableComponent,
    HomeComponent,
    TemplatesComponent,
    // BusinessHoursComponent,
    // SupportChannelsComponent,
    // UsersComponent,
    // TeamsComponent,
    // TagsComponent,
    // RulesComponent,
    // EnteractRouteComponent,
    // RolesAndPermissionsComponent,
    // SlaPoliciesComponent,
    // SkillsComponent,
    ConsoleContactsComponent,
    CaseManagementComponent,
    ConsoleDocumentsComponent,
    ConsoleKnowledgeBaseComponent,
    PreferencesComponent,
    ConsoleHelpComponent,
    // BulkUsersAddComponent,
    // CreateUserComponent,
    // CreateTeamComponent,
    // AddTeamMembersComponent,
    // CreateTagsComponent,
    // CreateRolesComponent,
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
    // CreateSkillsComponent,
    //AddSkillMembersComponent,
    CreateBusinessHoursComponent
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
    CKEditorModule
   
  ]
})
export class ConsoleModule { }
