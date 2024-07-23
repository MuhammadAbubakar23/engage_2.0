import { CommonModule, DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { HeaderService } from 'src/app/shared/services/header.service';
import * as echarts from 'echarts';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ExcelService } from '../../services/excel.service';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, NgxSpinnerModule, LayoutsModule],
  selector: 'app-instagram-report',
  templateUrl: './instagram-report.component.html',
  styleUrls: ['./instagram-report.component.scss'],
})
export class InstagramReportComponent implements OnInit {
  @ViewChild('peopleViewed', { static: false }) peopleViewed!: ElementRef;
  @ViewChild('pageReachabilty', { static: false }) pageReachabilty!: ElementRef;
  @ViewChild('audienceGraph', { static: false }) audienceGraph!: ElementRef;
  // @ViewChild('radioInput', { static: false })
  // radioInput!: ElementRef<HTMLInputElement>;
  @ViewChild('radioInput10', { static: false }) radioInput10!: ElementRef;
  @ViewChild('radioInput20', { static: false }) radioInput20!: ElementRef;
  @ViewChild('radioInput30', { static: false }) radioInput30!: ElementRef
  instagramReport: any;
  startDate: string = '';
  endDate: string = '';
  maxEndDate: any;
  totalLikes: any;
  totalEngagements: any;
  totalComments: any;
  agentReplies: any;
  engagment_data: any;
  totalPostComment: any;
  total_followers_data: any;
  instagra_report: any;
  topfiveCustomer: any[] = [];
  instagramRepot: any[] = [];
  totalPeopleWhoViewed: any[] = [];
  totalPeopleWhoViewedDates: any[] = [];
  totalPeopleWhoViewedCount: any[] = [];
  pagereachablity: any[] = [];
  pagereachablityCounts: any[] = [];
  totalfollowers: any[] = [];
  pagereachablityDates: any[] = [];
  totalfollowersDates: any[] = [];
  totalfollowersCounts: any[] = [];
  recentPost: any[] = [];
  InstagramStatsExport: any[] = [];
  testLastResult: boolean = false;
  InstagramStats: any;
  engagementPersentage: any;
  maxRangEndDate: any;
  totalComleted: any;
  isShowChart: boolean = false;
  isShowDemographics: boolean = false;
  isShowEngagments: boolean = false;
  instagra_reportArray: any[] = [];
  constructor(
    private _hS: HeaderService,
    private excelServices: ExcelService,
    private commonDataService: CommonDataService,
    private spinerServices: NgxSpinnerService,
    private datePipe: DatePipe
  ) { }
  ngOnInit(): void {
    const newObj = {
      title: 'Instagram Report',
      url: '/analytics/instagram-report',
    };
    this._hS.setHeader(newObj);
    const currentDate = new Date();
    this.maxEndDate = currentDate.toISOString().split('T')[0]
    this.GetInstagramReport()
    this.gettopfiveCutomer()
  }
  GetInstagramReport() {
    if (this.endDate == '' && this.startDate == '') {
      let currentDate = new Date();
      let prevDate = currentDate.setDate(currentDate.getDate() - 5);
      this.startDate = this.datePipe.transform(prevDate, 'YYYY-MM-dd') || "";
      this.endDate = this.datePipe.transform(new Date(), 'YYYY-MM-dd') || "";
    } else if (this.startDate != '' && this.endDate != '') {
      //   this.startDate = this.startDate;
      //   this.endDate = this.endDate;
      // }
      const startDateObj = new Date(this.startDate);
      const endDateObj = new Date(this.endDate);
      const timeDiff = Math.abs(endDateObj.getTime() - startDateObj.getTime());
      const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      if (diffDays > 30) {
        alert('Select a date range of 30 days or less');
        return;
      }
    }
    let requestData = {
      pageId: '17841400250284169',
      from: this.startDate,
      to: this.endDate,
      lastPostId: 0,
    };
    this.totalPeopleWhoViewedCount = []
    this.totalPeopleWhoViewedDates = []
    this.totalfollowersCounts = []
    this.totalfollowers = []
    this.totalfollowersDates = []
    this.pagereachablityCounts = []
    this.pagereachablityDates = []
    this.isShowChart = false
    this.isShowDemographics = false
    this.isShowEngagments = false
    this.spinerServices.show()
    this.commonDataService.PostInstagramReport(requestData).subscribe((res: any) => {
      this.spinerServices.hide()
      // this.endDate=this.datePipe.transform(requestData.to,'YYYY-dd-MM HH:mm:ss')||''
      this.instagramReport = res
      //  total People Who Viewed
      this.totalPeopleWhoViewed = this.instagramReport.span_profile_views
      this.totalPeopleWhoViewed?.forEach((x: any) => {
        if (!this.totalPeopleWhoViewedDates.includes(this.datePipe.transform(x.dateValue, 'dd/MMM'))) {
          this.totalPeopleWhoViewedDates.push(this.datePipe.transform(x.dateValue, 'dd/MMM'));
        }
        this.totalPeopleWhoViewedCount.push(x.activityCount)
      })
      if (this.totalPeopleWhoViewedDates.length == 0) {
        this.isShowChart = true
      }
      // Page Reachability
      this.pagereachablity = this.instagramReport.span_reach
      this.pagereachablity?.forEach((x: any) => {
        if (!this.pagereachablityDates.includes(this.datePipe.transform(x.dateValue, 'dd/MMM'))) {
          this.pagereachablityDates.push(this.datePipe.transform(x.dateValue, 'dd/MMM'))
          this.pagereachablityCounts.push(x.activityCount)
        }
      });
      if (this.pagereachablityDates.length == 0) {
        this.isShowEngagments = true
      }
      // Audience Demographics
      this.totalfollowers = this.instagramReport.span_follower_count
      this.totalfollowers?.forEach((x: any) => {
        if (!this.totalfollowersDates.includes(this.datePipe.transform(x.dateValue, 'dd/MMM'))) {
          this.totalfollowersDates.push(this.datePipe.transform(x.dateValue, 'dd/MMM'))
        }
        this.totalfollowersCounts.push(x.activityCount)
      });
      if (this.totalfollowersDates.length == 0) {
        this.isShowDemographics = true
      }
      //  Agent Replies
      this.agentReplies = this.instagramReport.agentReplies
      this.totalPostComment = this.agentReplies.totalPostCommentsAndReplies
      this.engagementPersentage = this.agentReplies.engagementPersentage
      this.totalComleted = this.agentReplies.totalCompleted
      //  totalEngagement likes and comments
      this.totalLikes = this.instagramReport.likes_totalCount
      this.totalEngagements = this.totalLikes + this.totalPostComment
      // recent Post
      this.recentPost = this.instagramReport.recentPosts
      // instagram Stats by page
      this.InstagramStats = this.instagramReport.pageStats
      this.InstagramStatsExport = this.instagramReport.pageStats
      this.getPeopleViewedGraph()
      this.getPageReachGraph()
      this.getAudienceGraph()
      this.gettopfiveCutomer()
    },
    (error)=>{
      this.spinerServices.hide();
    })
  }
  gettopfiveCutomer() {
    let data = {
      pageNumber: 0,
      pageSize: 0,
      from: this.startDate,
      to: this.endDate,
    };
    this.commonDataService.GetInstagramProfile(data).subscribe((res: any) => {
      this.topfiveCustomer = res;
    });
  }
  getPeopleViewedGraph() {
    if (this.isShowChart == false) {
      const myDom = this.peopleViewed.nativeElement;
      const myChart = echarts.init(myDom, null, {
        renderer: 'canvas',
        useDirtyRect: false
      });
      var option: echarts.EChartsOption;
      // function dataFormat(date: Date): string {
      //   const day: number = date.getDate();
      //   const monthNames: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      //   const month: string = monthNames[date.getMonth()];
      //   return `${day} ${month}`;
      // }
      option = {
        xAxis: {
          type: 'category',
          data: this.totalPeopleWhoViewedDates.sort((a, b) => new Date(b).getTime() - new Date(a).getTime()).reverse(),
          axisLabel: {
            show: true,
            rotate: 45,
            // formatter: function (value: string) {
            //   return value;
            // },
          },
        },
        yAxis: [{
          type: "value",
          nameLocation: "middle",
          name: "Engagement Rate",
          nameTextStyle: {
            fontSize: 12,
            color: 'grey',
            lineHeight: 80,
          },
        }],
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['Engagement Rate'],
          icon: 'circle',
          bottom: 'bottom',
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        series: [
          {
            name: 'Engagement Rate',
            data: this.totalPeopleWhoViewedCount,
            type: 'line',
            itemStyle: {
              color: '#5f3d98',
            },
            lineStyle: {
              width: 2,
            },
          },
        ],
      };
      option && myChart.setOption(option);
    }
  }
  getPageReachGraph() {
    if (this.isShowEngagments == false) {
      const myDom = this.pageReachabilty.nativeElement;
      const myChart = echarts.init(myDom, null, {
        renderer: 'canvas',
        useDirtyRect: false,
      });
      var option: echarts.EChartsOption;
      option = {
        xAxis: {
          type: 'category',
          data: this.pagereachablityDates.sort((a, b) => new Date(b).getTime() - new Date(a).getTime()).reverse(),
          axisLabel: {
            rotate: 45,
            show: true,
            interval: 0,
            formatter: function (value: string) {
              return value;
            },
          },
        },
        yAxis: [
          {
            type: 'value',
            nameLocation: 'middle',
            name: 'Total Number of Page Reach',
            nameTextStyle: {
              fontSize: 12,
              color: 'grey',
              lineHeight: 80,
            },
          },
        ],
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: ['Total Engagments'],
          icon: 'circle',
          bottom: 'bottom',
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        series: [
          {
            name: 'Total Engagments',
            data: this.pagereachablityCounts,
            type: 'line',
            itemStyle: {
              color: '#fa0060',
            },
            lineStyle: {
              width: 2,
            },
          },
        ],
      };
      option && myChart.setOption(option);
    }
  }
  getAudienceGraph() {
    if (this.isShowDemographics == false) {
      const myDom = this.audienceGraph.nativeElement;
      const myChart = echarts.init(myDom, null, {
        renderer: 'canvas',
        useDirtyRect: false,
      });
      var option: echarts.EChartsOption;
      function dataFormat(date: Date): string {
        const day: number = date.getDate();
        const monthNames: string[] = [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ];
        const month: string = monthNames[date.getMonth()];
        return `${day} ${month}`;
      }
      option = {
        xAxis: {
          type: 'category',
          data: this.totalfollowersDates.sort((a, b) => new Date(b).getTime() - new Date(a).getTime()).reverse(),
          axisLabel: {
            show: true,
            rotate: 45,
            interval: 0,
            formatter: function (value: string) {
              return value;
            },
          },
        },
        yAxis: [
          {
            type: 'value',
            nameLocation: 'middle',
            name: 'Total Number of Followers',
            nameTextStyle: {
              fontSize: 12,
              color: 'grey',
              lineHeight: 80,
            },
          },
        ],
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: ['Total Followers'],
          icon: 'circle',
          bottom: 'bottom',
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        series: [
          {
            name: 'Total Followers',
            data: this.totalfollowersCounts,
            type: 'line',
            itemStyle: {
              color: '#00d3a2',
            },
            lineStyle: {
              width: 2,
            },
          },
        ],
      };
      option && myChart.setOption(option);
    }
  }
  resetEndDate() {
    if (this.endDate >= this.startDate) {
      this.GetInstagramReport();
      if (this.radioInput10!==undefined) {
        this.radioInput10.nativeElement.checked = false;
      }
      if (this.radioInput20!==undefined) {
        this.radioInput20.nativeElement.checked = false;
      }
      if (this.radioInput30!==undefined) {
        this.radioInput30.nativeElement.checked = false;
      }
    } else {
      this.endDate = '';
      alert('EndDate is greater than StartDate');
    }
  }
  // resetEndDate() {
  //   if (this.endDate >= this.startDate) {
  //     this.GetInstagramReport();
  //     if (this.radioInput !== undefined && this.radioInput.nativeElement) {
  //       this.radioInput.nativeElement.checked = false;
  //     }
  //   } else {
  //     this.endDate = '';
  //     alert('EndDate is greaterthen StartDate');
  //   }
  // }
  resetStartDate() {
    this.endDate = '';
  }
  date_paginationfive() {
    if (this.endDate == '' && this.startDate == '') {
      let currentDate = new Date();
      let prevDate = currentDate.setDate(currentDate.getDate() - 5);
      this.startDate = this.datePipe.transform(prevDate, 'YYYY-MM-dd') || '';
      this.endDate = this.datePipe.transform(new Date(), 'YYYY-MM-dd') || '';
    } else if (this.startDate != '' && this.endDate != '') {
      this.startDate = this.startDate;
      this.endDate = this.endDate;
    }
    this.GetInstagramReport();
  }
  date_pagination(days: number) {
    let currentDate = new Date();
    let prevDate = currentDate.setDate(currentDate.getDate() - days);
    this.startDate = this.datePipe.transform(prevDate, 'YYYY-MM-dd') || '';
    this.endDate = this.datePipe.transform(new Date(), 'YYYY-MM-dd') || '';
    this.GetInstagramReport()
  }
  exportCsv() {
    this.instagra_reportArray.push(this.InstagramStatsExport);
    this.excelServices.exportAsExcelFile(
      this.instagra_reportArray,
      'Instagram Stats'
    );
  }
}
