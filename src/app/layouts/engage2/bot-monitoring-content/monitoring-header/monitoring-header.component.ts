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
import { ConsoleQuickResponseHeaderComponent } from 'src/app/modules/console/console-headers/console-quick-response-header/console-quick-response-header.component';
import { ConsoleCreateBusinessHoursHeaderComponent } from 'src/app/modules/console/console-headers/console-create-business-hours-header/console-create-business-hours-header.component';
import { ConsoleCreateRuleHeaderComponent } from 'src/app/shared/headers/console-create-rule-header/console-create-rule-header.component';
import { ConsoleCreateSkillsHeaderComponent } from 'src/app/modules/console/console-headers/console-create-skills-header/console-create-skills-header.component';
import { ConsoleCreatePreferencesHeaderComponent } from 'src/app/modules/console/console-headers/console-create-preferences-header/console-create-preferences-header.component';
import { BotChatComponent } from 'src/app/modules/bot-monitoring/components/bot-chat/bot-chat.component';
import { BotHeaderComponent } from '../../bot-content/bot-header/bot-header.component';
import { BotMoniteringHeaderComponent } from 'src/app/modules/bot-monitoring/monitoring-header/bot-monitering-header/bot-monitering-header.component';
import { ChatBotHeaderComponent } from 'src/app/modules/bot-monitoring/monitoring-header/chat-bot-header/chat-bot-header.component';
import { ConversationHeaderComponent } from 'src/app/modules/bot-monitoring/monitoring-header/conversation-header/conversation-header.component';
import { ComponentsHeaderComponent } from 'src/app/modules/bot-monitoring/monitoring-header/components-header/components-header.component';
import { UploadDownloadHeaderComponent } from 'src/app/modules/bot-monitoring/monitoring-header/upload-download-header/upload-download-header.component';
import { ChatBotStepperHeaderComponent } from 'src/app/modules/bot-monitoring/monitoring-header/chat-bot-stepper-header/chat-bot-stepper-header.component';
import { ChatbotStoryHeaderComponent } from 'src/app/modules/bot-monitoring/monitoring-header/chatbot-story-header/chatbot-story-header.component';

@Component({
  selector: 'app-monitoring-header',
  templateUrl: './monitoring-header.component.html',
  styleUrls: ['./monitoring-header.component.scss']
})
export class MonitoringHeaderComponent implements OnInit {
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
        this.togglePannel = msg3;
      });
    
      const savedComponent = localStorage.getItem('currentComponent');
      if (savedComponent) {
        this.componentName = savedComponent;
      }
    }
    
    ngAfterViewInit() {
      this.target.clear();
      this.loadComponent(this.componentName);
      this.subscription = this.headerService.getMessage().subscribe(msg => {
        this.componentName = msg;
      });
    }
    
  loadComponent(leftSideName: string) {
    let componentFactory = null;
    switch (leftSideName) {
      case ('chat'):
        componentFactory = this.resolver.resolveComponentFactory(ChatBotHeaderComponent);
        break;
      case ('bot-monitering'):
        componentFactory = this.resolver.resolveComponentFactory(BotMoniteringHeaderComponent);
        break;
      case ('conversation'):
        componentFactory = this.resolver.resolveComponentFactory(ConversationHeaderComponent);
        break;
      case ('component'):
        componentFactory = this.resolver.resolveComponentFactory(ComponentsHeaderComponent);
        break;
      case ('rule-chatBot'):
        componentFactory = this.resolver.resolveComponentFactory(ChatBotStepperHeaderComponent);
        break;
      case ('story-chatBot'):
        componentFactory = this.resolver.resolveComponentFactory(ChatbotStoryHeaderComponent);
        break;
      case ('upload'):
        componentFactory = this.resolver.resolveComponentFactory(UploadDownloadHeaderComponent);
        break;
      default:
        componentFactory = this.resolver.resolveComponentFactory(ChatBotHeaderComponent);
        break;
    }
    if (componentFactory) {
      this.target.createComponent(componentFactory);
      localStorage.setItem('currentComponent', leftSideName); 
    }
  }
  
}

