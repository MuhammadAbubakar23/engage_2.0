import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignalRService } from './services/SignalRService/signal-r.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Enteract.Engage2.0';

  constructor(private signalRService: SignalRService,
    private router: Router) {
      debugger
    
  }

  ngOnInit() {
    debugger

    // if (this.signalRService.hubconnection == undefined) {
    //   debugger
    //   localStorage.clear();
    //   this.router.navigateByUrl('/login');
    // }
     this.signalRService.reConnect();

    this.signalRService.removeTagDataListener();
    this.signalRService.addTagDataListner();
    this.signalRService.unRespondedCountDataListener();
    this.signalRService.updateListDataListener();
    this.signalRService.replyDataListener();
    this.signalRService.queryStatusDataListener();
    this.signalRService.bulkQueryStatusDataListener();
  }
}