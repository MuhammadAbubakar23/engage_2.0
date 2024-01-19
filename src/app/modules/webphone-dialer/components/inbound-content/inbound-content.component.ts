import { Component, Input } from '@angular/core';
import { TabsArr } from '../../shared/interfaces';

@Component({
  selector: 'app-inbound-content',
  templateUrl: './inbound-content.component.html',
  styleUrls: ['./inbound-content.component.scss']
})
export class InboundContentComponent {
  @Input() tabsArr:TabsArr = ({} as any) as TabsArr;
}
