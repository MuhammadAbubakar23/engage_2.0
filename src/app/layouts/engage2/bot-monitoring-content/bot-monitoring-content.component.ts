import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';

import { ChatVisibilityService } from 'src/app/modules/bot-monitoring/services/chat-visibility.service';
import { ChatBotHistoryMenuComponent } from './chat-bot-history-menu/chat-bot-history-menu.component';
import { SharedService } from 'src/app/services/SharedService/shared.service';
import { BotMonitoringMenusComponent } from './bot-monitoring-menus/bot-monitoring-menus.component';
import { BotMainMenuComponent } from './bot-main-menu/bot-main-menu.component';

@Component({
  selector: 'monitoring-content',
  templateUrl: './bot-monitoring-content.component.html',
  styleUrls: ['./bot-monitoring-content.component.scss']

})
export class BotMonitoringContentComponent implements OnInit {
  toggleLeftBar: boolean = false;
  showPanel: boolean = false;
  thirdActive: boolean = false;
  showGenerativeMenu: boolean = false;
  @ViewChild('monitoringMenuComponent', { read: ViewContainerRef }) dynamicComponent: ViewContainerRef | undefined;
  constructor(private _chatVS: ChatVisibilityService, private _sharedS: SharedService, private resolver: ComponentFactoryResolver) {
    this._chatVS.thirdActive$.subscribe((third: any) => {
      this.thirdActive = third;
    })
  }
  loadComponent(val: string) {
    
    if (this.dynamicComponent) {
      this.dynamicComponent.clear();
      if (val === 'generative') {
        const componentFactory = this.resolver.resolveComponentFactory(ChatBotHistoryMenuComponent);
        this.dynamicComponent.createComponent(componentFactory);
      } else if(val==='bot-monitor') {
        const componentFactory = this.resolver.resolveComponentFactory(BotMonitoringMenusComponent);
        this.dynamicComponent.createComponent(componentFactory);
      }
      else{
        const componentFactory = this.resolver.resolveComponentFactory(BotMainMenuComponent);
        this.dynamicComponent.createComponent(componentFactory);
      }
    }
  }
  ngOnInit(): void {
    this._sharedS.showGenerativeMenu$.subscribe((val: any) => {
      if (this.dynamicComponent) {
        if (this.dynamicComponent) {
          this.loadComponent(val ? val : '');
        }
      }
    });
  }

  ngAfterViewInit() {
    if (this.dynamicComponent) {
      this.loadComponent(''); // Initial load
    }
  }
  toggleSubLeftBar() {

    this.toggleLeftBar = !this.toggleLeftBar;
    // if(this.toggleLeftBar == true){
    //   this.closePanelServices.sendRightBarToggleValue(false);
    // }

  }
  toggleRightPanel() {

    this.showPanel = !this.showPanel;
  }
}
