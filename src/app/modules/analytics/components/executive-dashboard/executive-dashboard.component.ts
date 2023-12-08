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
  InboundGraph:any
AudienceEngagmentGraph:any
EnagementGraph:any
sentimentGraph:any
facebookreactionGraph:any
  maxEndDate: any;
  social_media_report: any
  inbound_traffic: any
  InboundCounts:any[]=[]
  InboundDates:any[]=[]
  sentimental_analysis: any
  date_Audience: any[]=[]
  post_likes: any
  post_comments: any
  post_share: any
  regionwiseReportData:any
  facebook_reaction: any[]=[]
  facebook_reactionDates:any[]=[]
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
    this.makeChartResponsive();
    this.GetAllRegionWiseData()
  }
GetAllRegionWiseData(){
  let obj={
    "toDate": "2023-12-06T13:48:40.578Z",
    "fromDate": "2023-06-07T13:48:40.578Z",
    "companyId": 0
  }
  this.commonDataService.GetRegionWiseReport(obj).subscribe((res:any)=>{
    this.regionwiseReportData=res
    console.log("this.regionwiseReportData==>",this.regionwiseReportData)
  })
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
    this.InboundDates=[]
    this.facebook_reactionDates=[]
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
          if(!this.InboundDates.includes(this.datePipe.transform(data.date,'dd/MMM'))){
            this.InboundDates.push(this.datePipe.transform(data.date,'dd/MMM'))
          }
          this.InboundCounts.push(data.totalCount)
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
          if (!this.date_Audience.includes(this.datePipe.transform(data.dateValue,'dd/MMM'))) {
            this.date_Audience.push(this.datePipe.transform(data.dateValue,'dd/MMM'))
          }
        });
        this.social_media_report.facebookReportResponseDto.postShareSpan?.forEach((data: any) => {
          this.post_share.push(data.activityCount);
          if (!this.date_Audience.includes(this.datePipe.transform(data.dateValue,'dd/MMM'))) {
            this.date_Audience.push(this.datePipe.transform(data.dateValue,'dd/MMM'))
          }
        });
        this.social_media_report.facebookReportResponseDto.postCommentSpan?.forEach((data: any) => {
          this.post_comments.push(data.activityCount);
          if (!this.date_Audience.includes(this.datePipe.transform(data.dateValue,'dd/MMM'))) {
            this.date_Audience.push(this.datePipe.transform(data.dateValue,'dd/MMM'))
          }
        });
        // facebook Reaction 
        const pageReactionsSpan = this.social_media_report.facebookReportResponseDto.pageReactionsSpan;

        pageReactionsSpan?.forEach((data: any) => {
      
          this.facebook_reaction.push(data.like + data.love + data.wow + data.haha + data.sorry + data.anger + data.sad + data.tHANKFUL + data.pride + data.cARE);
          if(!this.facebook_reactionDates.includes(this.datePipe.transform(data.totalReactionsDateValue,'dd/MMM'))){
            this.facebook_reactionDates.push(this.datePipe.transform(data.totalReactionsDateValue,'dd/MMM'))
          }
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
        this.getRegionWiseTrafic()
      })

    } else {
      alert('select end date greater then start date')
    }

  }

  getChartInbound() {
    type EChartsOption = echarts.EChartsOption;
    var chartDom = document.getElementById('inbound')!;
    this.InboundGraph = echarts.init(chartDom);
    var option: EChartsOption;

    option = {
      color: ['#FFA800', ],
      
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
        data:['Inbound'],
        bottom:0,
        icon:'circle'
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '13%',
        right: '4%',
        bottom: '13%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: this.InboundDates,
          axisLabel:{
            rotate:45
          }
        }
      ],
      yAxis: [{
        type: "value",
        nameLocation: "middle",
        name: "Numbers of Inbounds",
        nameTextStyle: {
          fontSize: 12,
          color: 'Gray',
          lineHeight: 50

        }
      }],
      series: [
        {
          name: 'Inbound',
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
                color: '#FFA800'
              },
              {
                offset: 1,
                color: '#FFD178'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: this.InboundCounts
        },
      
      ]
    };
    // option = {
    //   tooltip: {
    //     trigger: 'axis',
    //     axisPointer: {
    //       type: 'cross',
    //       label: {
    //         backgroundColor: '#6a7985'
    //       }
    //     }
    //   },
    //   legend: {
    //     data: ['Inbound']
    //   },
    //   toolbox: {
    //     feature: {
    //       saveAsImage: {}
    //     }
    //   },
    //   grid: {
    //     left: '3%',
    //     right: '4%',
    //     bottom: '3%',
    //     containLabel: true
    //   },
    //   xAxis: [
    //     {
    //       type: 'category',
    //       boundaryGap: false,
    //       data: this.inbound_traffic.map((item: any) => dataFormat(item.x)),
    //     }
    //   ],
    //   yAxis: [
    //     {
    //       type: 'value'
    //     }
    //   ],
    //   series: [
    //     {
    //       name: 'Email',
    //       type: 'line',

    //       areaStyle: {},
    //       emphasis: {
    //         focus: 'series'
    //       },
    //       data: this.inbound_traffic.map((item: any) => item.y),
    //     },


    //   ]
    // };

    option && this.InboundGraph.setOption(option);
  }
  getChartAudienceEngagement() {

    type EChartsOption = echarts.EChartsOption;
    var chartDom = document.getElementById('audience')!;
    this.AudienceEngagmentGraph = echarts.init(chartDom);
    var option: EChartsOption;

   
    option = {
      color: ['#0095FF', '#FF0000', '#05C283', '#FF0087', '#FFBF00'],
    
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
        data: ['Likes', 'Comments', 'Share'],
        icon:'circle',
        bottom:0
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '13%',
        right: '4%',
        bottom: '13%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: this.date_Audience,
          axisLabel: {
            rotate: 45,
          },
        }
      ],
      yAxis: [{
        type: "value",
        nameLocation: "middle",
        name: "Number of  Audience Enagements",
        nameTextStyle: {
          fontSize: 12,
          color: 'Gray',
          lineHeight: 50

        }
      }],
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
                color: '#0095FF'
              },
              {
                offset: 1,
                color: '#B7E5FA'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: this.post_likes
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
                color: '#FF0000'
              },
              {
                offset: 1,
                color: '#CDA2B1'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: this.post_comments
        },
        {
          name: 'Share',
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
                color: '#05C283'
              },
              {
                offset: 1,
                color: '#10CB8D'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data:  this.post_share
        },
      
      ]
    };
    
    option && this.AudienceEngagmentGraph.setOption(option);
  }
  getEnagementChart() {
    var chartDom = document.getElementById('enagement');
    this.EnagementGraph = echarts.init(chartDom);
    var option;

    option = {
      legend: {
        bottom: 0,
        left: 'center',
        icon:'circle'
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
            rotate:45,
            formatter: function (value: any) {
              return new Date(value).toISOString().split('T')[0];
            },
            
          },
        },
      ],
      yAxis: [{
        type: "value",
        nameLocation: "middle",
        name: "Numbers of  Engagements ",
        nameTextStyle: {
          fontSize: 12,
          color: 'Gray',
          lineHeight: 50

        }
      }],
      series: this.platformsArray.map(platform => ({
        type: 'bar',
        name: platform,
        encode: { x: 'product', y: platform },
      })),
    };
    option && this.EnagementGraph.setOption(option);
  }


  getSentimentChart() {
    type EChartsOption = echarts.EChartsOption;

    var chartDom = document.getElementById('main')!;
    this.sentimentGraph = echarts.init(chartDom);
    var option: EChartsOption;

    option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)',
      },
      legend: {
        top: '5%',
        left: 'center',
        bottom:0,
        icon:'circle'
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
              fontSize: 12,
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

    option && this.sentimentGraph.setOption(option);
  }
  getFacebookReaction() {
    type EChartsOption = echarts.EChartsOption;

    var chartDom = document.getElementById('facebookReaction')!;
    this.facebookreactionGraph = echarts.init(chartDom);
    var option: EChartsOption;

    option = {
      color: ['#189FFF',],

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
        data: ['FACEBOOK REACTIONS'],
        icon:'circle',
        bottom:0
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
          data:this.facebook_reactionDates,
          axisLabel:{
            rotate:45
          }
        }
      ],
      yAxis: [{
        type: "value",
        nameLocation: "middle",
        name: "Numbers of Facebook reactions",
        nameTextStyle: {
          fontSize: 12,
          color: 'Gray',
          lineHeight: 50

        }
      }],
      series: [
        {
          name: 'FACEBOOK REACTIONS',
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
                color: '#189FFF'
              },
              {
                offset: 1,
                color: '#82CBFF'
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

    option && this.facebookreactionGraph.setOption(option);
  }
  regionWiseGraph:any
  getRegionWiseTrafic() {
    type EChartsOption = echarts.EChartsOption;

    var chartDom = document.getElementById('regionWiseTrafic')!;
    this.regionWiseGraph = echarts.init(chartDom);
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
          type: 'bar',
          itemStyle: {
            borderRadius: 5,
          }
        }
      ]
    };

    option && this.regionWiseGraph.setOption(option);

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

    this.commonDataService.getWordCloud(this.startDate, this.endDate).subscribe((res: any) => {
      this.wordcloudData = res

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
  testGraph(){
    var chartDom = document.getElementById('test');
var myChart = echarts.init(chartDom);
var option;

option = {
  color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
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
    data: ['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5']
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
      stack: 'Total',
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
      data: [140, 232, 101, 264, 90, 340, 250]
    },
    {
      name: 'Line 2',
      type: 'line',
      stack: 'Total',
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
            color: 'rgb(0, 221, 255)'
          },
          {
            offset: 1,
            color: 'rgb(77, 119, 255)'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: [120, 282, 111, 234, 220, 340, 310]
    },
    {
      name: 'Line 3',
      type: 'line',
      stack: 'Total',
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
            color: 'rgb(55, 162, 255)'
          },
          {
            offset: 1,
            color: 'rgb(116, 21, 219)'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: [320, 132, 201, 334, 190, 130, 220]
    },
    {
      name: 'Line 4',
      type: 'line',
      stack: 'Total',
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
            color: 'rgb(255, 0, 135)'
          },
          {
            offset: 1,
            color: 'rgb(135, 0, 157)'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: [220, 402, 231, 134, 190, 230, 120]
    },
    {
      name: 'Line 5',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      label: {
        show: true,
        position: 'top'
      },
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(255, 191, 0)'
          },
          {
            offset: 1,
            color: 'rgb(224, 62, 76)'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: [220, 302, 181, 234, 210, 290, 150]
    }
  ]
};

option && myChart.setOption(option);
  }
  makeChartResponsive() {
    window.addEventListener('resize', () => {
      if (this.InboundGraph) {
        this.InboundGraph.resize();
      }
      if (this.AudienceEngagmentGraph) {
        this.AudienceEngagmentGraph.resize();
      }
      if (this.EnagementGraph) {
        this.EnagementGraph.resize();
      }
      if (this.sentimentGraph) {
        this.sentimentGraph.resize();
      }
      if (this.facebookreactionGraph) {
        this.facebookreactionGraph.resize();
      }
      if(this.regionWiseGraph){
        this.regionWiseGraph.resize()
      }
    
    });
  }
}
