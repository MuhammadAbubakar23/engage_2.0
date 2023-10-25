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
@Component({
  selector: 'app-twitter-report',
  templateUrl: './twitter-report.component.html',
  styleUrls: ['./twitter-report.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, NgxSpinnerModule],
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


  fromDate: string = '';
  toDate: string = '';
  maxEndDate: any;
  downloading = false;
  toastermessage = false;
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
  }
    var body = {
      fromDate: this.fromDate,
      toDate: this.toDate,
      profileId: '1682035592165740551',
    };
    if (this.toDate >= this.fromDate) {
      this.SpinnerService.show();
      this.commonDataService.GetTwitterReport(body).subscribe((res) => {
        this.SpinnerService.hide();
        this.TwitterReport = res;
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
        console.log(res);

        if (this.allDates.length === 0) {
          this.noData = true;
        } else {
          this.noData = false;
        }

        this.populateInboundOutboundGraph();
        this.populateTypesOfQueriesGraph();
        this.populateTweetingBehaviourGraph();
        this.populateOutboundGraph();
      });
    } else {
      alert('End Date is less than Start Date');
    }
  }

  populateInboundOutboundGraph() {
    type EChartsOption = echarts.EChartsOption;

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
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
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
      },
      yAxis: {
        type: 'value',
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
        left: 'center'
      },
      series: [
        {
          name: 'Access From',
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
            { value: this.totalPlainTextPercentage, name: 'Plain Text' },
            { value: this.totalVideoQueryPercentage, name: 'Videos' },
            { value: this.totalImageQueryPercentage, name: 'Photos' }
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
        left: 'center'
      },
      series: [
        {
          name: 'Access From',
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
            { value: this.totalTweetsSentPercentage, name: 'Tweets' },
            { value: this.totalDmSentPercentage, name: 'DMs' },
            { value: this.totalMentionSentPercentage, name: 'Mentions' }
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
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
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
      },
      yAxis: {
        type: 'value',
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
  resetEndDate() {
    this.toDate = '';
  }
  export() {
    
    this.excelServices.exportAsExcelFile(this.TwitterProfileWiseReport, 'Twitter-Report')
  }
}
