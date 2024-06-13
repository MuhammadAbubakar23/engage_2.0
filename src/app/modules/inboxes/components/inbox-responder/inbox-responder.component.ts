import { Component, ComponentFactoryResolver, EventEmitter, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DispositionFormComponent } from 'src/app/modules/responder/components/disposition-form/disposition-form.component';
import { EmailComponent } from 'src/app/modules/responder/components/email/email.component';
import { ChannelComponent } from 'src/app/modules/responder/components/responderChannelData/channel.component';
import { ResponderBotInteractionComponent } from 'src/app/modules/responder/right-sidebar-components/responder-bot-interaction/responder-bot-interaction.component';
import { ResponderComplaintTicketPanelComponent } from 'src/app/modules/responder/right-sidebar-components/responder-complaint-ticket-panel/responder-complaint-ticket-panel.component';
import { ResponderContactsComponent } from 'src/app/modules/responder/right-sidebar-components/responder-contacts/responder-contacts.component';
import { ResponderCreateNewComponent } from 'src/app/modules/responder/right-sidebar-components/responder-create-new/responder-create-new.component';
import { ResponderCustomerProfilingComponent } from 'src/app/modules/responder/right-sidebar-components/responder-customer-profiling/responder-customer-profiling.component';
import { ResponderDocumentsComponent } from 'src/app/modules/responder/right-sidebar-components/responder-documents/responder-documents.component';
import { ResponderEngagementsComponent } from 'src/app/modules/responder/right-sidebar-components/responder-engagements/responder-engagements.component';
import { ResponderHelpComponent } from 'src/app/modules/responder/right-sidebar-components/responder-help/responder-help.component';
import { ResponderHistoryComponent } from 'src/app/modules/responder/right-sidebar-components/responder-history/responder-history.component';
import { ResponderKeyboardShortcutsComponent } from 'src/app/modules/responder/right-sidebar-components/responder-keyboard-shortcuts/responder-keyboard-shortcuts.component';
import { ResponderKnowledgeBaseComponent } from 'src/app/modules/responder/right-sidebar-components/responder-knowledge-base/responder-knowledge-base.component';
import { ResponderLivechatsComponent } from 'src/app/modules/responder/right-sidebar-components/responder-livechats/responder-livechats.component';
import { ResponderProfileComponent } from 'src/app/modules/responder/right-sidebar-components/responder-profile/responder-profile.component';
import { ResponderScheduleComponent } from 'src/app/modules/responder/right-sidebar-components/responder-schedule/responder-schedule.component';
import { ResponderTaskComponent } from 'src/app/modules/responder/right-sidebar-components/responder-task/responder-task.component';
import { ResponderTicketsComponent } from 'src/app/modules/responder/right-sidebar-components/responder-tickets/responder-tickets.component';
import { WebPhoneComponent } from 'src/app/modules/web-phone/web-phone.component';
import { ClosePanelService } from 'src/app/services/ClosePanelServices/close-panel.service';
import { RightNavService } from 'src/app/services/RightNavService/RightNav.service';
import { SharedService } from 'src/app/services/SharedService/shared.service';
import { ToggleService } from 'src/app/services/ToggleService/Toggle.service';
import { ResponderGuardGuard } from 'src/app/shared/Guards/responder-guard.guard';

@Component({
  selector: 'app-inbox-responder',
  templateUrl: './inbox-responder.component.html',
  styleUrls: ['./inbox-responder.component.scss']
})
export class InboxResponderComponent implements OnInit {
  @ViewChild('container', {
    read: ViewContainerRef,
  })
  target!: ViewContainerRef;

  @ViewChild('rightcontainer', {
    read: ViewContainerRef,
  })
  rightcontainer!: ViewContainerRef;

  @Output() someEvent = new EventEmitter<string>();

  componentName!: any;
  oldComponent: any;
  childComponentName!: any;
  public subscription!: Subscription;
  panelToggled: any;
  showPanel = false;

  assignedProfile = localStorage.getItem('assignedProfile')

  constructor(
    private resolver: ComponentFactoryResolver,
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private rightNavService: RightNavService,
    private toggleService: ToggleService,
    private closePanelservices: ClosePanelService
  ) { }

  ngOnInit(): void {
    this.subscription = this.closePanelservices.receiveRightBarToggleValue().subscribe(res => {
      this.showPanel = res;
    })
    // window.onbeforeunload = () => this.onBeforeUnload();
    window.addEventListener('beforeunload', this.onBeforeUnload);
    this.route.params.subscribe((routeParams) => {

      if (routeParams['channel'] != undefined && routeParams['channel'] != "undefined") {
        this.componentName = (routeParams['channel']);
      }
      this.childComponentName = routeParams['ticket'];
      let ffff = this.componentName + this.childComponentName;

      this.rightNavService.updateChildComponent(this.childComponentName);

      localStorage.setItem('child', this.childComponentName);
      if (this.childComponentName != null) {
        this.childComponentName = localStorage.getItem('child');
      }
      if (this.componentName != undefined) {
        localStorage.setItem('parent', this.componentName);
      }

      this.sharedService.updateMessage(this.componentName);

      this.target?.clear();
      this.rightcontainer?.clear();
      // console.log("Locaded component name is=====>",localStorage.getItem('parent'));
      // console.log("Old Component====>",this.oldComponent);
      if (this.oldComponent != undefined) {

        if (localStorage.getItem('parent') != undefined && localStorage.getItem('parent') != this.oldComponent) {

          this.loadComponent(this.componentName, '');
          this.oldComponent = this.componentName;
        }
      }
      if (
        this.childComponentName != '' &&
        this.childComponentName != undefined
      ) {
        this.showPanel = true
        this.closePanelservices.sendLeftBarToggleValue(false)
        this.loadComponent('', this.childComponentName);
      }
    });

    this.subscription = this.toggleService.getTogglePanel().subscribe(msg3 => {

      if (msg3) {
        this.rightcontainer?.clear();
        localStorage.setItem('child', msg3)
        this.showPanel = true
        this.closePanelservices.sendLeftBarToggleValue(false)
        this.loadComponent('', msg3)
      }
      else {
        this.showPanel = false;
        this.rightcontainer?.clear();
        localStorage.setItem('child', '')
      }

      // this.subscription = this.toggleService.getDispositionForm().subscribe(value=>{

      //   if(value){
      //     this.target?.clear();
      //     this.loadComponent(value,'')
      //   }
      // })
    });
  }

  // private onBeforeUnload(): void {
  //   
  //   this.responderGuard.setCanDeactivateFlag(false)
  // }
  private reloadConfirmationMessage = 'Are you sure you want to reload?';

  private onBeforeUnload(event: BeforeUnloadEvent): void {
    if (!this.canReload()) {
      event.preventDefault();
      event.returnValue = this.reloadConfirmationMessage;
    }
  }

  private canReload(): boolean {
    // Add your condition here
    // Return true if the reload is allowed or false if it should be prevented
    // For example:

    if (
      localStorage.getItem('assignedProfile') == null ||
      localStorage.getItem('assignedProfile') == '' ||
      localStorage.getItem('assignedProfile') == undefined
    ) {
      return false
    } else {
      return confirm('Are you sure you want to reload?');
    }

  }

  ngOnDestroy(): void {

    // window.onbeforeunload = null;
    window.removeEventListener('beforeunload', this.onBeforeUnload);
  }

  ngAfterViewInit() {

    this.target?.clear();
    this.rightcontainer?.clear();
    this.oldComponent = this.componentName;
    this.loadComponent(this.componentName, '');
    // console.log("Old Component====>",this.oldComponent);
    if (this.childComponentName != null) {
      this.showPanel = true;
      this.closePanelservices.sendLeftBarToggleValue(false)
      this.loadComponent('', this.childComponentName);
    }
    this.subscription = this.toggleService.getDispositionForm().subscribe(value => {

      if (value == 'disposition-form') {
        this.target?.clear();
        this.loadComponent(value, '')
      }
      var parent = localStorage.getItem('parent') || '{}'
      if (value == 'close-disposition-form') {
        this.target?.clear();
        this.loadComponent(parent, '')
      }
    })
  }

  loadComponent(leftSideName: string, rightSideName: string) {

    let componentFactory = null;

    switch (leftSideName || rightSideName) {
      case 'Facebook':
        this.showPanel = false;
        localStorage.setItem('child', '')
        componentFactory =
          this.resolver.resolveComponentFactory(ChannelComponent);
        this.target?.createComponent(componentFactory);
        break;

      case 'Instagram':
        this.showPanel = false;
        localStorage.setItem('child', '')
        componentFactory =
          this.resolver.resolveComponentFactory(ChannelComponent);
        this.target?.createComponent(componentFactory);

        break;
      case 'PlayStore':
        this.showPanel = false;
        localStorage.setItem('child', '')
        componentFactory =
          this.resolver.resolveComponentFactory(ChannelComponent);
        this.target?.createComponent(componentFactory);

        break;
      case 'Twitter':
        this.showPanel = false;
        localStorage.setItem('child', '')
        componentFactory =
          this.resolver.resolveComponentFactory(ChannelComponent);
        this.target?.createComponent(componentFactory);
        break;
      case 'Email':
        this.showPanel = false;
        localStorage.setItem('child', '')
        componentFactory =
          this.resolver.resolveComponentFactory(EmailComponent);
        this.target?.createComponent(componentFactory);
        break;
      case 'OfficeEmail':
        this.showPanel = false;
        localStorage.setItem('child', '')
        componentFactory =
          this.resolver.resolveComponentFactory(EmailComponent);
        this.target?.createComponent(componentFactory);
        break;
      case 'Youtube':
        this.showPanel = false;
        localStorage.setItem('child', '')
        componentFactory =
          this.resolver.resolveComponentFactory(ChannelComponent);
        this.target?.createComponent(componentFactory);
        break;
      case 'SMS':
        this.showPanel = false;
        localStorage.setItem('child', '')
        componentFactory =
          this.resolver.resolveComponentFactory(ChannelComponent);
        this.target?.createComponent(componentFactory);
        break;
      case 'Webchat':
        this.showPanel = false;
        localStorage.setItem('child', '')
        componentFactory =
          this.resolver.resolveComponentFactory(ChannelComponent);
        this.target?.createComponent(componentFactory);
        break;
      case 'WhatsApp':
        this.showPanel = false;
        localStorage.setItem('child', '')
        componentFactory = this.resolver.resolveComponentFactory(
          ChannelComponent
        );
        this.target?.createComponent(componentFactory);
        break;
      case 'LinkedIn':
        this.showPanel = false;
        localStorage.setItem('child', '')
        componentFactory = this.resolver.resolveComponentFactory(
          ChannelComponent
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
      case 'create-new':
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
      case 'keyboard-shortcuts':
        componentFactory = this.resolver.resolveComponentFactory(
          ResponderKeyboardShortcutsComponent
        );
        this.rightcontainer?.createComponent(componentFactory);
        break;
      case 'knowledge-base':
        componentFactory = this.resolver.resolveComponentFactory(
          ResponderKnowledgeBaseComponent
        );
        this.rightcontainer?.createComponent(componentFactory);
        break;
      case 'phone-dialer':
        componentFactory =
          this.resolver.resolveComponentFactory(WebPhoneComponent);
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
      case 'history':
        componentFactory = this.resolver.resolveComponentFactory(
          ResponderHistoryComponent
        );
        this.rightcontainer?.createComponent(componentFactory);
        break;
      case 'profile':
        componentFactory = this.resolver.resolveComponentFactory(
          ResponderProfileComponent
        );
        this.rightcontainer?.createComponent(componentFactory);
        break;
      case 'customer-profile':
        componentFactory = this.resolver.resolveComponentFactory(
          ResponderCustomerProfilingComponent
        );
        this.rightcontainer?.createComponent(componentFactory);
        break;
      case 'bot-interaction':
        componentFactory = this.resolver.resolveComponentFactory(
          ResponderBotInteractionComponent
        );
        this.rightcontainer?.createComponent(componentFactory);
        break;
      case 'disposition-form':
        componentFactory = this.resolver.resolveComponentFactory(
          DispositionFormComponent
        );
        this.target?.createComponent(componentFactory);
        break;

      default:
        componentFactory = this.resolver.resolveComponentFactory(
          ChannelComponent
        );
        this.target?.createComponent(componentFactory);
        break;
    }
  }
}
