import { CommonModule, DatePipe } from '@angular/common';
import {
  AfterContentChecked,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import * as echarts from 'echarts';
import { HeaderService } from 'src/app/shared/services/header.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ExcelService } from '../../services/excel.service';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
@Component({
  selector: 'app-twitter-report',
  templateUrl: './twitter-report.component.html',
  styleUrls: ['./twitter-report.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, NgxSpinnerModule, LayoutsModule],
})
export class TwitterReportComponent implements OnInit {
  @ViewChild('TwitterInboundOutboundReport', { static: true })
  TwitterInboundOutboundReport!: ElementRef;
  @ViewChild('TypesOfQueriesReport', { static: true })
  TypesOfQueriesReport!: ElementRef;
  @ViewChild('TweetingBehaviourReport', { static: true })
  TweetingBehaviourReport!: ElementRef;
  @ViewChild('OutboundReport', { static: true })
  OutboundReport!: ElementRef;
  @ViewChild(' radioInput5', { static: false })
  radioInput5!: ElementRef;
  @ViewChild(' radioInput10', { static: false })
  radioInput10!: ElementRef
  @ViewChild(' radioInput20', { static: false })
  radioInput20!: ElementRef
  @ViewChild(' radioInput30', { static: false })
  radioInput30!: ElementRef
  fromDate: string = '';
  toDate: string = '';
  maxEndDate: any;
  downloading = false;
  toastermessage = false;
  isShowConversation: boolean = false
  isShowEngagement: boolean = false
  AlterMsg: any = '';
  TwitterReport: any;
  TwitterSLAReport: any;
  TwitterProfileWiseReport: any;
  totalTweetsSent: number = 0;
  totalTweetReceived: number = 0;
  totalDmSent: number = 0;
  totalDmReceived: number = 0;
  totalMentionSent: number = 0;
  totalMentionReceived: number = 0;
  totalReplies: number = 0;
  noData = false;
  TweetsSentGraph: any[] = [];
  TweetsReceivedGraph: any[] = [];
  DMSentGraph: any[] = [];
  DMReceivedGraph: any[] = [];
  MentionsSentGraph: any[] = [];
  MentionsReceivedGraph: any[] = [];
  TotalRepliesGraph: any[] = [];
  allDates: any[] = [];

  totalPlainTextPercentage: number = 0;
  totalVideoQueryPercentage: number = 0;
  totalImageQueryPercentage: number = 0;
  totalTweetsSentPercentage: number = 0;
  totalDmSentPercentage: number = 0;
  totalMentionSentPercentage: number = 0;
  TweetsSentDto: {
    text: string,
    icon: string,
    bgColor: string,
  }[] = []
  // slatotalMentionReceived: number = 0
  // slalastTotalMentionReceived: number = 0
  // slaTotalMentionPersentage: number = 0
  // slaTotalMentionSent:number=0;
  // slaLastTotalMentionSent:number=0;
  // SlaTotalMentionSentPresentage:number=0
  // slaSentIncreasedorDecreased:number=0;
  // chageDiference: number = 0
  // slaIncreasedordecreased: number = 0
  slatotalMentionRecived: number = 0
  slatotalReplysent: number = 0
  slatotalDMsent: number = 0
  slatotalMentionSent: number = 0
  slatotalTweetsSent: number = 0
  slatotalTweetsRecived: number = 0
  slatotalDMReceived: number = 0
  slalastTotalDMRecived: number = 0

  slalastTotalMentionReceived: number = 0
  slalastTotalReplySent: number = 0
  slalastTotalDMSent: number = 0
  slalastTotalMentionSent: number = 0
  slalastTotalTweetsSent: number = 0
  slalastTotalTweetsRecived: number = 0
  persentageofTweetSent: number = 0
  SumofTwettsandDMSent: number = 0
  SumofLastTwettsandDMSent: number = 0
  SumoftotalTweetsandDMrecevied: number = 0
  SumoflastTotalTweetsandDMRecevied: number = 0
  persentageofTweetsRecevied: number = 0
  sumofTotalEngagementMetrics: number = 0
  sumoflastTotalEngagementMetrics: number = 0
  EnagementMetricepersentage: number = 0
  chart: any;
  tweetsInboundOutboundGraph: any;
  OutboundGraph: any;
  QueryTypeChart: any;
  OutboundQueriesChart: any;

  constructor(private _hS: HeaderService,
    private commonDataService: CommonDataService,
    private excelServices: ExcelService,
    private datePipe: DatePipe,
    private SpinnerService: NgxSpinnerService
  ) { }

  ngOnInit(): void {

    const newObj = { title: 'Twitter Report', url: '/analytics/twitter-report' };
    this._hS.setHeader(newObj);
    const currentDate = new Date();
    this.maxEndDate = currentDate.toISOString().split('T')[0];

    this.GetTwitterReport();
    // this.GetTwitterSLAReport();
    this.GetTwitterProfileWiseReport();
  }
  date_pagination(days: number) {

    let currentDate = new Date();
    let prevDate = currentDate.setDate(currentDate.getDate() - days);
    this.fromDate = this.datePipe.transform(prevDate, 'YYYY-MM-dd') || '';
    this.toDate = this.datePipe.transform(new Date(), 'YYYY-MM-dd') || '';
    this.GetTwitterReport()
  }

  GetTwitterReport() {
    this.totalTweetsSent = 0;
    this.totalTweetReceived = 0;
    this.totalDmSent = 0;
    this.totalDmReceived = 0;
    this.totalMentionSent = 0;
    this.totalMentionReceived = 0;
    this.totalReplies = 0;

    this.TweetsSentGraph = [];
    this.TweetsReceivedGraph = [];
    this.DMSentGraph = [];
    this.DMReceivedGraph = [];
    this.MentionsSentGraph = [];
    this.MentionsReceivedGraph = [];
    this.TotalRepliesGraph = [];
    this.allDates = [];
    this.totalPlainTextPercentage = 0;
    this.totalVideoQueryPercentage = 0;
    this.totalImageQueryPercentage = 0;

    this.totalTweetsSentPercentage = 0;
    this.totalDmSentPercentage = 0;
    this.totalMentionSentPercentage = 0;
    this.SumofTwettsandDMSent = 0
    this.persentageofTweetSent = 0

    this.SumoftotalTweetsandDMrecevied = 0
    this.SumoflastTotalTweetsandDMRecevied = 0
   this.sumofTotalEngagementMetrics=0
   this.sumoflastTotalEngagementMetrics=0
    if (this.toDate == '' && this.fromDate == '') {
      let currentDate = new Date();
      let prevDate = currentDate.setDate(currentDate.getDate() - 6);
      this.fromDate = this.datePipe.transform(prevDate, 'YYYY-MM-dd') || '';

      this.toDate = this.datePipe.transform(new Date(), 'YYYY-MM-dd') || '';
    } else if (this.fromDate != '' && this.toDate != '') {
      // this.toDate = this.toDate.split('T')[0];
      // this.fromDate = this.fromDate.split('T')[0];
      // this.fromDate = this.fromDate;
      // this.toDate = this.toDate;
      // }
      const startDateObj = new Date(this.fromDate);
      const endDateObj = new Date(this.toDate);
      const timeDiff = Math.abs(endDateObj.getTime() - startDateObj.getTime());
      const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      if (diffDays > 30) {
        alert('Select a date range of 30 days or less');
        return;
      }
      if (this.radioInput5 !== undefined) {
        this.radioInput5.nativeElement.checked = false
      }
    }
    var body = {
      fromDate: this.fromDate,
      toDate: this.toDate,
      profileId: '539038993',

    };
    if (this.toDate >= this.fromDate) {
      this.SpinnerService.show();
      this.commonDataService.GetTwitterReport(body).subscribe((res) => {
        this.SpinnerService.hide();

        this.TwitterReport = res;
        
        // calculate SLA for twitter Report
        this.slatotalMentionRecived = this.TwitterReport.totalMentionReceived
        this.slatotalReplysent = this.TwitterReport.totalReplySent
        this.slatotalDMsent = this.TwitterReport.totalDMSent
        this.slatotalDMReceived = this.TwitterReport.totalDMRecevied
        this.slatotalMentionSent = this.TwitterReport.totalMentionSent
        this.slatotalTweetsSent = this.TwitterReport.totalTweetsSend
        this.slatotalTweetsRecived = this.TwitterReport.totalTweetsReceived
        this.SumofTwettsandDMSent = this.slatotalDMsent + this.slatotalTweetsSent
        this.SumoftotalTweetsandDMrecevied = this.slatotalTweetsRecived + this.slatotalDMReceived
        this.sumofTotalEngagementMetrics = this.slatotalMentionRecived + this.slatotalDMsent + this.slatotalDMReceived + this.slatotalMentionSent + this.slatotalTweetsSent + this.slatotalTweetsRecived
        // last total
        
        this.slalastTotalMentionReceived = this.TwitterReport.lastTotalMentionReceived
        this.slalastTotalReplySent = this.TwitterReport.lastTotalReplySent
        this.slalastTotalDMSent = this.TwitterReport.lastTotalDMSent
        this.slalastTotalDMRecived = this.TwitterReport.lastTotalDMRecevied
        this.slalastTotalMentionSent = this.TwitterReport.lastTotalMentionSent
        this.slalastTotalTweetsSent = this.TwitterReport.lastTotalTweetsSend
        this.slalastTotalTweetsRecived = this.TwitterReport.lastTotalTweetsReceived
        this.SumoflastTotalTweetsandDMRecevied = this.slalastTotalTweetsRecived + this.slalastTotalDMRecived
        this.SumofLastTwettsandDMSent = this.slalastTotalDMSent + this.slalastTotalTweetsSent
        this.sumoflastTotalEngagementMetrics = this.slalastTotalMentionReceived + this.slalastTotalDMRecived + this.slalastTotalMentionSent + this.slalastTotalTweetsSent + this.slalastTotalTweetsRecived + this.slalastTotalDMSent

        if (this.SumoflastTotalTweetsandDMRecevied == 0) {
          this.persentageofTweetsRecevied = 100
        }
        
        else {
          this.persentageofTweetsRecevied = Number(((this.SumoftotalTweetsandDMrecevied / this.SumoflastTotalTweetsandDMRecevied) * 100).toFixed(2))
        }


     

        if (this.SumofLastTwettsandDMSent == 0) {
     
          this.persentageofTweetSent = 100

        }
        else if (this.SumofTwettsandDMSent == 0) {
          this.persentageofTweetSent = 100
        }
        else if (this.SumofLastTwettsandDMSent == this.SumofTwettsandDMSent) {
          this.persentageofTweetSent = 0
        }
        else {
          this.persentageofTweetSent = Number(((this.SumofTwettsandDMSent / this.SumofLastTwettsandDMSent) * 100).toFixed(2))
        }
        // calculate Enagement of twitter Report
        if (this.sumofTotalEngagementMetrics == 0) {
          this.EnagementMetricepersentage = 100
        }
        else if (this.sumoflastTotalEngagementMetrics == 0) {
          this.EnagementMetricepersentage = 100
        }
        else if (this.sumofTotalEngagementMetrics == this.sumoflastTotalEngagementMetrics) {
          this.EnagementMetricepersentage = 0
        }
        else {
          this.EnagementMetricepersentage = Number(((this.sumofTotalEngagementMetrics / this.sumoflastTotalEngagementMetrics) * 100).toFixed(2))
        }
        // sum of Recevied Tweets and DMS

 

        this.TwitterReport.dateWise.forEach((data: any) => {
          if (!this.allDates.includes(data.date)) {

            this.allDates.push(this.datePipe.transform(data.date, 'dd MMM'));
          }

          this.totalTweetsSent += data.tweetSent;
          this.totalTweetReceived += data.tweetReceived;
          this.totalDmSent += data.dmSent;
          this.totalDmReceived += data.dmReceived;
          this.totalMentionSent += data.mentionSent;
          this.totalMentionReceived += data.mentionReceived;
          this.totalReplies += data.replies;

          this.TweetsSentGraph.push(data.tweetSent);
          this.TweetsReceivedGraph.push(data.tweetReceived);
          this.DMSentGraph.push(data.dmSent);
          this.DMReceivedGraph.push(data.dmReceived);
          this.MentionsSentGraph.push(data.mentionSent);
          this.MentionsReceivedGraph.push(data.mentionReceived);
          this.TotalRepliesGraph.push(data.replies);
        });
        var totalTypesOfQueries = this.TwitterReport?.totalPlainText + this.TwitterReport?.totalVideoQuery + this.TwitterReport?.totalImageQuery;
        if (totalTypesOfQueries > 0) {
          this.totalPlainTextPercentage = (this.TwitterReport?.totalPlainText / totalTypesOfQueries) * 100;
          this.totalVideoQueryPercentage = (this.TwitterReport?.totalVideoQuery / totalTypesOfQueries) * 100;
          this.totalImageQueryPercentage = (this.TwitterReport?.totalImageQuery / totalTypesOfQueries) * 100;
        }

        var totalOutboundQueries = this.totalTweetsSent + this.totalDmSent + this.totalMentionSent;
        if (totalOutboundQueries > 0) {
          this.totalTweetsSentPercentage = (this.totalTweetsSent / totalOutboundQueries) * 100;
          this.totalDmSentPercentage = (this.totalDmSent / totalOutboundQueries) * 100;
          this.totalMentionSentPercentage = (this.totalMentionSent / totalOutboundQueries) * 100;
        }


        if (this.allDates.length == 0) {
          this.isShowConversation = true
        }
        this.populateInboundOutboundGraph();
        this.populateTypesOfQueriesGraph();
        this.populateTweetingBehaviourGraph();
        this.populateOutboundGraph();
      });

    } else {
      alert('End Date is less than Start Date');
    }

    this.GetTwitterProfileWiseReport()
  }

  populateInboundOutboundGraph() {
    type EChartsOption = echarts.EChartsOption;
    if (this.isShowConversation == false) {
      const dom = document.getElementById('TwitterInboundOutboundReport');
      const myChart = echarts.init(dom, null, {
        renderer: 'canvas',
        useDirtyRect: false,
      });
      var option: EChartsOption;

      option = {
        title: {
          text: '',
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: [
            'Tweets Sent',
            'DMs Sent',
            'Mentions Sent',
            'Tweets Received',
            'DMs Received',
            'Mentions Received',
          ],
          icon: 'circle',
          bottom: 'bottom'
        },
        grid: {
          left: '10%',
          right: '4%',
          bottom: '13%',
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
          nameLocation: 'middle',
          name: 'Total Number of Inbound/Outbound',
          nameTextStyle: {
            fontSize: 12,
            color: 'grey',
            lineHeight: 80,
          },
        },
        series: [
          {
            name: 'Tweets Sent',
            type: 'line',
            data: this.TweetsSentGraph,
          },
          {
            name: 'DMs Sent',
            type: 'line',
            data: this.DMSentGraph,
          },
          {
            name: 'Mentions Sent',
            type: 'line',
            data: this.MentionsSentGraph,
          },
          {
            name: 'Tweets Received',
            type: 'line',
            data: this.TweetsReceivedGraph,
          },
          {
            name: 'DMs Received',
            type: 'line',
            data: this.DMReceivedGraph,
          },
          {
            name: 'Mentions Received',
            type: 'line',
            data: this.MentionsReceivedGraph,
          },
        ],
      };

      option && myChart.setOption(option);
    }

  }
  populateTypesOfQueriesGraph() {

    type EChartsOption = echarts.EChartsOption;

    const dom = document.getElementById('TypesOfQueriesReport');
    const myChart = echarts.init(dom, null, {
      renderer: 'canvas',
      useDirtyRect: false,
    });
    var option: EChartsOption;

    option = {
      title: {
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        // orient: 'vertical',
        bottom: -5,
        left: 'center',
        icon: 'circle',

      },
      series: [
        {
          name: 'Your Tweets',
          type: 'pie',
          radius: ['50%', '70%'],
          label: {
            show: true,
            formatter(param) {
              // correct the percentage
              return param.name + ' (' + param.value + '%)';
            }
          },
          color: ['#5a3692', '#f41665', '#36cca2', '#fceea4'],
          data: [
            { value: Number(this.totalPlainTextPercentage.toFixed(2)), name: 'Plain Text' },
            { value: Number(this.totalVideoQueryPercentage.toFixed(2)), name: 'Videos' },
            { value: Number(this.totalImageQueryPercentage.toFixed(2)), name: 'Photos' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    option && myChart.setOption(option);
  }

  populateTweetingBehaviourGraph() {
    type EChartsOption = echarts.EChartsOption;

    const dom = document.getElementById('TweetingBehaviourReport');
    const myChart = echarts.init(dom, null, {
      renderer: 'canvas',
      useDirtyRect: false,
    });
    var option: EChartsOption;

    option = {
      title: {
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        // orient: 'vertical',
        bottom: -5,
        left: 'center',
        icon: 'circle',
      },
      series: [
        {
          name: 'Your Tweets',
          type: 'pie',
          radius: ['50%', '70%'],
          color: ['#5a3692', '#f41665', '#36cca2', '#fceea4'],
          label: {
            show: true,
            formatter(param) {
              // correct the percentage
              return param.name + ' (' + param.value + '%)';
            }
          },
          data: [
            { value: Number(this.totalTweetsSentPercentage.toFixed(2)), name: 'Tweets' },
            { value: Number(this.totalDmSentPercentage.toFixed(2)), name: 'DMs' },
            { value: Number(this.totalMentionSentPercentage.toFixed(2)), name: 'Mentions' },

          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    option && myChart.setOption(option);
  }
  populateOutboundGraph() {
    if (this.isShowConversation == false) {
      type EChartsOption = echarts.EChartsOption;

      const dom = document.getElementById('OutboundReport');
      const myChart = echarts.init(dom, null, {
        renderer: 'canvas',
        useDirtyRect: false,
      });
      var option: EChartsOption;

      option = {
        title: {
          text: '',
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: [
            'Replies',
            'Tweets Sent'
          ],
          icon: 'circle',
          bottom: 'bottom',

        },
        grid: {
          left: '10%',
          right: '4%',
          bottom: '13%',
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
          nameLocation: 'middle',
          name: 'Total Number of Outbound',
          nameTextStyle: {
            fontSize: 12,
            color: 'grey',
            lineHeight: 80,
          },
        },
        series: [
          {
            name: 'Replies',
            type: 'line',
            data: this.TotalRepliesGraph,
          },
          {
            name: 'Tweets Sent',
            type: 'line',
            data: this.TweetsSentGraph,
          }
        ],
      };

      option && myChart.setOption(option);
    }


  }

  GetTwitterSLAReport() {
    var body = {
      fromDate: this.fromDate,
      toDate: this.toDate,
      profileId: '1682035592165740551',
    };
    this.SpinnerService.show();
    this.commonDataService.GetTwitterSLAReport(body).subscribe((res) => {
      this.SpinnerService.hide();
      this.TwitterSLAReport = res;
    });
  }

  GetTwitterProfileWiseReport() {
    var body = {
      pageNumber: 0,
      pageSize: 0,
      from: this.fromDate,
      to: this.toDate
    };
    this.SpinnerService.show();
    this.commonDataService
      .GetTwitterProfileWiseReport(body)
      .subscribe((res) => {
        this.SpinnerService.hide();
        this.TwitterProfileWiseReport = res;
      });
  }
  closeToaster() {
    this.toastermessage = false;
  }
  resetStartDate() {
    this.toDate = ''
  }
  resetEndDate() {
    if (this.toDate >= this.fromDate) {

      if (this.radioInput5 !== undefined) {
        this.radioInput5.nativeElement.checked = false
      }
      if (this.radioInput10 !== undefined) {
        this.radioInput10.nativeElement.checked = false
      }
      if (this.radioInput20 !== undefined) {
        this.radioInput20.nativeElement.checked = false
      }
      if (this.radioInput30 !== undefined) {
        this.radioInput30.nativeElement.checked = false
      }
      this.GetTwitterReport()
      this.GetTwitterProfileWiseReport()
    }
    else {
      alert("StartDate is greater then EndDate")
      this.toDate = ''
    }
  }
  export() {
    this.excelServices.exportAsExcelFile(this.TwitterProfileWiseReport, 'Twitter-Report')
  }
}
