import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';

@Component({
  selector: 'app-whatsapp-report',
  templateUrl: './whatsapp-report.component.html',
  styleUrls: ['./whatsapp-report.component.scss'],
  standalone:true,
  imports:[CommonModule, FormsModule]
})
export class WhatsappReportComponent implements OnInit {

  whatsAppRawData:any;
  whatsAppColumns:any=[];
  columnHeadings:any;
  rowData:any;

  fromDate: string = '';
  toDate: string = '';

  constructor(private commonService: CommonDataService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.GetWhatsAppRawData();
  }

  GetWhatsAppRawData(){

    if (this.toDate == '' && this.fromDate == '') {
      let currentDate = new Date();
      let prevDate = currentDate.setDate(currentDate.getDate() - 5);
      const fromDate =
        this.datePipe.transform(prevDate, 'YYYY-MM-dd') + 'T00:00:00.000Z';
      this.fromDate = fromDate;

      this.toDate =
        this.datePipe.transform(new Date(), 'YYYY-MM-dd') + 'T23:59:59.999Z';
    } else if (this.fromDate != '' && this.toDate != '') {
      this.toDate = this.toDate.split('T')[0];
      this.fromDate = this.fromDate.split('T')[0];
      this.fromDate = this.fromDate + 'T00:00:00.000Z';
      this.toDate = this.toDate + 'T23:59:59.999Z';
    }
    var obj = {
      fromDate: this.fromDate,
      toDate: this.toDate,
      pageNumber: 0,
      pageSize: 0
    }
    this.commonService.GetWhatsAppReport(obj).subscribe((res:any)=>{
      this.whatsAppRawData = res.List;
      this.whatsAppColumns = Object.keys(this.whatsAppRawData[0]);
    })
  }

  DownloadWhatsAppRawData(){
    if (this.toDate == '' && this.fromDate == '') {
      let currentDate = new Date();
      let prevDate = currentDate.setDate(currentDate.getDate() - 5);
      const fromDate =
        this.datePipe.transform(prevDate, 'YYYY-MM-dd') + 'T00:00:00.000Z';
      this.fromDate = fromDate;

      this.toDate =
        this.datePipe.transform(new Date(), 'YYYY-MM-dd') + 'T23:59:59.999Z';
    } else if (this.fromDate != '' && this.toDate != '') {
      
      this.toDate = this.toDate.split('T')[0];
      this.fromDate = this.fromDate.split('T')[0];
      this.fromDate = this.fromDate + 'T00:00:00.000Z';
      this.toDate = this.toDate + 'T23:59:59.999Z';
    }
    var obj = {
      fromDate: this.fromDate,
      toDate: this.toDate,
      pageNumber: 1,
      pageSize: 30
    }
    this.commonService.DownloadWhatsAppReport(obj).subscribe((res:any)=>{
      const a = document.createElement('a');
        a.href = res;
        a.download = 'AgentReport.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      console.log(res)
    })
  }

}
