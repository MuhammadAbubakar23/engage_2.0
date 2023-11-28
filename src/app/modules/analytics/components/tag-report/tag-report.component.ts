import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as echarts from 'echarts';
import { HeaderService } from 'src/app/shared/services/header.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSpinnerService } from 'ngx-spinner';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
@Component({
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgxSpinnerModule,LayoutsModule],
  standalone: true,
  selector: 'app-tag-report',
  templateUrl: './tag-report.component.html',
  styleUrls: ['./tag-report.component.scss'],
})
export class TagReportComponent implements OnInit {
  startDate = '';
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
  uniqueAgentId:any
  uniqueAgentData: any[] = [];

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
    let obj = {
      from: this.startDate,
      to: this.endDate,
      pageId: '',
    };
    this.tagslist = [];
    this.facebookCommentsArray = [];
    this.spinerServices.show();
    this.commonService.GetAllTagsReport(obj).subscribe((res: any) => {
      this.spinerServices.hide();
      console.log('AllTags res===>', res);

      this.tagsReportDetails = res;
      console.log("this group==>", this.groupedDataArray);
  
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
  this.uniqueAgentId=x.agentId
})
console.log("Unique AgentDate===>",this.uniqueAgentId)
return this.uniqueAgentData;



      // this.userlist.forEach((item:any)=>{
      //   const agentId =item.agentId
      //   if(!this.groupedData.has(agentId)){
      //     this.groupedData.set(agentId,[])
      //   }
      //   this.groupedData.get(agentId).push(item)
      //   this. groupedDataArray = Array.from(this.groupedData, ([agentId, items]) => ({ agentId, items }));

      //   console.log("groupDate===>",this.groupedDataArray)
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
      //         console.log("agentName===>",this.agentName)
      //       }
      //     })
      //   })      
      // })
   
       
    });
  }





  
  tagChart() {
    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom);
    
    const option = {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        type: 'scroll',
        top: '30%',
        orient: 'vertical',
        right: -20,
        textStyle: {
          fontSize: 16, // Set the font size for the legend text
        },
        fontWeight: 'bold',
        formatter: (name:any) => {
          const dataItem = this.facebookCommentsArray.find(item => item.name === name);

          if (dataItem) {
            return `${name} :${dataItem.value}      %`;
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
          emphasis: {
            label: {
              show: true,
              fontSize: 15,
              fontWeight: 'bold',
              formatter: '{b} \n {c}',
            },
          },
          labelLine: {
            show: false,
          },
          data: this.facebookCommentsArray,
        },
      ],
    };

    option && myChart.setOption(option);
  }
  resetStartDate() {
    this.endDate = '';
  }
  resetEndDate() {
    if (this.endDate >= this.startDate) {
      this.getAllTagsReport();
    } else {
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
}
