import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { HeaderService } from 'src/app/shared/services/header.service';

@Component({
  selector: 'app-whatsapp-report',
  templateUrl: './whatsapp-report.component.html',
  styleUrls: ['./whatsapp-report.component.scss'],
  standalone:true,
  imports:[CommonModule, FormsModule]
})
export class WhatsappReportComponent implements OnInit {
  totalCounts:any
  whatsAppRawData:any;
  whatsAppColumns:any=[];
  columnHeadings:any;
  rowData:any;
  startingPoint:any
  endingPoint:any
  maxEndDate:any;
  pageNumber:number=1
  fromDate: string = '';
  toDate: string = '';
  itemperPage:number=20
totalPages:any
  constructor(private commonService: CommonDataService,
    private datePipe: DatePipe,
    private _hS: HeaderService) { }

  ngOnInit(): void {
    const newObj = { title: 'WhatsApp Raw Data', url: '/analytics/whatsapp-report' };
    this._hS.setHeader(newObj);

    const currentDate = new Date();
    this.maxEndDate = currentDate.toISOString().split('T')[0];

    this.GetWhatsAppRawData();
  }

  GetWhatsAppRawData(){
    debugger
    
      if (this.toDate == '' && this.fromDate == '') {
        let currentDate = new Date();
        let prevDate = currentDate.setDate(currentDate.getDate() - 5);
        this.fromDate = this.datePipe.transform(prevDate, 'YYYY-MM-dd') || "";
  
        this.toDate = this.datePipe.transform(new Date(), 'YYYY-MM-dd') || "";
      } else if (this.fromDate != '' && this.toDate != '') {
        this.fromDate = this.fromDate;
        this.toDate = this.toDate;
      }
      var obj = {
        fromDate: this.fromDate,
        toDate: this.toDate,
        pageNumber: this.pageNumber,
        pageSize: this.itemperPage
      }
      if(this.fromDate <= this.toDate){
      this.commonService.GetWhatsAppReport(obj).subscribe((res:any)=>{
        this.whatsAppRawData = res.List;
        this.totalCounts=res.TotalCount
        console.log("the res==>",res)
        this.whatsAppColumns = Object.keys(this.whatsAppRawData[0]);
        if(this.pageNumber==1){
          this.startingPoint=1
        }
        else{
          this.startingPoint=(this.pageNumber-1)*(this.itemperPage)+1
        }
        this.totalPages=Math.ceil(this.totalCounts/this.itemperPage)
        if(this.totalCounts<=this.startingPoint+this.itemperPage-1){
         this.endingPoint=this.totalCounts
        }
       else{
         this.endingPoint=this.startingPoint+this.itemperPage-1
       }
  
      });
    } else {
      alert('select end date greater then start date')
    }
    
  }

  DownloadWhatsAppRawData(){
    // if (this.toDate == '' && this.fromDate == '') {
    //   let currentDate = new Date();
    //   let prevDate = currentDate.setDate(currentDate.getDate() - 5);
    //   const fromDate =
    //     this.datePipe.transform(prevDate, 'YYYY-MM-dd') + 'T00:00:00.000Z';
    //   this.fromDate = fromDate;

    //   this.toDate =
    //     this.datePipe.transform(new Date(), 'YYYY-MM-dd') + 'T23:59:59.999Z';
    // } else if (this.fromDate != '' && this.toDate != '') {
      
    //   this.toDate = this.toDate.split('T')[0];
    //   this.fromDate = this.fromDate.split('T')[0];
    //   this.fromDate = this.fromDate + 'T00:00:00.000Z';
    //   this.toDate = this.toDate + 'T23:59:59.999Z';
    // }
    var obj = {
      fromDate: this.fromDate,
      toDate: this.toDate,
      pageNumber: 1,
      pageSize: 30
    }
    this.commonService.DownloadWhatsAppReport(obj).subscribe((res:any)=>{
      const a = document.createElement('a');
        a.href = res;
        a.download = 'WhatsAppRawDataReport.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    })
  }
  nextPage(pageNumber:any){
    debugger
    let page=pageNumber+1
  if(page<this.totalPages+1){
    this.pageNumber=page
    this.GetWhatsAppRawData()
  }
  }
  perviousPage(pageNumber:any){
    debugger
  if(pageNumber>=1){
    let page=pageNumber-1
    if(page>0){
      this.pageNumber=page
    }
  }
  this.GetWhatsAppRawData()
}

resetEndDate(){
  this.toDate = "";
}
}
