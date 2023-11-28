import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/shared/services/header.service';
import * as echarts from 'echarts';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { CloudData, CloudOptions, ZoomOnHoverOptions } from 'angular-tag-cloud-module';
import { TagCloudComponent } from 'angular-tag-cloud-module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-executive-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, TagCloudComponent, NgxSpinnerModule],
  templateUrl: './executive-dashboard.component.html',
  styleUrls: ['./executive-dashboard.component.scss']
})
export class ExecutiveDashboardComponent implements OnInit {
  zoomOnHoverOptions: ZoomOnHoverOptions = {
    scale: 1.3, // Elements will become 130 % of current zize on hover
    transitionTime: 0.2, // it will take 1.2 seconds until the zoom level defined in scale property has been reached
    delay: 0.2 // Zoom will take affect after 0.8 seconds
  };
  options: CloudOptions = {
    width: 400,
    height: 400,
    overflow: false,
  };
  wordcloudData: any[] = []
  data: any[] = []
  startDate = ''
  endDate = ''
  maxEndDate: any;
  social_media_report: any
  inbound_traffic: any
  sentimental_analysis: any
  date_Audience: any
  post_likes: any
  post_comments: any
  post_share: any
  facebook_reaction: any
  platformsArray: any[] = []
  channelWiseEngagement: any[] = [];
  currentDate: any;
  constructor(private _hS: HeaderService,
    private commonDataService: CommonDataService,
    private spinerService: NgxSpinnerService,
    private datePipe: DatePipe,) { }

  ngOnInit(): void {
    const newObj = { title: 'Executive Dashboard', url: '/analytics/executive-dashboard' };
    this._hS.setHeader(newObj);
    this.currentDate = new Date();
    this.maxEndDate = this.currentDate.toISOString().split("T")[0];
    // this.getEnagementChart()
    // this.getRefionWiseTrafic()
    this.GetAllSocialMediaReport()
  }

  GetAllSocialMediaReport() {
    if (this.startDate == "" && this.endDate == "") {
      const today = this.currentDate;
      this.endDate = this.datePipe.transform(today, "YYYY-MM-dd") || '';
      let prevDate = this.currentDate.setDate(this.currentDate.getDate() - 6);
      this.startDate = this.datePipe.transform(prevDate, "YYYY-MM-dd") || '';
    }
    else if (this.startDate != "" && this.endDate != ""
    ) {
      this.startDate = this.startDate
      this.endDate = this.endDate
    }
    // const startDateObj = new Date(this.startDate);
    // const endDateObj = new Date(this.endDate);
    // const timeDiff = Math.abs(endDateObj.getTime() - startDateObj.getTime());
    // const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    // if (diffDays > 30) {
    //   alert('Select a date range of 30 days or less');
    //   return;
    // }
    // }
    const requestData = {
      pageId: "622038187854126",
      from: this.startDate,
      to: this.endDate,
    };
    this.inbound_traffic = []
    this.sentimental_analysis = []
    this.date_Audience = []
    this.post_comments = []
    this.post_likes = []
    this.post_share = []
    this.facebook_reaction = [];
    this.platformsArray = [];
    if (this.startDate <= this.endDate) {
      this.spinerService.show()
      this.commonDataService.GetAllSocialMatrics(requestData).subscribe((res: any) => {
        this.social_media_report = res

        this.spinerService.hide()
        // inbound 
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

        pageReactionsSpan?.forEach((data: any) => {
          const date = (data.totalReactionsDateValue);
          this.facebook_reaction.push(data.like + data.love + data.wow + data.haha + data.sorry + data.anger + data.sad + data.tHANKFUL + data.pride + data.cARE);
        });

        //getEnagementChart
        const channelWiseDto = this.social_media_report.channelWiseDto;

        channelWiseDto.forEach((channel: any) => {
          if (!this.platformsArray.includes(channel.platform)) {
            this.platformsArray.push(channel.platform);
          }

          channel.dateWise.forEach((tag: any) => {
            const date = new Date(tag.date).toISOString();
            const totalCount = tag.totalCount;
            const existingNameCount = this.channelWiseEngagement.find((n) => n.name === date);

            if (existingNameCount) {
              existingNameCount.data.push(totalCount);
            } else {
              this.channelWiseEngagement.push({
                type: 'bar',
                name: date,
                data: [totalCount],
              });
            }
          });
        });

        this.getEnagementChart();
        this.getChartInbound()
        this.getSentimentChart()
        this.getChartAudienceEngagement()
        this.getFacebookReaction()
        this.getWordCloud()

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
    var chartDom = document.getElementById('enagement');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      legend: {
        bottom: 0,
        left: 'center',
      },
      tooltip: { trigger: 'axis' },
      dataset: {
        source: [['product', ...this.platformsArray], ...this.channelWiseEngagement.map(data => [data.name, ...data.data])],
      },
      xAxis: [
        {
          type: 'category',
          data: this.channelWiseEngagement.map(data => data.name),
          axisLabel: {
            formatter: function (value: any) {
              return new Date(value).toISOString().split('T')[0];
            },
          },
        },
      ],
      yAxis: {},
      series: this.platformsArray.map(platform => ({
        type: 'bar',
        name: platform,
        encode: { x: 'product', y: platform },
      })),
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
  getWordCloud() {

    if (this.endDate == '' && this.startDate == '') {
      let currentDate = new Date();
      let prevDate = currentDate.setDate(currentDate.getDate() - 8);
      this.startDate = this.datePipe.transform(prevDate, 'MM-dd-YYYY') || "";
      this.endDate = this.datePipe.transform(new Date(), 'MM-dd-YYYY') || "";
    } else if (this.startDate != '' && this.endDate != '') {
      this.startDate = this.datePipe.transform(this.startDate, 'MM-dd-YYYY') || "";
      this.endDate = this.datePipe.transform(this.endDate, 'MM-dd-YYYY') || "";
    }
    this.data = []
    this.spinerService.show()
    this.commonDataService.getWordCloud(this.startDate, this.endDate).subscribe((res: any) => {
      this.wordcloudData = res
      this.spinerService.hide()
      if (this.wordcloudData.length > 0) {
        this.data = [];
        res.forEach((element: any) => {
          var obj = {
            text: element.Term,
            weight: element.frequency
          };
          this.data.push(obj);
        });

      }

      console.log('Term: ', this.data);

    });
    //     this.wordcloudData.forEach((x:any)=>{
    //       this.data.push({text:x.Term, weight:x.frequency})
    //     })
    //     this.data= [{

    // color:  "#c90296",
    // text: "کے الیکٹرک",
    // weight : 28

    //  },
    //  {

    //   color:  "#c90296",
    //   text: "کے الیکٹرک",
    //   weight : 78

    //    },
    // ]
    //   console.log("WordCloud===>",this.data)


  }
}
