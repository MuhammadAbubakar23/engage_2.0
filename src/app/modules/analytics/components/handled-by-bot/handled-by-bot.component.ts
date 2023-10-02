import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { HeaderService } from 'src/app/shared/services/header.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-handled-by-bot',
  templateUrl: './handled-by-bot.component.html',
  styleUrls: ['./handled-by-bot.component.scss']
})
export class HandledByBotComponent implements OnInit {
  TotalCount:any=[]
  startDate:string=''
  EndDate:string=''
  itemperPage:number=10
  page:number=1
  currentDate:any
  endDate: string = '';
  totalPages:any
  endingPoint:any
  startingPoint:any
  unique_customer: any[] = [];
  pageNumber = 1;
  itemsPerPage = 20; 
  maxEndDate:any
    constructor( private commonService:CommonDataService,
      private datePipe : DatePipe,
      private _hS:HeaderService) { }


  ngOnInit(): void {
    const newObj = {title:'Handled By bot',url:'/analytics/handled-bot'};
    this._hS.setHeader(newObj);
    this.currentDate = new Date()
    this.maxEndDate = this.currentDate.toISOString().split("T")[0];

    this.getHandleBot()
  }
  getHandleBot(){
    if (this.startDate == "" && this.EndDate == "") {
  
      const today = this.currentDate;
      this.EndDate = this.datePipe.transform(today, "YYYY-MM-dd") || '';
  
      let prevDate = this.currentDate.setDate(this.currentDate.getDate() - 20);
      this.startDate = this.datePipe.transform(prevDate, "YYYY-MM-dd") || '';
    }
    else if (this.startDate != "" && this.EndDate != ""
    ) {
      this.startDate = this.startDate
      this.EndDate = this.EndDate
    }
    let data={
      fromDate: this.startDate,
      toDate:this.EndDate,
      pageNumber: this.pageNumber,
      pageSize: this.itemsPerPage
    }
  this.commonService.AddHandledBot(data).subscribe((res:any)=>{
    console.log("The Agents ====>",res)
    this.unique_customer=res.List
    this.TotalCount=res.TotalCount
    if(this.pageNumber==1){
      this.startingPoint=1
    }
    else{
      this.startingPoint=(this.pageNumber-1)*(this.itemsPerPage)+1
    }
     this.totalPages=Math.ceil(this.TotalCount/this.itemsPerPage)
     if(this.TotalCount<=this.startingPoint+this.itemsPerPage-1){
      this.endingPoint=this.TotalCount
     }
    else{
      this.endingPoint=this.startingPoint+this.itemsPerPage-1
    }
  })
  }
  exportToCSV() {
    const requestData = {
      fromDate: this.startDate,
      toDate:this.EndDate,
      pageNumber: this.pageNumber,
      pageSize: this.itemsPerPage
    };
    this.commonService.AddHandledBotCSV(requestData).subscribe(
      (response: any) => {
        console.log('Response Data:', response);
        const a = document.createElement('a');
        a.href = response;
        a.download = 'handledByBot.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      },
      (error: any) => {
        console.error("error" , error)
      }
    );
  }
  nextPage(pageNumber:any){
    let page=pageNumber+1
  if(page<this.totalPages+1){
    this.pageNumber=page
    this.getHandleBot()
  }
  }
  prevPage(pageNumber:any){
  if(pageNumber>=1){
    let page=pageNumber-1
    if(page>0){
      this.pageNumber=page
    }
  }
  this.getHandleBot()
  }
  getBystartDate(){
    this.getHandleBot()
  }
  getByEndDate(){
    this.getHandleBot()
  }
  }

