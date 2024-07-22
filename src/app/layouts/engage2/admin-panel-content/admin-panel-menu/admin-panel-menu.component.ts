import { Component, OnInit } from '@angular/core';
import { DataExchangeServicesService } from 'src/app/services/dataExchangeServices/data-exchange-services.service';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-admin-panel-menu',
  templateUrl: './admin-panel-menu.component.html',
  styleUrls: ['./admin-panel-menu.component.scss']
})
export class AdminPanelMenuComponent implements OnInit {

baseUrl='https://lhr-ivr1.enteract.live/console_sandbox/public/'
endPoint='engage_menus/'
token=sessionStorage.getItem('adminPenalToken')
adminPenalMenus:any
downloading:boolean=false
  constructor(
    private  endPointS:DataExchangeServicesService,
    private commanS:CommonDataService,
    private spinner:NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getAdminpenalMenus()
  }
getAdminpenalMenus(){
this.spinner.show()
debugger
 this.commanS.getAdminPenalMenus().subscribe((res:any)=>{
   this.adminPenalMenus=res
   this.spinner.hide()
 })
// this.adminPenalMenus=this.baseUrl+this.endPoint+this.token
  }
  sendEndPoint(url:any){
   debugger
   if(url =='#' || url ==''){

   }
   else{
      this.endPointS.sendAdminPenalEndPoint(url)
   }

  }
}
