import { CommonModule, DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as echarts from 'echarts';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { HeaderService } from 'src/app/shared/services/header.service';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { ExcelService } from '../../services/excel.service';

@Component({
  selector: 'app-linked-in-report',
  templateUrl: './linked-in-report.component.html',
  styleUrls: ['./linked-in-report.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, NgxSpinnerModule],
})
export class LinkedInReportComponent implements OnInit {
  fromDate: string = '';
  toDate: string = '';
  maxEndDate: any;
  downloading = false;
  toastermessage = false;
  AlterMsg: any = '';
  allDates: any[] = [];
  ImpressionsGraphData: any[] = [];
  UniqueImpressionsGraphData: any[] = [];

  followersGraphData:any[]=[]
  EngagementGraphData: any[] = [];
  EngagementRateGraphData: any[] = [];
  ClickThroughRateGraphData: any[] = [];
  topFiveUpdates: any[] = [];
  linkedFollowerData:any[]=[]
  currentDate:any
  topFiveCustomer:any[]=[]
  impressionGraph: any;
  uniqueImpressionsGraph: any;
  engagementGraph: any;
  engagementRateGraph: any;
  clickThroughRateGraph: any;
  LinkedInReport:any;
  followers:any;
  linkedfollowerTotalcount:any

  

  constructor(
    private _hS: HeaderService,
    private commonDataService: CommonDataService,
    private excelServices: ExcelService,
    private datePipe: DatePipe,
    private SpinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    const newObj = { title: 'LinkedIn Report', url: '/analytics/linkedin-report' };
    this._hS.setHeader(newObj);

    this. currentDate = new Date();
    this.maxEndDate = this.currentDate.toISOString().split('T')[0];

    this.getLinkedInReportData();
    this.makeChartResponsive();
    this.getAllLinkedInfollowrs()
  }

  date_pagination(days: number) {
 
    let currentDate = new Date();
    let prevDate = currentDate.setDate(currentDate.getDate() - days);
    this.fromDate = this.datePipe.transform(prevDate, 'YYYY-MM-dd') || '';
    this.toDate = this.datePipe.transform(new Date(), 'YYYY-MM-dd') || '';
    this.getLinkedInReportData()
    this.getAllLinkedInfollowrs()
  }
  closeToaster() {
    this.toastermessage = false;
  }
  resetEndDate() {
  if(this.toDate<=this.fromDate){
    this.toDate=''
    alert("EndDate is greater_then StartDate")
  }
  else{
    this.getLinkedInReportData()
    this.getAllLinkedInfollowrs()
  }
  }
  export() {
    this.excelServices.exportAsExcelFile(this.topFiveCustomer, 'LinkedIn-Top-Five-Updates')
  }

  getLinkedInReportData() {
  
 if(this.fromDate==''&& this.toDate=='' ){
  const today =new Date()
  this.toDate =this.datePipe.transform(this.currentDate,'YYYY-MM-dd') || '';
  let prevDate = this.currentDate.setDate(this.currentDate.getDate()-5);
  this.fromDate=this.datePipe.transform(prevDate,'YYYY-MM-d') || '';
 }
 else if(this.fromDate!='' && this.toDate!=''){
  this.toDate=this.toDate
  this.fromDate=this.fromDate
 }

    var obj = {
      pageId: '76213578',
      from: this.fromDate,
      to: this.toDate,
      lastPostId: 0,
    };
    this.allDates = [];
    this.ImpressionsGraphData = [];
    this.UniqueImpressionsGraphData = [];
    this.EngagementGraphData = [];
    this.EngagementRateGraphData = [];
    this.ClickThroughRateGraphData = [];
    this.SpinnerService.show()
    this.commonDataService.GetLinkedInReportData(obj).subscribe((res:any)=>{
      this.LinkedInReport = res;
      this.SpinnerService.hide()
    this.topFiveUpdates = this.LinkedInReport.updates;
    this.topFiveCustomer=this.topFiveUpdates.slice(0,5)
    this.LinkedInReport.shared_Social_Activity.forEach((data: any) => {
      if (!this.allDates.includes(this.datePipe.transform(data.from,'dd MMM'))) {
        this.allDates.push(this.datePipe.transform(data.from, 'dd MMM'));
      }

      this.ImpressionsGraphData.push(data.impressions);
      this.UniqueImpressionsGraphData.push(data.uniqueImpressions);
      this.EngagementGraphData.push(data.engagement);
      this.EngagementRateGraphData.push(data.engagement_Rate);
      this.ClickThroughRateGraphData.push(data.clicks);
    });

    this.populateImpressionsGraph();
    this.populateUniqueImpressionsGraph();
    this.populateEngagementGraph();
    this.populateEngagementRateGraph();
    this.populateClickThroughRateGraph();
  
    
 
    })
  
  }

  populateImpressionsGraph() {
    type EChartsOption = echarts.EChartsOption;

    const dom = document.getElementById('ImpressionsGraph');
    this.impressionGraph = echarts.init(dom, null, {
      renderer: 'canvas',
      useDirtyRect: false,
    });
    var option: EChartsOption;

    option = {
      color: ['#5a3692'],
      title: {
        text: '',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['Page Impressions & Reach'],
        icon: 'circle',
        bottom: 0,
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '15%',
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.allDates,
        axisLabel: {
          rotate: 45,
        },
      },
      yAxis: {
        type: 'value',
        // axisLabel : {
        //   formatter: ''
        // },
        name: 'Y-Axis',
        nameLocation: 'middle',
        nameGap: 50
      },
      series: [
        {
          name: 'Page Impressions & Reach',
          type: 'line',
          data: this.ImpressionsGraphData,
        },
      ],
    };

    option && this.impressionGraph.setOption(option);
  }
  populateUniqueImpressionsGraph() {
    type EChartsOption = echarts.EChartsOption;

    const dom = document.getElementById('UniqueImpressionsGraph');
    this.uniqueImpressionsGraph = echarts.init(dom, null, {
      renderer: 'canvas',
      useDirtyRect: false,
    });
    var option: EChartsOption;

    option = {
      color: ['#f51160'],
      title: {
        text: '',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['Reach (Unique Impressions)'],
        icon: 'circle',
        bottom: 0,
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '15%',
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.allDates,
        axisLabel: {
          rotate: 45,
        },
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Reach (Unique Impressions)',
          type: 'line',
          data: this.UniqueImpressionsGraphData,
        },
      ],
    };

    option && this.uniqueImpressionsGraph.setOption(option);
  }
  populateEngagementGraph() {
    type EChartsOption = echarts.EChartsOption;

    const dom = document.getElementById('EngagementGraph');
    this.engagementGraph = echarts.init(dom, null, {
      renderer: 'canvas',
      useDirtyRect: false,
    });
    var option: EChartsOption;

    option = {
      color: ['#f51160'],
      title: {
        text: '',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['Total Engagements'],
        icon: 'circle',
        bottom: 0,
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '15%',
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.allDates,
        axisLabel: {
          rotate: 45,
        },
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Total Engagements',
          type: 'line',
          data: this.EngagementGraphData,
        },
      ],
    };

    option && this.engagementGraph.setOption(option);
  }
  populateEngagementRateGraph() {
    type EChartsOption = echarts.EChartsOption;

    const dom = document.getElementById('EngagementRateGraph');
    this.engagementRateGraph = echarts.init(dom, null, {
      renderer: 'canvas',
      useDirtyRect: false,
    });
    var option: EChartsOption;

    option = {
      color: ['#5a3692'],
      title: {
        text: '',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['Engagement Rate'],
        icon: 'circle',
        bottom: 0,
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '15%',
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.allDates,
        axisLabel: {
          rotate: 45,
        },
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Engagement Rate',
          type: 'line',
          data: this.EngagementRateGraphData,
        },
      ],
    };

    option && this.engagementRateGraph.setOption(option);
  }
  populateClickThroughRateGraph() {
    type EChartsOption = echarts.EChartsOption;

    const dom = document.getElementById('ClickThroughRateGraph');
    this.clickThroughRateGraph = echarts.init(dom, null, {
      renderer: 'canvas',
      useDirtyRect: false,
    });
    var option: EChartsOption;

    option = {
      color: ['#2a75ed'],
      title: {
        text: '',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['Link Clicks'],
        icon: 'circle',
        bottom: 0,
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '15%',
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.allDates,
        axisLabel: {
          rotate: 45,
        },
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Link Clicks',
          type: 'line',
          data: this.ClickThroughRateGraphData,
        },
      ],
    };

    option && this.clickThroughRateGraph.setOption(option);
  }
  getAllLinkedInfollowrs(){
    debugger
    if(this.fromDate==''&& this.toDate=='' ){
      const today =new Date()
      this.toDate =this.datePipe.transform(this.currentDate,'YYYY-MM-dd') || '';
      let prevDate = this.currentDate.setDate(this.currentDate.getDate()-5);
      this.fromDate=this.datePipe.transform(prevDate,'YYYY-MM-d') || '';
     }
     else if(this.fromDate!='' && this.toDate!=''){
      this.toDate=this.toDate
      this.fromDate=this.fromDate
     }
    
    
    let obj ={
      "pageId": "76213578",
      "from":this.fromDate,
      "to": this.toDate,
      "lastPostId": 0
    }
    this.followersGraphData=[]
    this.allDates=[]
    this.commonDataService.GetLinkedInReportFollwers(obj).subscribe((res:any)=>{
      this.linkedfollowerTotalcount=res.spanFollowers_TotalCount
      this.linkedFollowerData=res.spanFollowers
      debugger
      this.linkedFollowerData.forEach((abc:any)=>{
        debugger
        if (!this.allDates.includes(this.datePipe.transform(abc.from,'dd MMM'))) {
          this.allDates.push(this.datePipe.transform(abc.from,'dd MMM'));
        }
        this.followersGraphData.push(abc.organicFollowers + abc.paidFollowers)
      })
   
      this.followerChart()
    })
   
  }
followerChart(){
  debugger
  type EChartsOption = echarts.EChartsOption;

  const dom = document.getElementById('followers');
  this.followers = echarts.init(dom, null, {
    renderer: 'canvas',
    useDirtyRect: false,
  });
  var option: EChartsOption;

  option = {
    color: ['#90EE90'],
    title: {
      text: '',
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['Total Followers'],
      icon: 'circle',
      bottom: 0,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      containLabel: true,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: this.allDates,
      axisLabel: {
        rotate: 45,
      },
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'Total Followers',
        type: 'line',
        data: this.followersGraphData,
      },
    ],
  };

  option && this.followers.setOption(option);
}
  makeChartResponsive() {
    window.addEventListener('resize', () => {
      if (this.impressionGraph) {
        this.impressionGraph.resize();
      }
      if (this.uniqueImpressionsGraph) {
        this.uniqueImpressionsGraph.resize();
      }
      if (this.engagementGraph) {
        this.engagementGraph.resize();
      }
      if (this.engagementRateGraph) {
        this.engagementRateGraph.resize();
      }
      if (this.clickThroughRateGraph) {
        this.clickThroughRateGraph.resize();
      }
      if(this.followersGraphData){
        this.followers.resize()
      }
    });
  }
  restStartDate(){
    this.toDate=''
  }
}
