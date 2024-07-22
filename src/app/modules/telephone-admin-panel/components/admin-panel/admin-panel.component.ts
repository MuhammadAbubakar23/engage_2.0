import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { DataExchangeServicesService } from 'src/app/services/dataExchangeServices/data-exchange-services.service';
@Component({
  standalone: true,
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
  imports: [CommonModule, SharedModule, NgxSpinnerModule]
})
export class AdminPanelComponent implements OnInit {
  url: any
  baseUrl = "https://lhr-ivr1.enteract.live/console_sandbox/public/";
  endPoint="engage_login/"
  token = sessionStorage.getItem("adminPenalToken")
  constructor(
    private dataExchangeService: DataExchangeServicesService,
    private spinner: NgxSpinnerService
  ) { }
  ngOnInit(): void {
    this.getAllDataAdminPenal()
    this.changeEndpoint()
  }
  getAllDataAdminPenal() {
    this.url = this.baseUrl+ this.endPoint+ this.token
  }
  changeEndpoint() {
    this.dataExchangeService.receivedAdminPenalEndPoint().subscribe((res: any) => {
      this.url = res
    })
  }
}
