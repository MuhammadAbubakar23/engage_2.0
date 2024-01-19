import { Component, Input, OnInit } from '@angular/core';
import { PhoneDialerService } from '../../services/DialerService/phone-dialer.service';
import { TabsArr } from '../../shared/interfaces';

@Component({
  selector: 'app-logs-content',
  templateUrl: './logs-content.component.html',
  styleUrls: ['./logs-content.component.scss']
})
export class LogsContentComponent implements OnInit {
  @Input() tabsArr: TabsArr = ({} as any) as TabsArr;

  logs: string = '';
  constructor(private dialerService: PhoneDialerService) {

  }
  ngOnInit() {
    this.dialerService.getPhoneLogs().subscribe((res:any) => {
      this.logs += res +"\n";
    });
  }
}
