import { Component, Input } from '@angular/core';
import { TabsArr } from '../../shared/interfaces';

@Component({
  selector: 'app-ivr-input-content',
  templateUrl: './ivr-input-content.component.html',
  styleUrls: ['./ivr-input-content.component.scss']
})
export class IvrInputContentComponent {
  @Input() tabsArr:TabsArr = ({} as any) as TabsArr;

}
