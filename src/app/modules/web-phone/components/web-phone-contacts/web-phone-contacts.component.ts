import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DialCallService } from '../../services/DialCallService/dial-call.service';
import { OpenDialerService } from '../../services/OpenDialerComponentService/open-dialer.service';
import { SharedService } from '../../services/SharedService/shared.service';
import { WebPhoneDialerComponent } from '../web-phone-dialer/web-phone-dialer.component';

@Component({
  selector: 'app-web-phone-contacts',
  templateUrl: './web-phone-contacts.component.html',
  styleUrls: ['./web-phone-contacts.component.scss']
})
export class WebPhoneContactsComponent implements OnInit {

  constructor(private sharedService : SharedService,
    private openDialerService : OpenDialerService,
    private dialCallService : DialCallService,
    private DialerComponentService : WebPhoneDialerComponent) { }

  ngOnInit(): void {
  }

  public call(number:any) : void{
    debugger
    this.openDialerService.updateComponenetName('dialer');
    this.dialCallService.updateNumber(number)
  }
}
