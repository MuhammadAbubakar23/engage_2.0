import { Component, OnInit,ViewChild ,ElementRef} from '@angular/core';
import { HeaderService } from 'src/app/shared/services/header.service';
import { FormGroup,FormControl,FormControlName } from '@angular/forms';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
// import { DatePipe } from '@angular/common'
// import * as moment from 'moment';
import { saveAs } from 'file-saver';
import * as echarts from 'echarts';
import { CommonModule } from '@angular/common';
@Component({
  standalone:true,
  selector: 'app-shift-report',
  templateUrl: './shift-report.component.html',
  styleUrls: ['./shift-report.component.scss'],
  imports:[CommonModule, FormsModule]
})
export class ShiftReportComponent implements OnInit {
 shiftReportData:any
 @ViewChild('shiftReport', { static: true }) shiftReport!: ElementRef;
 shifttagData:any[]=[]
 shiftChannelData:any[]=[]
dateWise:any[]=[]
tagsList:any[]=[]
allDates:any[]=[]
totaltags:number=0
slectedtagId:any[]=[]
selectedtagName:any=''
shiftime:any=0
changedateintostring:any=''
changedateintoarray:any[]=[]
currentdate:any
startDate='2023-09-10T11:40:06.526Z'
endDate='2023-09-22T11:40:06.526Z'
tags:any
commaSeparatedValuesLink :any
numberArrayLink:any
allTotalCountsfb:any[]=[]
allTotalCountTw:any[]=[]
allTotalCountLink:any[]=[]
allTotalCountInsta:any[]=[]
shiftType:any[]=[{name:'Morning',id:0},{id:1, name:'Evening'},
{id:2, name:'Night'},{id:3, name:'Iftar'},{id:4 ,name:'Sehr'}]
  constructor( private hs:HeaderService,

    private commandataService:CommonDataService) { }

  ngOnInit(): void {
    this.currentdate= new Date()
    const obj={title:'Shift Report',url:'analytics/shift-report'}
    this.hs.setHeader(obj)
    this.getShfitReport();
    this.getAlltags();
    // this.getCharts()
  }
  getAlltags(){
    this.commandataService.GetTagsList().subscribe((res:any)=>{
      console.log("All tags===>",res)
      this.tagsList=res
 
    })
  }
  convertedintoArray:any[]=[]
  getShfitReport(){
  

    let obj={
      fromDate:this.startDate,
      toDate:this.endDate,
      shiftId:this.shiftime,
      tags:this.changedateintostring
    }
this.commandataService.GetShiftReport(obj).subscribe((res:any)=>{
  debugger
  this.dateWise = [];

console.log("this Shfit==>",res);
this.shiftReportData=res
this.shiftChannelData=res.channelData

this.shiftChannelData.forEach((data:any)=>{
  console.log("the data==>",data)
  if(data.platform=="Facebook"){
 
    data.dateWise.forEach((singleItem:any) => {
      this.allTotalCountsfb.push(singleItem.totalCount)
    });
  }
  if (data.platform === "LinkedIn") {
   debugger
    this.commaSeparatedValuesLink = [];

    data.dateWise.forEach((singleitem: any) => {
        this.allTotalCountLink.push(singleitem.totalCount);
    });
    console.log("this.alltotalCounts ==>",this. allTotalCountLink);
    
}

  if(data.platform=="Instagram"){
    data.dateWise.forEach((singleitem:any)=>{
      this.allTotalCountInsta.push(singleitem.totalCount)
    })
}
  if(data.platform=="Twitter"){
    data.dateWise.forEach((singleitem:any)=>{
      this.allTotalCountTw.push(singleitem.totalCount)
    })
    }
  data.dateWise.forEach((item:any) => {
      
    if(!this.allDates.includes(item.date)){
      this.allDates.push(item.date )
      console.log("this.all Dates===>",this.allDates)
    }

  });

})

console.log("the chanel report data==>,",this.shiftChannelData)
this.shifttagData=res.tagData
this.shifttagData.forEach((x:any)=>{
  this.totaltags+=x.totalCount

})
this.getCharts();

})

  }
// dateformating(){
// var changedat=this.allDates.toString()
// const x=moment(this.allDates).format('DD/MM')
// console.log("the change datefor==>",x)
// }

selectedunselectedtag(tag:any){
if(this.slectedtagId.includes(tag.name)){
  this.slectedtagId.splice(this.slectedtagId.indexOf(tag.name),1)
}
else{
  this.slectedtagId.push(tag.name)
}
this.changedateintostring=this.slectedtagId.toString()
console.log("this.changeDateIntoStringfor tags===>",this.changedateintostring)
this.getShfitReport()
}

  searchtags(event:any)
{
  debugger
this.tags=event.target.value
this.getAlltags()
}
getByShifTime(event:any){
  this.shiftime=event.target.value
  this.getShfitReport()
}
getByStartData(){
  debugger

this.getShfitReport()
}
getByendDate(){

  this.getShfitReport()
}
getCharts(){
  var chartDom =this.shiftReport.nativeElement;
  var myChart = echarts.init(chartDom);
  var option;
  
  option = {
    // title: {
    //   text: 'Stacked Line'
    // },
    tooltip: {
      trigger: 'axis'
    },
    _legend: {
      data: ['Twitter','LinkedIn' ,'Facebook','Instagram']
    },
    get legend() {
      return this._legend;
    },
    set legend(value) {
      this._legend = value;
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      date: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Twitter',
        type: 'line',
        data: this.allTotalCountTw
      },
      {
        name: 'Facebook',
        type: 'line',
        data: this.allTotalCountsfb
      },
   
      {
        name: 'Instagram',
        type: 'line',
        data: this.allTotalCountInsta
      },
      {
        name: 'LinkedIn',
        type: 'line',
        data:this.allTotalCountLink
      }
    ]
  };
  
  option && myChart.setOption(option);
}

// exportToCSV() {
//   const csvContent = 
//     'Date,Twitter,Facebook,Instagram,LinkedIn\n' + 
//     this.allDates.map((date, index) =>
//       `${date},${this.allTotalCountTw[index]},${this.allTotalCountsfb[index]},${this.allTotalCountInsta[index]},${this.allTotalCountLink[index]}`
//     ).join('\n');
//   const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
//   saveAs(blob, 'shift_report.csv');
// }
}
