import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/shared/services/header.service';
import * as echarts from 'echarts';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
@Component({
  selector: 'app-executive-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './executive-dashboard.component.html',
  styleUrls: ['./executive-dashboard.component.scss']
})
export class ExecutiveDashboardComponent implements OnInit {

  startDate: string = ''
  endDate: string = ''
  maxEndDate: any;
  social_media_report: any
  inbound_traffic: any
  sentimental_analysis: any
  date_Audience: any
  post_likes: any
  post_comments: any
  post_share: any
  facebook_reaction: any
  constructor(private _hS: HeaderService,
    private commonDataService: CommonDataService,
    private datePipe: DatePipe,) { }

  ngOnInit(): void {
    const newObj = { title: 'Executive Dashboard', url: '/analytics/executive-dashboard' };
    this._hS.setHeader(newObj);
    const currentDate = new Date();
    this.maxEndDate = currentDate.toISOString().split('T')[0];
    this.getEnagementChart()
    this.getRefionWiseTrafic()
    this.GetAllSocialMediaReport()
  }
  GetAllSocialMediaReport() {
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
    const requestData = {
      pageId: "622038187854126",
      from: "2023-09-15",
      to: "2023-10-05",
    };
    this.inbound_traffic = []
    this.sentimental_analysis = []
    this.date_Audience = []
    this.post_comments = []
    this.post_likes = []
    this.post_share = []
    this.facebook_reaction = [];

    if (this.startDate <= this.endDate) {
      this.commonDataService.GetAllSocialMatrics(requestData).subscribe((res: any) => {
        this.social_media_report = res

        const inBoundTrafficDto = this.social_media_report.inBoundTrafficDto;
        inBoundTrafficDto.forEach((data: any) => {
          const date = new Date(data.date);
          this.inbound_traffic.push({ x: date, y: data.totalCount });
        });
        // sentiments
        const sentimentsAnalysisDto = this.social_media_report.sentimentsAnalysisDto;
        sentimentsAnalysisDto.forEach((data: any) => {
          const sentimentName = data.sentimentName;
          const totalSentiments = data.totalSentiments;
          this.sentimental_analysis.push({ name: sentimentName, value: totalSentiments });
        });
        // Audience Chart

        this.social_media_report.facebookReportResponseDto.postLikeSpan?.forEach((data: any) => {
          debugger
          this.post_likes.push(data.activityCount);
          if (!this.date_Audience.includes(data.dateValue)) {
            this.date_Audience.push(data.dateValue)
          }
        });
        this.social_media_report.facebookReportResponseDto.postShareSpan?.forEach((data: any) => {
          this.post_share.push(data.activityCount);
          if (!this.date_Audience.includes(data.dateValue)) {
            this.date_Audience.push(data.dateValue)
          }
        });
        this.social_media_report.facebookReportResponseDto.postCommentSpan?.forEach((data: any) => {
          this.post_comments.push(data.activityCount);
          if (!this.date_Audience.includes(data.dateValue)) {
            this.date_Audience.push(data.dateValue)
          }
        });
        // facebook Reaction 
        const pageReactionsSpan = this.social_media_report.facebookReportResponseDto.pageReactionsSpan;
        debugger
        pageReactionsSpan?.forEach((data: any) => {
          const date = (data.totalReactionsDateValue);
          this.facebook_reaction.push(data.like + data.love + data.wow + data.haha + data.sorry + data.anger + data.sad + data.tHANKFUL + data.pride + data.cARE);
        });
        this.getChartInbound()
        this.getSentimentChart()
        this.getChartAudienceEngagement()
        this.getFacebookReaction()
      })

    } else {
      alert('select end date greater then start date')
    }

  }

  getChartInbound() {
    type EChartsOption = echarts.EChartsOption;
    var chartDom = document.getElementById('inbound')!;
    var myChart = echarts.init(chartDom);
    var option: EChartsOption;
    function dataFormat(date: Date): string {
      const day: number = date.getDate();
      const monthNames: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const month: string = monthNames[date.getMonth()];
      return `${day} ${month}`;
    }
    option = {
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
        data: ['Inbound']
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: this.inbound_traffic.map((item: any) => dataFormat(item.x)),
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Email',
          type: 'line',

          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: this.inbound_traffic.map((item: any) => item.y),
        },


      ]
    };

    option && myChart.setOption(option);
  }
  getChartAudienceEngagement() {
    debugger
    type EChartsOption = echarts.EChartsOption;
    var chartDom = document.getElementById('audience')!;
    var myChart = echarts.init(chartDom);
    var option: EChartsOption;

    option = {

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
        data: ['Likes', 'Comments', 'Share', 'Tweets', 'Search Engine']
      },
      toolbox: {
        feature: {
          // magicType: { show: true, type: ['line', 'bar'] },
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: this.date_Audience
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

          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: this.post_likes
        },
        {
          name: 'Comments',
          type: 'line',

          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: this.post_comments
        },
        {
          name: 'Share',
          type: 'line',

          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: this.post_share
        },


      ]
    };
    option && myChart.setOption(option);

  }
  getEnagementChart() {
    var app = {};

    var chartDom = document.getElementById('enagement');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      legend: {},
      tooltip: {},
      dataset: {
        dimensions: ['product', '2015', '2016', '2017'],
        source: [
          { product: 'Matcha Latte', 2015: 43.3, 2016: 85.8, 2017: 93.7 },
          { product: 'Milk Tea', 2015: 83.1, 2016: 73.4, 2017: 55.1 },
          { product: 'Cheese Cocoa', 2015: 86.4, 2016: 65.2, 2017: 82.5 },
          { product: 'Walnut Brownie', 2015: 72.4, 2016: 53.9, 2017: 39.1 }
        ]
      },
      xAxis: { type: 'category' },
      yAxis: {},
      // Declare several bar series, each will be mapped
      // to a column of dataset.source by default.
      series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
    };

    option && myChart.setOption(option);
  }
  getSentimentChart() {
    type EChartsOption = echarts.EChartsOption;

    var chartDom = document.getElementById('main')!;
    var myChart = echarts.init(chartDom);
    var option: EChartsOption;

    option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)',
      },
      legend: {
        top: '5%',
        left: 'center',
      },
      series: [
        {
          name: 'Sentiments Analysis',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 16,
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: this.sentimental_analysis,
        },
      ],
    };

    option && myChart.setOption(option);
  }
  getFacebookReaction() {
    type EChartsOption = echarts.EChartsOption;

    var chartDom = document.getElementById('facebookReaction')!;
    var myChart = echarts.init(chartDom);
    var option: EChartsOption;

    option = {
      color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],

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
        data: ['Line 1']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Line 1',
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
                color: 'rgb(128, 255, 165)'
              },
              {
                offset: 1,
                color: 'rgb(1, 191, 236)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: this.facebook_reaction
        }
      ]
    };

    option && myChart.setOption(option);
  }
  getRefionWiseTrafic() {
    type EChartsOption = echarts.EChartsOption;

    var chartDom = document.getElementById('regionWiseTrafic')!;
    var myChart = echarts.init(chartDom);
    var option: EChartsOption;

    option = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
        }
      ]
    };

    option && myChart.setOption(option);

  }
  isMediaActive: boolean = false;
  toggleMediaTab() {
    this.isMediaActive = !this.isMediaActive;
  }
  resetEndDate() {
    this.endDate = "";
  }
}
