import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { RightNavService } from 'src/app/services/RightNavService/RightNav.service';
import { SharedService } from 'src/app/services/SharedService/shared.service';
import { ToggleService } from 'src/app/services/ToggleService/Toggle.service';
import { loadMenusList } from '../../menu-state/menu.actions';
import { getEmargingEqual, getMenusLoading } from '../../menu-state/menu.selectors';
import { MenuState } from '../../menu-state/menu.state';

@Component({
  selector: 'responder-right-sidebar-menu',
  templateUrl: './responder-right-sidebar-menu.component.html',
  styleUrls: ['./responder-right-sidebar-menu.component.scss'],
})
export class ResponderRightSidebarMenuComponent implements OnInit {
  @Output('toggleRightPanel') toggleRightPanelParent: EventEmitter<any> =
    new EventEmitter();
  menus$: any[] = [];
  menu$: any;
  loading$: any;

  public subscription!: Subscription;
  public subscription2!: Subscription;
  public dynamicPath: string = '';
  public dynamicChildPath: string = '';

  KEbaseUrl:string="";
  KEClient:boolean=false;
  constructor(
    private store: Store<MenuState>,
    private sharedService: SharedService,
    private toggleService: ToggleService,
    private rightNavService: RightNavService
  ) {
    this.menu$ = this.store.select(getEmargingEqual('team_inbox_right_menu'));
    this.loading$ = this.store.select(getMenusLoading);
    this.store.dispatch(loadMenusList());
  }

  ngOnInit(): void {
    this.KEbaseUrl=window.location.origin
    if(this.KEbaseUrl=='https://keportal.enteract.live' || this.KEbaseUrl=='http://localhost:4200' || this.KEbaseUrl=='https://uiengage.enteract.app'||this.KEbaseUrl=='https://bzengage.enteract.live' ||this.KEbaseUrl=='https://uiengagerox.enteract.app'  || this.KEbaseUrl=='https://engageui.enteract.live'){
      this.KEClient=true
    }
    this.menu$ = this.store
      .select(getEmargingEqual('team_inbox_right_menu'))
      .subscribe((item: any) => {
        for (let key in item) {
          let obj = {
            mainId: item[key].mainId,
            emerging: item[key].emerging,
            baseId: item[key].baseId,
            icon: item[key].icon,
            name: item[key].name,
            slug: item[key].slug,
            link: item[key].link,
            indexNo: item[key].indexNo,
          };

          // this.menus$ = item;

          item.forEach((menu: any) => {
            if (menu.mainId != 220) {
              if (!this.menus$.includes(menu)) {
                this.menus$.push(menu);
              }

            }
          });
        }
      });

    // Array.from(document.querySelectorAll('[data-bs-toggle]'))
    // .forEach(tooltipNode => new Tooltip(tooltipNode));

    let parent = sessionStorage.getItem('parent');
    if (parent != 'undefined') {
      this.subscription = this.sharedService.getMessage().subscribe((msg) => {
        this.dynamicPath = msg;
      });
    }

    this.subscription2 = this.rightNavService
      .getChildComponent()
      .subscribe((msg2) => {
        this.dynamicChildPath = msg2;
      });
  }

  isOpen = false;

  toggleRightBar(child: string) {

    // this.parentFun.emit();
    if (sessionStorage.getItem('child') == child) {
      //  this.toggleRightPanelParent.emit();
      this.toggleService.addTogglePanel('');
    } else {
      this.toggleService.addTogglePanel(child);
    }
  }
}
