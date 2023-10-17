import { CommonModule, DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { HeaderService } from 'src/app/shared/services/header.service';
import * as echarts from 'echarts';
import { NgxSpinnerModule ,NgxSpinnerService } from 'ngx-spinner';
@Component({
  standalone: true,
  imports: [CommonModule, FormsModule,NgxSpinnerModule],
  selector: 'app-instagram-report',
  templateUrl: './instagram-report.component.html',
  styleUrls: ['./instagram-report.component.scss']
})
export class InstagramReportComponent implements OnInit {
  @ViewChild('peopleViewed', { static: true }) peopleViewed!: ElementRef
  @ViewChild('pageReachabilty', { static: true }) pageReachabilty!: ElementRef
  @ViewChild('audienceGraph', { static: true }) audienceGraph!: ElementRef
  instagramReport: any
  startDate: string = ''
  endDate: string = ''
  maxEndDate: any;
  totalLikes:any
  totalEngagements:any
  totalComments:any
  agentReplies: any
  engagment_data: any;
  totalPostComment:any;
  total_followers_data: any
  instagra_report: any
  topfiveCustomer:any[]=[]
  instagramRepot:any[]=[]
  totalPeopleWhoViewed:any[]=[]
  totalPeopleWhoViewedDates:any[]=[]
  totalPeopleWhoViewedCount:any[]=[]
  pagereachablity:any[]=[]
  pagereachablityCounts:any[]=[]
  totalfollowers:any[]=[]
  pagereachablityDates:any[]=[]
  totalfollowersDates:any[]=[]
  totalfollowersCounts:any[]=[]
  testLastResult:boolean=false
  InstagramStats = [
    { impressions: 1, reachability: 33, followerCount: 33, emailContacts: 0, phoneCallClicks: 0, getDirectionsClicks: 2, websiteClicks: 0, profileViews: 2 },
    { impressions: 1, reachability: 33, followerCount: 33, emailContacts: 0, phoneCallClicks: 0, getDirectionsClicks: 2, websiteClicks: 0, profileViews: 2 },
    { impressions: 1, reachability: 33, followerCount: 33, emailContacts: 0, phoneCallClicks: 0, getDirectionsClicks: 2, websiteClicks: 0, profileViews: 2 },
    { impressions: 1, reachability: 33, followerCount: 33, emailContacts: 0, phoneCallClicks: 0, getDirectionsClicks: 2, websiteClicks: 0, profileViews: 2 },
    { impressions: 1, reachability: 33, followerCount: 33, emailContacts: 0, phoneCallClicks: 0, getDirectionsClicks: 2, websiteClicks: 0, profileViews: 2 },
  ];
  posts = [
    { createdDate: '31/08/2023 04:55 PM', postContent: "We have prioritized strengthening the city's power supply...", postType: 'Type A', reach: 0, postClicks: 0, reactions: 32, comments: 80, shares: 9, engagementRate: '0%', grade: 'C', },
    { createdDate: '31/08/2023 04:55 PM', postContent: "We have prioritized strengthening the city's power supply...", postType: 'Type A', reach: 0, postClicks: 0, reactions: 32, comments: 80, shares: 9, engagementRate: '0%', grade: 'C', },
    { createdDate: '31/08/2023 04:55 PM', postContent: "We have prioritized strengthening the city's power supply...", postType: 'Type A', reach: 0, postClicks: 0, reactions: 32, comments: 80, shares: 9, engagementRate: '0%', grade: 'C', },
    { createdDate: '31/08/2023 04:55 PM', postContent: "We have prioritized strengthening the city's power supply...", postType: 'Type A', reach: 0, postClicks: 0, reactions: 32, comments: 80, shares: 9, engagementRate: '0%', grade: 'C', },
    { createdDate: '31/08/2023 04:55 PM', postContent: "We have prioritized strengthening the city's power supply...", postType: 'Type A', reach: 0, postClicks: 0, reactions: 32, comments: 80, shares: 9, engagementRate: '0%', grade: 'C', },
    { createdDate: '31/08/2023 04:55 PM', postContent: "We have prioritized strengthening the city's power supply...", postType: 'Type A', reach: 0, postClicks: 0, reactions: 32, comments: 80, shares: 9, engagementRate: '0%', grade: 'C', },
  ];
  constructor(private _hS: HeaderService,
    private commonDataService: CommonDataService,
    private spinerServices:NgxSpinnerService,
    private datePipe: DatePipe,) { }

  ngOnInit(): void {
    const newObj = { title: 'Instagram Report', url: '/analytics/inbound-outbound-report' };
    this._hS.setHeader(newObj);
    const currentDate = new Date();
    this.maxEndDate = currentDate.toISOString().split('T')[0]
    this.GetInstagramReport()
    this.gettopfiveCutomer()
  }
  GetInstagramReport() {
   debugger
    if (this.endDate == '' && this.startDate == '') {
      let currentDate = new Date();
      let prevDate = currentDate.setDate(currentDate.getDate() - 5);
      this.startDate = this.datePipe.transform(prevDate, 'YYYY-MM-dd') || "";

      this.endDate = this.datePipe.transform(new Date(), 'YYYY-MM-dd') || "";
    } else if (this.startDate != '' && this.endDate != '') {
      this.startDate = this.startDate;
      this.endDate = this.endDate;
    }
    debugger
    let requestData = {
      pageId: "17841400250284169",
      from: this.startDate,
      to: this.endDate,
      lastPostId: 0
    };
    this.totalPeopleWhoViewedCount=[]
    this.totalPeopleWhoViewedDates=[]
    this.totalfollowersCounts=[]
    this.totalfollowersDates=[]
    this.pagereachablityCounts=[]
    this.pagereachablityDates=[]
    this.spinerServices.show()
    this.commonDataService.PostInstagramReport(requestData).subscribe((res:any)=>{
      this.spinerServices.hide()
      // console.log("Api instagram",res)
      debugger
this.instagramReport=res
     console.log("This.IntragramReport===>",this.instagramReport)
  //  total People Who Viewed
  this.totalPeopleWhoViewed=this.instagramReport.span_profile_views
  this.totalPeopleWhoViewed?.forEach((x:any)=>{
  if(!this.totalPeopleWhoViewedDates.includes(x.dateValue)){
  this.totalPeopleWhoViewedDates.push(this.datePipe.transform(x.dateValue,'dd/MMM'))
  }
  this.totalPeopleWhoViewedCount.push(x.activityCount)
  })
  // Page Reachability
  this.pagereachablity=this.instagramReport.span_reach
  this.pagereachablity?.forEach((x:any)=>{
    if(!this.pagereachablityDates.includes(x.dateValue)){
      this.pagereachablityDates.push(this.datePipe.transform(x.dateValue,'dd/MMM'))
    }
    this.pagereachablityCounts.push(x.activityCount)
  })
  // Audience Demographics
  debugger
   this.totalfollowers=this.instagramReport.span_follower_count
   this.totalfollowers?.forEach((x:any)=>{
    if(!this.totalfollowersDates.includes(x.dateValue)){
      this.totalfollowersDates.push(this.datePipe.transform(x.dateValue,'dd/MMM'))
    }
  this.totalfollowersCounts.push(x.activityCount)
   })
  //  Agent Replies
 this.agentReplies=this.instagramReport.agentReplies
 this.totalPostComment=this.agentReplies.totalPostCommentsAndReplies
  //  totalEngagement likes and comments
  this.totalLikes=this.instagramReport.total_likes
  this.totalComments=this.instagramReport.total_comments
  this.totalEngagements=this.totalLikes + this.totalComments
  this.instagramReport
  this.getPeopleViewedGraph()
  this.getPageReachGraph()
  this.getAudienceGraph()
    })
  }
gettopfiveCutomer(){
  let data={
    pageNumber: 0,
    pageSize: 0
  }
  this.commonDataService.GetInstagramProfile(data).subscribe((res:any)=>{
    this.topfiveCustomer=res
  })
}
  getPeopleViewedGraph() {
    const myDom = this.peopleViewed.nativeElement;
    const myChart = echarts.init(myDom, null, {
      renderer: 'canvas',
      useDirtyRect: false
    });
    var option: echarts.EChartsOption;
    function dataFormat(date: Date): string {
      const day: number = date.getDate();
      const monthNames: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const month: string = monthNames[date.getMonth()];
      return `${day} ${month}`;
    }
    option = {
      xAxis: {
        type: 'category',
       data: this.totalPeopleWhoViewedDates,
        axisLabel: {
          show: true,
          interval: 0,
          formatter: function (value: string) {
            return value;
          },
        },
      },
      yAxis: {
        type: 'value',
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['Engagement Rate'],
      },
      series: [
        {
          name: 'Engagement Rate',
          data: this.totalPeopleWhoViewedCount,
          type: 'line',
          itemStyle: {
            color: 'purple',
          },
          lineStyle: {
            width: 2,
          },
        },
      ],
    };
    option && myChart.setOption(option);
  }
  getPageReachGraph() {
    const myDom = this.pageReachabilty.nativeElement;
    const myChart = echarts.init(myDom, null, {
      renderer: 'canvas',
      useDirtyRect: false
    });
    var option: echarts.EChartsOption;
    function dataFormat(date: Date): string {
      const day: number = date.getDate();
      const monthNames: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const month: string = monthNames[date.getMonth()];
      return `${day} ${month}`;
    }
    option = {
      xAxis: {
        type: 'category',
     data: this.pagereachablityDates,
        axisLabel: {
          show: true,
          interval: 0,
          formatter: function (value: string) {
            return value;
          },
        },
      },
      yAxis: {
        type: 'value',
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['Total Engagments'],
      },
      series: [
        {
          name: 'Total Engagments',
       data: this.pagereachablityCounts,
          type: 'line',
          itemStyle: {
            color: 'red',
          },
          lineStyle: {
            width: 2,
          },
        },
      ],
    };

    option && myChart.setOption(option);



  }
  getAudienceGraph() {
    const myDom = this.audienceGraph.nativeElement;
    const myChart = echarts.init(myDom, null, {
      renderer: 'canvas',
      useDirtyRect: false
    });
    var option: echarts.EChartsOption;
    function dataFormat(date: Date): string {
      const day: number = date.getDate();
      const monthNames: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const month: string = monthNames[date.getMonth()];
      return `${day} ${month}`;
    }
    option = {
      xAxis: {
        type: 'category',
        data: this.totalfollowersDates,
        axisLabel: {
          show: true,
          interval: 0,
          formatter: function (value: string) {
            return value;
          },
        },
      },
      yAxis: {
        type: 'value',
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['Total Followers'],
      },
      series: [
        {
          name: 'Total Followers',
         data: this.totalfollowersCounts,

          type: 'line',
          itemStyle: {
            color: 'lightgreen',
          },
          lineStyle: {
            width: 2,
          },
        },
      ],
    };

    option && myChart.setOption(option);


  }
  resetEndDate() {
   
this.testLastResult=!this.testLastResult
this.GetInstagramReport()

  }
  resetStartDate(){
    this.endDate=''
  }
  date_paginationfive(){
    debugger
    if (this.endDate == '' && this.startDate == '') {
      let currentDate = new Date();
      let prevDate = currentDate.setDate(currentDate.getDate() - 5);
      this.startDate = this.datePipe.transform(prevDate, 'YYYY-MM-dd') || "";

      this.endDate = this.datePipe.transform(new Date(), 'YYYY-MM-dd') || "";
    } else if (this.startDate != '' && this.endDate != '') {
      this.startDate = this.startDate;
      this.endDate = this.endDate;
    }
    this.GetInstagramReport()
  }
  date_pagination( days:number){
    debugger
      let currentDate = new Date();
      let prevDate = currentDate.setDate(currentDate.getDate() - days);
      this.startDate = this.datePipe.transform(prevDate, 'YYYY-MM-dd') || '';
      this.endDate = this.datePipe.transform(new Date(), 'YYYY-MM-dd') || '';
    this.GetInstagramReport()
  }
}
