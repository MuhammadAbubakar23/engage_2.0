import { CommonModule, DatePipe } from '@angular/common';
import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewInit,
  Component,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';

@Component({
  selector: 'app-twitter-report',
  templateUrl: './twitter-report.component.html',
  styleUrls: ['./twitter-report.component.scss'],
  standalone: true,
  imports: [CommonModule, CanvasJSAngularChartsModule, FormsModule],
})
export class TwitterReportComponent implements OnInit, AfterContentChecked {

  fromDate:string="";
  toDate:string="";

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

  TweetsSentGraph: any[] = [];
  TweetsReceivedGraph: any[] = [];
  DMSentGraph: any[] = [];
  DMReceivedGraph: any[] = [];
  MentionsSentGraph: any[] = [];
  MentionsReceivedGraph: any[] = [];
  TotalRepliesGraph: any[] = [];

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

  constructor(private commonDataService: CommonDataService,
    private datePipe: DatePipe,) {}

  ngOnInit(): void {
    this.GetTwitterReport();
    this.GetTwitterSLAReport();
    this.GetTwitterProfileWiseReport();
  }

  ngAfterContentChecked(): void {
    this.tweetsInboundOutboundGraph = {
      animationEnabled: true,
      theme: 'light2',
      title: {
        text: '',
      },
      axisX: {
        valueFormatString: 'D MMM',
      },
      axisY: {
        title: '',
      },
      toolTip: {
        shared: true,
      },
      legend: {
        cursor: 'pointer',
        itemclick: function (e: any) {
          if (
            typeof e.dataSeries.visible === 'undefined' ||
            e.dataSeries.visible
          ) {
            e.dataSeries.visible = false;
          } else {
            e.dataSeries.visible = true;
          }
          e.chart.render();
        },
      },
      data: [
        {
          type: 'line',
          showInLegend: true,
          name: 'Tweets Sent',
          xValueFormatString: 'MMM DD, YYYY',
          dataPoints: this.TweetsSentGraph,
        },
        {
          type: 'line',
          showInLegend: true,
          name: 'DMs Sent',
          dataPoints: this.DMSentGraph,
        },
        {
          type: 'line',
          showInLegend: true,
          name: 'Mentions Sent',
          dataPoints: this.MentionsSentGraph,
        },
        {
          type: 'line',
          showInLegend: true,
          name: 'Tweets Received',
          xValueFormatString: 'MMM DD, YYYY',
          dataPoints: this.TweetsReceivedGraph,
        },
        {
          type: 'line',
          showInLegend: true,
          name: 'DMs Received',
          dataPoints: this.DMReceivedGraph,
        },
        {
          type: 'line',
          showInLegend: true,
          name: 'Mentions Received',
          dataPoints: this.MentionsReceivedGraph,
        },
      ],
    };

    this.OutboundGraph = {
      animationEnabled: true,
      theme: 'light2',
      title: {
        text: '',
      },
      axisX: {
        valueFormatString: 'D MMM',
      },
      axisY: {
        title: '',
      },
      toolTip: {
        shared: true,
      },
      legend: {
        cursor: 'pointer',
        itemclick: function (e: any) {
          if (
            typeof e.dataSeries.visible === 'undefined' ||
            e.dataSeries.visible
          ) {
            e.dataSeries.visible = false;
          } else {
            e.dataSeries.visible = true;
          }
          e.chart.render();
        },
      },
      data: [
        {
          type: 'line',
          showInLegend: true,
          name: 'Replies',
          xValueFormatString: 'MMM DD, YYYY',
          dataPoints: this.TotalRepliesGraph,
        },
        {
          type: 'line',
          showInLegend: true,
          name: 'Tweets Sent',
          xValueFormatString: 'MMM DD, YYYY',
          dataPoints: this.TweetsSentGraph,
        },
      ],
    };
    this.QueryTypeChart = {
      animationEnabled: true,
      title: {
        text: '',
      },
      data: [
        {
          type: 'doughnut',
          yValueFormatString: "#,###.##'%'",
          indexLabel: '{name}',
          dataPoints: [
            { y: this.totalPlainTextPercentage, name: 'Plain Text' },
            { y: this.totalVideoQueryPercentage, name: 'Videos' },
            { y: this.totalImageQueryPercentage, name: 'Photos' },
          ],
        },
      ],
    };

    this.OutboundQueriesChart = {
      animationEnabled: true,
      title: {
        text: '',
      },
      data: [
        {
          type: 'doughnut',
          yValueFormatString: "#,###.##'%'",
          indexLabel: '{name}',
          dataPoints: [
            { y: this.totalTweetsSentPercentage, name: 'Tweets' },
            { y: this.totalDmSentPercentage, name: 'DMs' },
            { y: this.totalMentionSentPercentage, name: 'Mentions' },
          ],
        },
      ],
    };
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

  this.totalPlainTextPercentage = 0;
  this.totalVideoQueryPercentage = 0;
  this.totalImageQueryPercentage = 0;

  this.totalTweetsSentPercentage = 0;
  this.totalDmSentPercentage = 0;
  this.totalMentionSentPercentage = 0;

    debugger
    if(this.toDate == "" && this.fromDate == ""){
      let currentDate = new Date();
      let prevDate = currentDate.setDate(currentDate.getDate() - 6);
      const fromDate = this.datePipe.transform(prevDate, 'YYYY-MM-dd') + 'T00:00:00.000Z';
      this.fromDate = fromDate;

      this.toDate = this.datePipe.transform(new Date(), 'YYYY-MM-dd') + 'T23:59:59.999Z';
    } else if (this.fromDate != "" && this.toDate != ""
    ) {
      this.fromDate = this.fromDate + 'T00:00:00.000Z';
      this.toDate = this.toDate + 'T23:59:59.999Z';
    }
    var body = {
      fromDate: this.fromDate,
      toDate: this.toDate,
      profileId: '1682035592165740551',
    };
    this.commonDataService.GetTwitterReport(body).subscribe((res) => {
      this.TwitterReport = res;
      this.TwitterReport.dateWise.forEach((data: any) => {
        this.totalTweetsSent += data.tweetSent;
        this.totalTweetReceived += data.tweetReceived;
        this.totalDmSent += data.dmSent;
        this.totalDmReceived += data.dmReceived;
        this.totalMentionSent += data.mentionSent;
        this.totalMentionReceived += data.mentionReceived;
        this.totalReplies += data.replies;

        this.TweetsSentGraph.push({
          x: new Date(data.date.split('T')[0]),
          y: data.tweetSent,
        });
        this.TweetsReceivedGraph.push({
          x: new Date(data.date.split('T')[0]),
          y: data.tweetReceived,
        });
        this.DMSentGraph.push({
          x: new Date(data.date.split('T')[0]),
          y: data.dmSent,
        });
        this.DMReceivedGraph.push({
          x: new Date(data.date.split('T')[0]),
          y: data.dmReceived,
        });
        this.MentionsSentGraph.push({
          x: new Date(data.date.split('T')[0]),
          y: data.mentionSent,
        });
        this.MentionsReceivedGraph.push({
          x: new Date(data.date.split('T')[0]),
          y: data.mentionReceived,
        });
        this.TotalRepliesGraph.push({
          x: new Date(data.date.split('T')[0]),
          y: data.replies,
        });
      });
      var totalTypesOfQueries =
        this.TwitterReport?.totalPlainText +
        this.TwitterReport?.totalVideoQuery +
        this.TwitterReport?.totalImageQuery;
      this.totalPlainTextPercentage =
        (this.TwitterReport?.totalPlainText / totalTypesOfQueries) * 100;
      this.totalVideoQueryPercentage =
        (this.TwitterReport?.totalVideoQuery / totalTypesOfQueries) * 100;
      this.totalImageQueryPercentage =
        (this.TwitterReport?.totalImageQuery / totalTypesOfQueries) * 100;

      var totalOutboundQueries =
        this.totalTweetsSent + this.totalDmSent + this.totalMentionSent;
      this.totalTweetsSentPercentage =
        (this.totalTweetsSent / totalOutboundQueries) * 100;
      this.totalDmSentPercentage =
        (this.totalDmSent / totalOutboundQueries) * 100;
      this.totalMentionSentPercentage =
        (this.totalMentionSent / totalOutboundQueries) * 100;

      console.log(res);
    });
  }

  GetTwitterSLAReport() {
    if(this.toDate == "" && this.fromDate == ""){
      let currentDate = new Date();
      let prevDate = currentDate.setDate(currentDate.getDate() - 6);
      const fromDate = this.datePipe.transform(prevDate, 'YYYY-MM-dd') + 'T00:00:00.000Z';
      this.fromDate = fromDate;

      this.toDate = this.datePipe.transform(new Date(), 'YYYY-MM-dd') + 'T23:59:59.999Z';
    } else if (this.fromDate != "" && this.toDate != ""
    ) {
      this.fromDate = this.fromDate + 'T00:00:00.000Z';
      this.toDate = this.toDate + 'T23:59:59.999Z';
    }
    var body = {
      fromDate: this.fromDate,
      toDate: this.toDate,
      profileId: '1682035592165740551',
    };
    this.commonDataService.GetTwitterSLAReport(body).subscribe((res) => {
      this.TwitterSLAReport = res;
    });
  }

  GetTwitterProfileWiseReport() {
    var body = {
      pageNumber: 0,
      pageSize: 0,
    };
    this.commonDataService
      .GetTwitterProfileWiseReport(body)
      .subscribe((res) => {
        this.TwitterProfileWiseReport = res;
        console.log(res);
      });
  }
}
