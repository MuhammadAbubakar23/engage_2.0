import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Event, ActivatedRoute, ActivationEnd, ActivationStart, ChildActivationEnd, ChildActivationStart, GuardsCheckEnd, GuardsCheckStart, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, ResolveEnd, ResolveStart, RouteConfigLoadEnd, RouteConfigLoadStart, Router, RoutesRecognized, Scroll } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getEmargingNotEqual } from 'src/app/layouts/engage2/menu-state/menu.selectors';
import { MenuState } from 'src/app/layouts/engage2/menu-state/menu.state';
import { SharedService } from 'src/app/services/SharedService/shared.service';
// import { BusinessHoursComponent } from './components/business-hours/business-hours.component';
// import { CaseManagementComponent } from './components/case-management/case-management.component';
// import { ConsoleContactsComponent } from './components/contacts/contacts.component';
// import { CreateContactComponent } from './components/contacts/create-contact/create-contact.component';
// import { UserDetailsComponent } from './components/contacts/user-details/user-details.component';
// import { DocumentDetailsComponent } from './components/documents/document-details/document-details.component';
// import { ConsoleDocumentsComponent } from './components/documents/documents.component';
// import { EnteractRouteComponent } from './components/enteract-route/enteract-route.component';
// import { ConsoleHelpComponent } from './components/help/help.component';
// import { ConsoleKnowledgeBaseComponent } from './components/knowledge-base/knowledge-base.component';
// import { PostsComponent } from './components/knowledge-base/posts/posts.component';
// import { PreferencesComponent } from './components/preferences/preferences.component';
// import { AddRolesComponent } from './components/roles-and-permissions/add-roles/add-roles.component';
// import { RolesAndPermissionsComponent } from './components/roles-and-permissions/roles-and-permissions.component';
// import { RulesComponent } from './components/rules/rules.component';
// import { SkillsComponent } from './components/skills/skills.component';
// import { AddPolicyComponent } from './components/sla-policies/add-policy/add-policy.component';
// import { SlaPoliciesComponent } from './components/sla-policies/sla-policies.component';
// import { SupportChannelsComponent } from './components/support-channels/support-channels.component';
// import { CreateTagsComponent } from './components/tags/create-tags/create-tags.component';
// import { TagsComponent } from './components/tags/tags.component';
// import { CreateTeamComponent } from './components/teams/create-team/create-team.component';
// import { TeamsComponent } from './components/teams/teams.component';
// import { CreateMessageTemplatesComponent } from './components/templates/messages/create-message-templates/create-message-templates.component';
// import { MessagesComponent } from './components/templates/messages/messages.component';
// import { CreateSignatureTemplatesComponent } from './components/templates/signatures/create-signature-templates/create-signature-templates.component';
// import { SignaturesComponent } from './components/templates/signatures/signatures.component';
// import { TemplatesComponent } from './components/templates/templates.component';
// import { BulkUsersAddComponent } from './components/users/bulk-users-add/bulk-users-add.component';
// import { CreateUserComponent } from './components/users/create-user/create-user.component';
// import { UsersComponent } from './components/users/users.component';
// import { ConnectFormComponent } from './components/connect-form/connect-form.component';
// import { HomeComponent } from './components/home/home.component';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss']
})
export class ConsoleComponent implements OnInit {

  // @ViewChild('container', {
  //   read: ViewContainerRef,
  // })
  // target!: ViewContainerRef;
  // componentName!: any;
  // private resolver: ComponentFactoryResolver,
  menu$ :any;
  constructor(
    private store: Store<MenuState>,
    private router: Router, 
    private route: ActivatedRoute,
    private sharedService: SharedService
  ) {
    // console.clear();    
    // console.log(route);
    // console.log(router.url);

  // router.events.subscribe((event: Event) => {
  //   console.log(event)
  //     if (event instanceof NavigationStart) {
  //       // console.clear();
  //       // * NavigationStart: Navigation starts.
  //       console.log('NavigationStart --- ', event.url);
  //     }
  //     else if (event instanceof RouteConfigLoadStart) {
  //       // * RouteConfigLoadStart: Before the router lazy loads a route configuration.
  //       console.log('RouteConfigLoadStart --- ', event.toString());
  //     }
  //     else if (event instanceof RouteConfigLoadStart) {
  //       // * RouteConfigLoadStart: Before the router lazy loads a route configuration.
  //       console.log('RouteConfigLoadStart --- ', event.toString());
  //     }
  //     else if (event instanceof RouteConfigLoadEnd) {
  //       // * RouteConfigLoadEnd: After a route has been lazy loaded.
  //       console.log('RouteConfigLoadEnd --- ', event.toString());
  //     }
  //     else if (event instanceof RoutesRecognized) {
  //       // * RoutesRecognized: When the router parses the URL and the routes are recognized.
  //       console.log('RoutesRecognized --- ', event.url);
  //     }
  //     else if (event instanceof GuardsCheckStart) {
  //       // * GuardsCheckStart: When the router begins the guards phase of routing.
  //       console.log('GuardsCheckStart --- ', event.url);
  //     }
  //     else if (event instanceof ChildActivationStart) {
  //       // * ChildActivationStart: When the router begins activating a route's children.
  //       console.log('ChildActivationStart --- ', event.toString());
  //     }
  //     else if (event instanceof ActivationStart) {
  //       // * ActivationStart: When the router begins activating a route.
  //       console.log('ActivationStart --- ', event.toString());
  //     }
  //     else if (event instanceof GuardsCheckEnd) {
  //       // * GuardsCheckEnd: When the router finishes the guards phase of routing successfully.
  //       console.log('GuardsCheckEnd --- ', event.url);
  //     }
  //     else if (event instanceof ResolveStart) {
  //       // * ResolveStart: When the router begins the resolve phase of routing.
  //       console.log('ResolveStart --- ', event.url);
  //     }
  //     else if (event instanceof ResolveEnd) {
  //       // * ResolveEnd: When the router finishes the resolve phase of routing successfully.
  //       console.log('ResolveEnd --- ', event.url);
  //     }
  //     else if (event instanceof ChildActivationEnd) {
  //       // * ChildActivationEnd: When the router finishes activating a route's children.
  //       console.log('ChildActivationEnd --- ', event.toString());
  //     }
  //     else if (event instanceof ActivationEnd) {
  //       // * ActivationEnd: When the router finishes activating a route.
  //       console.log('ActivationEnd --- ', event.toString());
  //     }
  //     else if (event instanceof NavigationEnd) {
  //       // * NavigationEnd: When navigation ends successfully.
  //       console.log('NavigationEnd --- ', event.url);
  //     }
  //     else if (event instanceof NavigationCancel) {
  //       // * NavigationCancel: When navigation is canceled.
  //       console.log('NavigationCancel --- ', event.url);
  //     }
  //     else if (event instanceof NavigationError) {
  //       // * NavigationError: When navigation fails due to an unexpected error.
  //       console.log('NavigationError --- ', event.error);
  //     }
  //     else if (event instanceof Scroll) {
  //       // * Scroll: When the user scrolls.
  //       console.log('Scroll --- ', event.position);
  //     }
  //   });
  
  }

  ngOnInit(): void {
    if(this.router.url === '/console'){
      this.menu$ = this.store.select(getEmargingNotEqual("role_left_menu")).subscribe((item:any) => {
        let newLink = this.router.url+'/'+item[0]?.link;
        this.router.navigate([newLink]);
      });
    }
    // this.route.params.subscribe((routeParams) => {
    //   if(routeParams['channel'] != undefined && routeParams['channel'] != "undefined"){
    //     this.componentName = routeParams['channel'];
    //   } 
    //   if(this.componentName != undefined){
    //     localStorage.setItem('parent', this.componentName);
    //   }
    //   this.sharedService.updateMessage(this.componentName);
    //   this.target.clear();
    //   this.loadComponent(this.componentName);
    // });
  }
  onChange() {}

  ngAfterViewInit() {
    //this.target.clear();
    //this.loadComponent(this.componentName);   
  }

  loadComponent(leftSideName: string) {
    
    let componentFactory = null;

    // switch (leftSideName) {
    //   case 'home':
    //     componentFactory = this.resolver.resolveComponentFactory(HomeComponent);
    //     this.target.createComponent(componentFactory);
    //     break;
    //   case 'channels':
    //     componentFactory = this.resolver.resolveComponentFactory(
    //       SupportChannelsComponent
    //     );
    //     this.target.createComponent(componentFactory);
    //     break;
    //   case 'users':
    //     componentFactory =
    //       this.resolver.resolveComponentFactory(UsersComponent);
    //     this.target.createComponent(componentFactory);
    //     break;
    //   case 'users:bulk-user-upload':
    //     componentFactory = this.resolver.resolveComponentFactory(
    //       BulkUsersAddComponent
    //     );
    //     this.target.createComponent(componentFactory);
    //     break;
    //   case 'users:create-user':
    //     componentFactory =
    //       this.resolver.resolveComponentFactory(CreateUserComponent);
    //     this.target.createComponent(componentFactory);
    //     break;
    //   case 'teams':
    //     componentFactory =
    //       this.resolver.resolveComponentFactory(TeamsComponent);
    //     this.target.createComponent(componentFactory);
    //     break;

    //   case 'teams:create-team':
    //     componentFactory =
    //       this.resolver.resolveComponentFactory(CreateTeamComponent);
    //     this.target.createComponent(componentFactory);
    //     break;
    //   case 'rules':
    //     componentFactory =
    //       this.resolver.resolveComponentFactory(RulesComponent);
    //     this.target.createComponent(componentFactory);
    //     break;
    //   case 'enteractRoute':
    //     componentFactory = this.resolver.resolveComponentFactory(
    //       EnteractRouteComponent
    //     );
    //     this.target.createComponent(componentFactory);
    //     break;
    //   case 'templates':
    //     componentFactory =
    //       this.resolver.resolveComponentFactory(TemplatesComponent);
    //     this.target.createComponent(componentFactory);
    //     break;

    //   case 'messages-template':
    //     componentFactory =
    //       this.resolver.resolveComponentFactory(MessagesComponent);
    //     this.target.createComponent(componentFactory);
    //     break;
    //   case 'messages-template:create-message-templates':
    //     componentFactory = this.resolver.resolveComponentFactory(
    //       CreateMessageTemplatesComponent
    //     );
    //     this.target.createComponent(componentFactory);
    //     break;

    //   case 'signatures-template':
    //     componentFactory =
    //       this.resolver.resolveComponentFactory(SignaturesComponent);
    //     this.target.createComponent(componentFactory);
    //     break;
    //   case 'signatures-template:create-signature-templates':
    //     componentFactory = this.resolver.resolveComponentFactory(
    //       CreateSignatureTemplatesComponent
    //     );
    //     this.target.createComponent(componentFactory);
    //     break;
    //   case 'businessHours':
    //     componentFactory = this.resolver.resolveComponentFactory(
    //       BusinessHoursComponent
    //     );
    //     this.target.createComponent(componentFactory);
    //     break;
    //   case 'tags':
    //     componentFactory = this.resolver.resolveComponentFactory(TagsComponent);
    //     this.target.createComponent(componentFactory);
    //     break;
    //   case 'tags:create-tags':
    //     componentFactory =
    //       this.resolver.resolveComponentFactory(CreateTagsComponent);
    //     this.target.createComponent(componentFactory);
    //     break;
    //   case 'rolesAndPermissions':
    //     componentFactory = this.resolver.resolveComponentFactory(
    //       RolesAndPermissionsComponent
    //     );
    //     this.target.createComponent(componentFactory);
    //     break;

    //   case 'rolesAndPermissions:add-roles':
    //     componentFactory =
    //       this.resolver.resolveComponentFactory(AddRolesComponent);
    //     this.target.createComponent(componentFactory);
    //     break;
    //   case 'skills':
    //     componentFactory =
    //       this.resolver.resolveComponentFactory(SkillsComponent);
    //     this.target.createComponent(componentFactory);
    //     break;

    //   case 'slaPolicies':
    //     componentFactory =
    //       this.resolver.resolveComponentFactory(SlaPoliciesComponent);
    //     this.target.createComponent(componentFactory);
    //     break;
    //   case 'slaPolicies:add-policy':
    //     componentFactory =
    //       this.resolver.resolveComponentFactory(AddPolicyComponent);
    //     this.target.createComponent(componentFactory);
    //     break;
    //   case 'console-contacts':
    //     componentFactory = this.resolver.resolveComponentFactory(
    //       ConsoleContactsComponent
    //     );
    //     this.target.createComponent(componentFactory);
    //     break;
    //   case 'console-contacts:create-contact':
    //     componentFactory = this.resolver.resolveComponentFactory(
    //       CreateContactComponent
    //     );
    //     this.target.createComponent(componentFactory);
    //     break;
    //   case 'console-contacts:user-details':
    //     componentFactory =
    //       this.resolver.resolveComponentFactory(UserDetailsComponent);
    //     this.target.createComponent(componentFactory);
    //     break;
    //   case 'caseManagement':
    //     componentFactory = this.resolver.resolveComponentFactory(
    //       CaseManagementComponent
    //     );
    //     this.target.createComponent(componentFactory);
    //     break;
    //   case 'console-documents':
    //     componentFactory = this.resolver.resolveComponentFactory(
    //       ConsoleDocumentsComponent
    //     );
    //     this.target.createComponent(componentFactory);
    //     break;

    //   case 'console-documents:document-details':
    //     componentFactory = this.resolver.resolveComponentFactory(
    //       DocumentDetailsComponent
    //     );
    //     this.target.createComponent(componentFactory);
    //     break;
    //   case 'console-knowledgeBase':
    //     componentFactory = this.resolver.resolveComponentFactory(
    //       ConsoleKnowledgeBaseComponent
    //     );
    //     this.target.createComponent(componentFactory);
    //     break;
    //   case 'console-knowledgeBase:posts':
    //     componentFactory =
    //       this.resolver.resolveComponentFactory(PostsComponent);
    //     this.target.createComponent(componentFactory);
    //     break;
    //   case 'preferences':
    //     componentFactory =
    //       this.resolver.resolveComponentFactory(PreferencesComponent);
    //     this.target.createComponent(componentFactory);
    //     break;
    //   case 'console-help':
    //     componentFactory =
    //       this.resolver.resolveComponentFactory(ConsoleHelpComponent);
    //     this.target.createComponent(componentFactory);
    //     break;
   
    //   case 'connect-form':
    //     componentFactory =
    //       this.resolver.resolveComponentFactory(ConnectFormComponent);
    //     this.target.createComponent(componentFactory);
    //     break;
      
    //   default:
    //     componentFactory = null;
    //     break;
    // }
  }

}
