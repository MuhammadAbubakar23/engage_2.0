import { Component, Input } from '@angular/core';
import { TabsArr } from '../../shared/interfaces';
@Component({
  selector: 'app-outbound-content',
  templateUrl: './outbound-content.component.html',
  styleUrls: ['./outbound-content.component.scss']
})
export class OutboundContentComponent {
  @Input() tabsArr:TabsArr = ({} as any) as TabsArr;
}
