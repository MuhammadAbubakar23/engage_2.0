import { Component, Input } from '@angular/core';
import { TabsArr } from '../../shared/interfaces';

@Component({
  selector: 'app-settings-content',
  templateUrl: './settings-content.component.html',
  styleUrls: ['./settings-content.component.scss']
})
export class SettingsContentComponent {
  @Input() tabsArr:TabsArr = ({} as any) as TabsArr;

}
