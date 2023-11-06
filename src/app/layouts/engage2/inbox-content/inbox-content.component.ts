import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
  ViewContainerRef,
  HostListener,
} from '@angular/core';
import {
  NavigationEnd,
  Router,
} from '@angular/router';
import { Subscription } from 'rxjs';
import { InboxesComponent } from 'src/app/modules/inboxes/inboxes.component';
import { BlacklistHeaderComponent } from 'src/app/shared/headers/blacklist-header/blacklist-header.component';
import { SentHeaderComponent } from 'src/app/shared/headers/sent-header/sent-header.component';
import { SpamHeaderComponent } from 'src/app/shared/headers/spam-header/spam-header.component';
import { StarredHeaderComponent } from 'src/app/shared/headers/starred-header/starred-header.component';
import { TrashHeaderComponent } from 'src/app/shared/headers/trash-header/trash-header.component';
import { ResponderHeaderComponent } from '../responder-content/responder-header/responder-header.component';
import { ResponderMenuComponent } from '../responder-content/responder-menu/responder-menu.component';
import { InboxHeaderComponent } from './inbox-header/inbox-header.component';
import { InboxMenuComponent } from './inbox-menu/inbox-menu.component';
import { ClosePanelService } from 'src/app/services/ClosePanelServices/close-panel.service';
import { AssignToMeHeaderComponent } from 'src/app/shared/headers/assign-to-me-header/assign-to-me-header.component';

@Component({
  selector: 'inbox-content',
  templateUrl: './inbox-content.component.html',
  styleUrls: ['./inbox-content.component.scss'],
  // providers: [ResponderGuardGuard]
})
export class     InboxContentComponent implements OnInit {
  @HostListener('window:beforeunload', ['$event'])
  handleBeforeUnload(event: Event) {
    event.preventDefault();
    event.returnValue = false;
  }

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

  public Subscription!: Subscription;

  flag: string = '';

  toggleLeftBar: boolean = false;
  showPanel: boolean = false;
  

  constructor(
    private resolver: ComponentFactoryResolver,
    private closePanelServices:ClosePanelService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const currentUrl = this.router.url;

    if (currentUrl.includes('responder')) {
      this.loadComponent('responder');
    } else {
      this.flag = this.router.url.split('/')[2];
      if (this.flag == 'focused' || this.flag == 'archived' || this.flag == 'assigned' || this.flag == 'assigned_to_me' || this.flag == 'follow_up') {
        this.loadComponent('all-inboxes');
      } else if (this.flag == 'starred') {
        this.loadComponent('starred');
      } else if (this.flag == 'spam') {
        this.loadComponent('spam');
      } else if (this.flag == 'sent') {
        this.loadComponent('sent');
      } else if (this.flag == 'black_list') {
        this.loadComponent('blacklist');
      } else if (this.flag == 'trash') {
        this.loadComponent('trash');
      } else if (this.flag == 'assigned_to_me') {
        this.loadComponent('assigned_to_me');
      } else if (this.flag == 'completed') {
        this.loadComponent('completed');
      }
    }

    this.router.events.subscribe((ev) => {
      
      if (ev instanceof NavigationEnd) {
        if (ev.url.includes('responder')) {
          this.loadComponent('responder');
        } else {
          this.flag = this.router.url.split('/')[2];
          if (this.flag == 'focused' || this.flag == 'archived' || this.flag == 'assigned' || this.flag == 'assigned_to_me' || this.flag == 'follow_up') {
            this.loadComponent('all-inboxes');
          } else if (this.flag == 'starred') {
            this.loadComponent('starred');
          } else if (this.flag == 'spam') {
            this.loadComponent('spam');
          } else if (this.flag == 'sent') {
            this.loadComponent('sent');
          } else if (this.flag == 'black_list') {
            this.loadComponent('blacklist');
          } else if (this.flag == 'trash') {
            this.loadComponent('trash');
          } else if (this.flag == 'assigned_to_me') {
            this.loadComponent('assigned_to_me');
          } else if (this.flag == 'completed') {
            this.loadComponent('completed');
          }
        }
      }
    });
    this.Subscription = this.closePanelServices.receiveLeftBarToggleValue().subscribe(res=>{
      this.toggleLeftBar = res;
    })
  }

  abc: any;
  ngAfterViewInit(): void {
    const currentUrl = this.router.url;

    if (currentUrl.includes('responder')) {
      this.loadComponent('responder');
    } else {
      this.flag = this.router.url.split('/')[2];
      if (this.flag == 'focused' || this.flag == 'archived' || this.flag == 'assigned' || this.flag == 'assigned_to_me' || this.flag == 'follow_up') {
        this.loadComponent('all-inboxes');
      } else if (this.flag == 'starred') {
        this.loadComponent('starred');
      } else if (this.flag == 'spam') {
        this.loadComponent('spam');
      } else if (this.flag == 'sent') {
        this.loadComponent('sent');
      } else if (this.flag == 'black_list') {
        this.loadComponent('blacklist');
      } else if (this.flag == 'trash') {
        this.loadComponent('trash');
      } else if (this.flag == 'assigned_to_me') {
        this.loadComponent('assigned_to_me');
      } else if (this.flag == 'completed') {
        this.loadComponent('completed');
      }
    }

    this.router.events.subscribe((ev) => {
      
      if (ev instanceof NavigationEnd) {
        if (ev.url.includes('responder')) {
          this.loadComponent('responder');
        } else {
          this.flag = this.router.url.split('/')[2];
          if (this.flag == 'focused' || this.flag == 'archived' || this.flag == 'assigned' || this.flag == 'assigned_to_me' || this.flag == 'follow_up') {
            this.loadComponent('all-inboxes');
          } else if (this.flag == 'starred') {
            this.loadComponent('starred');
          } else if (this.flag == 'spam') {
            this.loadComponent('spam');
          } else if (this.flag == 'sent') {
            this.loadComponent('sent');
          } else if (this.flag == 'black_list') {
            this.loadComponent('blacklist');
          } else if (this.flag == 'trash') {
            this.loadComponent('trash');
          } else if (this.flag == 'assigned_to_me') {
            this.loadComponent('assigned_to_me');
          } else if (this.flag == 'completed') {
            this.loadComponent('completed');
          }
        }
      }
    });
  }

  toggleSubLeftBar() {
    this.toggleLeftBar = !this.toggleLeftBar;
   
    if(this.toggleLeftBar == true){
      this.closePanelServices.sendRightBarToggleValue(false);
    }
  }
  toggleRightPanel() {
    this.showPanel = !this.showPanel;
  }

  loadComponent(name: string) {
    let submenu = null;
    let body = null;
    let header = null;
    this.submenu?.clear();
    this.body?.clear();
    this.header?.clear();
    switch (name) {
      case 'all-inboxes':
        submenu = this.resolver.resolveComponentFactory(InboxMenuComponent);
        this.submenu?.createComponent(submenu);

        // body = this.resolver.resolveComponentFactory(InboxesComponent);
        // this.body.createComponent(body);

        header = this.resolver.resolveComponentFactory(InboxHeaderComponent);
        this.header?.createComponent(header);
        break;
        case 'completed':
        submenu = this.resolver.resolveComponentFactory(InboxMenuComponent);
        this.submenu?.createComponent(submenu);
        break;

      case 'responder':
        submenu = this.resolver.resolveComponentFactory(ResponderMenuComponent);
        this.submenu?.createComponent(submenu);

        header = this.resolver.resolveComponentFactory(ResponderHeaderComponent);
        this.header?.createComponent(header);
        break;
      case 'starred':
        submenu = this.resolver.resolveComponentFactory(InboxMenuComponent);
        this.submenu?.createComponent(submenu);

        header = this.resolver.resolveComponentFactory(StarredHeaderComponent);
        this.header?.createComponent(header);
        break;

        case 'sent':
        submenu = this.resolver.resolveComponentFactory(InboxMenuComponent);
        this.submenu?.createComponent(submenu);

        header = this.resolver.resolveComponentFactory(SentHeaderComponent);
        this.header?.createComponent(header);
        break;
        case 'blacklist':
        submenu = this.resolver.resolveComponentFactory(InboxMenuComponent);
        this.submenu?.createComponent(submenu);

        header = this.resolver.resolveComponentFactory(BlacklistHeaderComponent);
        this.header?.createComponent(header);
        break;
        case 'spam':
        submenu = this.resolver.resolveComponentFactory(InboxMenuComponent);
        this.submenu?.createComponent(submenu);

        header = this.resolver.resolveComponentFactory(SpamHeaderComponent);
        this.header?.createComponent(header);
        break;
        case 'trash':
        submenu = this.resolver.resolveComponentFactory(InboxMenuComponent);
        this.submenu?.createComponent(submenu);

        header = this.resolver.resolveComponentFactory(TrashHeaderComponent);
        this.header?.createComponent(header);
        break;

        case 'assigned_to_me':
        // submenu = this.resolver.resolveComponentFactory(InboxMenuComponent);
        // this.submenu?.createComponent(submenu);

        header = this.resolver.resolveComponentFactory(AssignToMeHeaderComponent);
        this.header?.createComponent(header);
        break;

      default:
        submenu = this.resolver.resolveComponentFactory(InboxMenuComponent);
        this.submenu?.createComponent(submenu);

        body = this.resolver.resolveComponentFactory(InboxesComponent);
        this.body.createComponent(body);
        break;
    }
  }
}
