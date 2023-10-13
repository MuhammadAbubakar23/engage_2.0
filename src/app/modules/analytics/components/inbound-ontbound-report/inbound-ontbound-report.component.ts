import { CommonModule, DatePipe } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { HeaderService } from 'src/app/shared/services/header.service';
import * as echarts from 'echarts';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  standalone: true,
  selector: 'app-inbound-ontbound-report',
  templateUrl: './inbound-ontbound-report.component.html',
  styleUrls: ['./inbound-ontbound-report.component.scss'],
  imports: [CommonModule, FormsModule, SharedModule],
})
export class InboundOntboundReportComponent implements OnInit {
  @ViewChild('inboundOutboundReport', { static: true })
  inboundOutboundReport!: ElementRef;
  @ViewChild('ChannelWiseGraph', { static: true })
  ChannelWiseGraph!: ElementRef;
  @ViewChild('TagsPerChannel', { static: true }) TagsPerChannel!: ElementRef;
  @ViewChild('senitimentalGraph', { static: true })
  senitimentalGraph!: ElementRef;

  selectedChannels: string = '';
  selectedContent: string = '';
  selectedTagOption: string = '';
  selectedSentiment: string = '';
  selectedType: string = '';
  selectedTagBy: string = '';
  Inbound_Outbound_Report: any;
  startDate: string = '';
  endDate: string = '';
  Inbound_Outbound_Graph: any;
  Inbound_data: any[] = [];
  Outbound_data: any[] = [];
  currentDate: any;
  maxEndDate: any;

  tagsPerChannel: any[] = [];
  constructor(
    private _hS: HeaderService,
    private commonService: CommonDataService,
    private datePipe: DatePipe,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.currentDate = new Date();
    this.maxEndDate = this.currentDate.toISOString().split('T')[0];
    this.AddGraph();
    const newObj = {
      title: 'Inbound/Outbound Report',
      url: '/analytics/inbound-outbound-report',
    };
    this._hS.setHeader(newObj);
    this.getTags();
    this.getListUser();
    this.getSentiments();
  }
  onCheckboxChange() {
    this.AddGraph();
    this.cdr.detectChanges();
  }
  AddGraph() {
    let selectedChannelsArray = this.channelOptions
      .filter((item) => item.isSelected)
      .map((item) => item.label);
    this.selectedChannels = selectedChannelsArray.toString();

    let selectedContentTypesArray = this.contentTypes
      .filter((item) => item.isSelected)
      .map((item) => item.value);
    this.selectedContent = selectedContentTypesArray.toString();

    let selectedTagOptionArray = this.keywordslist
      .filter((item) => item.isSelected)
      .map((item) => item.id);
    this.selectedTagOption = selectedTagOptionArray.toString();

    let selectedSentimentsArray = this.sentimentOptions
      .filter((item) => item.isSelected)
      .map((item) => item.id);
    this.selectedSentiment = selectedSentimentsArray.toString();

    let selectedTagByArray = this.taggedByOptions
      .filter((item) => item.isSelected)
      .map((item) => item.id);
    this.selectedTagBy = selectedTagByArray.toString();

    let selectedTypeArray = this.typeOptions
      .filter((item) => item.isSelected)
      .map((item) => item.label);
    this.selectedType = selectedTypeArray.toString();

    if (this.startDate == '' && this.endDate == '') {
      const today = this.currentDate;
      this.endDate = this.datePipe.transform(today, 'YYYY-MM-dd') || '';

      let prevDate = this.currentDate.setDate(this.currentDate.getDate() - 7);
      this.startDate = this.datePipe.transform(prevDate, 'YYYY-MM-dd') || '';
    } else if (this.startDate != '' && this.endDate != '') {
      this.startDate = this.startDate;
      this.endDate = this.endDate;
    }
    const requestData = {
      fromDate: this.startDate,
      toDate: this.endDate,
      channels: this.selectedChannels,
      contentTypes: this.selectedContent,
      tags: this.selectedTagOption,
      sentiments: this.selectedSentiment,
      agents: this.selectedTagBy,
      inbound: false,
      outbound: false,
      inboundOutbound: false,
      dateSubFilter: 0,
    };
    if (this.endDate >= this.startDate) {
      this.commonService.Addinboundoutbound(requestData).subscribe(
        (response: any) => {
          this.Inbound_data = [];
          this.Outbound_data = [];

          if (response) {
            this.Inbound_Outbound_Report = response;
            this.Inbound_Outbound_Report.channelReportData.dateWiseData.forEach(
              (data: any) => {
                this.Inbound_data.push({
                  x: new Date(data.createdDate),
                  y: data.inboundData,
                });
                this.Outbound_data.push({
                  x: new Date(data.createdDate),
                  y: data.outboundData,
                });
              }
            );
            // inbound
            const doms = this.inboundOutboundReport.nativeElement;
            const myCharts = echarts.init(doms, null, {
              renderer: 'canvas',
              useDirtyRect: false,
            });
            var option: echarts.EChartsOption;
            option = {
              color: ['rgba(255,189,61,255)', 'rgba(96,191,235,255)'],
              title: {
                text: '',
              },
              tooltip: {
                trigger: 'axis',
              },
              legend: {
                data: ['Inbound', 'OutBound'],
                textStyle: {
                  fontSize: 13,
                },
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true,
              },
              xAxis: [
                {
                  type: 'category',
                  boundaryGap: false,
                  axisLabel: {
                    formatter: function (value: string | number | Date) {
                      return new Date(value).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                      });
                    },
                  },
                  data: this.Inbound_data.map(function (dataPoint) {
                    return dataPoint.x;
                  }),
                },
              ],
              yAxis: [
                {
                  type: 'value',
                },
              ],
              series: [
                {
                  name: 'Inbound',
                  type: 'line',
                  smooth: true,
                  symbolSize: 8,
                  data: this.Inbound_data.map(function (dataPoint) {
                    return dataPoint.y;
                  }),
                },
                {
                  name: 'OutBound',
                  type: 'line',
                  smooth: true,
                  symbolSize: 8,
                  data: this.Outbound_data.map(function (dataPoint) {
                    return dataPoint.y;
                  }),
                },
              ],
            };
            myCharts.setOption(option);

            // Update the ChannelWiseGraph
            const dom = this.ChannelWiseGraph.nativeElement;
            const myChart = echarts.init(dom, null, {
              renderer: 'canvas',
              useDirtyRect: false,
            });
            var option: echarts.EChartsOption;
            const totalAnswered =
              this.Inbound_Outbound_Report.channelReportData.answered;
            const totalUnanswered =
              this.Inbound_Outbound_Report.channelReportData.unAnswered;
            let answeredPercentage: number;
            let unansweredPercentage: number;
            if (totalAnswered === 0 && totalUnanswered === 0) {
              answeredPercentage = 0;
              unansweredPercentage = 0;
            } else {
              answeredPercentage =
                (totalAnswered / (totalAnswered + totalUnanswered)) * 100;
              unansweredPercentage =
                (totalUnanswered / (totalAnswered + totalUnanswered)) * 100;
            }
            option = {
              color: ['#FF6B6B', '#32CD32'],
              title: {
                text: '',
              },
              tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c}%',
              },
              legend: {
                orient: 'vertical',
                left: 'left',
                data: ['Unanswered', 'Answered'],
              },
              series: [
                {
                  name: 'Channel Wise',
                  type: 'pie',
                  radius: ['50%', '70%'],
                  avoidLabelOverlap: false,
                  label: {
                    show: true,
                    position: 'outside',
                    formatter: '{d}%',
                  },
                  emphasis: {
                    label: {
                      show: true,
                      fontSize: '20',
                      fontWeight: 'bold',
                    },
                  },
                  labelLine: {
                    show: true,
                  },
                  data: [
                    { value: unansweredPercentage, name: 'Unanswered' },
                    { value: answeredPercentage, name: 'Answered' },
                  ],
                },
              ],
            };
            myChart.setOption(option);
            // Update TagsPerChannel
            const myDom = this.TagsPerChannel.nativeElement;
            const mychart = echarts.init(myDom, null, {
              renderer: 'canvas',
              useDirtyRect: false,
            });

            var option: echarts.EChartsOption;
            const tagReportData = this.Inbound_Outbound_Report.tagReportData;
            const platformsArray: any[] = [];

            tagReportData.forEach((channel: any) => {
              ;
              if (!platformsArray.includes(channel.platform)) {
                platformsArray.push(channel.platform);
              }
              channel.data.forEach((tag: any) => {
                const name = tag.name;
                const count = tag.count;
                const existingNameCount = this.tagsPerChannel.find((n) => n.name === name);
                if (existingNameCount) {
                  existingNameCount.data.push(count);
                } else {
                  this.tagsPerChannel.push({
                    type: 'bar',
                    name: name,
                    stack: 'Ad',
                    data: [count],
                  });
                }
              });
            });
            option = {
              tooltip: { trigger: 'axis' },
              legend: {top: 10,
                left: 10},
              xAxis: [{ type: 'category', data: platformsArray }],
              yAxis: [{ type: 'value' }],
              series: this.tagsPerChannel,
            };

            mychart.setOption(option);

            // Update senitimentalGraph
            const myDoms = this.senitimentalGraph.nativeElement;
            const chart = echarts.init(myDoms, null, {
              renderer: 'canvas',
              useDirtyRect: false,
            });
            var option: echarts.EChartsOption;
            const sentimentReportData =
              this.Inbound_Outbound_Report.sentimentReportData;
            const sentimentDataPoints: {
              platform: string;
              Positive: number;
              Negative: number;
              Neutral: number;
            }[] = [];
            sentimentReportData.forEach((platformData: any) => {
              const platformName = platformData.platform;
              const sentimentCounts: { [key: string]: number } = {};
              platformData.data.forEach((sentiment: any) => {
                sentimentCounts[sentiment.name] = sentiment.count;
              });
              sentimentDataPoints.push({
                platform: platformName,
                Positive: sentimentCounts['Positive'] || 0,
                Negative: sentimentCounts['Negative'] || 0,
                Neutral: sentimentCounts['Neutral'] || 0,
              });
            });
            option = {
              legend: {},
              tooltip: { trigger: 'axis' },
              dataset: {
                source: sentimentDataPoints,
              },
              xAxis: { type: 'category' },
              yAxis: {},
              series: [
                {
                  type: 'bar',
                  seriesLayoutBy: 'row',
                  itemStyle: {
                    color: '#4cc424',
                    borderRadius: 5,
                  },
                  label: {
                    show: true,
                    position: 'top',
                  },
                },
                {
                  type: 'bar',
                  seriesLayoutBy: 'row',
                  itemStyle: {
                    color: 'rgba(209,60,60,255)',
                    borderRadius: 5,
                  },
                  label: {
                    show: true,
                    position: 'top',
                  },
                },
                {
                  type: 'bar',
                  seriesLayoutBy: 'row',
                  itemStyle: {
                    color: '#ffa800',
                    borderRadius: 5,
                  },
                  label: {
                    show: true,
                    position: 'top',
                  },
                },
              ],
            };

            option && chart.setOption(option);
          }
        },
        (error: any) => {
          console.error('HTTP Error:', error);
        }
      );
    } else {
      alert('End Date is less than Start Date');
    }
  }
  resetEndDate() {
    this.endDate = '';
  }
  getPlatformClass(platformName: string): string {
    switch (platformName.toLowerCase()) {
      case 'facebook':
        return 'facebook';
      case 'twitter':
        return 'twitter';
      case 'whatsapp':
        return 'whatsapp';
      case 'linkedin':
        return 'linkedin';
      case 'email':
        return 'email';
      case 'instagram':
        return 'instagram';
      default:
        return '';
    }
  }
  reportOptions = [
    { id: '11', label: 'Date' },
    { id: '22', label: 'Days' },
    { id: '23', label: 'Hours' },
    { id: '94', label: 'Months' },
  ];

  channelOptions = [
    {
      id: '123',
      label: 'Twitter',
      icon: 'fa-brands fa-twitter sky pe-2',
      isSelected: false,
    },
    {
      id: '12',
      label: 'Instagram',
      icon: 'fa-brands fa-instagram pe-2',
      isSelected: false,
    },
    {
      id: '14',
      label: 'LinkedIn',
      icon: 'fa-brands fa-linkedin pe-2',
      isSelected: false,
    },
    {
      id: '15',
      label: 'Facebook',
      icon: 'fa-brands fa-facebook facebook pe-2',
      isSelected: false,
    },
    {
      id: '14',
      label: 'YouTube',
      icon: 'fa-brands fa-youtube pe-2',
      isSelected: false,
    },
    {
      id: '15',
      label: 'SMS',
      icon: 'fa-solid fa-comment-alt pe-2',
      isSelected: false,
    },
    {
      id: '14',
      label: 'WhatsApp',
      icon: 'fa-brands fa-whatsapp pe-2',
      isSelected: false,
    },
    {
      id: '15',
      label: 'Email',
      icon: 'fa-solid fa-envelope pe-2',
      isSelected: false,
    },
    {
      id: '14',
      label: 'OfficeEmail',
      icon: 'fa-solid fa-envelope pe-2',
      isSelected: false,
    },
    {
      id: '14',
      label: 'WebChat',
      icon: 'fa-solid fa-comment-dots pe-2',
      isSelected: false,
    },
  ];
  contentTypes = [
    {
      id: '11',
      label: 'Twitter Tweets',
      value: 'TTR',
      icon: 'fa-brands fa-twitter sky pe-2',
      isSelected: false,
    },
    {
      id: '22',
      label: 'Twitter DMs',
      value: 'TDM',
      icon: 'fa-brands fa-twitter sky pe-2',
      isSelected: false,
    },
    {
      id: '23',
      label: 'Facebook Posts',
      value: '',
      icon: 'fa-brands fa-facebook facebook pe-2',
      isSelected: false,
    },
    {
      id: '94',
      label: 'Facebook Comments',
      value: 'FC',
      icon: 'fa-brands fa-facebook facebook pe-2',
      isSelected: false,
    },
    {
      id: '66',
      label: 'Instagram Post',
      value: '',
      icon: 'fa-brands fa-instagram night pe-2',
      isSelected: false,
    },
    {
      id: '65',
      label: 'Instagram Comments',
      value: 'IC',
      icon: 'fa-brands fa-instagram night pe-2',
      isSelected: false,
    },
    {
      id: '24',
      label: 'Youtube Comments',
      value: 'YC',
      icon: 'fa-brands fa-youtube youtube pe-2',
      isSelected: false,
    },
  ];
  typeOptions = [
    { id: '123', label: 'InBound Outbound Report', isSelected: false },
    { id: '12', label: 'InBound Report', isSelected: false },
    { id: '14', label: 'Outbound Report', isSelected: false },
  ];
  tagOptions = [{ id: '', name: '', isSelected: false }];
  sentimentOptions = [{ id: '', name: '', isSelected: false }];
  taggedByOptions = [{ id: '', name: '', isSelected: false }];
  keywordslist: any[] = [];
  searchText: string = '';
  getTags(): void {
    this.commonService.GetTagsList().subscribe((res: any) => {
      console.log('All tags===>', res);
      this.tagOptions = res;
      this.tagOptions.forEach((xyz: any) => {
        xyz.keywordList.forEach((abc: any) => {
          this.keywordslist.push(abc);
        });
      });
    });
  }
  getSentiments(): void {
    this.commonService.GetSentimentData().subscribe(
      (response: any) => {
        this.sentimentOptions = response;
        console.log(this.sentimentOptions);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  getListUser(): void {
    this.commonService.GetUserList().subscribe(
      (response: any) => {
        this.taggedByOptions = response;
        console.log(this.taggedByOptions);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}
