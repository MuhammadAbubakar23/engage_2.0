import { Component, ComponentFactoryResolver, EventEmitter, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { EmailComponent } from './components/email/email.component';
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
import { ResponderHistoryComponent } from './right-sidebar-components/responder-history/responder-history.component';
import { ResponderProfileComponent } from './right-sidebar-components/responder-profile/responder-profile.component';
import { DispositionFormComponent } from './components/disposition-form/disposition-form.component';
import { WebPhoneComponent } from '../web-phone/web-phone.component';
import { ChannelComponent } from './components/responderChannelData/channel.component';
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
  @Output() someEvent = new EventEmitter<string>();
  componentName!: any;
  oldComponent:any;
  childComponentName!: any;
  public subscription!: Subscription;
  panelToggled: any;
  showPanel=false;
  assignedProfile = sessionStorage.getItem('assignedProfile')
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
        this.componentName = (routeParams['channel']);
      } 
      this.childComponentName = routeParams['ticket'];
      let ffff = this.componentName + this.childComponentName;
      this.rightNavService.updateChildComponent(this.childComponentName);
      sessionStorage.setItem('child', this.childComponentName);
      if (this.childComponentName != null) {
        this.childComponentName = sessionStorage.getItem('child');
      }
      if(this.componentName != undefined){
        sessionStorage.setItem('parent', this.componentName);
      }
      this.sharedService.updateMessage(this.componentName);
      this.target?.clear();
      this.rightcontainer?.clear();
      if(this.oldComponent!=undefined){
        if(sessionStorage.getItem('parent')!=undefined && sessionStorage.getItem('parent')!=this.oldComponent){
          this.loadComponent(this.componentName, '');
          this.oldComponent=this.componentName;
        }
      }
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
        sessionStorage.setItem('child', msg3)
        this.showPanel = true
        this.loadComponent('',msg3)
      }
      else {
        this.showPanel = false;
        this.rightcontainer?.clear();
        sessionStorage.setItem('child', '')
      }
      // this.subscription = this.toggleService.getDispositionForm().subscribe(value=>{
      //   if(value){
      //     this.target?.clear();
      //     this.loadComponent(value,'')
      //   }
      // })
    });
  }
  ngAfterViewInit() {
    this.target?.clear();
    this.rightcontainer?.clear();
    this.oldComponent=this.componentName;
    this.loadComponent(this.componentName, '');
    if (this.childComponentName != null) {
      this.showPanel = true;
      this.loadComponent('', this.childComponentName);
    }
    this.subscription = this.toggleService.getDispositionForm().subscribe(value=>{
      if(value == 'disposition-form'){
        this.target?.clear();
        this.loadComponent(value,'')
      } 
      var parent = sessionStorage.getItem('parent') || '{}'
      if(value == 'close-disposition-form'){
        this.target?.clear();
        this.loadComponent(parent,'')
      }
    })
  }
  loadComponent(leftSideName: string, rightSideName: string) {
    let componentFactory = null;
    switch (leftSideName || rightSideName) {
      case 'Facebook':
        this.showPanel = false;
        sessionStorage.setItem('child', '')
        componentFactory =
          this.resolver.resolveComponentFactory(ChannelComponent);
           this.target?.createComponent(componentFactory);
          // componentRef.instance.someEvent.subscribe((data:any)=>{
          // })
        break;
      case 'Instagram':
        this.showPanel = false;
        sessionStorage.setItem('child', '')
        componentFactory =
          this.resolver.resolveComponentFactory(ChannelComponent);
        this.target?.createComponent(componentFactory);
        break;
        case 'PlayStore':
        this.showPanel = false;
        sessionStorage.setItem('child', '')
        componentFactory =
          this.resolver.resolveComponentFactory(ChannelComponent);
        this.target?.createComponent(componentFactory);
        break;
      case 'Twitter':
        this.showPanel = false;
        sessionStorage.setItem('child', '')
        componentFactory =
          this.resolver.resolveComponentFactory(ChannelComponent);
        this.target?.createComponent(componentFactory);
        break;
      case 'Email':
        this.showPanel = false;
        sessionStorage.setItem('child', '')
        componentFactory =
          this.resolver.resolveComponentFactory(EmailComponent);
        this.target?.createComponent(componentFactory);
        break;
      case 'Youtube':
        this.showPanel = false;
        sessionStorage.setItem('child', '')
        componentFactory =
          this.resolver.resolveComponentFactory(ChannelComponent);
        this.target?.createComponent(componentFactory);
        break;
      case 'Phone':
        this.showPanel = false;
        sessionStorage.setItem('child', '')
        componentFactory =
          this.resolver.resolveComponentFactory(ChannelComponent);
        this.target?.createComponent(componentFactory);
        break;
      case 'SMS':
        this.showPanel = false;
        sessionStorage.setItem('child', '')
        componentFactory =
          this.resolver.resolveComponentFactory(ChannelComponent);
        this.target?.createComponent(componentFactory);
        break;
      case 'Webchat':
        this.showPanel = false;
        sessionStorage.setItem('child', '')
        componentFactory =
          this.resolver.resolveComponentFactory(ChannelComponent);
        this.target?.createComponent(componentFactory);
        break;
      case 'WhatsApp':
        this.showPanel = false;
        sessionStorage.setItem('child', '')
        componentFactory = this.resolver.resolveComponentFactory(
          ChannelComponent
        );
        this.target?.createComponent(componentFactory);
        break;
      case 'LinkedIn':
        this.showPanel = false;
        sessionStorage.setItem('child', '')
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
