import { Component, OnInit } from '@angular/core';
import { Tooltip } from 'bootstrap';
import { Subscription } from 'rxjs';
import { HeaderService } from 'src/app/services/HeaderService/header.service';
import { LeftsidebarExpandedService } from 'src/app/services/LeftSideBar-Expanded/leftsidebar-expanded.service';
import { MaximizeChatService } from 'src/app/services/maximize-chat.service';
import { SharedService } from 'src/app/services/SharedService/shared.service';
import { ModulesService } from '../services/module-service/modules.service';

@Component({
  selector: 'main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent implements OnInit {
  public Subscription!: Subscription;

  menu: any = [];
  UnResponded: number = 0;
  pageNumber: any = 0;
  pageSize: any = 0;
  UserDetails: any[]=[];
  id: any;

  constructor(
    private headerService: HeaderService,
    private _sharedData: SharedService,
    private leftsidebar: LeftsidebarExpandedService,
    private maximizeChatService : MaximizeChatService,
    private moduleService : ModulesService
  ) { }

  ngOnInit(): void {

    // Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    // .forEach(tooltipNode => new Tooltip(tooltipNode));
    
    this.Subscription = this._sharedData.getCount().subscribe((res) => {
      this.UnResponded = res;
    });

    this.Subscription = this._sharedData.getuserInfo().subscribe((res) => {
      
      if(this.UserDetails.length == 0){
        this.UserDetails.push(res)
      } else if(this.UserDetails.length > 0){
        

        var item = this.UserDetails.find((x)=> x.userId == res.userId)
        if(item == null || item == undefined){
          this.UserDetails.push(res);
        }
      }
    });
  }

  updatevalue(string: any, leftsidebar: string) {
    this.headerService.updateMessage(string);
    this.leftsidebar.updateMessage(leftsidebar);
  }

  maximizeChat(id:any, platform:any){
    

    this.maximizeChatService.updateMessage('maximizeChat')
    this.maximizeChatService.setId(id)
    this.maximizeChatService.setPlatform(platform)
    
  }

  setValue(value:any){
    this.moduleService.updateModule(value);
  }

}
