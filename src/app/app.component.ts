import { ChangeDetectorRef, Component, HostListener,  } from '@angular/core';
import { Router,NavigationStart  } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Toaster } from './layouts/engage2/toaster/toaster';
import { ToasterService } from './layouts/engage2/toaster/toaster.service';
import { SignalRService } from './services/SignalRService/signal-r.service';
import { CommonDataService } from './shared/services/common/common-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  
  // @HostListener('window:beforeunload', ['$event'])
  // beforeUnloadHandler(event: Event) {
  //   debugger
  //   // Check if the navigation is internal (within the Angular app)
  //   if (!this.isInternalNavigation()) {
  //     // Clear local storage here
  //     localStorage.clear();
  //     // localStorage.removeItem('token')
  //   }
  // }

  // private isInternalNavigation(): boolean {
    
  //   // Check if the navigation is within the Angular app
  //   return this.router.navigated && this.router.url.startsWith('/');
  // }
  toasters: Toaster[] = [];
  title = 'Enteract.Engage2.0';
  activeChannel: any;
  routeString:string='/login'
  constructor(
    private signalRService: SignalRService,
    private router: Router,
    private commonService: CommonDataService,
    private toaster: ToasterService,
    private spinnerService: NgxSpinnerService,
  private cdr:ChangeDetectorRef
  ) {}

  remove(index: number) {
    console.log(index);
    this.toasters = this.toasters.filter((v, i) => i !== index);
    //this.toasts.splice(index, 1);
  }
  ngOnInit() {


    this.activeChannel = window.location.origin;

    this.toaster.toaster$.subscribe((toaster) => {
      if (toaster !== null) {
        this.toasters = [toaster, ...this.toasters];
        setTimeout(() => this.toasters.pop(), toaster.delay || 6000);
      }
    });

    if (this.activeChannel == 'http://localhost:4200' || this.activeChannel == 'https://localhost:4200') {
      this.B_Block();
    } else {
      this.A_Block();
    }

  }
  // ngOnDestroy(): void {
  //   
  //   // Clear localStorage when the component is destroyed
  //   localStorage.clear();
  // }
  A_Block() {
    if (localStorage.getItem('signalRConnectionId')) {
      if (this.signalRService.hubconnection == undefined) {
        this.spinnerService.show();
        this.commonService.SignOut().subscribe(
          () => {
            localStorage.clear();
            this.router.navigateByUrl('/login');
            this.spinnerService.hide();
          },
          (error) => {
            localStorage.clear();
            this.router.navigateByUrl('/login');
            this.spinnerService.hide();
          }
        );
      }
    }
  }
  B_Block() {
    this.signalRService.reConnect();

    this.signalRService.removeTagDataListener();
    this.signalRService.addTagDataListener();
    this.signalRService.unRespondedCountDataListener();
    this.signalRService.updateListAndDetailDataListener();
    this.signalRService.replyDataListener();
    this.signalRService.queryStatusDataListener();
    this.signalRService.bulkQueryStatusDataListener();
    this.signalRService.assignQueryResponseListner();
    this.signalRService.applySentimentListner();
    this.signalRService.updateMessageStatusDataListener();
    // for new post
    // this.signalRService.updatePostList()
  }

}
