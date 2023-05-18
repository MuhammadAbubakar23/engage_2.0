import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { RightNavService } from 'src/app/services/RightNavService/RightNav.service';
import { SharedService } from 'src/app/services/SharedService/shared.service';
import { ToggleService } from 'src/app/services/ToggleService/Toggle.service';
import { WebPhoneComponent } from '../web-phone/web-phone.component';
import { ConversationComponent } from './components/conversation/conversation.component';
import { SlaComponent } from './components/SLA/sla.component';
import { ComplaintTicketPanelComponent } from './right-sidebar-components/complaint-ticket-panel/complaint-ticket-panel/complaint-ticket-panel.component';
import { ContactsComponent } from './right-sidebar-components/contacts/contacts.component';
import { CreateNewComponent } from './right-sidebar-components/create-new/create-new.component';
import { DocumentsComponent } from './right-sidebar-components/documents/documents.component';
import { EngaegmentsComponent } from './right-sidebar-components/engaegments/engaegments.component';
import { HelpComponent } from './right-sidebar-components/help/help.component';
import { KeyboardShortcutsComponent } from './right-sidebar-components/keyboard-shortcuts/keyboard-shortcuts.component';
import { KnowledgeBaseComponent } from './right-sidebar-components/knowledge-base/knowledge-base.component';
import { LivechatsComponent } from './right-sidebar-components/livechats/livechats.component';
import { PhoneDialerComponent } from './right-sidebar-components/phone-dialer/phone-dialer.component';
import { ScheduleComponent } from './right-sidebar-components/schedule/schedule.component';
import { TaskComponent } from './right-sidebar-components/task/task.component';
import { TicketsComponent } from './right-sidebar-components/tickets/tickets.component';

@Component({
  selector: 'app-inboxes',
  templateUrl: './inboxes.component.html',
  styleUrls: ['./inboxes.component.scss']
})
export class InboxesComponent implements OnInit {
  componentRef: any;
  @ViewChild('container', { read: ViewContainerRef,  }) target!: ViewContainerRef;
  @ViewChild('rightcontainer', { read: ViewContainerRef,}) rightcontainer!: ViewContainerRef;

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

    this.route.params.subscribe((routeParams) => {

      if(routeParams['channel'] != undefined && routeParams['channel'] != "undefined"){
        this.componentName = routeParams['channel'];
      }
      this.childComponentName = routeParams['ticket'];
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
      if ( this.childComponentName != '' && this.childComponentName != undefined) {
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
    this.target.clear();
    this.rightcontainer?.clear();

    this.loadComponent(this.componentName, '');
    if (this.childComponentName != null) {
      this.showPanel = true;
      this.loadComponent('', this.childComponentName);
    }
  }
  // createInboxComponent(side:any, msg:any, comp:any) {
  //   this.target.clear();
  //   this.rightcontainer.clear();
  //   const factory = this.resolver.resolveComponentFactory(comp);
  //   this.componentRef = (side == "Left")?this.target.createComponent(factory):this.rightcontainer.createComponent(factory);
  //   this.componentRef.instance.message = msg;
  // }
  // destroyInboxComponent() {
  //     this.componentRef.destroy();
  // }


  loadComponent(leftSideName: string, rightSideName: string) {
    // debugger
    let componentFactory = null;

    switch (leftSideName || rightSideName) {
      case 'conversation':
        componentFactory = this.resolver.resolveComponentFactory(ConversationComponent);
        this.target?.createComponent(componentFactory);
        break;
      case 'sla':
        componentFactory = this.resolver.resolveComponentFactory(SlaComponent);
        this.target?.createComponent(componentFactory);
        break;
      case 'ticket':

        componentFactory = this.resolver.resolveComponentFactory(TicketsComponent);
        this.rightcontainer?.createComponent(componentFactory);
        break;

      case 'contacts':
        componentFactory =
          this.resolver.resolveComponentFactory(ContactsComponent);
        this.rightcontainer?.createComponent(componentFactory);
        break;
      case 'chats':
        componentFactory =
          this.resolver.resolveComponentFactory(LivechatsComponent);
        this.rightcontainer?.createComponent(componentFactory);
        break;
      case 'create-new':
        componentFactory =
          this.resolver.resolveComponentFactory(CreateNewComponent);
        this.rightcontainer?.createComponent(componentFactory);
        break;

      case 'task':
        componentFactory = this.resolver.resolveComponentFactory(TaskComponent);
        this.rightcontainer?.createComponent(componentFactory);
        break;
      case 'engagements':
        componentFactory =
          this.resolver.resolveComponentFactory(EngaegmentsComponent);
        this.rightcontainer?.createComponent(componentFactory);
        break;
      case 'help':
        componentFactory = this.resolver.resolveComponentFactory(HelpComponent);
        this.rightcontainer?.createComponent(componentFactory);
        break;
      case 'keyboard-shortcuts':
        componentFactory = this.resolver.resolveComponentFactory(
          KeyboardShortcutsComponent
        );
        this.rightcontainer?.createComponent(componentFactory);
        break;
      case 'knowledge-base':
        componentFactory = this.resolver.resolveComponentFactory(
          KnowledgeBaseComponent
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
          this.resolver.resolveComponentFactory(DocumentsComponent);
        this.rightcontainer?.createComponent(componentFactory);
        break;
      case 'schedule':
        componentFactory =
          this.resolver.resolveComponentFactory(ScheduleComponent);
        this.rightcontainer?.createComponent(componentFactory);
        break;

      case 'complaint-ticket-panel':
        componentFactory = this.resolver.resolveComponentFactory(
          ComplaintTicketPanelComponent
        );
        this.rightcontainer?.createComponent(componentFactory);
        break;
      default:
        componentFactory = this.resolver.resolveComponentFactory(
          ConversationComponent
        );
        this.target?.createComponent(componentFactory);
        break;
    }
  }

}
