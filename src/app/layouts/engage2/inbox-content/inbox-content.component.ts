import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { InboxResponderComponent } from 'src/app/modules/inboxes/components/inbox-responder/inbox-responder.component';
import { InboxesComponent } from 'src/app/modules/inboxes/inboxes.component';
import { ModulesService } from 'src/app/shared/services/module-service/modules.service';
import { ResponderHeaderComponent } from '../responder-content/responder-header/responder-header.component';
import { ResponderMenuComponent } from '../responder-content/responder-menu/responder-menu.component';
import { InboxHeaderComponent } from './inbox-header/inbox-header.component';
import { InboxMenuComponent } from './inbox-menu/inbox-menu.component';

@Component({
  selector: 'inbox-content',
  templateUrl: './inbox-content.component.html',
  styleUrls: ['./inbox-content.component.scss']
})
export class InboxContentComponent implements OnInit {
  @ViewChild('submenu', {
    read: ViewContainerRef,
  })
  submenu!: ViewContainerRef;

  @ViewChild('body', {
    read: ViewContainerRef,
  })
  body!: ViewContainerRef;

  @ViewChild('header', {
    read: ViewContainerRef,
  })
  header!: ViewContainerRef;

  public Subscription !: Subscription;

  toggleLeftBar:boolean = true;
  showPanel:boolean = false;
  constructor(private resolver : ComponentFactoryResolver,
    private route : ActivatedRoute,
    private loadModuleService : ModulesService) { }

  ngOnInit(): void {

    
  }

  abc:any
  ngAfterViewInit(): void {
    
    this.loadComponent("all-inboxes")

    
    this.route.params.subscribe((routeParams)=>{
      
      if(this.abc[0].path == "all-inboxes"){
        this.loadComponent("all-inboxes")
      }
      if(routeParams['channel'] == "all-inboxes" && routeParams['abc'] == "list" ){
        this.loadComponent("all-inboxes")
      }

      if(this.abc[1].path == "responder"){
        this.loadComponent("responder")
      }
    })

    this.Subscription = this.loadModuleService.getModule().subscribe((name:any)=>{
      
      this.loadComponent(name)
    });
  }
  
  toggleSubLeftBar(){
    this.toggleLeftBar = !this.toggleLeftBar;
  }
  toggleRightPanel() {
   this.showPanel = !this.showPanel;
  }

  loadComponent(name : string){

    let submenu = null;
    let body = null;
    let header = null;
    this.submenu?.clear();
    this.body?.clear();
    this.header?.clear();
    switch (name) {
      case 'all-inboxes':
        submenu =  this.resolver.resolveComponentFactory(InboxMenuComponent);
        this.submenu.createComponent(submenu);

        // body = this.resolver.resolveComponentFactory(InboxesComponent);
        // this.body.createComponent(body);

        header = this.resolver.resolveComponentFactory(InboxHeaderComponent);
        this.header.createComponent(header);
        break;

        case 'responder':
          submenu =  this.resolver.resolveComponentFactory(ResponderMenuComponent);
          this.submenu.createComponent(submenu);
  
          // body = this.resolver.resolveComponentFactory(InboxResponderComponent);
          // this.body.createComponent(body);

          header = this.resolver.resolveComponentFactory(ResponderHeaderComponent);
        this.header.createComponent(header);
          break;
    
      default:
        submenu =  this.resolver.resolveComponentFactory(InboxMenuComponent);
        this.submenu.createComponent(submenu);

        body = this.resolver.resolveComponentFactory(InboxesComponent);
        this.body.createComponent(body)
        break;
    }
  }
}
