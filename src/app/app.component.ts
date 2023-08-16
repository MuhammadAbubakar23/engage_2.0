import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
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

toasters: Toaster[] = [];
  title = 'Enteract.Engage2.0';

  constructor(private signalRService: SignalRService,
    private router: Router,
    private commonService : CommonDataService,
    private toaster: ToasterService,
    private spinnerService : NgxSpinnerService) {


  }

  remove(index: number) {
    console.log(index);
    this.toasters = this.toasters.filter((v, i) => i !== index);
    //this.toasts.splice(index, 1);
  }
  ngOnInit() {
    debugger
    this.toaster.toaster$
      .subscribe(toaster => {
        if(toaster!==null){
          this.toasters = [toaster, ...this.toasters];
          setTimeout(() => this.toasters.pop(), toaster.delay || 6000);
        }

      });
    // if (this.signalRService.hubconnection == undefined) {
    //   this.spinnerService.show();
    //   this.commonService.SignOut().subscribe(()=>{
    //     localStorage.clear();
    //     this.router.navigateByUrl('/login');
    //     this.spinnerService.hide();
    //   },
    //   (error)=>{
    //     localStorage.clear();
    //     this.router.navigateByUrl('/login');
    //     this.spinnerService.hide();
    //   })
    // }
    this.signalRService.reConnect();

    this.signalRService.removeTagDataListener();
    this.signalRService.addTagDataListner();
    this.signalRService.unRespondedCountDataListener();
    this.signalRService.updateListAndDetailDataListener();
    this.signalRService.replyDataListener();
    this.signalRService.queryStatusDataListener();
    this.signalRService.bulkQueryStatusDataListener();
    this.signalRService.assignQueryResponseListner();
    this.signalRService.applySentimentListner();
  }
}
