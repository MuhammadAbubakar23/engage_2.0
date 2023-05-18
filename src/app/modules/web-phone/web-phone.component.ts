import { PhoneDialerService } from './services/DialerService/phone-dialer.service';
import { SharedService } from './services/SharedService/shared.service';
import { Component, OnInit, ElementRef, ViewChild, ViewContainerRef, ComponentFactoryResolver, AfterViewInit } from '@angular/core';
import { Config } from './phone/Config';
import { PhoneTypes } from './phone/PhoneTypes';
import { Logger } from './phone/Logger';
import { AgentFactory } from './phone/AgentFactory';
import { FacebookComponent } from '../responder/components/Facebook/facebook.component';
import { WebPhoneContactsComponent } from './components/web-phone-contacts/web-phone-contacts.component';
import { WebPhoneDialerComponent } from './components/web-phone-dialer/web-phone-dialer.component';
import { WebPhoneCallListComponent } from './components/web-phone-call-list/web-phone-call-list.component';
import { Subscription } from 'rxjs';
import { OpenDialerService } from './services/OpenDialerComponentService/open-dialer.service';
@Component({
  selector: 'app-web-phone',
  templateUrl: './web-phone.component.html',
  styleUrls: ['./web-phone.component.scss'],
})
export class WebPhoneComponent implements OnInit, AfterViewInit {
  inboundCall: boolean = false;
  OBCallConnected: boolean = false;
  showManualTransferButtons: boolean = false;
  inManualCall: boolean = false;
  transferringCall: boolean = false;

  public subscription!: Subscription;
  
  constructor(
    private resolver: ComponentFactoryResolver,
    private openDialerService : OpenDialerService
  ) {}
  ngAfterViewInit() {
    this.loadComponent("")
    this.subscription = this.openDialerService.getComponentName().subscribe(name=>{
      debugger
        this.loadComponent(name)
    });
  }
  ngOnInit(): void {
  }
  
  show: any = false;
  click(val: any) {
    if (val == true) {
      this.show = false;
    }
    if (val == false) {
      this.show = true;
    }
  }

  @ViewChild('container', {
    read: ViewContainerRef,
  })
  target!: ViewContainerRef;
  
  loadComponent(componentName: string) {
    debugger
    let componentFactory = null;
    this.target?.clear();
    switch (componentName) {
      case 'dialer':
        // this.showPanel = false;
        // localStorage.setItem('child', '');
        componentFactory =
          this.resolver.resolveComponentFactory(WebPhoneDialerComponent);
        this.target?.createComponent(componentFactory);
        break;
        case 'contacts':
        // this.showPanel = false;
        // localStorage.setItem('child', '');
        componentFactory =
          this.resolver.resolveComponentFactory(WebPhoneContactsComponent);
        this.target?.createComponent(componentFactory);
        break;
        case 'callList':
        // this.showPanel = false;
        // localStorage.setItem('child', '');
        componentFactory =
          this.resolver.resolveComponentFactory(WebPhoneCallListComponent);
        this.target?.createComponent(componentFactory);
        break;
      default:
        componentFactory =
          this.resolver.resolveComponentFactory(WebPhoneDialerComponent);
        this.target?.createComponent(componentFactory);
        break;
    }
  }
}
