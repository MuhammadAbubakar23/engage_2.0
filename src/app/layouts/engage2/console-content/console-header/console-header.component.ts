import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConsoleBusinessHoursHeaderComponent } from 'src/app/modules/console/console-headers/console-business-hours-header/console-business-hours-header.component';
import { ConsoleCaseManagementHeaderComponent } from 'src/app/modules/console/console-headers/console-case-management-header/console-case-management-header.component';
import { ConsoleConnectFormHeaderComponent } from 'src/app/modules/console/console-headers/console-connect-from-header/console-connect-form-header/console-connect-form-header.component';
import { ConsoleContactsHeaderComponent } from 'src/app/modules/console/console-headers/console-contacts-header/console-contacts-header.component';
import { ConsoleCreateBulkUserHeaderComponent } from 'src/app/modules/console/console-headers/console-create-bulk-user-header/console-create-bulk-user-header.component';
import { ConsoleCreateContactHeaderComponent } from 'src/app/modules/console/console-headers/console-create-contact-header/console-create-contact-header.component';
import { ConsoleCreateMessageTemplatesHeaderComponent } from 'src/app/modules/console/console-headers/console-create-message-templates-header/console-create-message-templates-header.component';
import { ConsoleCreatePolicyHeaderComponent } from 'src/app/modules/console/console-headers/console-create-policy-header/console-create-policy-header.component';
import { ConsoleCreateRolesHeaderComponent } from 'src/app/modules/console/console-headers/console-create-roles-header/console-create-roles-header.component';
import { ConsoleCreateSignatureTemplatesHeaderComponent } from 'src/app/modules/console/console-headers/console-create-signature-templates-header/console-create-signature-templates-header.component';
import { ConsoleCreateTagsHeaderComponent } from 'src/app/modules/console/console-headers/console-create-tags-header/console-create-tags-header.component';
import { ConsoleCreateTeamHeaderComponent } from 'src/app/modules/console/console-headers/console-create-team-header/console-create-team-header.component';
import { ConsoleDocumentDetailsHeaderComponent } from 'src/app/modules/console/console-headers/console-document-details-header/console-document-details-header.component';
import { ConsoleDocumentsHeaderComponent } from 'src/app/modules/console/console-headers/console-documents-header/console-documents-header.component';
import { ConsoleHelpHeaderComponent } from 'src/app/modules/console/console-headers/console-help-header/console-help-header.component';
import { ConsoleHomeHeaderComponent } from 'src/app/modules/console/console-headers/console-home-header/console-home-header.component';
import { ConsoleKnowledgeBaseHeaderComponent } from 'src/app/modules/console/console-headers/console-knowledge-base-header/console-knowledge-base-header.component';
import { ConsoleMessagesTemplateHeaderComponent } from 'src/app/modules/console/console-headers/console-messages-template-header/console-messages-template-header.component';
import { ConsolePostsListHeaderComponent } from 'src/app/modules/console/console-headers/console-posts-list-header/console-posts-list-header.component';
import { ConsolePreferencesHeaderComponent } from 'src/app/modules/console/console-headers/console-preferences-header/console-preferences-header.component';
import { ConsoleRolesComponent } from 'src/app/modules/console/console-headers/console-roles/console-roles.component';
import { ConsoleRulesHeaderComponent } from 'src/app/modules/console/console-headers/console-rules-header/console-rules-header.component';
import { ConsoleSignaturesTemplateHeaderComponent } from 'src/app/modules/console/console-headers/console-signatures-template-header/console-signatures-template-header.component';
import { ConsoleSkillsHeaderComponent } from 'src/app/modules/console/console-headers/console-skills-header/console-skills-header.component';
import { ConsoleSlaPoliciesHeaderComponent } from 'src/app/modules/console/console-headers/console-sla-policies-header/console-sla-policies-header.component';
import { ConsoleTagsHeaderComponent } from 'src/app/modules/console/console-headers/console-tags-header/console-tags-header.component';
import { ConsoleTeamsHeaderComponent } from 'src/app/modules/console/console-headers/console-teams-header/console-teams-header.component';
import { ConsoleUserDetailsHeaderComponent } from 'src/app/modules/console/console-headers/console-user-details-header/console-user-details-header.component';
import { ConsoleUsersHeaderComponent } from 'src/app/modules/console/console-headers/console-users-header/console-users-header.component';
import { CreateUserHeaderComponent } from 'src/app/modules/console/console-headers/create-user-header/create-user-header.component';
import { SupportChannelsHeaderComponent } from 'src/app/modules/console/console-headers/support-channels-header/support-channels-header.component';
import { HeaderService } from 'src/app/services/HeaderService/header.service';
import { ToggleService } from 'src/app/services/ToggleService/Toggle.service';
import { InboxHeaderComponent } from '../../inbox-content/inbox-header/inbox-header.component';

@Component({
  selector: 'console-header',
  templateUrl: './console-header.component.html',
  styleUrls: ['./console-header.component.scss']
})
export class ConsoleHeaderComponent implements OnInit {

  @ViewChild('container', {
    read: ViewContainerRef
  }) target!: ViewContainerRef;

  componentName!: string;

  public subscription!: Subscription;
  public togglePannel: string = '';
  constructor(private toggleService: ToggleService, private headerService: HeaderService,
    private route: ActivatedRoute,
    private resolver: ComponentFactoryResolver) { }



  ngOnInit(): void {
    this.subscription = this.headerService.getMessage().subscribe(msg => {
      this.componentName = msg;
      this.target.clear();
      this.loadComponent(this.componentName);
    });
    this.subscription = this.toggleService.getTogglePanel().subscribe(msg3 => {
      this.togglePannel = msg3
    });

  }

  ngAfterViewInit() {
    this.target.clear();
    this.loadComponent(this.componentName);


  }

  loadComponent(leftSideName: string) {
debugger

    let componentFactory = null;
    
    switch (leftSideName) {
    
      case ('home'):
        componentFactory = this.resolver.resolveComponentFactory(ConsoleHomeHeaderComponent);
        this.target.createComponent(componentFactory);
        break;
      case ('channels'):
        componentFactory = this.resolver.resolveComponentFactory(SupportChannelsHeaderComponent);
        this.target.createComponent(componentFactory);
        break;
      case ('users'):
        componentFactory = this.resolver.resolveComponentFactory(ConsoleUsersHeaderComponent);
        this.target.createComponent(componentFactory);
        break;
      case ('teams'):
        componentFactory = this.resolver.resolveComponentFactory(ConsoleTeamsHeaderComponent);
        this.target.createComponent(componentFactory);
        break;
      case ('rules'):
        componentFactory = this.resolver.resolveComponentFactory(ConsoleRulesHeaderComponent);
        this.target.createComponent(componentFactory);
        break;
      case ('businessHours'):
        componentFactory = this.resolver.resolveComponentFactory(ConsoleBusinessHoursHeaderComponent);
        this.target.createComponent(componentFactory);
        break;
      case ('tags'):
        componentFactory = this.resolver.resolveComponentFactory(ConsoleTagsHeaderComponent);
        this.target.createComponent(componentFactory);
        break;
      case ('rolesAndPermissions'):
        componentFactory = this.resolver.resolveComponentFactory(ConsoleRolesComponent);
        this.target.createComponent(componentFactory);
        break;
      case ('slaPolicies'):
        componentFactory = this.resolver.resolveComponentFactory(ConsoleSlaPoliciesHeaderComponent);
        this.target.createComponent(componentFactory);
        break;
      case ('skills'):
        componentFactory = this.resolver.resolveComponentFactory(ConsoleSkillsHeaderComponent);
        this.target.createComponent(componentFactory);
        break;
      case ('contacts'):
        componentFactory = this.resolver.resolveComponentFactory(ConsoleContactsHeaderComponent);
        this.target.createComponent(componentFactory);
        break;
      case ('caseManagement'):
        componentFactory = this.resolver.resolveComponentFactory(ConsoleCaseManagementHeaderComponent);
        this.target.createComponent(componentFactory);
        break;
      case ('console-documents'):
        componentFactory = this.resolver.resolveComponentFactory(ConsoleDocumentsHeaderComponent);
        this.target.createComponent(componentFactory);
        break;
      case ('console-knowledgeBase'):
        componentFactory = this.resolver.resolveComponentFactory(ConsoleKnowledgeBaseHeaderComponent);
        this.target.createComponent(componentFactory);
        break;
      case ('preferences'):
        componentFactory = this.resolver.resolveComponentFactory(ConsolePreferencesHeaderComponent);
        this.target.createComponent(componentFactory);
        break;
      case ('console-help'):
        componentFactory = this.resolver.resolveComponentFactory(ConsoleHelpHeaderComponent);
        this.target.createComponent(componentFactory);
        break;
      case ('createUserHeader'):
        componentFactory = this.resolver.resolveComponentFactory(CreateUserHeaderComponent);
        this.target.createComponent(componentFactory);
        break;

      case ('consoleCreateBulkUserHeader'):
        componentFactory = this.resolver.resolveComponentFactory(ConsoleCreateBulkUserHeaderComponent);
        this.target.createComponent(componentFactory);
        break;
      case ('consoleCreateTeamHeader'):
        componentFactory = this.resolver.resolveComponentFactory(ConsoleCreateTeamHeaderComponent);
        this.target.createComponent(componentFactory);
        break;
      case ('consoleCreateTagsHeader'):
        componentFactory = this.resolver.resolveComponentFactory(ConsoleCreateTagsHeaderComponent);
        this.target.createComponent(componentFactory);
        break;
      case ('consoleCreateRolesHeader'):
        componentFactory = this.resolver.resolveComponentFactory(ConsoleCreateRolesHeaderComponent);
        this.target.createComponent(componentFactory);
        break;
      case ('consoleCreateSlaPolicyHeader'):
        componentFactory = this.resolver.resolveComponentFactory(ConsoleCreatePolicyHeaderComponent);
        this.target.createComponent(componentFactory);
        break;
      case ('consoleCreateContactHeader'):
        componentFactory = this.resolver.resolveComponentFactory(ConsoleCreateContactHeaderComponent);
        this.target.createComponent(componentFactory);
        break;
      case ('consoleUserDetailsHeader'):
        componentFactory = this.resolver.resolveComponentFactory(ConsoleUserDetailsHeaderComponent);
        this.target.createComponent(componentFactory);
        break;
      case ('consoleDocumentDetailsHeader'):
        componentFactory = this.resolver.resolveComponentFactory(ConsoleDocumentDetailsHeaderComponent);
        this.target.createComponent(componentFactory);
        break;
      case ('consolePostListHeader'):
        componentFactory = this.resolver.resolveComponentFactory(ConsolePostsListHeaderComponent);
        this.target.createComponent(componentFactory);
        break;

        case ('messages-template'):
        componentFactory = this.resolver.resolveComponentFactory(ConsoleMessagesTemplateHeaderComponent);
        this.target.createComponent(componentFactory);
        break;
        case ('consoleCreateMessageTemplatesHeader'):
        componentFactory = this.resolver.resolveComponentFactory(ConsoleCreateMessageTemplatesHeaderComponent);
        this.target.createComponent(componentFactory);
        break;
        case ('signatures-template'):
        componentFactory = this.resolver.resolveComponentFactory(ConsoleSignaturesTemplateHeaderComponent);
        this.target.createComponent(componentFactory);
        break;
        case ('consoleCreateSignatureTemplatesHeader'):
        componentFactory = this.resolver.resolveComponentFactory(ConsoleCreateSignatureTemplatesHeaderComponent);
        this.target.createComponent(componentFactory);
        break;
        case ('consoleConnectFormHeader'):
        componentFactory = this.resolver.resolveComponentFactory(ConsoleConnectFormHeaderComponent);
        this.target.createComponent(componentFactory);
        break;
      default:
     
        componentFactory = this.resolver.resolveComponentFactory(ConsoleHomeHeaderComponent);
        this.target.createComponent(componentFactory);
        break;
    }
  }
}
