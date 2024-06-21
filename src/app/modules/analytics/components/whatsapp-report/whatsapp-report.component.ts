import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { HeaderService } from 'src/app/shared/services/header.service';
@Component({
  selector: 'app-whatsapp-report',
  templateUrl: './whatsapp-report.component.html',
  styleUrls: ['./whatsapp-report.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, NgxSpinnerModule],
})
export class WhatsappReportComponent implements OnInit {
  totalCounts: any;
  whatsAppRawData: any;
  whatsAppColumns: any = [];
  columnHeadings: any;
  rowData: any;
  startingPoint: any;
  endingPoint: any;
  maxEndDate: any;
  pageNumber: number = 1;
  fromDate: string = '';
  toDate: string = '';
  itemperPage: number = 20;
  totalPages: any;
  downloading = false;
  toastermessage = false;
  AlterMsg: any = '';
  constructor(
    private commonService: CommonDataService,
    private datePipe: DatePipe,
    private _hS: HeaderService,
    private SpinnerService: NgxSpinnerService
  ) {}
  ngOnInit(): void {
    const newObj = {
      title: 'WhatsApp Raw Data',
      url: '/analytics/whatsapp-report',
    };
    this._hS.setHeader(newObj);
    const currentDate = new Date();
    // const oneDayBeforeCurrentDate = currentDate.setDate(
    //   currentDate.getDate() - 1ll
    // );
 this.maxEndDate=currentDate.toISOString().split('T')[0];
    this.GetWhatsAppRawData();
  }
  GetWhatsAppRawData() {
    if (this.toDate == '' && this.fromDate == '') {
      let currentDate = new Date();
      let prevDate = currentDate.setDate(currentDate.getDate() - 1);
      this.fromDate = this.datePipe.transform(prevDate, 'YYYY-MM-dd') || '';
      this.toDate = this.datePipe.transform(new Date(), 'YYYY-MM-dd') || '';
      // this.fromDate = this.maxEndDate;
      // this.toDate = this.maxEndDate;
    } else if (this.fromDate != '' && this.toDate != '') {
      this.fromDate = this.fromDate;
      this.toDate = this.toDate;
    }
    const startDateObj=new Date(this.fromDate)
    const endDateobj= new Date(this.toDate)
    const timeDiff =Math.abs (endDateobj.getTime()-startDateObj.getTime())
    const daysdiff= Math.ceil(timeDiff/(1000*3600*24))
    if(daysdiff>30){
      alert('Select a date range of 30 days or less');
      this.toDate=''
      return;
    }
    var obj = {
      fromDate: this.fromDate,
      toDate: this.toDate,
      pageNumber: this.pageNumber,
      pageSize: this.itemperPage,
    };
      this.SpinnerService.show();
      this.commonService.GetWhatsAppReport(obj).subscribe((res: any) => {
        this.SpinnerService.hide();
        this.whatsAppRawData = res.List;
        this.totalCounts = res.TotalCount;
        if(this.totalCounts==0){
          this.startingPoint=0
          this.endingPoint=0
        }
        this.whatsAppColumns = Object.keys(this.whatsAppRawData[0]);
        if (this.pageNumber == 1) {
          this.startingPoint = 1;
        } else {
          this.startingPoint = (this.pageNumber - 1) * this.itemperPage + 1;
        }
        this.totalPages = Math.ceil(this.totalCounts / this.itemperPage);
        if (this.totalCounts <= this.startingPoint + this.itemperPage - 1) {
          this.endingPoint = this.totalCounts;
        } else {
          this.endingPoint = this.startingPoint + this.itemperPage - 1;
        }
      },
      error=>{
        this.SpinnerService.hide()
      }
      );
  }
  DownloadWhatsAppRawData() {
    var obj = {
      fromDate: this.fromDate,
      toDate: this.toDate,
      pageNumber: 0,
      pageSize: 0,
    };
    this.downloading = true;
    this.reloadComponent('downloading');
    this.commonService.DownloadWhatsAppReport(obj).subscribe((res: any) => {
      // var array = JSON.parse(res);
      // this.excelService.exportAsExcelFile(array, 'whatsapp_raw_data');
      const a = document.createElement('a');
      a.href = res;
      a.download = 'WhatsappRawDataReport' + this.fromDate + '.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      this.downloading = false;
      this.reloadComponent('downloaded');
    });
  }
  nextPage(pageNumber: any) {
    let page = pageNumber + 1;
    if (page < this.totalPages + 1) {
      this.pageNumber = page;
      this.GetWhatsAppRawData();
    }
  }
  perviousPage(pageNumber: any) {
    if (pageNumber >= 1) {
      let page = pageNumber - 1;
      if (page > 0) {
        this.pageNumber = page;
      }
    }
    this.GetWhatsAppRawData();
  }
  resetEndDate() {
    if (this.toDate >= this.fromDate) {
      this.GetWhatsAppRawData();
    } else {
      alert('EndDate is lessthen StartDate');
      this.toDate = '';
    }
  }
  resetStartDate(){
    this.toDate=''
  }
  closeToaster() {
    this.toastermessage = false;
  }
  reloadComponent(type: any) {
    if (type == 'downloading') {
      this.AlterMsg = 'Downloading Started';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'downloaded') {
      this.AlterMsg = 'Your File has been downloaded Successfully!';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
  }
}
