import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { HeaderService } from 'src/app/shared/services/header.service';
import * as echarts from 'echarts';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { CloudData, CloudOptions, ZoomOnHoverOptions } from 'angular-tag-cloud-module';
import { TagCloudComponent } from 'angular-tag-cloud-module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSpinnerService } from 'ngx-spinner';

import { GoogleMapsModule } from '@angular/google-maps';
import { WordCloudComponent } from '../word-cloud/word-cloud.component';

import { SharedModule } from 'src/app/shared/shared.module';
declare var google: any;

@Component({
  selector: 'app-executive-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, TagCloudComponent, NgxSpinnerModule, WordCloudComponent, GoogleMapsModule, SharedModule],
  templateUrl: './executive-dashboard.component.html',
  styleUrls: ['./executive-dashboard.component.scss']
})
export class ExecutiveDashboardComponent implements OnInit {

  display: any;
  center: google.maps.LatLngLiteral = {
    lat: 24.8607,
    lng: 67.0011
  };
  zoom = 11;
  karachiBoundary: any
  paht: any;
  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = event.latLng.toJSON();
  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }
  paths: { [key: string]: google.maps.LatLngLiteral[] } = {};
  NewPathsArray: any[] = []


  pathsArray: any[] = [];




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
  options1: CloudOptions = {
    width: 700,
    height: 700,
    overflow: false,
  };

  wordcloudData: any[] = []
  data: any[] = []
  MediaData: any[] = []
  startDate = ''
  endDate = ''
  mapstartDate = ''
  mapendDate = ''
  mapmaxEndDate: any
  InboundGraph: any
  AudienceEngagmentGraph: any
  regionWiseGraph: any
  EnagementGraph: any
  sentimentGraph: any
  facebookreactionGraph: any
  maxEndDate: any;
  social_media_report: any
  inbound_traffic: any
  InboundCounts: any[] = []
  countriesmap: any
  InboundDates: any[] = []
  sentimental_analysis: any
  date_Audience: any[] = []
  post_likes: any
  post_comments: any
  post_share: any
  regionwiseReportData: any
  facebook_reaction: any[] = []
  facebook_reactionDates: any[] = []
  platformsArray: any[] = []
  channelWiseEngagement: any[] = [];
  regionwiseCount: any[] = []
  regionwiseArray: any[] = []
  executiveDashborad: any
  str: any = ''
  currentDate: any;
  isShowEngagementGraph: boolean = false
  isShowSentimentGraph: boolean = false
  isShowAudienceEngagementGraph: boolean = false
  isShowInboundGraph: boolean = false
  isShowfacebookreations: boolean = false
  isShowReginwiseGraph: boolean = false

  isSentimentAnalysisActive: boolean = false
  isNoiseIndexSummationActive: boolean = false
  // for kemedia ###########################################################
  sentimentDataPoints: {
    platform: string;
    Positive: number;
    Negative: number;
    Neutral: number;
  }[] = [];
  categoryWiseSentiment: {
    platform: string;
    Positive: number;
    Negative: number;
    Neutral: number;
  }[] = [];
  channelWiseComprasion: {
    platform: string;
    General: number;
    KE: number;
    OtherDisco: number;
  }[] = [];
  categoryWiseComprision: {
    platform: string;
    General: number;
    KE: number;
    OtherDisco: number;
  }[] = []
  NoiseIndexChannelWiseChannelName: any[] = []
  NoiseIndexChannelWiseChannelCount: any[] = []
  NoiseIndexCategoryWiseChannelName: any[] = []
  NoiseIndexCategoryWiseChannelCount: any[] = []
  sentimentAnalysisData: any[] = []
  InboundEnagementDates: any[] = []
  InboundEnagementCounts: any[] = []
  channelWiseSentimentGraph: any
  CategoryWiseSentimentGraph: any
  ChannelWiseNoiseIndexSummationGraph: any;
  CategoryWiseNoiseIndexSummationGraph: any;
  MediaEngagementGraph: any;
  CategoryComparsionGraph: any;
  ChannelComparsionGraph: any;
  printFeed: any[] = []
  graphArray: any[] = []
  totalCount: number = 0
  persentage: number = 0
  dateTimeObj: any
  fillColor: string = 'yellow';
  heatMap: any[] = []
  constructor(private _hS: HeaderService,
    private commonDataService: CommonDataService,
    private spinerService: NgxSpinnerService,
    private cd: ChangeDetectorRef,
    private datePipe: DatePipe,) { }

  ngOnInit(): void {
    const newObj = { title: 'Executive Dashboard', url: '/analytics/executive-dashboard' };
    this._hS.setHeader(newObj);
    this.currentDate = new Date();
    this.maxEndDate = this.currentDate.toISOString().split("T")[0];
    this.mapmaxEndDate = this.currentDate.toISOString().split("T")[0];
    this.GetAllSocialMediaReport()
    this.makeChartResponsive();
    this.getWordCloud()
    // this.getHeatMapGraph()
    // ke media api call
    this.getSentimentAnalysisChannelWise()
    this.getSentimentAnalysisCatgoryWise()
    this.getNoiseIndexSummationChannelWise()
    this.getNoiseIndexSummationCategoryWise()
    this.getSentimentAnalysis()
    this.getInboundEnagements()
    this.getCatgoryeWiseComparison()
    this.getChannelWiseComparison()
    this.getAllKEPrintFeed();
    this.GetAllCoordinatesKarachi()
  }
  GetAllCoordinatesKarachi() {
    this.commonDataService.GetKarachiCoordinates().subscribe((res: any) => {
      this.paths = res
      this.NewPathsArray = res
      this.initMap()
      this.initMap1()
    })
  }
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
  @ViewChild('mapContainer1', { static: false }) mapContainer1!: ElementRef;

  map: any;

  ngAfterViewInit(): void {
    // this.initMap();
  }
  initMap1() {

    // Initialize the map
    const mapOptions = {
      center: {
        lat: 24.8607,
        lng: 67.0011
      },
      zoom: 12,
    };
    console.log("path array", this.graphArray)

    this.map = new google.maps.Map(this.mapContainer1.nativeElement, mapOptions);

    // Add your dynamic polygons with dynamic colors

    this.NewPathsArray.forEach((data: any) => {
      if (data.Fillcolor == undefined) {
        const polygon = new google.maps.Polygon({
          paths: data.Lat,
          map: this.map,
          strokeColor: 'Black', // Set the stroke color dynamically
          strokeOpacity: 0.8,
          strokeWeight: 1,
          fillColor: '#97F19A', // Set the fill color dynamically
          fillOpacity: 0.35,
        });
      }
      else {

        const polygon = new google.maps.Polygon({
          paths: data.Lat,
          map: this.map,
          strokeColor: data.strokeColor,
          strokeOpacity: 0.8,
          strokeWeight: 1,
          fillColor: data.Fillcolor,
          fillOpacity: 0.35,
        });
      }

    })
  }
  initMap(): void {

    // Initialize the map
    const mapOptions = {
      center: {
        lat: 24.8607,
        lng: 67.0011
      },
      zoom: 12,
    };
    console.log("path array", this.graphArray)

    this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);

    // Add your dynamic polygons with dynamic colors

    this.NewPathsArray.forEach((data: any) => {
      if (data.Fillcolor == undefined) {
        const polygon = new google.maps.Polygon({
          paths: data.Lat,
          map: this.map,
          strokeColor: 'Black', // Set the stroke color dynamically
          strokeOpacity: 0.8,
          strokeWeight: 1,
          fillColor: '#97F19A', // Set the fill color dynamically
          fillOpacity: 0.35,
        });
      }
      else {

        const polygon = new google.maps.Polygon({
          paths: data.Lat,
          map: this.map,
          strokeColor: data.strokeColor,
          strokeOpacity: 0.8,
          strokeWeight: 1,
          fillColor: data.Fillcolor,
          fillOpacity: 0.35,
        });
      }

    })

  }
  GetAllRegionWiseData() {
    let obj = {
      toDate: this.endDate,
      fromDate: this.startDate,
      companyId: 0
    }

    this.regionwiseArray = []
    this.regionwiseCount = []
    this.isShowEngagementGraph = false
    this.isShowSentimentGraph = false
    this.isShowAudienceEngagementGraph = false
    this.isShowInboundGraph = false
    this.isShowfacebookreations = false
    this.isShowReginwiseGraph = false
    this.commonDataService.GetRegionWiseReport(obj).subscribe((res: any) => {

      this.regionwiseReportData = res
      if (this.regionwiseReportData.length == 0) {
        this.isShowReginwiseGraph = true
      }
      this.regionwiseReportData.forEach((x: any) => {
        if (!this.regionwiseArray.includes((x.region))) {
          this.regionwiseArray.push(x.region)
        }

        this.regionwiseCount.push(x.totalCount)

      })

      this.getRegionWiseTrafic()
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
    const startDateObj = new Date(this.startDate);
    const endDateObj = new Date(this.endDate);
    const timeDiff = Math.abs(endDateObj.getTime() - startDateObj.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    if (diffDays > 30) {
      alert('Select a date range of 30 days or less');
      this.endDate = ''
      return;
    }
    const requestData = {
      pageId: "622038187854126",
      from: this.startDate,
      to: this.endDate,
    };

    if (this.startDate <= this.endDate) {
      this.inbound_traffic = []
      this.sentimental_analysis = []
      this.date_Audience = []
      this.post_comments = []
      this.post_likes = []
      this.InboundDates = []
      this.facebook_reactionDates = []
      this.post_share = []
      this.facebook_reaction = [];
      this.platformsArray = [];
      this.channelWiseEngagement = []
      this.isShowEngagementGraph = false
      this.isShowSentimentGraph = false
      this.isShowAudienceEngagementGraph = false
      this.isShowInboundGraph = false
      this.isShowfacebookreations = false
      this.isShowReginwiseGraph = false
      this.str = ''
      this.spinerService.show()
      this.cd.detectChanges()
      let obj = {
        startData: requestData.from,
        endDate: requestData.to
      }

      this.dateTimeObj = obj
      this.commonDataService.GetAllSocialMatrics(requestData).subscribe((res: any) => {

        this.social_media_report = res
        this.spinerService.hide()
        // for show likes comments share 
        this.executiveDashborad = res.facebookReportResponseDto

        // inbound 
        const inBoundTrafficDto = this.social_media_report.inBoundTrafficDto;
        inBoundTrafficDto.forEach((data: any) => {
          if (!this.InboundDates.includes(this.datePipe.transform(data.date, 'dd/MMM'))) {
            this.InboundDates.push(this.datePipe.transform(data.date, 'dd/MMM'))
          }

          this.InboundCounts.push(data.totalCount)
        });
        if (this.InboundDates.length == 0) {
          this.isShowInboundGraph = true
        }
        // sentiments
        const sentimentsAnalysisDto = this.social_media_report.sentimentsAnalysisDto;
        if (sentimentsAnalysisDto.length == 0) {
          this.isShowSentimentGraph = true
        }
        sentimentsAnalysisDto.forEach((data: any) => {
          const sentimentName = data.sentimentName;
          this.str = sentimentName.toLowerCase().split(/[-_.\s]/).map((w: any) => `${w.charAt(0).toUpperCase()}${w.substr(1)}`).join(' ');
          const totalSentiments = data.totalSentiments;

          this.sentimental_analysis.push({ name: this.str, value: totalSentiments });
        });
        // Audience Chart

        this.social_media_report.facebookReportResponseDto.postLikeSpan?.forEach((data: any) => {

          this.post_likes.push(data.activityCount);
          if (!this.date_Audience.includes(this.datePipe.transform(data.dateValue, 'dd/MMM'))) {
            this.date_Audience.push(this.datePipe.transform(data.dateValue, 'dd/MMM'))
          }
        });
        this.social_media_report.facebookReportResponseDto.postShareSpan?.forEach((data: any) => {
          this.post_share.push(data.activityCount);
          if (!this.date_Audience.includes(this.datePipe.transform(data.dateValue, 'dd/MMM'))) {
            this.date_Audience.push(this.datePipe.transform(data.dateValue, 'dd/MMM'))
          }
        });
        this.social_media_report.facebookReportResponseDto.postCommentSpan?.forEach((data: any) => {
          this.post_comments.push(data.activityCount);
          if (!this.date_Audience.includes(this.datePipe.transform(data.dateValue, 'dd/MMM'))) {
            this.date_Audience.push(this.datePipe.transform(data.dateValue, 'dd/MMM'))
          }
        });
        if (this.date_Audience.length == 0) {
          this.isShowAudienceEngagementGraph = true
        }
        // facebook Reaction 
        const pageReactionsSpan = this.social_media_report.facebookReportResponseDto.pageReactionsSpan;

        pageReactionsSpan?.forEach((data: any) => {

          this.facebook_reaction.push(data.like + data.love + data.wow + data.haha + data.sorry + data.anger + data.sad + data.tHANKFUL + data.pride + data.cARE);

          if (!this.facebook_reactionDates.includes(this.datePipe.transform(data.totalReactionsDateValue, 'dd/MMM'))) {
            this.facebook_reactionDates.push(this.datePipe.transform(data.totalReactionsDateValue, 'dd/MMM'))

          }
        });

        if (this.facebook_reactionDates.length == 0) {
          this.isShowfacebookreations = true
        }
        //getEnagementChart
        const channelWiseDto = this.social_media_report.channelWiseDto;

        channelWiseDto.forEach((channel: any) => {
          if (!this.platformsArray.includes(channel.platform)) {
            this.platformsArray.push(channel.platform);
          }

          channel.dateWise.forEach((tag: any) => {
            const date = new Date(tag.date).toISOString().split('T')[0];
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
        if (this.platformsArray.length == 0) {
          this.isShowEngagementGraph = true
        }
        this.getEnagementChart();
        this.getChartInbound()
        this.getSentimentChart()
        this.getChartAudienceEngagement()
        this.getFacebookReaction()

      })

    } else {
      alert('select end date greater then start date')
    }

    this.GetAllRegionWiseData()


  }

  getChartInbound() {
    type EChartsOption = echarts.EChartsOption;
    var chartDom = document.getElementById('inbound')!;
    this.InboundGraph = echarts.init(chartDom);
    var option: EChartsOption;

    option = {
      color: ['#FFA800',],

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
        data: ['Inbound'],
        bottom: 0,
        icon: 'circle'
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
          axisLabel: {
            rotate: 45
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
      ],
      markPoint: {
        data: [{
          type: "max"
        }],
        symbol: "pin"
      }
    };

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
        icon: 'circle',
        bottom: 0
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
          data: this.date_Audience.sort((a, b) => new Date(b).getTime() - new Date(a).getTime()).reverse(),
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
          data: this.post_share
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
        icon: 'circle'
      },
      tooltip: { trigger: 'axis' },
      dataset: {
        source: [['product', ...this.platformsArray], ...this.channelWiseEngagement.map(data => [data.name, ...data.data])],
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
          data: this.channelWiseEngagement.map(data => data.name),

          axisLabel: {
            rotate: 45,
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
        left: 'center',
        bottom: 'bottom',
        icon: 'circle',

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
      markPoint: {
        data: [
          { type: 'max', name: 'Max' },
          { type: 'min', name: 'Min' }
        ]
      },
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
        icon: 'circle',
        bottom: 0
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
          data: this.facebook_reactionDates.sort((a, b) => new Date(b).getTime() - new Date(a).getTime()).reverse(),
          axisLabel: {
            rotate: 45
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

  getRegionWiseTrafic() {
    type EChartsOption = echarts.EChartsOption;

    var chartDom = document.getElementById('regionWiseTrafic')!;
    this.regionWiseGraph = echarts.init(chartDom);
    var option: EChartsOption;

    option = {
      xAxis: {
        type: 'category',
        data: this.regionwiseArray,
        axisLabel: {
          rotate: 45
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '13%',
        right: '4%',
        bottom: '13%',
        containLabel: true
      },
      yAxis: [{
        type: "value",
        nameLocation: "middle",
        name: "Numbers of Regionwise traffic counts",
        nameTextStyle: {
          fontSize: 12,
          color: 'Gray',
          lineHeight: 50

        }
      }],
      series: [
        {
          data: this.regionwiseCount,
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
  resetStartDate() {
    this.endDate = "";
  }
  resetEndDate() {
    if (this.endDate >= this.startDate) {
      this.GetAllSocialMediaReport()
      this.getSentimentAnalysisChannelWise()
      this.getSentimentAnalysisCatgoryWise()
      this.getNoiseIndexSummationChannelWise()
      this.getNoiseIndexSummationCategoryWise()
      this.getSentimentAnalysis()
      this.getInboundEnagements()
      this.getCatgoryeWiseComparison()
      this.getChannelWiseComparison()
      this.getAllKEPrintFeed()


    } else {
      this.endDate = '';
      alert('EndDate is greater than StartDate');
    }
  }
  getHeatMapGraph() {
    if (this.mapstartDate == "" && this.mapendDate == "") {
      const today = this.currentDate;
      this.mapendDate = this.datePipe.transform(today, "YYYY-MM-dd") || '';
      let prevDate = this.currentDate.setDate(this.currentDate.getDate() - 6);
      this.mapstartDate = this.datePipe.transform(prevDate, "YYYY-MM-dd") || '';
    }
    else if (this.mapstartDate != "" && this.mapendDate != ""
    ) {
      this.mapstartDate = this.mapstartDate
      this.mapendDate = this.mapendDate
    }
    let obj = {
      "fromDate": this.mapstartDate,
      "toDate": this.mapendDate,
      "companyId": 0
    }
    this.spinerService.show()
    this.cd.detectChanges()
    this.commonDataService.GetAreaWiseReport(obj).subscribe((res: any) => {
      this.spinerService.hide()
      console.log("Karachi Data===>", res)
      this.heatMap = res
      this.heatMap.forEach((x: any) => {

        if (x.percentage >= 0 && x.percentage <= 10) {
          this.NewPathsArray.forEach((y: any) => {
            if (y.Name === x.location) {
              y.Fillcolor = '#3BD692',
                y.strokeColor = '#3BD692'
            }

          })
        }
        else if (x.percentage >= 11 && x.percentage <= 30) {
          this.NewPathsArray.forEach((y: any) => {
            if (y.Name === x.location) {
              y.Fillcolor = '#FFDD00',
                y.strokeColor = '#FFDD00'
            }
          })

        }
        else if (x.percentage >= 31 && x.percentage <= 50) {
          this.NewPathsArray.forEach((y: any) => {
            if (y.Name === x.location) {
              y.Fillcolor = '#FF505C',
                y.strokeColor = '#FF505C'
            }
          })

        }
        else if (x.percentage >= 51 && x.percentage <= 70) {
          this.NewPathsArray.forEach((y: any) => {
            if (y.Name === x.location) {
              y.Fillcolor = '#CF61EA',
                y.strokeColor = '#CF61EA'
            }
          })

        }
        else if (x.percentage >= 71 && x.percentage <= 100) {
          this.NewPathsArray.forEach((y: any) => {
            if (y.Name === x.location) {
              y.Fillcolor = '#9C87EE',
                y.strokeColor = '#9C87EE'
            }
          })

        }

      })
      this.initMap()
      this.initMap1()
    })
  }
  OnClick() {
    this.getHeatMapGraph()
  }
  getWordCloud() {

    if (this.endDate == '' && this.startDate == '') {
      let currentDate = new Date();
      let prevDate = currentDate.setDate(currentDate.getDate() - 8);
      this.startDate = this.datePipe.transform(prevDate, 'YYYY-MM-dd') || "";
      this.endDate = this.datePipe.transform(new Date(), 'YYYY-MM-dd') || "";
    } else if (this.startDate != '' && this.endDate != '') {
      this.startDate = this.datePipe.transform(this.startDate, 'YYYY-MM-dd') || "";
      this.endDate = this.datePipe.transform(this.endDate, 'YYYY-MM-dd') || "";
    }
    let obj = {
      "startDate": this.startDate,
      "endDate": this.endDate
    }
    this.commonDataService.GetwordCloud(obj).subscribe((res: any) => {
      this.wordcloudData = res?.keywords
      if (this.wordcloudData.length > 0) {
        this.data = []
        this.MediaData = []
        this.wordcloudData.forEach((element: any) => {
          let obj = {
            text: element.keyword ,
            weight: Number(element.weight)
          };
          if (this.data !== null && this.data !== undefined) {
            this.data.push(obj);
          }
          if (this.MediaData !== null && this.MediaData !== undefined) {
            this.MediaData.push(obj)
          }


        });

      }



    });



  }
  testGraph() {
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
      if (this.regionWiseGraph) {
        this.regionWiseGraph.resize()
      }


    });
  }
  //  for media tab code started //////////////////////////////////////***************@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  getSentimentAnalysisChannelWise() {
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
    let obj = {
      "mediaTypeId": 0,
      "newsTypeIds": "0",
      "channelIds": "61,60,19,63,72,39,40,1,54,56,20,24,15,73,29,25,31,21,5,35,62,57,22,71,65,66,67,68,69,70,51,74,75,82,58,28,37,33,55,59,36,76,64,30,17,14,41,26,52,77,42,16,78,32,38,79,2,80,81,27,23,7",
      "categoryIds": "0",
      "relavanceIds": "0",
      "fromDate": this.startDate,
      "toDate": this.endDate,
      "script": "",
      "isKEActivity": false,
      "reportType": 4,
      "filterType": 3
    }
    this.sentimentDataPoints = [];
    this.commonDataService.GetAllKemediaReport(obj).subscribe((res: any) => {

      const sentimentChannelWiseres = res;


      sentimentChannelWiseres.forEach((x: any) => {
        const platformName = x.XAxis;

        const PositivesentimentCounts: { [key: string]: number } = {};
        const NegativesentimentCount: { [key: string]: number } = {};
        const NeutralsentimentCount: { [key: string]: number } = {};

        if (x.Value1 !== null) {
          PositivesentimentCounts['Positive'] = x.Value1;
        } else {
          PositivesentimentCounts['Positive'] = 0;
        }

        if (x.Value2 !== null) {
          NegativesentimentCount['Negative'] = x.Value2;
        } else {
          NegativesentimentCount['Negative'] = 0;
        }

        if (x.Value3 !== null) {
          NeutralsentimentCount['Neutral'] = x.Value3;
        } else {
          NeutralsentimentCount['Neutral'] = 0;
        }

        this.sentimentDataPoints.push({
          platform: platformName,
          Positive: PositivesentimentCounts['Positive'],
          Negative: NegativesentimentCount['Negative'],
          Neutral: NeutralsentimentCount['Neutral'],
        });

      });




      this.getSentimentAnalysisChannelWiseChart()
    });
  }
  getSentimentAnalysisCatgoryWise() {
    let obj = {
      "mediaTypeId": 0,
      "newsTypeIds": "0",
      "channelIds": "61,60,19,63,72,39,40,1,54,56,20,24,15,73,29,25,31,21,5,35,62,57,22,71,65,66,67,68,69,70,51,74,75,82,58,28,37,33,55,59,36,76,64,30,17,14,41,26,52,77,42,16,78,32,38,79,2,80,81,27,23,7",
      "categoryIds": "0",
      "relavanceIds": "0",
      "fromDate": this.startDate,
      "toDate": this.endDate,
      "script": "",
      "isKEActivity": false,
      "reportType": 4,
      "filterType": 4
    }
    this.categoryWiseSentiment = []
    this.commonDataService.GetAllKemediaReport(obj).subscribe((res: any) => {
      const SentimentCatgoryWise = res

      SentimentCatgoryWise.forEach((x: any) => {
        const platformName = x.XAxis
        const PositivesentimentCountsCatgory: { [keys: string]: number } = {}
        const NegativesentimentCountCategoryWise: { [keys: string]: number } = {}
        const NeutralsentimentCountCatgoryWise: { [keys: string]: number } = {}
        if (x.Value1 !== null) {
          PositivesentimentCountsCatgory['Positive'] = x.Value1;
        } else {
          PositivesentimentCountsCatgory['Positive'] = 0;
        }

        if (x.Value2 !== null) {
          NegativesentimentCountCategoryWise['Negative'] = x.Value2;
        } else {
          NegativesentimentCountCategoryWise['Negative'] = 0;
        }

        if (x.Value3 !== null) {
          NeutralsentimentCountCatgoryWise['Neutral'] = x.Value3;
        } else {
          NeutralsentimentCountCatgoryWise['Neutral'] = 0;
        }
        this.categoryWiseSentiment.push({
          platform: platformName,
          Positive: PositivesentimentCountsCatgory['Positive'],
          Negative: NegativesentimentCountCategoryWise['Negative'],
          Neutral: NeutralsentimentCountCatgoryWise['Neutral']
        })


      })
      this.getSentimentAnalysisCategoryWiseChart()
    })
  }
  getNoiseIndexSummationChannelWise() {
    let obj = {
      "mediaTypeId": 0,
      "newsTypeIds": "0",
      "channelIds": "0",
      "categoryIds": "0",
      "relavanceIds": "0",
      "fromDate": this.startDate,
      "toDate": this.endDate,
      "script": "",
      "isKEActivity": false,
      "reportType": 2,
      "filterType": 3
    }
    this.NoiseIndexChannelWiseChannelName = []
    this.NoiseIndexChannelWiseChannelCount = []
    this.commonDataService.GetAllKemediaReport(obj).subscribe((res: any) => {
      const NoiseIndexChannelWise = res
      NoiseIndexChannelWise.forEach((x: any) => {
        this.NoiseIndexChannelWiseChannelName.push(x.XAxis)
        this.NoiseIndexChannelWiseChannelCount.push(x.Value1)
      })
      this.getNoiseIndexChannelWiseChart()
    })
  }
  getNoiseIndexSummationCategoryWise() {
    let obj = {
      "mediaTypeId": 0,
      "newsTypeIds": "0",
      "channelIds": "0",
      "categoryIds": "0",
      "relavanceIds": "0",
      "fromDate": this.startDate,
      "toDate": this.endDate,
      "script": "",
      "isKEActivity": false,
      "reportType": 2,
      "filterType": 1
    }
    this.NoiseIndexCategoryWiseChannelCount = []
    this.NoiseIndexCategoryWiseChannelName = []
    this.commonDataService.GetAllKemediaReport(obj).subscribe((res: any) => {
      const NoiceIndexCategoryWise = res
      NoiceIndexCategoryWise.forEach((x: any) => {
        this.NoiseIndexCategoryWiseChannelName.push(x.XAxis)
        this.NoiseIndexCategoryWiseChannelCount.push(x.Value1)
      })
      this.getNoiceIndexCategoryWiseChart()
    })
  }
  getSentimentAnalysis() {
    let obj = {
      "mediaTypeId": 0,
      "newsTypeIds": "0",
      "channelIds": "0",
      "categoryIds": "0",
      "relavanceIds": "0",
      "fromDate": this.startDate,
      "toDate": this.endDate,
      "script": "",
      "isKEActivity": false,
      "reportType": 9,
      "filterType": 1
    }
    this.sentimentAnalysisData = []
    this.commonDataService.GetAllKemediaReport(obj).subscribe((res: any) => {
      const sentimentAnalysis = res
      console.log("SentimentAnalysis===>", sentimentAnalysis)
      sentimentAnalysis?.forEach((x: any) => {
        this.sentimentAnalysisData.push({
          value: x.Value1,
          name: 'PRINT' + '\n' + x.XAxis
        })
      })

      this.getsentimentAnalysisChart()
    })
  }
  getInboundEnagements() {
    let obj = {
      "mediaTypeId": 0,
      "newsTypeIds": "0",
      "channelIds": "0",
      "categoryIds": "0",
      "relavanceIds": "0",
      "fromDate": this.startDate,
      "toDate": this.endDate,
      "script": "",
      "isKEActivity": false,
      "reportType": 1,
      "filterType": 7
    }
    this.InboundEnagementCounts = []
    this.InboundEnagementDates = []
    this.commonDataService.GetAllKemediaReport(obj).subscribe((res: any) => {
      const InboundEnagement = res
      InboundEnagement.forEach((x: any) => {
        if (!this.InboundEnagementDates.includes(this.datePipe.transform(x.InsertionDate, 'dd/MMM'))) {
          this.InboundEnagementDates.push(this.datePipe.transform(x.InsertionDate, 'dd/MMM'))
        }
        this.InboundEnagementCounts.push(x.Value1)

      })

      this.getMediaEngagementChart()
    })
  }
  getCatgoryeWiseComparison() {
    let obj = {
      "mediaTypeId": 0,
      "newsTypeIds": "0",
      "channelIds": "0",
      "categoryIds": "0",
      "relavanceIds": "0",
      "fromDate": this.startDate,
      "toDate": this.endDate,
      "script": "",
      "isKEActivity": false,
      "reportType": 5,
      "filterType": 4
    }
    this.commonDataService.GetAllKemediaReport(obj).subscribe((res: any) => {
      const categoryWiseComparison = res
      categoryWiseComparison.forEach((x: any) => {
        const platform = x.XAxis
        const GeneralCategoryWise: { [key: string]: number } = {};
        const KECategoryWise: { [key: string]: number } = {};
        const OtherDiscoCategoryWise: { [key: string]: number } = {}
        if (x.Value1 !== null) {
          GeneralCategoryWise['General'] = x.Value1
        }
        else {
          GeneralCategoryWise['General'] = 0
        }
        if (x.Value2 !== null) {
          KECategoryWise['KE'] = x.Value2
        }
        else {
          KECategoryWise['KE'] = 0
        }
        if (x.Value3 !== null) {
          OtherDiscoCategoryWise['OtherDisco'] = x.Value3
        }
        else {
          OtherDiscoCategoryWise['OtherDisco'] = 0
        }

        this.categoryWiseComprision.push({
          platform: platform,
          General: GeneralCategoryWise['General'],
          KE: KECategoryWise['KE'],
          OtherDisco: OtherDiscoCategoryWise['OtherDisco']
        })
      })
      this.getMediaCategorycomparisonChat()
    })
  }
  getChannelWiseComparison() {
    let obj = {
      "mediaTypeId": 0,
      "newsTypeIds": "0",
      "channelIds": "61,60,19,63,72,39,40,1,54,56,20,24,15,73,29,25,31,21,5,35,62,57,22,71,65,66,67,68,69,70,51,74,75,82,58,28,37,33,55,59,36,76,64,30,17,14,41,26,52,77,42,16,78,32,38,79,2,80,81,27,23,7",
      "categoryIds": "0",
      "relavanceIds": "0",
      "fromDate": this.startDate,
      "toDate": this.endDate,
      "script": "",
      "isKEActivity": false,
      "reportType": 5,
      "filterType": 3
    }
    this.channelWiseComprasion = []
    this.commonDataService.GetAllKemediaReport(obj).subscribe((res: any) => {
      const channelWiseCpmparison = res
      channelWiseCpmparison.forEach((x: any) => {
        const platformName = x.XAxis
        const GeneralChannelWiseComparison: { [key: string]: number } = {};
        const KEChannelWiseComparison: { [key: string]: number } = {};
        const OtherDiscoChannelWiseComparison: { [key: string]: number } = {}
        if (x.Value1 !== null) {
          GeneralChannelWiseComparison['General'] = x.Value1
        }
        else {
          GeneralChannelWiseComparison['General'] = 0
        }
        if (x.Value2 !== null) {
          KEChannelWiseComparison['KE'] = x.Value2
        }
        else {
          KEChannelWiseComparison['KE'] = 0
        }
        if (x.Value3 !== null) {
          OtherDiscoChannelWiseComparison['OtherDisco'] = x.Value3
        }
        else {
          OtherDiscoChannelWiseComparison['OtherDisco'] = x.Value3
        }
        this.channelWiseComprasion.push({
          platform: platformName,
          General: GeneralChannelWiseComparison['General'],
          KE: KEChannelWiseComparison['KE'],
          OtherDisco: OtherDiscoChannelWiseComparison['OtherDisco']
        })
      });
      this.getMediacomparisonChannelWiseChat()
    })
  }
  getAllKEPrintFeed() {
    let obj = {
      "userId": 8,
      "startDate": "14/12/2023",
      "endDate": "14/12/2023",
      "mediaTypeIds": "3",
      "isKERelated": "0"
    }
    this.commonDataService.GetAllPrintFeed(obj).subscribe((res: any) => {

      this.printFeed = res?.MediaFormList

    })
  }

  getMediaEngagementChart() {
    var chartDom = document.getElementById('MediaEngagement');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      color: ['#FFA800',],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
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
          data: this.InboundEnagementDates,
          axisLabel: {
            rotate: 45,
          },
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Engagement',
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
                color: '#FFD88B'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: this.InboundEnagementCounts
        }
      ]
    };

    option && myChart.setOption(option);
  }
  getMediaCategorycomparisonChat() {
    var app = {};

    var chartDom = document.getElementById('MediaCategorycomparison');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      color: ['#55ACEF', '#4867AA', '#4EC125'],
      legend: {
        icon: 'circle',
        bottom: 'bottom'
      },
      tooltip: {},
      dataset: {
        source: this.categoryWiseComprision
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '9%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        axisLabel: {
          rotate: 45,
        },
      },
      yAxis: {},
      // Declare several bar series, each will be mapped
      // to a column of dataset.source by default.
      series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
    };

    option && myChart.setOption(option);
  }
  getMediacomparisonChannelWiseChat() {
    var app = {};

    var chartDom = document.getElementById('Mediacomparison');
    var myChart = echarts.init(chartDom);
    var option;
    option = {
      color: ['#55ACEF', '#4867AA', '#4EC125'],
      legend: {
        icon: 'circle',
        bottom: 'bottom'
      },
      tooltip: {},
      dataset: {
        source: this.channelWiseComprasion
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '9%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        axisLabel: {
          rotate: 45,
        },
      },
      yAxis: {},

      series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
    };

    option && myChart.setOption(option);
  }
  // getMediaRegionWiseChart(){
  //   var chartDom = document.getElementById('MediaRegionWise');
  // var myChart = echarts.init(chartDom);
  // var option;

  // option = {
  //   xAxis: {
  //     type: 'category',
  //     data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  //   },
  //   yAxis: {
  //     type: 'value'
  //   },
  //   series: [
  //     {
  //       data: [120, 200, 150, 80, 70, 110, 130],
  //       type: 'bar'
  //     }
  //   ]
  // };

  // option && myChart.setOption(option);
  // }
  getsentimentAnalysisChart() {
    var chartDom = document.getElementById('sentimentAnalysisChart');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      tooltip: {
        trigger: 'item'
      },
      // legend: {
      //   top: '5%',
      //   left: 'center'
      // },
      series: [
        {
          name: 'SENTIMENT ANALYSIS',
          type: 'pie',

          avoidLabelOverlap: false,
          label: {
            show: true,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          itemStyle: {
            color: '#EA5B00',
          },
          data: this.sentimentAnalysisData
        }
      ]
    };

    option && myChart.setOption(option);
  }
  getSentimentAnalysisChannelWiseChart() {
    var app = {};

    var chartDom = document.getElementById('SentimentAnalysisChannelWise');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      color: ['#4EC125', '#D13C3C', '#FFA800'],
      legend: {
        icon: 'circle',
        bottom: 'bottom'
      },
      grid: {
        left: '13%',
        right: '4%',
        bottom: '13%',
        containLabel: true
      },
      tooltip: {},
      dataset: {
        source: this.sentimentDataPoints
      },
      xAxis: {
        type: 'category',
        axisLabel: {
          rotate: 45,
        },
      },
      yAxis: {},
      series: [{ type: 'bar', }, { type: 'bar', }, { type: 'bar', }]
    };

    option && myChart.setOption(option);
  }
  getSentimentAnalysisCategoryWiseChart() {
    var app = {};

    var chartDom = document.getElementById('SentimentAnalysisCategoryWise');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      color: ['#4EC125', '#D13C3C', '#FFA800'],
      legend: {
        icon: 'circle',
        bottom: 'bottom'
      },
      grid: {
        left: '13%',
        right: '4%',
        bottom: '13%',
        containLabel: true
      },
      tooltip: {},
      dataset: {
        source: this.categoryWiseSentiment
      },
      xAxis: {
        type: 'category',
        axisLabel: {
          rotate: 45,
        },
      },
      yAxis: {},
      // Declare several bar series, each will be mapped
      // to a column of dataset.source by default.
      series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
    };

    option && myChart.setOption(option);
  }
  getNoiseIndexChannelWiseChart() {
    var chartDom = document.getElementById('NoiseIndexChannelWise');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      xAxis: {
        type: 'category',
        data: this.NoiseIndexChannelWiseChannelName,
        axisLabel: {
          rotate: 45,
        },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      yAxis: {
        type: 'value',

      },
      series: [
        {
          data: this.NoiseIndexChannelWiseChannelCount,
          type: 'bar'
        }
      ]
    }
    option && myChart.setOption(option);
  }
  getNoiceIndexCategoryWiseChart() {

    var chartDom = document.getElementById('NoiceIndexCategoryWise');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      color: ['#53C7FC', '#564DC1'],
      xAxis: {
        type: 'category',
        data: this.NoiseIndexCategoryWiseChannelName,
        axisLabel: {
          rotate: 45,
        },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: this.NoiseIndexCategoryWiseChannelCount,
          type: 'bar'
        }
      ]
    };

    option && myChart.setOption(option);
  }


}
