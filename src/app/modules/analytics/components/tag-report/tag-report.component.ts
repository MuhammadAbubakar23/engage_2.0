import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as echarts from 'echarts';
import { HeaderService } from 'src/app/shared/services/header.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSpinnerService } from 'ngx-spinner';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { SharedModule } from 'src/app/shared/shared.module';
@Component({
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgxSpinnerModule,LayoutsModule,SharedModule],
  standalone: true,
  selector: 'app-tag-report',
  templateUrl: './tag-report.component.html',
  styleUrls: ['./tag-report.component.scss'],
})
export class TagReportComponent implements OnInit {
  startDate = '';
  @ViewChild('radioInput10', { static: false })
  radioInput10!: ElementRef<HTMLInputElement>;
  @ViewChild('radioInput20', { static: false })
  radioInput20!: ElementRef<HTMLInputElement>; 
   @ViewChild('radioInput30', { static: false })
  radioInput30!: ElementRef<HTMLInputElement>;
  endDate = '';
  currentDate: any;
  endMaxDate: any;
  tagsReportDetails: any;
  showDetails: boolean = false;
  facebookCommentsArray: any[] = [];
  facebookComments: any[] = [];
  tagslist: any[] = [];
  tagsReportCSv: any[] = [];
  agentName:any[]=[]
  groupedDateUserList_other:any[]=[]
  groupedDataArray:any[]=[];
  groupedData=new Map()
  groupedDateUserList:any[]=[]
  customerDetailslist:any[]=[]
  userlist: any;
  agentId: any;
  str:any=''
  uniqueAgentId:any
  slugTagsArry:any[]=[]
  uniqueAgentData: any[] = [];
  tagreport:any
 isChecked:boolean=false;
  constructor(
    private _hs: HeaderService,
    private spinerServices: NgxSpinnerService,
    private datePipe: DatePipe,
    private commonService: CommonDataService
  ) {}

  ngOnInit(): void {
    this.currentDate = new Date();
    this.endMaxDate = this.currentDate.toISOString().split('T')[0];
    let obj = { title: 'Tag Report', url: '/analytics/tag-report' };
    this._hs.setHeader(obj);
    this.getAllTagsReport();
    this.makeChartResponsive()
  }
  onClick(){
    this.isChecked=true
  }
  getAllTagsReport() {
    if (this.endDate == '' && this.startDate == '') {
      const today = this.currentDate;
      this.endDate = this.datePipe.transform(today, 'YYYY-MM-dd') || '';
      let prevDate = this.currentDate.setDate(this.currentDate.getDate() - 4);
      this.startDate = this.datePipe.transform(prevDate, 'YYYY-MM-dd') || '';
    } else if (this.endDate !== '' && this.startDate !== '') {
      this.startDate =
        this.datePipe.transform(this.startDate, 'YYYY-MM-dd') || '';

      this.endDate = this.datePipe.transform(this.endDate, 'YYYY-MM-dd') || '';
    }
    const startDateObj = new Date(this.startDate);
    const endDateObj = new Date(this.endDate);
    const timeDiff = Math.abs(endDateObj.getTime() - startDateObj.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    if (diffDays > 30) {
      alert('Select a date range of 30 days or less');
      this.endDate=''
      return;
    }
    let obj = {
      from: this.startDate,
      to: this.endDate,
      pageId: '',
    };
    this.tagslist = [];
    this.facebookCommentsArray = [];
    this.uniqueAgentData=[]
    this.spinerServices.show();
    this.commonService.GetAllTagsReport(obj).subscribe((res: any) => {
      this.spinerServices.hide();

      this.tagsReportDetails = res;
  
      this.facebookComments = res.tagsWisePercentageDtos;
      this.facebookComments.forEach((x: any) => {
        if (!this.facebookCommentsArray.includes(x.tagPercentage && x.tag)) {
          this.facebookCommentsArray.push({
            value: x.tagPercentage,
            name: x.tag,
          });
        }
      });
      this.tagChart();

      this.userlist = res.userListDtos;
for (const user of this.userlist) {
  const existingAgentData = this.uniqueAgentData.find(data => data.agentId === user.agentId);

  if (existingAgentData) {
    
    // Update existing agent data
    existingAgentData.tags = [...new Set(existingAgentData.tags.concat(user.tags))];
    existingAgentData.customerData.push(user);
  } else {
    // Add new agent data
    
    this.uniqueAgentData.push({
      agentId: user.agentId,
      agentName: user.agentName,
      tags: [...new Set(user.tags)],
      customerData: [user]
    });
  }
}
this.uniqueAgentData.forEach((x:any)=>{
x.tags.forEach((y:any)=>{
  this.str= y.toLowerCase().split(/[-_.\s]/).map((w:any) => `${w.charAt(0).toUpperCase()}${w.substr(1)}`).join(' ');
})
 this.slugTagsArry.push({
  agentId:x.agentId,
  agentName:x.agentName,
  customerData:x.customerData,
  tags:this.str
 })
})
return this.uniqueAgentData;



      // this.userlist.forEach((item:any)=>{
      //   const agentId =item.agentId
      //   if(!this.groupedData.has(agentId)){
      //     this.groupedData.set(agentId,[])
      //   }
      //   this.groupedData.get(agentId).push(item)
      //   this. groupedDataArray = Array.from(this.groupedData, ([agentId, items]) => ({ agentId, items }));

      //   this.groupedDataArray.forEach((y:any)=>{
      //     y.items.forEach((abc:any)=>{
      //       let obj={
      //         'customerName':abc.customerName,
      //         "createdDate":abc.createdDate,
      //         'customerMessage':abc.customerMessage,
      //         'customerProfilePic':abc.customerProfilePic,
      //         'feedType':abc.feedType,
      //         'tags':abc.tags,
      //         'feedId':abc.feedId
      //       }
      //       const exists=this.customerDetailslist.some((item:any)=> item.feedId===obj.feedId)
      //       if(!exists){
      //         this.customerDetailslist.push(obj)
            
      //       }

          
      //       if(!this.agentName.includes(abc.agentName)){
      //         this.agentName.push(abc.agentName)
      //       }
      //     })
      //   })      
      // })
   
       
    });
  }





  
  tagChart() {
    var chartDom = document.getElementById('main');
this.tagreport= echarts.init(chartDom);
    
    const option = {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        icon: 'circle',
        type: 'scroll',
        top: '17%',
        orient: 'vertical',
        left:500,
       
        icone:'circle',
        textStyle: {
          fontSize: 16, // Set the font size for the legend text
        },
        fontWeight: 'bold',
        formatter: (name:any) => {
          const dataItem = this.facebookCommentsArray.find(item => item.name === name);

          if (dataItem) {
            return `${name}:${dataItem.value}%`;
          }
          return name;
        },
      },
      series: [
        {
          type: 'pie',
          radius: ['60%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center',
          },
          left:-600,
          icon: 'circle',
          emphasis: {
            label: {
              show: true,
              fontSize: 15,
              fontWeight: 'bold',
              formatter: '{b} \n {c}  %',
            },
          },
          labelLine: {
            show: false,
          },
          data: this.facebookCommentsArray,
        },
      ],
    };

    option && this.tagreport.setOption(option);
  }
  resetStartDate() {
    this.endDate = '';
  }
  resetEndDate() {
    if (this.endDate >= this.startDate) {
      this.getAllTagsReport();

      if (this.radioInput10!== undefined) {
        this.radioInput10.nativeElement.checked = false;
      }
      if (this.radioInput20!== undefined) {
        this.radioInput20.nativeElement.checked = false;
      } 
       if (this.radioInput30!== undefined) {
        this.radioInput30.nativeElement.checked = false;
      }
    } 
    else {
      alert('EndDate is greater Then StartDate');
      this.endDate = '';
    }
  }
  getPagenationDay(value: any) {
    const today = new Date();
    let prevDate = today.setDate(today.getDate() - value);
    this.startDate = this.datePipe.transform(prevDate, 'YYYY-MM-dd') || '';
    this.endDate = this.datePipe.transform(new Date(), 'YYYY-MM-dd') || '';
    this.getAllTagsReport();
  }
  expotCSv(user: any) {
    let data = {
      from: this.startDate,
      to: this.endDate,
      agentId: user.agentId,
    };
    this.commonService.DownloadTagsReport(data).subscribe((res: any) => {
      const a = document.createElement('a');
      a.href = res;
      a.download = 'AgentTagsReport' + this.startDate + '.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }
  makeChartResponsive(){
    window.addEventListener('resize', ()=>{
      if(this.tagreport){
        this.tagreport.resize();
      }
      
    })
  }
}
