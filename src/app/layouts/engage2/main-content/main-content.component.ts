import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClosePanelService } from 'src/app/services/ClosePanelServices/close-panel.service';
@Component({
  selector: 'main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {
  subscription!: Subscription
  toggleLeftBar:boolean = false;
  constructor(
    private  closePanelServices:ClosePanelService
  ) { }

  ngOnInit(): void {
    this.subscription = this.closePanelServices.receiveLeftBarToggleValue().subscribe(res=>{
      debugger
      this.toggleLeftBar = res;
    })
  }
  toggle() {
    this.toggleLeftBar = !this.toggleLeftBar;
    if(this.toggleLeftBar==true){
      this.closePanelServices.sendRightBarToggleValue(false)
    }
  }

}
