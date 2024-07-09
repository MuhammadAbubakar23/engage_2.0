import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RightNavService } from 'src/app/services/RightNavService/RightNav.service';
import { SharedService } from 'src/app/services/SharedService/shared.service';
import { ToggleService } from 'src/app/services/ToggleService/Toggle.service';
import { loadMenusList } from '../../menu-state/menu.actions';
import { getEmargingEqual, getMenusLoading } from '../../menu-state/menu.selectors';
import { MenuState } from '../../menu-state/menu.state';

@Component({
  selector: 'analytics-right-sidebar-menu',
  templateUrl: './analytics-right-sidebar-menu.component.html',
  styleUrls: ['./analytics-right-sidebar-menu.component.scss']
})
export class AnalyticsRightSidebarMenuComponent implements OnInit {


  constructor(
    private toggleService : ToggleService,
    private rightNavService : RightNavService) {
    }

  ngOnInit(): void {

    // let parent = sessionStorage.getItem("parent");

    // this.subscription2 = this.rightNavService.getChildComponent().subscribe(msg2 => {
    //   this.dynamicChildPath = msg2;
    // });
  }

  isOpen = false;

  toggle(child:string) {
    if(sessionStorage.getItem('child') == child){
      this.toggleService.addTogglePanel('');
    } else{
      this.toggleService.addTogglePanel(child);
    }
  }

}
