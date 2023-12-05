import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HeaderService } from 'src/app/shared/services/header.service';
import * as echarts from 'echarts';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  standalone: true,
  selector: 'app-facebook-report',
  templateUrl: './facebook-report.component.html',
  styleUrls: ['./facebook-report.component.scss'],
  imports: [CommonModule, FormsModule, NgxSpinnerModule],
})
export class FacebookReportComponent implements OnInit {
  @ViewChild('radioInput', { static: false })
  radioInput!: ElementRef<HTMLInputElement>;
  totalPostLikes: any;
  totalPostShares: any;
  totalPostComments: any;
  totalPageLike: any;
  totalunlikepage: any;
  startDate = '';
  enddate = '';
  faecbookresponce: any;
  pagelikeSpan: any[] = [];
  pageunlikeSpan: any[] = [];
  audiencelikesdate: any[] = [];
  audiencelikesCounts: any[] = [];
  audienceunlikes: any[] = [];
  audineceEngagementTotallikes: any[] = [];
  audienceEngagementTotlaComments: any[] = [];
  audienceEngagmentTotalShare: any[] = [];
  audienceunlikesCount: any[] = [];
  audienceEngagementDates: any[] = [];
  audienceEngagementlike: any[] = [];
  audienceEngagementShere: any[] = [];
  audienceEngagementComments: any[] = [];
  totalPeopleWhoViewSpan: any[] = [];
  totalPeopleWhoViewSpanDates: any[] = [];
  totalPeopleWhoViewSpanCounts: any[] = [];
  pageReactionsSpan: any[] = [];
  pageReactionsSpanDates: any[] = [];
  pageReactionsSpanLove: any[] = [];
  pageReactionsSpanAnger: any[] = [];
  pageReactionsSpanCare: any[] = [];
  pageReactionsSpanHaha: any[] = [];
  pageReactionsSpanLike: any[] = [];
  pageReactionsSpanPride: any[] = [];
  pageReactionsSpanSad: any[] = [];
  pageReactionsSpanSorry: any[] = [];
  pageReactionsSpanThankful: any[] = [];
  pageReactionsSpanWow: any[] = [];
  pageReachSpan: any[] = [];
  pageReachSpanDates: any[] = [];
  pageReachSpanCounts: any[] = [];
  publishedPegePostSpan: any[] = [];
  publishedUserPostSpan: any[] = [];
  publishedPegePostSpanDates: any[] = [];
  publishedPegePostSpanCounts: any[] = [];
  publishedUserPostSpanDates: any[] = [];
  publishedUserPostSpanCounts: any[] = [];
  externalRefernals: any[] = [];
  externalRefernalsData: any[] = [];
  fansGenderAge: any[] = [];
  recentPosts: any[] = [];
  agentMessagesData: any;
  totalCateredWorkload: any;
  agentMessages: any;
  currentDate: any;
  maxEndDate: any;
  cutomerdata: any;
  // datePipe: any;
  numberofPagelikes: any;
  numberofpageUnlikes: any;
  netDeffernce: any;
  pageperPost: number = 0;
  userPerPost: number = 0;
  totalNumberofpost: any;
  replieswithin: any;
  repliesAfter: any;
  totalengagement: any;
  totallikes: any;
  totalComments: any;
  totalShares: any;
  totalmaleCountK: number=0;
  totalfemaleCountK: number=0;
  totalmaleCount: number = 0;
  totalfemaleCount: number = 0;
  totalPageLikes: any
  lastTotalPageLikes: any
  SumBehaivor: any
  countPercentage: any
  totalmaleandfemalCount: number=0;
  malepersentage: number=0;
  femalepersentage:number=0;
  externalRefernalsName: number=0;
  totalMessagePostCommentsAndreplies: any;
  totalMessageAndrepliesCount: any;
  totalEngagementMessage: any
  downloading = false;
  toastermessage = false;
  AlterMsg: any = '';
  RoundOFF: any
  tppP: any
  ltpPP: any
  totalPublishSum: any
  publishPercentage: any
  TPL: any
  TPC: any
  TPS: any
  totalSumAudienceEngagement: any
  audiencePercentage: any
  LTPL: any
  LTPC: any
  LTPS: any
  LtotalSumAudienceEngagement: any
  totalSumOfAudience:any
  constructor(
    private headerServices: HeaderService,
    private spinerServices: NgxSpinnerService,
    private datePipe: DatePipe,
    private commandataSerivecs: CommonDataService
  ) { }

  ngOnInit(): void {
    const newObj = {
      title: 'Facebook Report',
      url: '/analytics/facebook-report',
    };
    this.headerServices.setHeader(newObj);
    this.currentDate = new Date();
    this.maxEndDate = this.currentDate.toISOString().split('T')[0];

    this.getAllfeacebookData();
    this.getTopFiveCustomers();
    // this.getDamiChart()
  }
  date_pagination(days: number) {
    let currentDate = new Date();
    let prevDate = currentDate.setDate(currentDate.getDate() - days);
    this.startDate = this.datePipe.transform(prevDate, 'YYYY-MM-dd') || '';
    this.enddate = this.datePipe.transform(new Date(), 'YYYY-MM-dd') || '';
    this.getAllfeacebookData()
  }
  getAllfeacebookData() {
    if (this.startDate == '' && this.enddate == '') {
      const today = this.currentDate;
      this.enddate = this.datePipe.transform(today, 'YYYY-MM-dd') || '';

      let prevDate = this.currentDate.setDate(this.currentDate.getDate() - 7);
      this.startDate = this.datePipe.transform(prevDate, 'YYYY-MM-dd') || '';
    } else if (this.startDate != '' && this.enddate != '') {
      ;
      // const startDate = new Date(this.startDate);
      // const abc = startDate.setDate(startDate.getDate() - 1);
      // this.startDate = this.datePipe.transform(abc, 'YYYY-MM-dd') || '';
      // this.startDate = this.startDate;
      // this.enddate = this.enddate;
      const startDateObj = new Date(this.startDate);
      const endDateObj = new Date(this.enddate);
      const timeDiff = Math.abs(endDateObj.getTime() - startDateObj.getTime());
      const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      if (diffDays > 30) {
        alert('Select a date range of 30 days or less');
        return;
      }
    }


    let data = {
      pageId: '622038187854126',
      from: this.startDate,
      to: this.enddate,
      lastPostId: 0,
    };
    this.audiencelikesCounts = [];
    this.audiencelikesdate = [];
    this.audienceEngagementDates = [];
    this.audineceEngagementTotallikes = [];
    this.audienceEngagementComments = [];
    this.totalPeopleWhoViewSpanDates = [];
    this.totalPeopleWhoViewSpanCounts = [];
    this.pageReactionsSpanDates = [];
    this.pageReactionsSpanAnger = [];
    this.pageReactionsSpanCare = [];
    this.pageReactionsSpanHaha = [];
    this.pageReactionsSpanLike = [];
    this.pageReactionsSpanPride = [];
    this.pageReactionsSpanSad = [];
    this.pageReactionsSpanThankful = [];
    this.pageReactionsSpanSorry = [];
    this.pageReactionsSpanWow = [];
    this.pageReactionsSpanLove = [];
    this.pageReachSpanDates = [];
    this.pageReachSpanCounts = [];
    this.publishedPegePostSpanCounts = [];
    this.publishedPegePostSpanDates = [];
    this.publishedUserPostSpanCounts = [];
    this.publishedUserPostSpanDates = [];
    this.audienceEngagementTotlaComments=[]
    this.externalRefernalsData = [];
   this.audienceEngagementTotlaComments=[]
   this.audienceEngagmentTotalShare=[]
    this.audienceunlikesCount=[]=[]
    this.totalmaleCount=0
    this.totalfemaleCount=0
    this.femalepersentage=0
    this.malepersentage=0
    this.totalmaleCountK=0
    this.totalfemaleCountK=0
    this.spinerServices.show();
    this.commandataSerivecs.Getfacebookreport(data).subscribe((res: any) => {
      this.spinerServices.hide();

      this.faecbookresponce = res;

      // stats percentage count
      this.lastTotalPageLikes = this.faecbookresponce.lastTotalPageLikes
      this.totalPageLikes = this.faecbookresponce.totalPageLikes
      this.SumBehaivor = this.lastTotalPageLikes + this.totalPageLikes
      this.countPercentage = (this.totalPageLikes / this.SumBehaivor) * 100
      this.RoundOFF = (Math.floor(this.countPercentage))

      // publish percentage 
      this.tppP = this.faecbookresponce.totalPublishedPagePosts
      this.ltpPP = this.faecbookresponce.lastTotalPublishedPagePosts

      this.totalPublishSum = this.tppP + this.ltpPP
      this.publishPercentage = (this.tppP / this.totalPublishSum) * 100
// PagePost 
this.pageperPost=this.faecbookresponce.totalPublishedPagePosts
this.userPerPost=this.faecbookresponce.totalPublishedUserPosts
this.totalNumberofpost=this.pageperPost + this.userPerPost
      // audience Engagement 
      this.TPL = this.faecbookresponce.totalPostLikes
      this.TPC = this.faecbookresponce.totalPostComments
      this.TPS = this.faecbookresponce.totalPostShares
      this.totalSumAudienceEngagement = this.TPL + this.TPC + this.TPS
      this.LTPL = this.faecbookresponce.lastTotalPostLikes
      this.LTPC = this.faecbookresponce.lastTotalPostComments
      this.LTPS = this.faecbookresponce.lastTotalPostShares
      this.LtotalSumAudienceEngagement = this.LTPL + this.LTPC + this.LTPS
      this.totalSumOfAudience = this.LtotalSumAudienceEngagement + this.totalSumAudienceEngagement
      this.audiencePercentage = (this.totalSumAudienceEngagement/this.totalSumOfAudience)*100



      this.totalEngagementMessage = res?.agentReplies?.totalMessagesAndRepliesCount
      //  SlA replies
      this.replieswithin = this.faecbookresponce.replyWithinTime;
      this.repliesAfter = this.faecbookresponce.replyAfterTime;
      this.totalCateredWorkload = this.faecbookresponce.totalCateredWorkload;
      // totalEnagement
      this.totallikes = res.totalPostLikes;
      this.totalComments = res.totalPostComments;
      this.totalShares = res.totalPostShares;

      this.totalengagement = this.totallikes + this.totalComments + this.totalShares + this.totalEngagementMessage;
      // net differnce of page likes and unlike

      this.numberofPagelikes = res.totalPageLikes;
      this.numberofpageUnlikes = res.totalPageUnLikes;
      if (this.numberofPagelikes > this.numberofpageUnlikes) {
        this.netDeffernce = this.numberofPagelikes - this.numberofpageUnlikes;
      } else {
        this.netDeffernce = this.numberofpageUnlikes - this.numberofPagelikes;
      }
      // aduience Engagement likes
      this.audienceEngagementlike = res.postLikeSpan;
      this.audienceEngagementlike?.forEach((x: any) => {
        if (!this.audienceEngagementDates.includes(x.dateValue.split('T')[0])) {
          this.audienceEngagementDates.push(x.dateValue.split('T')[0]);
        }
        this.audineceEngagementTotallikes.push(x.activityCount);
      });
      //  adudience Engagement comments
      this.audienceEngagementComments = res.postCommentSpan;
      this.audienceEngagementComments?.forEach((x: any) => {
        if (!this.audienceEngagementDates.includes(x.dateValue.split('T')[0])) {
          this.audienceEngagementDates.push(x.dateValue.split('T')[0]);
        }
        this.audienceEngagementTotlaComments.push(x.activityCount);
      });
      // adudience Engagement Share
      this.audienceEngagementShere = res.postShareSpan;
      this.audienceEngagementShere?.forEach((x: any) => {
        if (!this.audienceEngagementDates.includes(x.dateValue.split('T')[0])) {
          this.audienceEngagementDates.push(x.dateValue.split('T')[0]);
        }
        this.audienceEngagmentTotalShare.push(x.activityCount);
      });
      // totalPeopleWhoViewSpan
      this.totalPeopleWhoViewSpan = res.totalPeopleWhoViewedSpan;
      this.totalPeopleWhoViewSpan?.forEach((x: any) => {
        if (
          !this.totalPeopleWhoViewSpanDates.includes(x.dateValue.split('T')[0])
        ) {
          this.totalPeopleWhoViewSpanDates.push(x.dateValue.split('T')[0]);
        }
        this.totalPeopleWhoViewSpanCounts.push(x.activityCount);
      });
      // pageReactionSpan
      this.pageReactionsSpan = res.pageReactionsSpan;
      this.pageReactionsSpan?.forEach((x: any) => {
        if (
          !this.pageReactionsSpanDates.includes(
            x.totalReactionsDateValue.split('T')[0]
          )
        ) {
          this.pageReactionsSpanDates.push(
            x.totalReactionsDateValue.split('T')[0]
          );
        }
        this.pageReactionsSpanLove.push(x.love);
        this.pageReactionsSpanAnger.push(x.anger);
        this.pageReactionsSpanCare.push(x.cARE);
        this.pageReactionsSpanHaha.push(x.haha);
        this.pageReactionsSpanLike.push(x.like);
        this.pageReactionsSpanPride.push(x.pride);
        this.pageReactionsSpanSad.push(x.sad);
        this.pageReactionsSpanSorry.push(x.sorry);
        this.pageReactionsSpanThankful.push(x.tHANKFUL);
        this.pageReactionsSpanWow.push(x.wow);
      });
      // pageReachability
      this.pageReachSpan = res.pageReachSpan;
      this.pageReachSpan?.forEach((x: any) => {
        if (!this.pageReachSpanDates.includes(x.dateValue.split('T')[0])) {
          this.pageReachSpanDates.push(x.dateValue.split('T')[0]);
        }
        this.pageReachSpanCounts.push(x.activityCount);
      });
      // agentMessageData
      this.agentMessages = res.agentReplies;
      this.agentMessagesData = res.agentReplies;

      this.totalMessageAndrepliesCount = this.agentMessagesData.totalMessagesAndRepliesCount;
      this.totalMessagePostCommentsAndreplies = this.agentMessagesData.totalPostCommentsAndReplies;
      // Publishin Behavior
      this.publishedPegePostSpan = res.publishedPagePostSpan;
      this.publishedPegePostSpan?.forEach((x: any) => {
       
        if (
          !this.publishedPegePostSpanDates.includes(x.dateValue.split('T')[0])
        ) {
          this.publishedPegePostSpanDates.push(x.dateValue.split('T')[0]);
        }
        this.publishedPegePostSpanCounts.push(x.activityCount);
      });
      this.publishedUserPostSpan = res.publishedUserPostSpan;
      this.publishedUserPostSpan?.forEach((x: any) => {
        this.userPerPost += x.activityCount;
        if (
          this.publishedUserPostSpanDates.includes(x.dateValue.split('T')[0])
        ) {
          this.publishedPegePostSpanDates.push(x.dateValue.split('T')[0]);
        }
        this.publishedUserPostSpanCounts.push(x.activityCount);
      });
    
      // Top 10 External Sources
      this.externalRefernals = res.externalReferrals;
      this.externalRefernals?.forEach((x: any) => {
        this.externalRefernalsData.push({ name: x.link, value: x.count });
        this.externalRefernalsData.forEach((a: any) => {
          this.externalRefernalsName = a.name;
        });
      });
      // FanGenderAge
      this.fansGenderAge = res.pageFansGenderAge;
      this.fansGenderAge?.forEach((x: any) => {
        this.totalmaleCount += x.maleCount;
        this.totalmaleCountK = Math.floor(this.totalmaleCount / 1000);
      });
      this.fansGenderAge?.forEach((x: any) => {
        this.totalfemaleCount += x.femaleCount;
        this.totalfemaleCountK = Math.floor(this.totalfemaleCount / 1000);
      });
debugger
      this.totalmaleandfemalCount = this.totalmaleCount + this.totalfemaleCount;
      this.malepersentage = Number(( (this.totalmaleCount / this.totalmaleandfemalCount) * 100).toFixed(2))
      this.femalepersentage = Number(((this.totalfemaleCount / this.totalmaleandfemalCount) * 100).toFixed(2))
      // RecentPost

      this.recentPosts = res.recentPosts;

      // aduience Growth
      this.pagelikeSpan = res.pageLikeSpan;
      this.pageunlikeSpan = res.pageUnlikeSpan;
      this.pageunlikeSpan?.forEach((a: any) => {
        this.audienceunlikesCount.push(a.activityCount);
        if (!this.audiencelikesdate.includes(a.dateValue.split('T')[0])) {
          this.audiencelikesdate.push(a.dateValue.split('T')[0]);
        }
      });
      this.pagelikeSpan?.forEach((x: any) => {
        if (!this.audiencelikesdate.includes(x.dateValue.split('T')[0])) {
          this.audiencelikesdate.push(x.dateValue.split('T')[0]);
        }
        this.audiencelikesCounts.push(x.activityCount);
      });
      this.getChartAudienceGrowth();
      this.getChartAudienceEngagement();
      this.getTotalPeopleChart();
      this.getReactionGraph();
      this.getPageReachablityChart();
      this.getPublishinBehaviorChart();
      this.getExternalSourcesChart();
      this.getDamiChart()
    });
  }
  getMaleProgressBarStyle() {
    const widthPercentage = this.malepersentage + '%';
    return { width: widthPercentage };
  }

  getFemaleProgressBarStyle() {
    const widthPercentage = this.femalepersentage + '%';
    return { width: widthPercentage };
  }
  getPageReachablityChart() {
    var chartDom = document.getElementById('pagereachablity');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      color: ['#fc1c72'],
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['Page  Reach'],
        bottom:'bottom',
        icon:'circle'
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '10%',
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
        data: this.pageReachSpanDates,
        axisLabel: {
          rotate:45,
          
        }

      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Page  Reach',
          type: 'line',
          stack: 'Total',
          data: this.pageReachSpanCounts,
      
        },
      ],
    };

    option && myChart.setOption(option);
  }
  getReactionGraph() {
    var chartDom = document.getElementById('reaction');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      tooltip: {
        trigger: 'axis',

      },
      legend: {
        data: [
          'Love',
          'Anger',
          'Care',
          'Haha',
          'Like',
          'Pride',
          'Sad',
          'Sorry',
          'ThankFul',
          'Wow',
        ],
        bottom:'bottom',
        icon:'circle',
        type: 'scroll',
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '10%',
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
        data: this.pageReactionsSpanDates,
        axisLabel: {
          rotate:45,
          
        }
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Love',
          type: 'line',
          data: this.pageReactionsSpanLove,
        },
        {
          name: 'Anger',
          type: 'line',
          data: this.pageReactionsSpanAnger,
        },
        {
          name: 'Care',
          type: 'line',
          data: this.pageReactionsSpanCare,
        },
        {
          name: 'Haha',
          type: 'line',
          tdata: this.pageReactionsSpanHaha,
        },
        {
          name: 'Like',
          type: 'line',
          data: this.pageReactionsSpanLike,
        },
        {
          name: 'Pride',
          type: 'line',
          data: this.pageReactionsSpanPride,
        },
        {
          name: 'Sad',
          type: 'line',
          data: this.pageReactionsSpanSad,
        },
        {
          name: 'Sorry',
          type: 'line',
          data: this.pageReactionsSpanSorry,
        },
        {
          name: 'ThankFul',
          type: 'line',
          data: this.pageReactionsSpanThankful,
        },
        {
          name: 'Wow',
          type: 'line',
          data: this.pageReactionsSpanWow,
        },
      ],
    };

    option && myChart.setOption(option);
  }
  getTotalPeopleChart() {
    var chartDom = document.getElementById('totalpeople');
    var myChart = echarts.init(chartDom);
    var option;

    option = {

      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['Total People Who Viewed'],
        bottom:'bottom',
        icon:'circle'
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '10%',
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
        data: this.totalPeopleWhoViewSpanDates,
        axisLabel: {
          rotate:45,
          
        }
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Total People Who Viewed',
          type: 'line',
          itemStyle: {
            color: 'purple',
          },

          data: this.totalPeopleWhoViewSpanCounts,
        },
      ],
    };

    option && myChart.setOption(option);
  }

  getExternalSourcesChart() {
    type EChartsOption = echarts.EChartsOption;

    var chartDom = document.getElementById('externalsources')!;
    var myChart = echarts.init(chartDom);
    var option: EChartsOption;

    option = {
      color: ['#8063B5', '#ffa800', '#0095ff'],
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'horizontal',
        bottom: 'bottom',
      },
      series: [
        {
          // name: this.externalRefernalsName,
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          data: this.externalRefernalsData,
          emphasis: {
            itemStyle: {
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };

    option && myChart.setOption(option);
  }

  getPublishinBehaviorChart() {
    var chartDom = document.getElementById('publishin');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      color: ['#6441a5 ', '#e7edf1'],
      legend: {
        data: ['Page Posts', 'Users Posts'],
        icon:'circle',
        bottom:0
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        data: this.publishedPegePostSpanDates,
        axisLabel: {
          rotate:45,
          
        }
      },
      yAxis: {
        type: 'value',
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '8%',
        containLabel: true,
      },
      series: [
        {
          name: 'Page Posts',
          data: this.publishedPegePostSpanCounts,
          type: 'bar',
          itemStyle: {
            borderRadius: 5,
          }
        },
        {
          name: 'Users Posts',
          data: this.publishedUserPostSpanCounts,
          type: 'bar',
          itemStyle: {
            borderRadius: 5,
          }
        },
      ],
    };

    option && myChart.setOption(option);
  }

  getChartAudienceEngagement() {
    type EChartsOption = echarts.EChartsOption;

    var chartDom = document.getElementById('engagement');
    var myChart = echarts.init(chartDom);
    var option: EChartsOption;
    option = {
      color: ['#7354AE', '#FA0060', '#00D3A2',],
     
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: ['Likes','Comments','Shares'],
        icon:'circle',
        bottom:0
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '13%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: this.audienceEngagementDates,
          axisLabel: {
            rotate:45,
            
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Likes',
          type: 'line',
       
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#6E4EAC'
              },
              {
                offset: 1,
                color: '#8E75BE'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: this.audineceEngagementTotallikes
        },
        {
          name: 'Comments',
          type: 'line',
        
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#FA0060'
              },
              {
                offset: 1,
                color: '#F05396'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: this.audienceEngagementTotlaComments
        },
        {
          name: 'Shares',
          type: 'line',
       
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#00D3A2'
              },
              {
                offset: 1,
                color: '#5ECFB9'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data:this.audienceEngagmentTotalShare
        },
       
      ]
    };
    
    option && myChart.setOption(option);
   
  }

  getChartAudienceGrowth() {
    type EChartsOption = echarts.EChartsOption;

    var chartDom = document.getElementById('growth');
    var myChart = echarts.init(chartDom);
    var option: EChartsOption;
    option = {
      color: ['#7354AE', '#FA0060',],
    
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: ['likes', 'Unlikes'],
        icon:'circle',
        bottom:0
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '13%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data:  this.audiencelikesdate,
          axisLabel: {
            rotate:45,
            
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'likes',
          type: 'line',
       
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#6E4EAC'
              },
              {
                offset: 1,
                color: '#8E75BE'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data:  this.audiencelikesCounts
        },
        {
          name: 'Unlikes',
          type: 'line',
        
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#FA0060'
              },
              {
                offset: 1,
                color: '#F05396'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: this.audienceunlikesCount
        },
      
   
      ]
    };
    
    option && myChart.setOption(option);
    // option = {
    //   color: ['#b09ed1', '#ee438d'],
    //   tooltip: {
    //     trigger: 'axis',
    //     axisPointer: {
    //       type: 'cross',
    //       label: {
    //         backgroundColor: '#6a7985',
    //       },
    //     },
    //   },
    //   legend: {
    //     data: ['likes', 'Unlikes'],
    //     icon:'circle',
    //     bottom:0
    //   },
    //   toolbox: {
    //     feature: {
    //       // magicType: { show: true, type: ['line', 'bar'] },
    //       saveAsImage: {},
    //     },
    //   },
    //   grid: {
    //     left: '3%',
    //     right: '4%',
    //     bottom: '10%',
    //     containLabel: true,
    //   },
    //   xAxis: [
    //     {
    //       type: 'category',
    //       boundaryGap: false,
    //       data: this.audiencelikesdate,
    //       axisLabel: {
    //         rotate:45,
            
    //       }
    //     },
    //   ],
    //   yAxis: [
    //     {
    //       type: 'value',
    //     },
    //   ],
    //   series: [
    //     {
    //       name: 'likes',
    //       type: 'line',

    //       areaStyle: {},
    //       emphasis: {
    //         focus: 'series',
    //       },
    //       data: this.audiencelikesCounts,
    //     },
    //     {
    //       name: 'Unlikes',
    //       type: 'line',

    //       areaStyle: {},
    //       emphasis: {
    //         focus: 'series'
    //       },
    //       data: this.audienceunlikesCount,
    //     },
    //   ],
    // };

    // option && myChart.setOption(option);
  }
  getDamiChart(){
    var chartDom = document.getElementById('main');
var myChart = echarts.init(chartDom);
var option;

option = {
  color: ['#7354AE', '#FA0060', '#00D3A2',],
  title: {
    text: 'Gradient Stacked Area Chart'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  legend: {
    data: ['Likes','Comments','Shares'],
    icon:'circle',
    bottom:0
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '13%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: this.audienceEngagementDates,
      axisLabel: {
        rotate:45,
        
      }
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: 'Likes',
      type: 'line',
   
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: '#6E4EAC'
          },
          {
            offset: 1,
            color: '#8E75BE'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: this.audineceEngagementTotallikes
    },
    {
      name: 'Comments',
      type: 'line',
    
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: '#FA0060'
          },
          {
            offset: 1,
            color: '#F05396'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: this.audienceEngagementTotlaComments
    },
    {
      name: 'Shares',
      type: 'line',
   
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: '#00D3A2'
          },
          {
            offset: 1,
            color: '#5ECFB9'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data:this.audienceEngagmentTotalShare
    },
    // {
    //   name: 'Line 4',
    //   type: 'line',
    //   stack: 'Total',
    //   smooth: true,
    //   lineStyle: {
    //     width: 0
    //   },
    //   showSymbol: false,
    //   areaStyle: {
    //     opacity: 0.8,
    //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    //       {
    //         offset: 0,
    //         color: 'rgb(255, 0, 135)'
    //       },
    //       {
    //         offset: 1,
    //         color: 'rgb(135, 0, 157)'
    //       }
    //     ])
    //   },
    //   emphasis: {
    //     focus: 'series'
    //   },
    //   data: [220, 402, 231, 134, 190, 230, 120]
    // },
    // {
    //   name: 'Line 5',
    //   type: 'line',
    //   stack: 'Total',
    //   smooth: true,
    //   lineStyle: {
    //     width: 0
    //   },
    //   showSymbol: false,
    //   label: {
    //     show: true,
    //     position: 'top'
    //   },
    //   areaStyle: {
    //     opacity: 0.8,
    //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    //       {
    //         offset: 0,
    //         color: 'rgb(255, 191, 0)'
    //       },
    //       {
    //         offset: 1,
    //         color: 'rgb(224, 62, 76)'
    //       }
    //     ])
    //   },
    //   emphasis: {
    //     focus: 'series'
    //   },
    //   data: [220, 302, 181, 234, 210, 290, 150]
    // }
  ]
};

option && myChart.setOption(option);
  }
  getTopFiveCustomers() {
    let obj = {
      pageNumber: 0,
      pageSize: 0,
      from:this.startDate,
      to: this.enddate
    };
    this.commandataSerivecs.GetfacebookProfile(obj).subscribe((res: any) => {
      this.cutomerdata = res;
      console.log('Top 5 Customer Data==>', res);
    });
  }
  closeToaster() {
    this.toastermessage = false;
  }
  resetStartDate() {
    this.enddate = ''
  }
  resetEndDate() {
    if (this.enddate >= this.startDate) {
      this.getAllfeacebookData()
      
      if (this.radioInput !== undefined) {
        this.radioInput.nativeElement.checked = false;
      }
    }
    else {
      alert("EndDate is greater then StartDate")
      this.enddate = ''
    }
  }
}
