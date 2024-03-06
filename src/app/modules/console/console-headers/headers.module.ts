import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsoleUsersHeaderComponent } from './console-users-header/console-users-header.component';
import { ConsoleTeamsHeaderComponent } from './console-teams-header/console-teams-header.component';
import { ConsoleRulesHeaderComponent } from './console-rules-header/console-rules-header.component';
import { ConsoleEnteractRouteHeaderComponent } from './console-enteract-route-header/console-enteract-route-header.component';
import { ConsoleBusinessHoursHeaderComponent } from './console-business-hours-header/console-business-hours-header.component';
import { ConsoleTagsHeaderComponent } from './console-tags-header/console-tags-header.component';
import { ConsoleRolesComponent } from './console-roles/console-roles.component';
import { ConsoleSlaPoliciesHeaderComponent } from './console-sla-policies-header/console-sla-policies-header.component';
import { ConsoleSkillsHeaderComponent } from './console-skills-header/console-skills-header.component';
import { ConsoleContactsHeaderComponent } from './console-contacts-header/console-contacts-header.component';
import { ConsoleCaseManagementHeaderComponent } from './console-case-management-header/console-case-management-header.component';
import { ConsoleDocumentsHeaderComponent } from './console-documents-header/console-documents-header.component';
import { ConsoleKnowledgeBaseHeaderComponent } from './console-knowledge-base-header/console-knowledge-base-header.component';
import { ConsolePreferencesHeaderComponent } from './console-preferences-header/console-preferences-header.component';
import { ConsoleHelpHeaderComponent } from './console-help-header/console-help-header.component';
import { CreateUserHeaderComponent } from './create-user-header/create-user-header.component';
import { RouterModule } from '@angular/router';
import { CreateTeamHeaderComponent } from './create-team-header/create-team-header.component';
import { ConsoleCreateBulkUserHeaderComponent } from './console-create-bulk-user-header/console-create-bulk-user-header.component';
import { ConsoleCreateTeamHeaderComponent } from './console-create-team-header/console-create-team-header.component';
import { ConsoleCreateTagsHeaderComponent } from './console-create-tags-header/console-create-tags-header.component';
import { ConsoleCreateRolesHeaderComponent } from './console-create-roles-header/console-create-roles-header.component';
import { ConsoleCreatePolicyHeaderComponent } from './console-create-policy-header/console-create-policy-header.component';
import { ConsoleCreateContactHeaderComponent } from './console-create-contact-header/console-create-contact-header.component';
import { ConsoleUserDetailsHeaderComponent } from './console-user-details-header/console-user-details-header.component';
import { ConsoleDocumentDetailsHeaderComponent } from './console-document-details-header/console-document-details-header.component';
import { ConsolePostsListHeaderComponent } from './console-posts-list-header/console-posts-list-header.component';
import { ConsoleMessagesTemplateHeaderComponent } from './console-messages-template-header/console-messages-template-header.component';
import { ConsoleCreateMessageTemplatesHeaderComponent } from './console-create-message-templates-header/console-create-message-templates-header.component';
import { ConsoleSignaturesTemplateHeaderComponent } from './console-signatures-template-header/console-signatures-template-header.component';
import { ConsoleCreateSignatureTemplatesHeaderComponent } from './console-create-signature-templates-header/console-create-signature-templates-header.component';
import { ConsoleConnectFormHeaderComponent } from './console-connect-from-header/console-connect-form-header/console-connect-form-header.component';
// import { RightHeaderComponentsComponent } from '../../../shared/right-header-components/right-header-components.component';
import { ConsoleHomeHeaderComponent } from './console-home-header/console-home-header.component';
import { ConsoleCreateBusinessHoursHeaderComponent } from './console-create-business-hours-header/console-create-business-hours-header.component';




@NgModule({
  declarations: [
  
  
    ConsoleUsersHeaderComponent,
          ConsoleTeamsHeaderComponent,
          ConsoleRulesHeaderComponent,
          ConsoleEnteractRouteHeaderComponent,
          ConsoleBusinessHoursHeaderComponent,
          ConsoleTagsHeaderComponent,
          ConsoleRolesComponent,
          ConsoleSlaPoliciesHeaderComponent,
          ConsoleSkillsHeaderComponent,
          ConsoleContactsHeaderComponent,
          ConsoleCaseManagementHeaderComponent,
          ConsoleDocumentsHeaderComponent,
          ConsoleKnowledgeBaseHeaderComponent,
          ConsolePreferencesHeaderComponent,
          ConsoleHelpHeaderComponent,
          CreateUserHeaderComponent,
          CreateTeamHeaderComponent,
          ConsoleCreateBulkUserHeaderComponent,
          ConsoleCreateTeamHeaderComponent,
          ConsoleCreateTagsHeaderComponent,
          ConsoleCreateRolesHeaderComponent,
          ConsoleCreatePolicyHeaderComponent,
          ConsoleCreateContactHeaderComponent,
          ConsoleUserDetailsHeaderComponent,
          ConsoleDocumentDetailsHeaderComponent,
          ConsolePostsListHeaderComponent,
          ConsoleMessagesTemplateHeaderComponent,
          ConsoleCreateMessageTemplatesHeaderComponent,
          ConsoleSignaturesTemplateHeaderComponent,
          ConsoleCreateSignatureTemplatesHeaderComponent,
          ConsoleConnectFormHeaderComponent,
          ConsoleHomeHeaderComponent,
          ConsoleCreateBusinessHoursHeaderComponent
      //    RightHeaderComponentsComponent

  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports:[
  ]
  
})
export class HeadersModule { }
