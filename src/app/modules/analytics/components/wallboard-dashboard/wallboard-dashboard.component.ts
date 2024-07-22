import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as echarts from 'echarts';
import { HeaderService } from 'src/app/shared/services/header.service';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { NgxSpinner, NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';
import { angularEditorConfig } from '@kolkov/angular-editor/lib/config';
@Component({
  standalone: true,
  selector: 'app-wallboard-dashboard',
  templateUrl: './wallboard-dashboard.component.html',
  styleUrls: ['./wallboard-dashboard.component.scss'],
  imports: [CommonModule, NgxSpinnerModule]
})
export class WallboardDashboardComponent implements OnInit {
  inprogressChart: any
  assignTomeChart: any
  followupGraph: any
  totalInteractionGraph: any
  avgResRateGraph: any
  avgResTimeGraph: any
  mimmunCaterTimeGraph: any
  maximumCaterTimeGraph: any
  inprogresscount: number = 0
  assignTomecount: number = 0
  followupcount: number = 0
  totalInteractioncount: number = 0
  compeletedCount: number = 0
  inprogressPersentageCount: number = 0
  assingTomePersentageCount: number = 0
  followupPersentageCount: number = 0
  compeletedPersentageCount: number = 0
  currentPlatformwiseCompletedCount:number=0
  averageResponseRate: any
  convertedAverageResponseTime: any
  convertedMinimumCaterTime: any
  convertedMaximumCaterTime: any
  convertedAverageResRate: any
  perviousconvertedAverageResponseTime: any
  perviousconvertedMinimumCaterTime: any
  perviousconvertedMaximumCaterTime: any
  perviousconvertedAverageResRate: any
  serviceLevel: any
  monthtoDay:any
  loggedInUsers: any
  workLoadResponse: any
  CompeletedqueryStatus: any
  followupQueryStatus: any
  averageResponseTime: any
  minimumCaterTime: any
  maximumCaterTime: any
  totalworkloadInteractions: any[] = []
  data: any[] = []
  heatMapData: any[] = []
  peakHours: any
  peakHoursDays: any[] = []
  peakHoursProgressbar: any[] = []
  peakHoursProgressbarReverseed: any
  perviousWallboardData: any[] = []
  perviousInprogressCount: number = 0
  perviousAssignTomeCount: number = 0
  perviousFollowupCount: number = 0
  perviousTotalInteractionCount: number = 0
  perviousCompeletedCount: number = 0
  InprogressPersentageCount: number = 0
  perviousAssingTomePersentageCount: number = 0
  perviousFollowupPersentageCount: number = 0
  perviousCompeletedPersentageCount: number = 0
  currentplatformwiseFollowupcount:number=0
  totalInteractionPersentageCount: number = 0
  perviousAverageResolutinTimePersentage: number = 0
  perviousAverageResponseTimePersentage: number = 0
  perviousMinimumCaterTimePersentage: number = 0
  perviousMaximumCaterTimePersentage: number = 0
  perviousFollowupWorkloadCount: number = 0
  agentPerformanceResponse: any
  platFormWiseInteractionsCompeleted: any
  platFormWiseInteractionsFollowup: any
  wallboardReloadTime: any
  displayTime: any
  wallboradData: any = [] = []
  heatMapHours: any[] = []
  platformIconMapping: any = {
    Facebook: 'fa-brands fa-facebook fs-4 navy fa-beat-fade',
    Twitter: 'fa-brands fa-twitter fs-4 sky fa-beat-fade',
    Instagram: 'fa-brands fa-instagram fs-4 berry fa-beat-fade',
    LinkedIn: 'fa-brands fa-linkedin fs-4 linkedinTxt fa-beat-fade',
    Email: 'fa-light fa-envelope  fs-4 berry fa-beat-fade',
    Youtube: 'fa-brands fa-youtube fs-4 radical fa-beat-fade',
    SMS: 'fa-message-sms fs-4 cherry  fa-beat-fade',
    WebChat: 'fa-light fa-messages fs-4 webchatcolor fa-beat-fade',
    WhatsApp: 'fab fa-whatsapp fs-4 mint fa-beat-fade',
    PlayStore: 'fa-brands fa-google-play fs-4 googleplaycolor fa-beat-fade',
    OfficeEmail: 'fa-light fa-envelope  fs-4 navy fa-beat-fade ',
  };
  castJson=[{
    name:'Excellent',
    icone:'fa-regular fa-circle me-2 sky',
    rating:'5',
    count:''
  },
  {
    name :' Very Good',
    icone:'fa-regular fa-circle me-2 cherry',
    rating:'4',
    count:''
  },
  {
    name :' Good',
    icone:'fa-regular fa-circle me-2 berry',
    rating:'3',
    count:''
  },
  {
    name:'poor',
    icone:'fa-regular fa-circle me-2 pearl',
    rating:'2',
    count:''
  },
  {
    name:'Very Poor',
    icone:'fa-regular fa-circle me-2 mango',
    rating:'1',
    count:''
  }
]
  constructor(
    private headerService: HeaderService,
    private commanDataService: CommonDataService,
    private spinerService: NgxSpinnerService,
  ) { }
  ngOnInit(): void {
    const newObj = { title: 'Wallboard', url: '/analytics/wallborad' };
    this.headerService.setHeader(newObj);
    this.makeChartResponsive()
    this.getAllDataWall_borad()
    this.wallboardReloadTime = setInterval(() => {
      this.getAllDataWall_borad();
    }, 120000);
  }
  getAllDataWall_borad() {
    // this.timer(2)
    this.totalworkloadInteractions = []
    this.peakHoursDays = []
    this.peakHoursProgressbar = []
    this.data = []
    this.heatMapData = []
    this.wallboradData = []
    this.heatMapHours = []
    this.inprogresscount = 0
    this.assignTomecount = 0
    this.followupcount = 0
    this.totalInteractioncount = 0
    this.compeletedCount = 0
    this.inprogressPersentageCount = 0
    this.assingTomePersentageCount = 0
    this.followupPersentageCount = 0
    this.compeletedPersentageCount = 0
    this.spinerService.show()
    this.commanDataService.GetwallboradReport().subscribe((res: any) => {
      this.wallboradData.push(res)
      this.wallboradData.forEach((x: any) => {
        this.averageResponseTime = x.averageResponseTime
        this.maximumCaterTime = x.maximumCaterTime
        this.minimumCaterTime = x.minimunCaterTime
        this.averageResponseRate = x.averageResolutionTime
        this.convertAverageResRateTinmeToMinutes(this.averageResponseRate)
        this.convertAverageResTinmeToMinutes(this.averageResponseTime)
        this.convertMinimumCaterTinmeToMinutes(this.minimumCaterTime)
        this.convertMaximumCaterTinmeToMinutes(this.maximumCaterTime)
        this.serviceLevel = x.serviceLevel
        this.loggedInUsers = x.loggedInUsers
        this.workLoadResponse = x.workLoadResponse
        this.agentPerformanceResponse = x.agentPerformanceResponse
        this.peakHours = x.peakHours
        this.peakHours.forEach((xyz: any) => {
          this.peakHoursDays.push(xyz.day)
          this.peakHoursProgressbar.push({ index: index, dayname: xyz.day, value: xyz.count })
        })
        var y = Object.assign({}, this.peakHoursProgressbar)
        console.log("y values", y)
        this.peakHoursProgressbar.reverse();
        var index = 0;
        this.peakHours.forEach((dayData: any,) => {
          dayData.hourWise.forEach((hourData: any) => {
            this.heatMapData.push([index, hourData.hour, hourData.count]);
          });
          index++
        });
        this.workLoadResponse.forEach((abc: any) => {
          this.totalworkloadInteractions.push(
            { value: abc.totalWorkLoad, name: abc.queryStatus }
          )
        })
        this.platFormWiseInteractionsCompeleted = this.workLoadResponse[0].platFormWiseInteractions
        
        this.platFormWiseInteractionsFollowup = this.workLoadResponse[1].platFormWiseInteractions
        this.CompeletedqueryStatus = this.workLoadResponse[0]
        this.followupQueryStatus = this.workLoadResponse[1]
        const InteractionResponse = x.interactionResponse;
        this.inprogresscount += InteractionResponse.inProgressCount
        this.assignTomecount += InteractionResponse.assignTomeCount
        this.followupcount += InteractionResponse.followUpCount
        this.compeletedCount += InteractionResponse.completedCount
        this.totalInteractioncount = this.inprogresscount + this.followupcount + this.compeletedCount
        this.inprogressPersentageCount = Number(((this.inprogresscount / this.totalInteractioncount) * 100).toFixed(2))
        this.assingTomePersentageCount = Number(((this.assignTomecount / this.totalInteractioncount) * 100).toFixed(2))
        this.followupPersentageCount = Number(((this.followupcount / this.totalInteractioncount) * 100).toFixed(2))
        this.compeletedPersentageCount = Number(((this.compeletedCount / this.totalInteractioncount) * 100).toFixed(2))
        this.workloadGraph()
        this.inprogressGraph()
        this.followUpGraph()
        this.totalInteractionGrahp();
        this.getAvgResTimeGraph()
        this.getMinmumCaterTimeGraph()
        this.getMaxmumCaterTimeGraph()
        this.getAvgResRateGraph()
        this.peakHoursGraph()
        this.GetPerviousWallboardData()
        this.getAllCsatData()
        this.getMothToDateSla()
        this.timer(2)
        this.spinerService.hide()
      })
    },
      error => {
        this.spinerService.hide()
      }
    )
  }
  getAvgResRateGraph() {
    var chartDom = document.getElementById('avgResRate');
    this.avgResRateGraph = echarts.init(chartDom);
    var option;
    option = {
      series: [
        {
          type: 'gauge',
          startAngle: 180,
          endAngle: 0,
          min: 0,
          max: 120,
          splitNumber: 4,
          itemStyle: {
            color: '#F8CF61',
          },
          progress: {
            show: true,
            roundCap: true,
            width: 10
          },
          pointer: {
            icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
            length: '75%',
            width: 6,
            offsetCenter: [0, '5%']
          },
          axisLine: {
            roundCap: true,
            lineStyle: {
              width: 10
            }
          },
          axisTick: {
            splitNumber: 1,
            lineStyle: {
              width: 1,
              color: '#999'
            }
          },
          splitLine: {
            length: 1,
            lineStyle: {
              width: 1,
              color: '#999'
            }
          },
          axisLabel: {
            distance: 20,
            color: '#999',
            fontSize: 8
          },
          title: {
            show: false
          },
          detail: {
            backgroundColor: '#fff',
            //borderColor: '#999',
            //borderWidth: 2,
            width: '60%',
            lineHeight: 40,
            height: 40,
            //borderRadius: 8,
            offsetCenter: [0, '40%'],
            show: false,
            valueAnimation: true,
            formatter: function (value: any) {
              return value.toFixed(0);
            },
            rich: {
              value: {
                fontSize: 5,
                fontWeight: 'bolder',
                color: '#777',
                padding: [10, 0, -20, 10]
              },
              unit: {
                fontSize: 20,
                color: '#999',
                padding: [10, 0, -20, 10]
              }
            }
          },
          data: [
            {
              value: this.convertedAverageResRate
            }
          ]
        }
      ]
    };
    option && this.avgResRateGraph.setOption(option);
  }
  getAvgResTimeGraph() {
    var chartDom = document.getElementById('avgResTime');
    this.avgResTimeGraph = echarts.init(chartDom);
    var option;
    option = {
      series: [
        {
          type: 'gauge',
          startAngle: 180,
          endAngle: 0,
          min: 0,
          max: 120,
          splitNumber: 4,
          itemStyle: {
            color: '#00BC32',
            //shadowColor: 'rgba(0,138,255,0.45)',
            //shadowBlur: 10,
            //shadowOffsetX: 2,
            //shadowOffsetY: 2
          },
          progress: {
            show: true,
            roundCap: true,
            width: 10
          },
          pointer: {
            icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
            length: '75%',
            width: 6,
            offsetCenter: [0, '5%']
          },
          axisLine: {
            roundCap: true,
            lineStyle: {
              width: 10
            }
          },
          axisTick: {
            splitNumber: 1,
            lineStyle: {
              width: 1,
              color: '#999'
            }
          },
          splitLine: {
            length: 1,
            lineStyle: {
              width: 1,
              color: '#999'
            }
          },
          axisLabel: {
            distance: 20,
            color: '#999',
            fontSize: 8
          },
          title: {
            show: false
          },
          detail: {
            backgroundColor: '#fff',
            //borderColor: '#999',
            //borderWidth: 2,
            width: '60%',
            lineHeight: 40,
            height: 40,
            //borderRadius: 8,
            offsetCenter: [0, '40%'],
            show: false,
            valueAnimation: true,
            formatter: function (value: any) {
              return value.toFixed(0);
            },
            rich: {
              value: {
                fontSize: 20,
                fontWeight: 'bolder',
                color: '#777'
              },
              unit: {
                fontSize: 10,
                color: '#999',
                padding: [0, 0, -20, 0]
              }
            }
          },
          data: [
            {
              value: this.convertedAverageResponseTime
            }
          ]
        }
      ]
    };
    option && this.avgResTimeGraph.setOption(option);
  }
  getMinmumCaterTimeGraph() {
    var chartDom = document.getElementById('minCaterTime');
    this.mimmunCaterTimeGraph = echarts.init(chartDom);
    var option;
    option = {
      series: [
        {
          type: 'gauge',
          startAngle: 180,
          endAngle: 0,
          min: 0,
          max: 120,
          splitNumber: 4,
          itemStyle: {
            color: '#FF8373',
            //shadowColor: 'rgba(0,138,255,0.45)',
            //shadowBlur: 10,
            //shadowOffsetX: 2,
            //shadowOffsetY: 2
          },
          progress: {
            show: true,
            roundCap: true,
            width: 10
          },
          pointer: {
            icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
            length: '75%',
            width: 6,
            offsetCenter: [0, '5%']
          },
          axisLine: {
            roundCap: true,
            lineStyle: {
              width: 10
            }
          },
          axisTick: {
            splitNumber: 1,
            lineStyle: {
              width: 1,
              color: '#999'
            }
          },
          splitLine: {
            length: 1,
            lineStyle: {
              width: 1,
              color: '#999'
            }
          },
          axisLabel: {
            distance: 20,
            color: '#999',
            fontSize: 8
          },
          title: {
            show: false
          },
          detail: {
            backgroundColor: '#fff',
            //borderColor: '#999',
            //borderWidth: 2,
            width: '60%',
            lineHeight: 40,
            height: 40,
            //borderRadius: 8,
            offsetCenter: [0, '40%'],
            show: false,
            valueAnimation: true,
            formatter: function (value: any) {
              return value.toFixed(0);
            },
            rich: {
              value: {
                fontSize: 20,
                fontWeight: 'bolder',
                color: '#777'
              },
              unit: {
                fontSize: 10,
                color: '#999',
                padding: [0, 0, -20, 0]
              }
            }
          },
          data: [
            {
              value: this.convertedMinimumCaterTime
            }
          ]
        }
      ]
    };
    option && this.mimmunCaterTimeGraph.setOption(option);
  }
  getMaxmumCaterTimeGraph() {
    var chartDom = document.getElementById('maxCaterTime');
    this.maximumCaterTimeGraph = echarts.init(chartDom);
    var option;
    option = {
      series: [
        {
          type: 'gauge',
          startAngle: 180,
          endAngle: 0,
          min: 0,
          max: 120,
          splitNumber: 4,
          itemStyle: {
            color: '#BA5FCA',
            //shadowColor: 'rgba(0,138,255,0.45)',
            //shadowBlur: 10,
            //shadowOffsetX: 2,
            //shadowOffsetY: 2
          },
          progress: {
            show: true,
            roundCap: true,
            width: 10
          },
          pointer: {
            icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
            length: '75%',
            width: 6,
            offsetCenter: [0, '5%']
          },
          axisLine: {
            roundCap: true,
            lineStyle: {
              width: 10
            }
          },
          axisTick: {
            splitNumber: 1,
            lineStyle: {
              width: 1,
              color: '#999'
            }
          },
          splitLine: {
            length: 1,
            lineStyle: {
              width: 1,
              color: '#999'
            }
          },
          axisLabel: {
            distance: 20,
            color: '#999',
            fontSize: 8
          },
          title: {
            show: false
          },
          detail: {
            backgroundColor: '#fff',
            //borderColor: '#999',
            //borderWidth: 2,
            width: '60%',
            lineHeight: 40,
            height: 40,
            //borderRadius: 8,
            offsetCenter: [0, '40%'],
            valueAnimation: true,
            show: false,
            formatter: function (value: any) {
              return value.toFixed(0);
            },
            rich: {
              value: {
                fontSize: 20,
                fontWeight: 'bolder',
                color: '#777'
              },
              unit: {
                fontSize: 10,
                color: '#999',
                padding: [0, 0, -20, 0]
              }
            }
          },
          data: [
            {
              value: this.convertedMaximumCaterTime
            }
          ]
        }
      ]
    };
    option && this.maximumCaterTimeGraph.setOption(option);
  }
  inprogressGraph() {
    var chartDom = document.getElementById('inprogressgrahp');
    this.inprogressChart = echarts.init(chartDom);
    var option;
    const gaugeData = [
      {
        value: this.inprogressPersentageCount,
        title: {
          offsetCenter: ['0%', '0%']
        },
        detail: {
          valueAnimation: true,
          offsetCenter: ['0%', '10%']
        }
      }
    ];
    option = {
      series: [
        {
          type: 'gauge',
          startAngle: 90,
          endAngle: -270,
          pointer: {
            show: false
          },
          progress: {
            show: true,
            overlap: false,
            roundCap: true,
            clip: false,
            itemStyle: {
              borderWidth: 1,
              borderColor: 'rgb(255, 131, 115)'
            },
          },
          axisLine: {
            lineStyle: {
              width: 5,
              color: [
                [1, "rgb(254, 228, 224)"]
              ]
            }
          },
          splitLine: {
            show: false,
            distance: 0,
            length: 10
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false,
            distance: 0
          },
          data: gaugeData,
          title: {
            fontSize: 10
          },
          detail: {
            formatter: '{value}%',
            fontSize: 12,
          }
        }
      ]
    };
    option && this.inprogressChart.setOption(option);
  }
  assignTomeGraph() {
    var chartDom = document.getElementById('assignToMe');
    this.assignTomeChart = echarts.init(chartDom);
    var option;
    const gaugeData = [
      {
        value: this.assingTomePersentageCount,
        title: {
          offsetCenter: ['0%', '0%']
        },
        detail: {
          valueAnimation: true,
          offsetCenter: ['0%', '10%']
        }
      }
    ];
    option = {
      series: [
        {
          type: 'gauge',
          startAngle: 90,
          endAngle: -270,
          pointer: {
            show: false
          },
          progress: {
            show: true,
            overlap: false,
            roundCap: true,
            clip: false,
            itemStyle: {
              color: [
                [1, "#f8cf61"]
              ],
              borderWidth: 1,
              // borderColor: '#fff0c7'
            },
          },
          axisLine: {
            lineStyle: {
              width: 5,
              color: [
                [1, "#fff0c7"]
              ]
            }
          },
          splitLine: {
            show: false,
            distance: 0,
            length: 10
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false,
            distance: 0
          },
          data: gaugeData,
          title: {
            fontSize: 10
          },
          detail: {
            formatter: '{value}%',
            fontSize: 12,
          }
        }
      ]
    };
    option && this.assignTomeChart.setOption(option);
  }
  followUpGraph() {
    var chartDom = document.getElementById('followup');
    this.followupGraph = echarts.init(chartDom);
    var option;
    const gaugeData = [
      {
        value: this.followupPersentageCount,
        title: {
          offsetCenter: ['0%', '0%']
        },
        detail: {
          valueAnimation: true,
          offsetCenter: ['0%', '10%']
        }
      }
    ];
    option = {
      series: [
        {
          type: 'gauge',
          startAngle: 90,
          endAngle: -270,
          pointer: {
            show: false
          },
          progress: {
            show: true,
            overlap: false,
            roundCap: true,
            clip: false,
            itemStyle: {
              borderWidth: 1,
              borderColor: '#ceccff'
            },
          },
          axisLine: {
            lineStyle: {
              width: 5,
              color: [
                [1, "#ceccff"]
              ]
            }
          },
          splitLine: {
            show: false,
            distance: 0,
            length: 10
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false,
            distance: 0
          },
          data: gaugeData,
          title: {
            fontSize: 10
          },
          detail: {
            formatter: '{value}%',
            fontSize: 12,
          }
        }
      ]
    };
    option && this.followupGraph.setOption(option);
  }
  totalInteractionGrahp() {
    var chartDom = document.getElementById('totalinteraction');
    this.totalInteractionGraph = echarts.init(chartDom);
    var option;
    const gaugeData = [
      {
        value: this.compeletedPersentageCount,
        title: {
          offsetCenter: ['0%', '0%']
        },
        detail: {
          valueAnimation: true,
          offsetCenter: ['0%', '10%']
        }
      }
    ];
    option = {
      series: [
        {
          type: 'gauge',
          startAngle: 90,
          endAngle: -270,
          pointer: {
            show: false
          },
          progress: {
            show: true,
            overlap: false,
            roundCap: true,
            clip: false,
            itemStyle: {
              borderWidth: 1,
              borderColor: '#bfeede'
            },
          },
          axisLine: {
            lineStyle: {
              width: 5,
              color: [
                [1, "#bfeede"]
              ]
            }
          },
          splitLine: {
            show: false,
            distance: 0,
            length: 10
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false,
            distance: 0
          },
          data: gaugeData,
          title: {
            fontSize: 10
          },
          detail: {
            formatter: '{value}%',
            fontSize: 12,
          }
        }
      ]
    };
    option && this.totalInteractionGraph.setOption(option);
  }
  heatmapGraph:any
  peakHoursGraph() {
    
    var chartDom = document.getElementById('heatMap');
     this.heatmapGraph = echarts.init(chartDom);
    var option;
    const hours = [
      '0', '1', '2,', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'
    ];
    const days = this.peakHoursDays
    const data = this.heatMapData
      .map(function (item) {
        return [item[1], item[0], item[2] || '-'];
      });
      const currentDayIndex = new Date();
const currentDayName = currentDayIndex.toLocaleDateString('en-US', { weekday: 'long' });
    option = {
      tooltip: {
        position: 'top'
      },
      grid: {
        height: '70%',
        top: '0%',
        left: '15%',
      },
      xAxis: {
        type: 'category',
        data: hours,
        splitArea: {
          show: true
        },
        nameLocation: 'middle',
        name: 'Time (Hours) ',
        nameTextStyle: {
          fontSize: 12,
          color: 'grey',
          lineHeight:60,
            fontWeight: 'bold'
        },
      },
      yAxis: {
        type: 'category',
        data: days,
        splitArea: {
          show: true
        },
        nameLocation: 'middle',
        name: 'Days ',
        nameTextStyle: {
          fontSize: 12,
          color: 'grey',
          lineHeight:160,
            fontWeight: 'bold'
        },
      },
      axisLabel: {
        formatter: function (value:any) {
          if (value === currentDayName) {
            return '{bold|' + value + '}';
          }
          return value;
        },
        rich: {
          bold: {
            fontWeight: 'bold'
          }
        }
      },
      visualMap: {
        min: 0,
        max: 500, 
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: '4%',
        inRange: {
          color: ['#e1e3f5', '#a6acdf', '#6b75ca']
        },
        outOfRange: {
          color: ['#6b75ca'] 
        }
      },
      series: [
        {
          name: 'Peak Hours',
          type: 'heatmap',
          data: data,
          label: {
            show: true,
            fontSize: 10
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          cellSize: ['auto', 550]
        }
      ]
    };
    option && this.heatmapGraph.setOption(option, true);
  }
  workloadGraph() {
    var chartDom = document.getElementById('workloadchart');
    var myChart = echarts.init(chartDom);
    var option;
    option = {
      color: ['#ff8373', '#f8cf61'],
      tooltip: {
        trigger: 'item'
      },
      legend: {
        left: 'center',
        bottom: 'bottom',
        icon: 'circle',
      },
      series: [
        {
          name: 'Work Load',
          type: 'pie',
          radius: ['50%', '60%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 15,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: this.totalworkloadInteractions
        }
      ]
    };
    option && myChart.setOption(option);
  }
  makeChartResponsive() {
    window.addEventListener('resize', () => {
      if (this.inprogressChart) {
        this.inprogressChart.resize();
      }
      if (this.assignTomeChart) {
        this.assignTomeChart.resize();
      }
      if (this.followupGraph) {
        this.followupGraph.resize();
      }
      if (this.totalInteractionGraph) {
        this.totalInteractionGraph.resize();
      }
      if (this.avgResRateGraph) {
        this.avgResRateGraph.resize();
      }
      if (this.avgResTimeGraph) {
        this.avgResTimeGraph.resize();
      }
      if (this.mimmunCaterTimeGraph) {
        this.mimmunCaterTimeGraph.resize();
      }
      if (this.maximumCaterTimeGraph) {
        this.maximumCaterTimeGraph.resize();
      }
      if (this.heatmapGraph) {
        this.heatmapGraph.resize();
      }
    });
  }
  formatNumber(value: number): string {
    if (value === null || value === undefined) {
      return '';
    }
    if(value<=100){
      return value.toString()
    }
    else if (value <= 1000) {
      return value.toString();
    } else if (value <= 1000000) {
      return (value / 1000).toFixed(1) + ' K';
    } else if (value < 1000000000) {
      return (value / 1000000).toFixed(1) + ' M';
    } else {
      return (value / 1000000000).toFixed(1) + ' B';
    }
  }
  convertAverageResTinmeToMinutes(time: string): number {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    this.convertedAverageResponseTime = ((hours * 60) + minutes + (seconds / 60));
    return this.convertedAverageResponseTime
  }
  convertMaximumCaterTinmeToMinutes(time: string): number {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    this.convertedMaximumCaterTime = ((hours * 60) + minutes + (seconds / 60));
    return this.convertedMaximumCaterTime
  }
  convertMinimumCaterTinmeToMinutes(time: string): number {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    this.convertedMinimumCaterTime = ((hours * 60) + minutes + (seconds / 60));
    return this.convertedMinimumCaterTime
  }
  convertAverageResRateTinmeToMinutes(time: string): number {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    this.convertedAverageResRate = ((hours * 60) + minutes + (seconds / 60));
    return this.convertedAverageResRate
  }
  GetPerviousWallboardData() {
    this.perviousInprogressCount = 0
    this.perviousAssignTomeCount = 0
    this.perviousFollowupCount = 0
    this.perviousTotalInteractionCount = 0
    this.perviousCompeletedCount = 0
    this.InprogressPersentageCount = 0
    this.perviousAssingTomePersentageCount = 0
    this.perviousFollowupPersentageCount = 0
    this.perviousFollowupWorkloadCount = 0
    this.totalInteractionPersentageCount = 0
    this.perviousCompeletedPersentageCount = 0
    this.perviousAverageResolutinTimePersentage = 0
    this.perviousAverageResponseTimePersentage = 0
    this.perviousMinimumCaterTimePersentage = 0
    this.perviousMaximumCaterTimePersentage = 0
    this.currentplatformwiseFollowupcount=0
    this.currentPlatformwiseCompletedCount
    this.perviousWallboardData = []
    this.commanDataService.GetPerviousWallboardReport().subscribe((res: any) => {
      this.perviousWallboardData.push(res);
      this.perviousWallboardData.forEach((abc: any) => {
        const perviousInteraction = abc.interactionResponse.totalInteractions
        const perviousInprogress = abc.interactionResponse.inProgressCount
        const perviousAssignTome = abc.interactionResponse.assignTomeCount
        const perviousFollowup = abc.interactionResponse.followUpCount
        const perviousCompeleted = abc.interactionResponse.completedCount
        const perviousAverageResolutionTime = abc.averageResolutionTime
        const perviousMaximumCaterTime = abc.maximumCaterTime
        const perviousMinimumCaterTime = abc.minimunCaterTime
        const perviousAverageResponseTime = abc.averageResponseTime
        const perviousWorkloadResponse = abc.workLoadResponse
        const perviousCompletedCount = perviousWorkloadResponse[0].totalWorkLoad
        const perviousFollowupwordload = perviousWorkloadResponse[1].totalWorkLoad
        // persentAgeFor workload response 
        this.platFormWiseInteractionsCompeleted?.forEach((x:any)=>{
          this. currentPlatformwiseCompletedCount=x.interactionCount
        })
       this.platFormWiseInteractionsFollowup?.forEach((z:any)=>{
        this.currentplatformwiseFollowupcount =z?.interactionCount
       })
       
        this.perviousCompeletedPersentageCount = Number((((this.currentPlatformwiseCompletedCount - perviousCompletedCount) / perviousCompletedCount) * 100).toFixed(2));
        this.perviousFollowupWorkloadCount = Number((((this.currentplatformwiseFollowupcount - perviousFollowupwordload )/ perviousFollowupwordload) * 100).toFixed(2))
        this.convertedperviousResolutonTimeToMinutes(perviousAverageResolutionTime)
        this.convertedperviousAverageResponseTimToMinutes(perviousAverageResponseTime)
        this.convertedperiousMinimumCarterTimeToMinutes(perviousMinimumCaterTime)
        this.convertedperiousMaximumCarterTimeToMinutes(perviousMaximumCaterTime)
        // persentageForInprogress and other
        this.InprogressPersentageCount = Number((((this.inprogresscount - perviousInprogress )/ perviousInprogress) * 100).toFixed(2))
        this.perviousFollowupPersentageCount =Number( (((this.followupcount - perviousFollowup) / perviousFollowup) * 100).toFixed(2))
        this.perviousAssingTomePersentageCount =Number ((((this.assignTomecount - perviousAssignTome) / perviousAssignTome) * 100).toFixed(2))
        this.compeletedPersentageCount = Number((((this.compeletedCount - perviousCompeleted) / perviousCompeleted) * 100).toFixed(2))
        this.totalInteractionPersentageCount =Number ((((this.totalInteractioncount - perviousInteraction) / perviousInteraction) * 100).toFixed(2))
        // persentageForAverageResponseTime and other
        this.perviousAverageResolutinTimePersentage = Number((((this.convertedAverageResRate - this.perviousconvertedAverageResRate) / this.perviousconvertedAverageResRate) * 100).toFixed(2))
        this.perviousAverageResponseTimePersentage = Number((((this.convertedAverageResponseTime - this.perviousconvertedAverageResponseTime) / this.perviousconvertedAverageResponseTime) * 100).toFixed(2))
        this.perviousMinimumCaterTimePersentage = Number((((this.convertedMinimumCaterTime - this.perviousconvertedMinimumCaterTime) / this.perviousconvertedMinimumCaterTime) * 100).toFixed(2))
        this.perviousMaximumCaterTimePersentage = Number((((this.convertedMaximumCaterTime - this.perviousconvertedMaximumCaterTime) / this.perviousconvertedMaximumCaterTime) * 100).toFixed(2))
      })
    })
  }
  convertedperviousResolutonTimeToMinutes(time: any): number {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    this.perviousconvertedAverageResRate = ((hours * 60) + minutes + (seconds / 60));
    return this.perviousconvertedAverageResRate
  }
  convertedperviousAverageResponseTimToMinutes(time: any): number {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    this.perviousconvertedAverageResponseTime = ((hours * 60) + minutes + (seconds / 60));
    return this.perviousconvertedAverageResponseTime
  }
  convertedperiousMinimumCarterTimeToMinutes(time: any): number {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    this.perviousconvertedMinimumCaterTime = ((hours * 60) + minutes + (seconds / 60));
    return this.perviousconvertedMinimumCaterTime
  }
  convertedperiousMaximumCarterTimeToMinutes(time: any): number {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    this.perviousconvertedMaximumCaterTime = ((hours * 60) + minutes + (seconds / 60));
    return this.perviousconvertedMaximumCaterTime
  }
  transformtValue(value: any) {
    
    if (isNaN(value)) {
      return "∞";
    }
    if(value==Infinity){
      return "∞"
    }

    return Math.abs(value)
  }
  timer(minute: any) {
    // let minute = 1;
    let seconds: number = minute * 60;
    let textSec: any = '0';
    let statSec: number = 60;
    const prefix = minute < 10 ? '0' : '';
    const timer = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;
      if (statSec < 10) {
        textSec = '0' + statSec;
      } else textSec = statSec;
      this.displayTime = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;
      if (seconds == 0) {
        console.log('finished');
        clearInterval(timer);
      }
    }, 1000);
  }
  ngOnDestroy(): void {
    clearTimeout(this.wallboardReloadTime)
  }
  allcsatdata: any[] = []
  csatResponse: any
  CsatCount:number=0
  persentageCsat:number=0
  persentageForExcellent:number=0
  persentageForveryGood:number=0
  persentageForGood:number=0
  persentageForpoor:number=0
  persentageForVeryPoor:number=0
  getAllCsatData() {
    this.allcsatdata = [];
    this.CsatCount=0
    this.persentageCsat=0
    this.persentageForExcellent=0
    this.persentageForveryGood=0
    this.persentageForGood=0
    this.persentageForpoor=0
    this.persentageForVeryPoor=0
    this.commanDataService.GetWallboardCsatReport().subscribe((res: any) => {
      this.csatResponse = res;
      this.csatResponse?.csatData?.forEach((x: any) => {
        const matchingEntry = this.castJson.find(y => y.rating == x.rating);
        if (matchingEntry) {
          matchingEntry.count = x.count;
        }
      });
      
      this.CsatCount =Number (this.castJson[0].count)
     this.persentageCsat = (this.CsatCount/this.castJson.length)*100
     this.persentageForExcellent =  (this.CsatCount/this.castJson.length)*100
     
      this.persentageForveryGood =(Number( this.castJson[1].count)/this.castJson.length)*100
      this.persentageForGood =((Number( this.castJson[2].count)/this.castJson.length))*100
      this.persentageForpoor =((Number( this.castJson[3].count)/this.castJson.length))*100
      this.persentageForVeryPoor =((Number( this.castJson[4].count)/this.castJson.length))*100
    });
  }
  getMothToDateSla(){
    
    this.commanDataService.GetMonthToDateServiceLevel().subscribe((res:any)=>{
      this.monthtoDay=res
    })
  }
}