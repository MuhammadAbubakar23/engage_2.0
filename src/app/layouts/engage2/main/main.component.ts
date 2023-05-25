import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { InboxesComponent } from 'src/app/modules/inboxes/inboxes.component';
import { ResponderComponent } from 'src/app/modules/responder/responder.component';
import { ModulesService } from 'src/app/shared/services/module-service/modules.service';
import { InboxHeaderComponent } from '../inbox-content/inbox-header/inbox-header.component';
import { InboxMenuComponent } from '../inbox-content/inbox-menu/inbox-menu.component';
import { ResponderHeaderComponent } from '../responder-content/responder-header/responder-header.component';
import { ResponderMenuComponent } from '../responder-content/responder-menu/responder-menu.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit {

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
  constructor(private loadModuleService : ModulesService,
    private resolver : ComponentFactoryResolver,
    private route : ActivatedRoute) { }

  ngOnInit(): void {

    // this.route.params.subscribe((routeParams)=>{
    //   
    //   if(routeParams['channel'] == "all-inboxes"){
    //     this.loadComponent("all-inboxes")
    //   }

    //   if(routeParams['channel'] == "responder"){
    //     this.loadComponent("responder")
    //   }
    // })
    
  }

  abc:any
  ngAfterViewInit(): void {
    
    // this.loadComponent("")

    
    this.route.params.subscribe((routeParams)=>{
      this.abc = this.route.routeConfig?.children;
      this.abc[0].path
      
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

    // this.Subscription = this.loadModuleService.getModule().subscribe((name:any)=>{
    //   
    //   this.loadComponent(name)
    // });
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

        body = this.resolver.resolveComponentFactory(InboxesComponent);
        this.body.createComponent(body);

        header = this.resolver.resolveComponentFactory(InboxHeaderComponent);
        this.header.createComponent(header);
        break;

        case 'responder':
          submenu =  this.resolver.resolveComponentFactory(ResponderMenuComponent);
          this.submenu.createComponent(submenu);
  
          body = this.resolver.resolveComponentFactory(ResponderComponent);
          this.body.createComponent(body);

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
