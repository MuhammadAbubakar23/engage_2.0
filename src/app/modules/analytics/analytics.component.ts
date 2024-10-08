import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { RightNavService } from 'src/app/services/RightNavService/RightNav.service';
import { SharedService } from 'src/app/services/SharedService/shared.service';
import { ToggleService } from 'src/app/services/ToggleService/Toggle.service';
import { ConversationComponent } from '../inboxes/components/conversation/conversation.component';
import { ActionsComponent } from './components/actions/actions.component'
import { AnalyticsDashboardComponent } from './components/analytics-dashboard/analytics-dashboard.component';
import { LiveMonitoringComponent } from './components/live-monitoring/live-monitoring.component';
import { ReportDbSettingsComponent } from './components/report-db-settings/report-db-settings.component';
import { ReportlistingComponent } from './components/reportlisting/reportlisting.component';
import { DblistingComponent } from './components/dblisting/dblisting.component';
@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
  // componentRef: any;
  // @ViewChild('container',
  //   { read: ViewContainerRef, })
  // target!: ViewContainerRef;
  // @ViewChild('rightcontainer', { read: ViewContainerRef, }) rightcontainer!: ViewContainerRef;
  // componentName!: any;
  // childComponentName!: any;
  // public subscription!: Subscription;
  // panelToggled: any;
  // showPanel = false;
  constructor(
    // private resolver: ComponentFactoryResolver,
    // private route: ActivatedRoute,
    // private sharedService: SharedService,
    // private rightNavService: RightNavService,
    // private toggleService: ToggleService
  ) { }
  ngOnInit(): void {
    // this.route.params.subscribe((routeParams) => {
    //   if (routeParams['channel'] != undefined && routeParams['channel'] != "undefined") {
    //     this.componentName = routeParams['channel'];
    //   }
    //   this.childComponentName = routeParams['ticket'];
    //   this.rightNavService.updateChildComponent(this.childComponentName);
    //   sessionStorage.setItem('child', this.childComponentName);
    //   if (this.childComponentName != null) {
    //     this.childComponentName = sessionStorage.getItem('child');
    //   }
    //   if (this.componentName != undefined) {
    //     sessionStorage.setItem('parent', this.componentName);
    //   }
    //   this.sharedService.updateMessage(this.componentName);
    //   this.target?.clear();
    //   this.rightcontainer?.clear();
    //   this.loadComponent(this.componentName, '');
    //   if (this.childComponentName != '' && this.childComponentName != undefined) {
    //     this.showPanel = true
    //     this.loadComponent('', this.childComponentName);
    //   }
    // });
    // this.subscription = this.toggleService.getTogglePanel().subscribe(msg3 => {
    //   if (msg3) {
    //     this.rightcontainer?.clear();
    //     sessionStorage.setItem('child', msg3)
    //     this.showPanel = true
    //     this.loadComponent('', msg3)
    //   }
    //   else {
    //     this.showPanel = false;
    //     this.rightcontainer?.clear();
    //     sessionStorage.setItem('child', '')
    //   }
    // });
  }
  ngAfterViewInit() {
    // this.target.clear();
    // this.rightcontainer?.clear();
    // this.loadComponent(this.componentName, '');
    // if (this.childComponentName != null) {
    //   this.showPanel = true;
    //   this.loadComponent('', this.childComponentName);
    // }
  }
  // loadComponent(leftSideName: string, rightSideName: string) {
  //   let componentFactory = null;
  //   switch (leftSideName || rightSideName) {
  //     case 'executive-dashboard':
  //       componentFactory = this.resolver.resolveComponentFactory(ExecutiveDashboardComponent);
  //       this.target?.createComponent(componentFactory);
  //       break;
  //     case 'live-monitoring':
  //       componentFactory = this.resolver.resolveComponentFactory(LiveMonitoringComponent);
  //       this.target?.createComponent(componentFactory);
  //       break;
  //     case 'dashboard':
  //       componentFactory = this.resolver.resolveComponentFactory(AnalyticsDashboardComponent);
  //       this.target?.createComponent(componentFactory);
  //       break;
  //     case 'report-builder':
  //       componentFactory = this.resolver.resolveComponentFactory(ReportBuilderComponent);
  //       this.target?.createComponent(componentFactory);
  //       break;
  //     case 'db-settings':
  //       componentFactory = this.resolver.resolveComponentFactory(DblistingComponent);
  //       this.target?.createComponent(componentFactory);
  //       break;
  //     case 'db-settings/create':
  //       componentFactory = this.resolver.resolveComponentFactory(ReportDbSettingsComponent);
  //       this.target?.createComponent(componentFactory);
  //       break;
  //     case 'contacts':
  //       componentFactory =
  //         this.resolver.resolveComponentFactory(ActionsComponent);
  //       this.rightcontainer?.createComponent(componentFactory);
  //       break;
  //     case 'reports':
  //       componentFactory =
  //         this.resolver.resolveComponentFactory(ReportlistingComponent);
  //       this.target?.createComponent(componentFactory);
  //       break;
  //     default:
  //       componentFactory = this.resolver.resolveComponentFactory(ExecutiveDashboardComponent);
  //       this.target?.createComponent(componentFactory);
  //       break;
  //   }
  // }
}
