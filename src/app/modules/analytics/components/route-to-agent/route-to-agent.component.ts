import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';
//  import { ExportToCsv } from 'export-to-csv';
import { HeaderService } from 'src/app/shared/services/header.service';
@Component({
  standalone:true,
  imports:[CommonModule,FormsModule],
  selector: 'app-route-to-agent',
  templateUrl: './route-to-agent.component.html',
  styleUrls: ['./route-to-agent.component.scss']
})
export class RouteToAgentComponent implements OnInit {
agentsDate:any[]=[]
totalCounts:any
startDate:string=''
EndDate:string=''
itemperPage:number=20
pageNumber:number=1
totalPages:any
changeMaxDate:any
downloadCsv:any
startingPoint:any
endingPoint:any
currentDate:any
  constructor( private commondataServices:CommonDataService,private headerServices:HeaderService,
    private datePipe : DatePipe) { }

  ngOnInit(): void {
    const obj={title:'Live Agent Interactions',url:'analytics/route-to-agent'}
    this.headerServices.setHeader(obj)
    this.currentDate = new Date()
    this.changeMaxDate=this.currentDate.toISOString().split("T")[0]
    this.getRoutetoAgent();
    // this.downloadRouteAgentsCvs()
  }
getRoutetoAgent(){
  if (this.startDate == "" && this.EndDate == "") {

    const today = this.currentDate;
    // this.EndDate = this.datePipe.transform(today, "YYYY-MM-dd") || '';
 this.EndDate=today.toISOString().split("T")[0] || ""
    let prevDate = this.currentDate.setDate(this.currentDate.getDate() -1);
    this.startDate = this.datePipe.transform(prevDate, "YYYY-MM-dd") || '';
  }
  else if (this.startDate != "" && this.EndDate != ""
  ) {
    this.startDate = this.startDate
    this.EndDate = this.EndDate
  }
  let data={
    "fromDate": this.startDate,
    "toDate":this.EndDate,
    "pageNumber": this.pageNumber,
    "pageSize": this.itemperPage
  }
if(this.startDate!='' || this.EndDate!=''){

  this.commondataServices.GetRouteToAgents(data).subscribe((res:any)=>{
    console.log("The Agents ====>",res)
    debugger
    this.agentsDate=res.List
    this.totalCounts=res.TotalCount
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
  })
}
}
downloadRouteAgentsCvs(){
  debugger
  let data={
    "fromDate": this.startDate,
    "toDate":this.EndDate,
    "pageNumber": this.pageNumber,
    "pageSize": this.itemperPage
  }
  this.commondataServices.GetRouteToAgentsCsv(data).subscribe((res:any)=>{
    console.log("RouteAgentsCsv data===>",res)
 this.downloadCsv=res
 const a = document.createElement('a');
 a.href = res;
 a.download = 'RouteToAgentReport.csv';
 document.body.appendChild(a);
 a.click();
 document.body.removeChild(a);
  })
}




generateExcelFile() {
  debugger
  const worksheet = XLSX.utils.json_to_sheet(this.downloadCsv);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  return blob;
}


// export() {
//   const options = { 
//     fieldSeparator: ',',
//     quoteStrings: '"',
//     decimalSeparator: '.',
//     showLabels: true, 
//     showTitle: true,
//     title: 'Charge Report',
//     useTextFile: false,
//     useBom: true,
//     headers: ['Name', 'Age', 'Average', 'Approved','Description']
// };
//  const csvExporter = new ExportToCsv(options);
//   csvExporter.generateCsv(this.);




















getBystartDate(){
this.EndDate=''
}
getByEndDate(){
  debugger
  if(this.EndDate>=this.startDate){
    this.getRoutetoAgent()
  }
 else{
  alert("EndDate is lessthen StartDate")
  this.EndDate=''
 }
}
nextPage(pageNumber:any){
  debugger
  let page=pageNumber+1
if(page<this.totalPages+1){
  this.pageNumber=page
  this.getRoutetoAgent()
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
this.getRoutetoAgent()
}
}