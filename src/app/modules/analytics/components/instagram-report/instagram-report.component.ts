import { CommonModule, DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { HeaderService } from 'src/app/shared/services/header.service';
import * as echarts from 'echarts';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
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
  totalLikes: any
  totalEngagements: any
  totalComments: any
  agentReplies: any;
  engagment_data: any;
  total_followers_data: any
  instagra_report: any
  topfiveCustomer: any[] = []
  instagramRepot: any[] = []
  totalPeopleWhoViewed: any[] = []
  totalPeopleWhoViewedDates: any[] = []
  totalPeopleWhoViewedCount: any[] = []
  pagereachablity: any[] = []
  pagereachablityCounts: any[] = []
  totalfollowers: any[] = []
  pagereachablityDates: any[] = []
  totalfollowersDates: any[] = []
  totalfollowersCounts: any[] = []
  testLastResult: boolean = false
  testResult = {
    "impressions_totalcount": 23168,
    "reach_totalcount": 12225,
    "follower_totalcount": 31,
    "email_contacts_totalcount": 4,
    "phone_call_clicks_totalcount": 0,
    "text_message_clicks_totalcount": 0,
    "get_directions_clicks_totalcount": 6,
    "website_clicks_totalcount": 14,
    "profile_views_totalcount": 395,
    "total_likes": 674,
    "total_comments": 310,
    "span_peopleWhow_Viewed": [
      {
        "dateValue": "2023-10-01T12:00:00+05:00",
        "activityCount": 4507
      },
      {
        "dateValue": "2023-10-02T12:00:00+05:00",
        "activityCount": 6183
      },
      {
        "dateValue": "2023-10-03T12:00:00+05:00",
        "activityCount": 3087
      },
      {
        "dateValue": "2023-10-04T12:00:00+05:00",
        "activityCount": 3622
      },
      {
        "dateValue": "2023-10-05T12:00:00+05:00",
        "activityCount": 3100
      },
      {
        "dateValue": "2023-10-06T12:00:00+05:00",
        "activityCount": 2669
      },

    ],

    "span_reachability": [
      {
        "dateValue": "2023-10-01T12:00:00+05:00",
        "activityCount": 1
      },
      {
        "dateValue": "2023-10-02T12:00:00+05:00",
        "activityCount": 2788
      },
      {
        "dateValue": "2023-10-03T12:00:00+05:00",
        "activityCount": 1794
      },
      {
        "dateValue": "2023-10-04T12:00:00+05:00",
        "activityCount": 2044
      },
      {
        "dateValue": "2023-10-05T12:00:00+05:00",
        "activityCount": 1686
      },
      {
        "dateValue": "2023-10-06T12:00:00+05:00",
        "activityCount": 1194
      }
    ],
    "span_follower_count": [
      {
        "dateValue": "2023-10-01T12:00:00+05:00",
        "activityCount": 1194
      },
      {
        "dateValue": "2023-10-02T12:00:00+05:00",
        "activityCount": 253
      },
      {
        "dateValue": "2023-10-03T12:00:00+05:00",
        "activityCount": 72
      },
      {
        "dateValue": "2023-10-04T12:00:00+05:00",
        "activityCount": 46
      },
      {
        "dateValue": "2023-10-05T12:00:00+05:00",
        "activityCount": 33
      },
      {
        "dateValue": "2023-10-06T12:00:00+05:00",
        "activityCount": 21
      },
      [

      ]
    ],


  }
  test2nd = {
    "impressions_totalcount": 23168,
    "reach_totalcount": 12225,
    "follower_totalcount": 31,
    "email_contacts_totalcount": 4,
    "phone_call_clicks_totalcount": 0,
    "text_message_clicks_totalcount": 0,
    "get_directions_clicks_totalcount": 6,
    "website_clicks_totalcount": 14,
    "profile_views_totalcount": 395,
    "total_likes": 677,
    "total_comments": 410,
    "span_peopleWhow_Viewed": [
      {
        "dateValue": "2023-10-11T12:00:00+05:00",
        "activityCount": 45
      },
      {
        "dateValue": "2023-10-13T12:00:00+05:00",
        "activityCount": 61
      },
      {
        "dateValue": "2023-10-16T12:00:00+05:00",
        "activityCount": 308
      },
      {
        "dateValue": "2023-10-17T12:00:00+05:00",
        "activityCount": 362
      },
      {
        "dateValue": "2023-10-19T12:00:00+05:00",
        "activityCount": 310
      },
      {
        "dateValue": "2023-10-20T12:00:00+05:00",
        "activityCount": 266
      },

    ],

    "span_reachability": [
      {
        "dateValue": "2023-10-11T12:00:00+05:00",
        "activityCount": 1
      },
      {
        "dateValue": "2023-10-13T12:00:00+05:00",
        "activityCount": 27
      },
      {
        "dateValue": "2023-10-15T12:00:00+05:00",
        "activityCount": 179
      },
      {
        "dateValue": "2023-10-017T12:00:00+05:00",
        "activityCount": 204
      },
      {
        "dateValue": "2023-10-18T12:00:00+05:00",
        "activityCount": 16
      },
      {
        "dateValue": "2023-10-20T12:00:00+05:00",
        "activityCount": 19
      }
    ],
    "span_follower_count": [
      {
        "dateValue": "2023-10-11T12:00:00+05:00",
        "activityCount": 1194
      },
      {
        "dateValue": "2023-10-12T12:00:00+05:00",
        "activityCount": 25
      },
      {
        "dateValue": "2023-10-15T12:00:00+05:00",
        "activityCount": 7
      },
      {
        "dateValue": "2023-10-17T12:00:00+05:00",
        "activityCount": 4
      },
      {
        "dateValue": "2023-10-19T12:00:00+05:00",
        "activityCount": 4
      },
      {
        "dateValue": "2023-10-20T12:00:00+05:00",
        "activityCount": 2
      },
      [

      ]
    ],

  }

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
    private datePipe: DatePipe,) { }

  ngOnInit(): void {
    const newObj = { title: 'Instagram Report', url: '/analytics/inbound-outbound-report' };
    this._hS.setHeader(newObj);
    const currentDate = new Date();
    this.maxEndDate = currentDate.toISOString().split('T')[0];
    this.GetInstagramReport()
    this.gettopfiveCutomer()
    // this.getPeopleViewedGraph();
    //  this.getPageReachGraph();
    // this.getAudienceGraph();

  }
  date_pagination( days:number){
    debugger
      let currentDate = new Date();
      let prevDate = currentDate.setDate(currentDate.getDate() - days);
      this.startDate = this.datePipe.transform(prevDate, 'YYYY-MM-dd') || '';
      this.endDate = this.datePipe.transform(new Date(), 'YYYY-MM-dd') || '';
    this.GetInstagramReport()
  }
  GetInstagramReport() {

    if (this.endDate == '' && this.startDate == '') {
      let currentDate = new Date();
      let prevDate = currentDate.setDate(currentDate.getDate() - 5);
      this.startDate = this.datePipe.transform(prevDate, 'YYYY-MM-dd') || "";

      this.endDate = this.datePipe.transform(new Date(), 'YYYY-MM-dd') || "";
    } else if (this.startDate != '' && this.endDate != '') {
      this.startDate = this.startDate;
      this.endDate = this.endDate;
    }
    let requestData = {
      pageId: "17841400250284169",
      from: this.startDate,
      to: this.endDate,
      lastPostId: 0
    };
    this.totalPeopleWhoViewedCount = []
    this.totalPeopleWhoViewedDates = []
    this.totalfollowersCounts = []
    this.totalfollowersDates = []
    this.pagereachablityCounts = []
    this.pagereachablityDates = []
    this.commonDataService.PostInstagramReport(requestData).subscribe((res: any) => {
      // console.log("Api instagram",res)
      debugger
      if (this.testLastResult == false) {
        this.instagramReport = this.testResult
      }
      else if (this.testLastResult == true) {
        this.instagramReport = this.test2nd
      }
      console.log("This.IntragramReport===>", this.instagramReport)
      //  total People Who Viewed
      this.totalPeopleWhoViewed = this.instagramReport.span_peopleWhow_Viewed
      this.totalPeopleWhoViewed?.forEach((x: any) => {
        if (!this.totalPeopleWhoViewedDates.includes(x.dateValue.split('T')[0])) {
          this.totalPeopleWhoViewedDates.push(x.dateValue.split('T')[0])
        }
        this.totalPeopleWhoViewedCount.push(x.activityCount)
      })
      // Page Reachability
      this.pagereachablity = this.instagramReport.span_reachability
      this.pagereachablity?.forEach((x: any) => {
        if (!this.pagereachablityDates.includes(x.dateValue.split('T')[0])) {
          this.pagereachablityDates.push(x.dateValue.split('T')[0])
        }
        this.pagereachablityCounts.push(x.activityCount)
      })
      // Audience Demographics
      debugger
      this.totalfollowers = this.instagramReport.span_reachability
      this.totalfollowers?.forEach((x: any) => {
        if (!this.totalfollowersDates.includes(x.dateValue.split('T')[0])) {
          this.totalfollowersDates.push(x.dateValue.split('T')[0])
        }
        this.totalfollowersCounts.push(x.activityCount)
      })
      //  totalEngagement likes and comments
      this.totalLikes = this.instagramReport.total_likes
      this.totalComments = this.instagramReport.total_comments
      this.totalEngagements = this.totalLikes + this.totalComments
      this.instagramReport
      this.getPeopleViewedGraph()
      this.getPageReachGraph()
      this.getAudienceGraph()
    })


  }
  gettopfiveCutomer() {
    let data = {
      pageNumber: 0,
      pageSize: 0
    }
    this.commonDataService.GetInstagramProfile(data).subscribe((res: any) => {
      this.topfiveCustomer = res
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

    this.testLastResult = !this.testLastResult
    this.GetInstagramReport()

  }
  resetStartDate() {
    this.endDate = ''
  }
}
