import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { EmailComponent } from './components/email/email.component';
import { FacebookComponent } from './components/Facebook/facebook.component';
import { InstagramComponent } from './components/instagram/instagram.component';
import { LinkedInComponent } from './components/linked-in/linked-in.component';
import { PhoneComponent } from './components/phone/phone.component';
import { SmsDetailsComponent } from './components/sms-details/sms-details.component';
import { TwitterComponent } from './components/twitter/twitter.component';
import { WebChatComponent } from './components/web-chat/web-chat.component';
import { WhatsappDetailsComponent } from './components/whatsapp-details/whatsapp-details.component';
import { YoutubeComponent } from './components/youtube/youtube.component';
import { RightNavService } from '../../services/RightNavService/RightNav.service';
import { SharedService } from '../../services/SharedService/shared.service';
import { ToggleService } from 'src/app/services/ToggleService/Toggle.service';
import { ResponderTicketsComponent } from './right-sidebar-components/responder-tickets/responder-tickets.component';
import { ResponderContactsComponent } from './right-sidebar-components/responder-contacts/responder-contacts.component';
import { ResponderLivechatsComponent } from './right-sidebar-components/responder-livechats/responder-livechats.component';
import { ResponderCreateNewComponent } from './right-sidebar-components/responder-create-new/responder-create-new.component';
import { ResponderTaskComponent } from './right-sidebar-components/responder-task/responder-task.component';
import { ResponderEngagementsComponent } from './right-sidebar-components/responder-engagements/responder-engagements.component';
import { ResponderHelpComponent } from './right-sidebar-components/responder-help/responder-help.component';
import { ResponderKeyboardShortcutsComponent } from './right-sidebar-components/responder-keyboard-shortcuts/responder-keyboard-shortcuts.component';
import { ResponderKnowledgeBaseComponent } from './right-sidebar-components/responder-knowledge-base/responder-knowledge-base.component';
import { ResponderPhoneDialerComponent } from './right-sidebar-components/responder-phone-dialer/responder-phone-dialer.component';
import { ResponderDocumentsComponent } from './right-sidebar-components/responder-documents/responder-documents.component';
import { ResponderScheduleComponent } from './right-sidebar-components/responder-schedule/responder-schedule.component';
import { ResponderComplaintTicketPanelComponent } from './right-sidebar-components/responder-complaint-ticket-panel/responder-complaint-ticket-panel.component';


@Component({
  selector: 'responder',
  templateUrl: './responder.component.html',
  styleUrls: ['./responder.component.scss'],
})
export class ResponderComponent implements OnInit {
  @ViewChild('container', {
    read: ViewContainerRef,
  })
  target!: ViewContainerRef;

  @ViewChild('rightcontainer', {
    read: ViewContainerRef,
  })
  rightcontainer!: ViewContainerRef;

  componentName!: any;
  childComponentName!: any;
  public subscription!: Subscription;
  panelToggled: any;
  showPanel=false;

  constructor(
    private resolver: ComponentFactoryResolver,
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private rightNavService: RightNavService,
    private toggleService : ToggleService
  ) {}

  ngOnInit(): void {
    debugger
    this.route.params.subscribe((routeParams) => {
      
      if(routeParams['channel'] != undefined && routeParams['channel'] != "undefined"){
        this.componentName = routeParams['channel'];
      } 
      this.childComponentName = routeParams['ticket'];
      let ffff = this.componentName + this.childComponentName;

      this.rightNavService.updateChildComponent(this.childComponentName);

      localStorage.setItem('child', this.childComponentName);
      if (this.childComponentName != null) {
        this.childComponentName = localStorage.getItem('child');
      }
      if(this.componentName != undefined){
        localStorage.setItem('parent', this.componentName);
      }
      
      this.sharedService.updateMessage(this.componentName);

      this.target?.clear();
      this.rightcontainer?.clear();
      this.loadComponent(this.componentName, '');
      if (
        this.childComponentName != '' &&
        this.childComponentName != undefined
      ) {
        this.showPanel = true
        this.loadComponent('', this.childComponentName);
      }
    });

    this.subscription = this.toggleService.getTogglePanel().subscribe(msg3 => {
      
      if(msg3){
        this.rightcontainer?.clear();
        localStorage.setItem('child', msg3)
        this.showPanel = true
        this.loadComponent('',msg3)
      }
      else {
        this.showPanel = false;
        this.rightcontainer?.clear();
        localStorage.setItem('child', '')
      }
    });
  }

  ngAfterViewInit() {
    debugger
    this.target?.clear();
    this.rightcontainer?.clear();

    this.loadComponent(this.componentName, '');
    if (this.childComponentName != null) {
      this.showPanel = true;
      this.loadComponent('', this.childComponentName);
    }
  }

  loadComponent(leftSideName: string, rightSideName: string) {
    debugger
    let componentFactory = null;

    switch (leftSideName || rightSideName) {
      case 'Facebook':
        componentFactory =
          this.resolver.resolveComponentFactory(FacebookComponent);
        this.target?.createComponent(componentFactory);
        break;

      case 'Instagram':
        componentFactory =
          this.resolver.resolveComponentFactory(InstagramComponent);
        this.target?.createComponent(componentFactory);
        break;
      case 'Twitter':
        componentFactory =
          this.resolver.resolveComponentFactory(TwitterComponent);
        this.target?.createComponent(componentFactory);
        break;
      case 'Email':
        componentFactory =
          this.resolver.resolveComponentFactory(EmailComponent);
        this.target?.createComponent(componentFactory);
        break;
      case 'Youtube':
        componentFactory =
          this.resolver.resolveComponentFactory(YoutubeComponent);
        this.target?.createComponent(componentFactory);
        break;
      case 'Phone':
        componentFactory =
          this.resolver.resolveComponentFactory(PhoneComponent);
        this.target?.createComponent(componentFactory);
        break;
      case 'SMS':
        componentFactory =
          this.resolver.resolveComponentFactory(SmsDetailsComponent);
        this.target?.createComponent(componentFactory);
        break;
      case 'Webchat':
        componentFactory =
          this.resolver.resolveComponentFactory(WebChatComponent);
        this.target?.createComponent(componentFactory);
        break;
      case 'WhatsApp':
        componentFactory = this.resolver.resolveComponentFactory(
          WhatsappDetailsComponent
        );
        this.target?.createComponent(componentFactory);
        break;
      case 'LinkedIn':
        componentFactory = this.resolver.resolveComponentFactory(
          LinkedInComponent
        );
        this.target?.createComponent(componentFactory);
        break;
      
      case 'ticket':
        componentFactory =
          this.resolver.resolveComponentFactory(ResponderTicketsComponent);
        this.rightcontainer?.createComponent(componentFactory);
        break;

      case 'contacts':
        componentFactory =
          this.resolver.resolveComponentFactory(ResponderContactsComponent);
        this.rightcontainer?.createComponent(componentFactory);
        break;
      case 'chats':
        componentFactory =
          this.resolver.resolveComponentFactory(ResponderLivechatsComponent);
        this.rightcontainer?.createComponent(componentFactory);
        break;
      case 'createNew':
        componentFactory =
          this.resolver.resolveComponentFactory(ResponderCreateNewComponent);
        this.rightcontainer?.createComponent(componentFactory);
        break;

      case 'task':
        componentFactory = this.resolver.resolveComponentFactory(ResponderTaskComponent);
        this.rightcontainer?.createComponent(componentFactory);
        break;
      case 'engagements':
        componentFactory =
          this.resolver.resolveComponentFactory(ResponderEngagementsComponent);
        this.rightcontainer?.createComponent(componentFactory);
        break;
      case 'help':
        componentFactory = this.resolver.resolveComponentFactory(ResponderHelpComponent);
        this.rightcontainer?.createComponent(componentFactory);
        break;
      case 'keyboardShortcuts':
        componentFactory = this.resolver.resolveComponentFactory(
          ResponderKeyboardShortcutsComponent
        );
        this.rightcontainer?.createComponent(componentFactory);
        break;
      case 'knowledgeBase':
        componentFactory = this.resolver.resolveComponentFactory(
          ResponderKnowledgeBaseComponent
        );
        this.rightcontainer?.createComponent(componentFactory);
        break;
      case 'phoneDialer':
        componentFactory =
          this.resolver.resolveComponentFactory(ResponderPhoneDialerComponent);
        this.rightcontainer?.createComponent(componentFactory);
        break;
      case 'documents':
        componentFactory =
          this.resolver.resolveComponentFactory(ResponderDocumentsComponent);
        this.rightcontainer?.createComponent(componentFactory);
        break;
      case 'schedule':
        componentFactory =
          this.resolver.resolveComponentFactory(ResponderScheduleComponent);
        this.rightcontainer?.createComponent(componentFactory);
        break;

      case 'complaint-ticket-panel':
        componentFactory = this.resolver.resolveComponentFactory(
          ResponderComplaintTicketPanelComponent
        );
        this.rightcontainer?.createComponent(componentFactory);
        break;
      default:
        componentFactory = this.resolver.resolveComponentFactory(
          FacebookComponent
        );
        this.target?.createComponent(componentFactory);
        break;
    }
  }
}
