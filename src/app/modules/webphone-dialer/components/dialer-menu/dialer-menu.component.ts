import { Component, EventEmitter, Output } from '@angular/core';
import { TabsArr } from '../../shared/interfaces';
@Component({
  selector: 'app-dialer-menu',
  templateUrl: './dialer-menu.component.html',
  styleUrls: ['./dialer-menu.component.scss']
})
export class DialerMenuComponent {
  @Output() TabsArrEmitter = new EventEmitter<{newTabsArr:TabsArr,activeTab:string}>();
  activeTab: string = "";
  resetTabsArr: TabsArr = ({} as any) as TabsArr;
  tabsArr: TabsArr = ({} as any) as TabsArr;
  constructor() {
  }
  selectActiveTab = (value: string) => {
    if (this.activeTab == value) {
      this.tabsArr = { ...this.resetTabsArr}
      this.activeTab = '';
    } else {
      this.tabsArr = { ...this.resetTabsArr, [value]: true }
      this.activeTab = value;
    }
    let data = {
      newTabsArr: this.tabsArr,
      activeTab:this.activeTab
    }
    this.TabsArrEmitter.emit(data);
  }
}
