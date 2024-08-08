import { CommonModule, DatePipe } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { HeaderService } from 'src/app/shared/services/header.service';
import * as echarts from 'echarts';
import { SharedModule } from '../../../../shared/shared.module';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { Router } from '@angular/router';
@Component({
  standalone: true,
  selector: 'app-inbound-ontbound-report',
  templateUrl: './inbound-ontbound-report.component.html',
  styleUrls: ['./inbound-ontbound-report.component.scss'],
  imports: [CommonModule, FormsModule, SharedModule, NgxSpinnerModule],
})
export class InboundOntboundReportComponent implements OnInit {
  @ViewChild('inboundOutboundReport', { static: false })
  inboundOutboundReport!: ElementRef;
  @ViewChild('ChannelWiseGraph', { static: false })
  ChannelWiseGraph!: ElementRef;
  @ViewChild('TagsPerChannel', { static: false }) TagsPerChannel!: ElementRef;
  @ViewChild('senitimentalGraph', { static: false })
  senitimentalGraph!: ElementRef;
  @ViewChild('senitimentalGraphhourlywise', { static: false })
  senitimentalGraphhourlywise!: ElementRef;
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
  tagReportData: any[] = []
  Outbound_data: any[] = [];
  platformsArray: any[] = []
  Inbound_outbounArray: any[] = []
  currentDate: any;
  maxEndDate: any;
  isChannelsShow: boolean = false;
  downloading = false;
  toastermessage = false;
  isShowSentimentGraph: boolean = false
  isShowInboundoutboundGraph: boolean = false
  AlterMsg: any = '';
  activeChannel: any
  channelOptions: any[] = []
  existingNameCount: any
  tagsPerChannel: any[] = [];
  tagreportArry: any[] = []
  private inboundOutboundChart: any;
  private sentimentChart: any;
  private sentimentChartHourly: any;
  private tagsChart: any;
  private averageResponseChart: any;
  isChannelShow: any = ''
  inboundoutboundDate: any[] = []
  inboundData: any[] = []
  outboundData: any[] = []
  str: any = ''
  sentimentArray: any[] = []
  isShowTagReport: boolean = false
  inboundCounthourlyWise: any[] = []
  outboundCounthourlyWise: any[] = []
  allHoursArrayInboundoutbound: any[] = []
  sentimental_analysis:any[]=[]
sentimentDataPointsHourlyWise: {
    Time: any;
    Positive: number;
    Negative: number;
    Neutral: number;
  }[] = [];
  inboundJson = {
    "channelReportData": {
      "inboundSum": 7945,
      "outboundSum": 2982,
      "answered": 3008,
      "unAnswered": 4937,
      "channelWiseData": [
        {
          "platform": "Twitter",
          "createdDate": null,
          "inboundData": 358,
          "outboundData": 0
        },
        {
          "platform": "Facebook",
          "createdDate": null,
          "inboundData": 7554,
          "outboundData": 2982
        },
        {
          "platform": "Instagram",
          "createdDate": null,
          "inboundData": 33,
          "outboundData": 0
        }
      ],
      "dateWiseData": [
        {
          "platform": "Twitter",
          "createdDate": "2024-05-05T00:00:00",
          "inboundData": 36,
          "outboundData": 0
        },
        {
          "platform": "Twitter",
          "createdDate": "2024-05-06T00:00:00",
          "inboundData": 534,
          "outboundData": 200
        },
        {
          "platform": "Facebook",
          "createdDate": "2024-05-07T00:00:00",
          "inboundData": 2499,
          "outboundData": 838
        },
        {
          "platform": "Facebook",
          "createdDate": "2024-05-08T00:00:00",
          "inboundData": 1614,
          "outboundData": 646
        },
        {
          "platform": "Facebook",
          "createdDate": "2024-05-09T00:00:00",
          "inboundData": 1529,
          "outboundData": 590
        },
        {
          "platform": "Facebook",
          "createdDate": "2024-05-10T00:00:00",
          "inboundData": 1733,
          "outboundData": 691
        }
      ],
      "hourWiseData": [
        {
          "trafficType": "Inbound",
          "hourly": [
            {
              "hour": 0,
              "count": 513
            },
            {
              "hour": 1,
              "count": 681
            },
            {
              "hour": 2,
              "count": 762
            },
            {
              "hour": 3,
              "count": 327
            },
            {
              "hour": 4,
              "count": 231
            },
            {
              "hour": 5,
              "count": 171
            },
            {
              "hour": 6,
              "count": 178
            },
            {
              "hour": 7,
              "count": 222
            },
            {
              "hour": 8,
              "count": 169
            },
            {
              "hour": 9,
              "count": 220
            },
            {
              "hour": 10,
              "count": 233
            },
            {
              "hour": 11,
              "count": 333
            },
            {
              "hour": 12,
              "count": 256
            },
            {
              "hour": 13,
              "count": 236
            },
            {
              "hour": 14,
              "count": 288
            },
            {
              "hour": 15,
              "count": 319
            },
            {
              "hour": 16,
              "count": 227
            },
            {
              "hour": 17,
              "count": 334
            },
            {
              "hour": 18,
              "count": 359
            },
            {
              "hour": 19,
              "count": 359
            },
            {
              "hour": 20,
              "count": 365
            },
            {
              "hour": 21,
              "count": 348
            },
            {
              "hour": 22,
              "count": 360
            },
            {
              "hour": 23,
              "count": 454
            }
          ]
        },
        {
          "trafficType": "Outbound",
          "hourly": [
            {
              "hour": 0,
              "count": 83
            },
            {
              "hour": 1,
              "count": 307
            },
            {
              "hour": 2,
              "count": 220
            },
            {
              "hour": 3,
              "count": 118
            },
            {
              "hour": 4,
              "count": 51
            },
            {
              "hour": 5,
              "count": 89
            },
            {
              "hour": 6,
              "count": 13
            },
            {
              "hour": 7,
              "count": 155
            },
            {
              "hour": 8,
              "count": 45
            },
            {
              "hour": 9,
              "count": 121
            },
            {
              "hour": 10,
              "count": 75
            },
            {
              "hour": 11,
              "count": 115
            },
            {
              "hour": 12,
              "count": 127
            },
            {
              "hour": 13,
              "count": 116
            },
            {
              "hour": 14,
              "count": 99
            },
            {
              "hour": 15,
              "count": 133
            },
            {
              "hour": 16,
              "count": 88
            },
            {
              "hour": 17,
              "count": 135
            },
            {
              "hour": 18,
              "count": 147
            },
            {
              "hour": 19,
              "count": 151
            },
            {
              "hour": 20,
              "count": 133
            },
            {
              "hour": 21,
              "count": 134
            },
            {
              "hour": 22,
              "count": 157
            },
            {
              "hour": 23,
              "count": 170
            }
          ]
        }
      ]
    },
    "tagReportData": [
      {
        "platform": "Facebook",
        "totalCount": 18,
        "data": [
          {
            "id": 0,
            "name": "star_message",
            "count": 9,
            "hourlyData": null
          },
          {
            "id": 0,
            "name": "spam_message",
            "count": 4,
            "hourlyData": null
          },
          {
            "id": 0,
            "name": "new_connection",
            "count": 2,
            "hourlyData": null
          },
          {
            "id": 0,
            "name": "tariff",
            "count": 1,
            "hourlyData": null
          },
          {
            "id": 0,
            "name": "billing",
            "count": 1,
            "hourlyData": null
          },
          {
            "id": 0,
            "name": "complaint",
            "count": 1,
            "hourlyData": null
          }
        ]
      }
    ],
    "sentimentReportData": [
      {
        "platform": "Facebook",
        "totalCount": 7669,
        "data": [
          {
            "id": 0,
            "name": "negative",
            "count": 763,
            "hourlyData": [
              {
                "hour": 0,
                "count": 41
              },
              {
                "hour": 1,
                "count": 68
              },
              {
                "hour": 2,
                "count": 62
              },
              {
                "hour": 3,
                "count": 28
              },
              {
                "hour": 4,
                "count": 18
              },
              {
                "hour": 5,
                "count": 17
              },
              {
                "hour": 6,
                "count": 22
              },
              {
                "hour": 7,
                "count": 23
              },
              {
                "hour": 8,
                "count": 26
              },
              {
                "hour": 9,
                "count": 16
              },
              {
                "hour": 10,
                "count": 19
              },
              {
                "hour": 11,
                "count": 29
              },
              {
                "hour": 12,
                "count": 24
              },
              {
                "hour": 13,
                "count": 26
              },
              {
                "hour": 14,
                "count": 19
              },
              {
                "hour": 15,
                "count": 44
              },
              {
                "hour": 16,
                "count": 27
              },
              {
                "hour": 17,
                "count": 22
              },
              {
                "hour": 18,
                "count": 30
              },
              {
                "hour": 19,
                "count": 28
              },
              {
                "hour": 20,
                "count": 37
              },
              {
                "hour": 21,
                "count": 32
              },
              {
                "hour": 22,
                "count": 53
              },
              {
                "hour": 23,
                "count": 52
              }
            ]
          },
          {
            "id": 0,
            "name": "neutral",
            "count": 5132,
            "hourlyData": [
              {
                "hour": 0,
                "count": 336
              },
              {
                "hour": 1,
                "count": 446
              },
              {
                "hour": 2,
                "count": 531
              },
              {
                "hour": 3,
                "count": 216
              },
              {
                "hour": 4,
                "count": 155
              },
              {
                "hour": 5,
                "count": 106
              },
              {
                "hour": 6,
                "count": 111
              },
              {
                "hour": 7,
                "count": 129
              },
              {
                "hour": 8,
                "count": 102
              },
              {
                "hour": 9,
                "count": 152
              },
              {
                "hour": 10,
                "count": 170
              },
              {
                "hour": 11,
                "count": 218
              },
              {
                "hour": 12,
                "count": 159
              },
              {
                "hour": 13,
                "count": 156
              },
              {
                "hour": 14,
                "count": 214
              },
              {
                "hour": 15,
                "count": 193
              },
              {
                "hour": 16,
                "count": 139
              },
              {
                "hour": 17,
                "count": 227
              },
              {
                "hour": 18,
                "count": 212
              },
              {
                "hour": 19,
                "count": 232
              },
              {
                "hour": 20,
                "count": 226
              },
              {
                "hour": 21,
                "count": 207
              },
              {
                "hour": 22,
                "count": 223
              },
              {
                "hour": 23,
                "count": 272
              }
            ]
          },
          {
            "id": 0,
            "name": "positive",
            "count": 1774,
            "hourlyData": [
              {
                "hour": 0,
                "count": 118
              },
              {
                "hour": 1,
                "count": 148
              },
              {
                "hour": 2,
                "count": 142
              },
              {
                "hour": 3,
                "count": 75
              },
              {
                "hour": 4,
                "count": 53
              },
              {
                "hour": 5,
                "count": 42
              },
              {
                "hour": 6,
                "count": 39
              },
              {
                "hour": 7,
                "count": 59
              },
              {
                "hour": 8,
                "count": 36
              },
              {
                "hour": 9,
                "count": 49
              },
              {
                "hour": 10,
                "count": 36
              },
              {
                "hour": 11,
                "count": 71
              },
              {
                "hour": 12,
                "count": 58
              },
              {
                "hour": 13,
                "count": 48
              },
              {
                "hour": 14,
                "count": 45
              },
              {
                "hour": 15,
                "count": 67
              },
              {
                "hour": 16,
                "count": 52
              },
              {
                "hour": 17,
                "count": 67
              },
              {
                "hour": 18,
                "count": 110
              },
              {
                "hour": 19,
                "count": 88
              },
              {
                "hour": 20,
                "count": 90
              },
              {
                "hour": 21,
                "count": 94
              },
              {
                "hour": 22,
                "count": 75
              },
              {
                "hour": 23,
                "count": 112
              }
            ]
          }
        ]
      }
    ]
  }
  constructor(
    private _hS: HeaderService,
    private commonService: CommonDataService,
    private datePipe: DatePipe,
    private cdr: ChangeDetectorRef,
    private SpinnerService: NgxSpinnerService,
    private stor: StorageService,
    private _route: Router,
    private location: Location
  ) { }
  ngOnInit(): void {
    this.activeChannel = window.location.origin
    if (this.activeChannel == 'https://waengage.enteract.live') {
      this.isChannelShow = "morinaga";
      this.getChannel()
    }
    else if (this.activeChannel == 'https://keportal.enteract.live') {
      this.isChannelShow = 'KE';
      this.getChannel()
    }
    else if (this.activeChannel == 'https://engageui.enteract.live') {
      this.isChannelShow = 'damo';
      this.getChannel()
    }
    else if (this.activeChannel == 'https://tpplui.enteract.live') {
      this.isChannelShow = 'ttpl';
      this.getChannel()
    }
    else if (this.activeChannel == 'https://engage.jazz.com.pk') {
      this.isChannelShow = 'jazz'
      this.getChannel()
    }
    else if (this.activeChannel == 'https://uiengage.enteract.app') {
      this.isChannelShow = 'stagging'
      this.getChannel()
    }
    else if (this.activeChannel == 'https://uiengagerox.enteract.app') {
      this.isChannelShow = 'stagging'
      this.getChannel()
    }
    else if (this.activeChannel == 'https://bzengage.enteract.live') {
      this.isChannelShow = 'Bazaar',
        this.getChannel()
    }
    else {
      this.isChannelShow = 'loc'
      this.getChannel()
    }
 

    const newObj = {
      title: 'Inbound/Outbound Report',
      url: '/analytics/inbound-outbound-report',
    };
    this._hS.setHeader(newObj);
    const menu = this.stor.retrive('Tags', 'O').local;
    menu.forEach((tags: any) => {
      if (tags.name == 'Tags') {
        tags.subTags.forEach((parentTag: any) => {
          if (parentTag.subTags != null) {
            parentTag?.subTags.forEach((singleTagObj: any) => {
              if (!this.subTags.includes(singleTagObj)) {
                this.subTags.push(singleTagObj);
              }
            });
          }
        });
      }
      if (tags.name == "Sentiments") {
        tags.subTags.forEach((sentimentObj: any) => {
          if (!this.sentimentOptions.includes(sentimentObj)) {
            this.sentimentOptions.push(sentimentObj)
          }
        });
      }
    });
    this.currentDate = new Date();
    this.maxEndDate = this.currentDate.toISOString().split('T')[0];
    this.AddGraph();
    this.getListUser();
    this.makeChartResponsive();

  }
  mouseClickReset() {
    this.searchText = ''
  }
  getChannel() {
    if (this.isChannelShow == "morinaga") {
      this.channelOptions = [
        { id: '17', name: 'WhatsApp', icon: 'fa-brands fa-whatsapp pe-2', isSelected: false },
      ];
    }
    if (this.isChannelShow == "jazz") {
      this.channelOptions = [
        { id: '11', name: 'Select All Channels', icon: '', isSelected: false },
        { id: '11', name: 'Twitter', icon: 'fa-brands fa-twitter sky pe-2', isSelected: false },
        { id: '12', name: 'Instagram', icon: 'fa-brands fa-instagram pe-2', isSelected: false },
        { id: '13', name: 'LinkedIn', icon: 'fa-brands fa-linkedin-in linkedinTxt pe-2', isSelected: false },
        { id: '14', name: 'Facebook', icon: 'fab fa-facebook navytext pe-2', isSelected: false },
        { id: '15', name: 'YouTube', icon: 'fa-brands fa-youtube pe-2', isSelected: false },
        { id: '17', name: 'WhatsApp', icon: 'fa-brands fa-whatsapp pe-2', isSelected: false },
        { id: '18', name: 'Playstore', icon: 'fa-brands fa-google-play pe-2', isSelected: false },
      ];
    }
    else if (this.isChannelShow == "ttpl") {
      this.channelOptions = [
        { id: '17', name: 'WhatsApp', icon: 'fa-brands fa-whatsapp pe-2', isSelected: false },
      ];
    }
    else if (this.isChannelShow == "KE") {
      this.channelOptions = [
        { id: '14', name: 'Facebook', icon: 'fab fa-facebook navytext pe-2', isSelected: false },
        { id: '11', name: 'Twitter', icon: 'fa-brands fa-twitter sky pe-2', isSelected: false },
        { id: '12', name: 'Instagram', icon: 'fa-brands fa-instagram pe-2', isSelected: false },
        { id: '13', name: 'LinkedIn', icon: 'fa-brands fa-linkedin-in linkedinTxt pe-2', isSelected: false },
      ];
    }
    else if (this.isChannelShow == "damo") {
      this.channelOptions = [
        { id: '14', name: 'Facebook', icon: 'fab fa-facebook navytext pe-2', isSelected: false },
        { id: '11', name: 'Twitter', icon: 'fa-brands fa-twitter sky pe-2', isSelected: false },
        { id: '12', name: 'Instagram', icon: 'fa-brands fa-instagram pe-2', isSelected: false },
        { id: '13', name: 'LinkedIn', icon: 'fa-brands fa-linkedin-in linkedinTxt pe-2', isSelected: false },
      ];
    }
    else if (this.isChannelShow == 'loc') {
      this.channelOptions = [
        { id: '11', name: 'Twitter', icon: 'fa-brands fa-twitter sky pe-2', isSelected: false },
        { id: '12', name: 'Instagram', icon: 'fa-brands fa-instagram pe-2', isSelected: false },
        { id: '13', name: 'LinkedIn', icon: 'fa-brands fa-linkedin-in linkedinTxt pe-2', isSelected: false },
        { id: '14', name: 'Facebook', icon: 'fab fa-facebook navytext pe-2', isSelected: false },
        { id: '15', name: 'YouTube', icon: 'fa-brands fa-youtube pe-2', isSelected: false },
        // { id: '16', name: 'SMS', icon: 'fa-solid fa-comment-alt pe-2', isSelected: false },
        { id: '17', name: 'WhatsApp', icon: 'fa-brands fa-whatsapp pe-2', isSelected: false },
        // { id: '18', name: 'Email', icon: 'fa-solid fa-envelope pe-2', isSelected: false },
        // { id: '19', name: 'OfficeEmail', icon: 'fa-solid fa-envelope pe-2', isSelected: false },
        // { id: '20', name: 'WebChat', icon: 'fa-solid fa-comment-dots pe-2', isSelected: false }
        { id: '18', name: 'Playstore', icon: 'fa-brands fa-google-play pe-2', isSelected: false },
      ];
    }
    else if (this.isChannelShow == 'stagging') {
      this.channelOptions = [
        { id: '11', name: 'Twitter', icon: 'fa-brands fa-twitter sky pe-2', isSelected: false },
        { id: '12', name: 'Instagram', icon: 'fa-brands fa-instagram pe-2', isSelected: false },
        { id: '13', name: 'LinkedIn', icon: 'fa-brands fa-linkedin-in linkedinTxt pe-2', isSelected: false },
        { id: '14', name: 'Facebook', icon: 'fab fa-facebook navytext pe-2', isSelected: false },
        { id: '15', name: 'YouTube', icon: 'fa-brands fa-youtube pe-2', isSelected: false },
        // { id: '16', name: 'SMS', icon: 'fa-solid fa-comment-alt pe-2', isSelected: false },
        { id: '17', name: 'WhatsApp', icon: 'fa-brands fa-whatsapp pe-2', isSelected: false },
        // { id: '18', name: 'Email', icon: 'fa-solid fa-envelope pe-2', isSelected: false },
        // { id: '19', name: 'OfficeEmail', icon: 'fa-solid fa-envelope pe-2', isSelected: false },
        // { id: '20', name: 'WebChat', icon: 'fa-solid fa-comment-dots pe-2', isSelected: false }
      ];
    }
    if (this.isChannelShow == 'Bazaar') {
      this.channelOptions = [
        { id: '11', name: 'Select All Channels', icon: '', isSelected: false },
        { id: '17', name: 'WhatsApp', icon: 'fa-brands fa-whatsapp pe-2', isSelected: false },
        { id: '18', name: 'Email', icon: 'fa-solid fa-envelope pe-2', isSelected: false },
      ];
    };
  }
  onCheckboxChange() {
    this.AddGraph();
    this.cdr.detectChanges();
  }
  AddGraph() {
    let selectedChannelsArray = this.channelOptions
      .filter((item) => item.isSelected)
      .map((item) => item.name);
    this.selectedChannels = selectedChannelsArray.toString();
    let selectedContentTypesArray = this.contentTypes
      .filter((item) => item.isSelected)
      .map((item) => item.value);
    this.selectedContent = selectedContentTypesArray.toString();
    let selectedTagOptionArray = this.subTags
      .filter((item) => item.isSelected)
      .map((item) => item.slug);
    this.selectedTagOption = selectedTagOptionArray.toString();
    let selectedSentimentsArray = this.sentimentOptions
      .filter((item) => item.isSelected)
      .map((item) => item.slug);
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
      // this.startDate = this.startDate;
      // this.endDate = this.endDate;
      const startDateObj = new Date(this.startDate);
      const endDateObj = new Date(this.endDate);
      const timeDiff = Math.abs(endDateObj.getTime() - startDateObj.getTime());
      const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      if (diffDays > 30) {
        alert('Select a date range of 30 days or less');
        this.endDate = ''
        return;
      }
    }
    this.inboundoutboundDate = []
    this.inboundData = []
    this.tagReportData = []
    this.outboundData = []
    this.tagsPerChannel = []
    const requestData = {
      fromDate: this.startDate,
      toDate: this.endDate,
      channels: this.selectedChannels,
      contentTypes: this.selectedContent,
      tags: this.selectedTagOption,
      sentiments: this.selectedSentiment,
      agents: this.selectedTagBy,
      companyId: 0
      // inbound: false,
      // outbound: false,
      // inboundOutbound: false,
      // dateSubFilter: 0,
    };
    if (this.endDate >= this.startDate) {
      this.SpinnerService.show();
      this.Inbound_data = [];
      this.Outbound_data = [];
      this.platformsArray = [];
      this.tagsPerChannel = []
      this.inboundoutboundDate = []
      this.inboundData = []
      this.outboundData = []
      this.tagReportData = []
      this.inboundCounthourlyWise = []
      this.outboundCounthourlyWise = []
      this.allHoursArrayInboundoutbound = []
      this.isShowSentimentGraph = false
      this.isShowInboundoutboundGraph = false
      this.str = ''
      this.isShowTagReport = false
      this.commonService.Addinboundoutbound(requestData).subscribe(
        (response: any) => {
          this.SpinnerService.hide();
          if (response) {
            debugger
            this.Inbound_Outbound_Report = this.inboundJson;
            const hourlyWiseDataInboundOutbound= this.Inbound_Outbound_Report?.channelReportData?.hourWiseData
            const InBoundHourlyWiseData=hourlyWiseDataInboundOutbound[0]
            InBoundHourlyWiseData.hourly.forEach((x:any)=>{
              if(!this.allHoursArrayInboundoutbound.includes(x.hour)){
                this.allHoursArrayInboundoutbound.push(x.hour)
              }
              this.inboundCounthourlyWise.push(x.count)
            })
             const OutboundHourlyWiseData=hourlyWiseDataInboundOutbound[1]
             OutboundHourlyWiseData.hourly.forEach((abc:any)=>{
              this.outboundCounthourlyWise.push(abc.count)
             }
            )
            this.getHourlyWiseIboundReport()

            const sentimentReportDataHourlyWise = this.Inbound_Outbound_Report?.sentimentReportData;

            sentimentReportDataHourlyWise.forEach((sentimentReport: any) => {
              sentimentReport.data.forEach((sentiment: any) => {
                if (sentiment.hourlyData) {
                  sentiment.hourlyData.forEach((hourlyData: any) => {
                    const hour = hourlyData.hour;
                    const sentimentName = sentiment.name;
            
                    const sentimentCount = {
                      Time: hour,
                      Positive: sentimentName === 'positive' ? hourlyData.count : 0,
                      Negative: sentimentName === 'negative' ? hourlyData.count : 0,
                      Neutral: sentimentName === 'neutral' ? hourlyData.count : 0,
                    };
            
                    this.sentimentDataPointsHourlyWise.push(sentimentCount);
                  });
                }
              });
            });
         
         

          this.getHourlyWiseSentimentChart()














            // Hourly wise code above 
            this.tagreportArry = this.Inbound_Outbound_Report.tagReportData
            if (this.tagreportArry.length == 0) {
              this.isShowTagReport = true
            }
            this.sentimentArray = this.Inbound_Outbound_Report.sentimentReportData
            if (this.sentimentArray.length == 0) {
              this.isShowSentimentGraph = true
            }
            this.Inbound_outbounArray = this.Inbound_Outbound_Report.channelReportData.dateWiseData
            if (this.Inbound_outbounArray.length == 0) {
              this.isShowInboundoutboundGraph = true
            }
            this.Inbound_Outbound_Report.channelReportData.dateWiseData.forEach((x: any) => {
              if (!this.inboundoutboundDate.includes(this.datePipe.transform(x.createdDate, 'dd MMM '))) {
                this.inboundoutboundDate.push(this.datePipe.transform(x.createdDate, 'dd MMM'))
              }
              this.inboundData.push(x.inboundData)
              this.outboundData.push(x.outboundData)
            })
            this.tagReportData = this.Inbound_Outbound_Report.tagReportData;
            this.tagReportData.forEach((channel: any) => {
              if (!this.platformsArray.includes(channel.platform)) {
                this.platformsArray.push(channel.platform);
              }
              channel.data.forEach((tag: any) => {
                this.str = tag.name.toLowerCase().split(/[-_.\s]/).map((w: any) => `${w.charAt(0).toUpperCase()}${w.substr(1)}`).join(' ');
                const name = this.str;
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
            
            this.getTagperChannelReport()
            if (this.isShowInboundoutboundGraph == false) {
              const doms = this.inboundOutboundReport.nativeElement;
              this.inboundOutboundChart = echarts.init(doms, null, {
                renderer: 'canvas',
                useDirtyRect: false,
              });
              var option: echarts.EChartsOption;
              option = {
                color: ['rgba(255,189,61,255)', 'rgba(96,191,235,255)'],
                tooltip: {
                  trigger: 'axis',
                },
                legend: {
                  data: ['Inbound', 'OutBound'],
                  icon: 'circle',
                  bottom: 'bottom'
                },
                grid: {
                  left: '13%',
                  right: '4%',
                  bottom: '13%',
                  containLabel: true
                },
                toolbox: {
                  feature: {
                    saveAsImage: {}
                  }
                },
                xAxis: {
                  type: 'category',
                  boundaryGap: false,
                  data: this.inboundoutboundDate,
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
                    name: 'Inbound',
                    type: 'line',
                    data: this.inboundData
                  },
                  {
                    name: 'OutBound',
                    type: 'line',
                    data: this.outboundData
                  },
                ]
              };
              this.inboundOutboundChart.setOption(option);
            }
            // var option: echarts.EChartsOption;
            // option = {
            //   color: ['rgba(255,189,61,255)', 'rgba(96,191,235,255)'],
            //   tooltip: {
            //     trigger: 'axis'
            //   },
            //   legend: {
            //     bottom:0,
            //     data: ['Inbound', 'OutBound'],
            //     icon:'circle'
            //   },
            //   grid: {
            //     left: '3%',
            //     right: '4%',
            //     bottom: '10%',
            //     containLabel: true
            //   },
            //   toolbox: {
            //     feature: {
            //       saveAsImage: {}
            //     }
            //   },
            //   xAxis: {
            //     type: 'category',
            //     boundaryGap: false,
            //     data:
            //     // data: this.Inbound_data.map(function (dataPoint) {
            //     //   return dataPoint.x;
            //     }),
            //   },
            //   yAxis: {
            //     type: 'value'
            //   },
            //   series: [
            //     {
            //       name: 'Inbound',
            //       type: 'line',
            //       data: this.Inbound_data.map(function (dataPoint) {
            //         return dataPoint.y;
            //       }),
            //     },
            //     {
            //       name: 'OutBound',
            //       type: 'line',
            //       data: this.Outbound_data.map(function (dataPoint) {
            //         return dataPoint.y;
            //       }),
            //     },
            //   ]
            // };
            // this.inboundOutboundChart.setOption(option);
            // Update the ChannelWiseGraph
            const dom = this.ChannelWiseGraph.nativeElement;
            this.averageResponseChart = echarts.init(dom, null, {
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
                ((totalUnanswered / (totalAnswered + totalUnanswered)) * 100);
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
              toolbox: {
                feature: {
                  saveAsImage: {}
                }
              },
              legend: {
                orient: 'horizontal',
                data: ['Unanswered', 'Answered'],
                icon: 'circle',
                bottom: 0
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
            this.averageResponseChart.setOption(option);
            // Update TagsPerChannel
            // option = {
            //   tooltip: { trigger: 'axis' },
            //   toolbox: {
            //     feature: {
            //       saveAsImage: {}
            //     }
            //   },
            //   // legend: {top: 10,
            //   //   left: 10},
            //   xAxis: [{ type: 'category', data: this.platformsArray }],
            //   yAxis: [{ type: 'value' }],
            //   series: this.tagsPerChannel,
            // };
            // mychart.setOption(option);
            // Update senitimentalGraph
            if (this.isShowSentimentGraph == false) {
              const myDoms = this.senitimentalGraph.nativeElement;
              this.sentimentChart = echarts.init(myDoms, null, {
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
                  // Change the slug into name
                  this.str = sentiment.name ? sentiment.name.charAt(0).toUpperCase() + sentiment.name.substr(1).toLowerCase() : '';
                  sentimentCounts[this.str] = sentiment.count;
                });
                sentimentDataPoints.push({
                  platform: platformName,
                  Positive: sentimentCounts['Positive'] || 0,
                  Negative: sentimentCounts['Negative'] || 0,
                  Neutral: sentimentCounts['Neutral'] || 0,
                });
              });
              option = {
                legend: {
                  icon: 'circle',
                  bottom: 0
                },
                tooltip: { trigger: 'axis' },
                dataset: {
                  source: sentimentDataPoints,
                },
                toolbox: {
                  feature: {
                    saveAsImage: {},
                  },
                },
                xAxis: { type: 'category' },
                yAxis: {
                  type: 'value',
                  nameLocation: 'middle',
                  name: 'Total Number of Sentiments',
                  nameTextStyle: {
                    fontSize: 12,
                    color: 'grey',
                    lineHeight: 80,
                  },
                },
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
                      formatter: (params: any) => {
                        return ((params.data.Positive / (params.data.Positive + params.data.Negative + params.data.Neutral)) * 100).toFixed(0) + '%';
                      },
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
                      formatter: (params: any) => {
                        return ((params.data.Negative / (params.data.Positive + params.data.Negative + params.data.Neutral)) * 100).toFixed(0) + '%';
                      },
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
                      formatter: (params: any) => {
                        return ((params.data.Neutral / (params.data.Positive + params.data.Negative + params.data.Neutral)) * 100).toFixed(0) + '%';
                      },
                    },
                  },
                ],
              };
              option && this.sentimentChart.setOption(option);
            }
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
  reportOptions = [
    { id: '11', label: 'Date' },
    { id: '22', label: 'Days' },
    { id: '23', label: 'Hours' },
    { id: '94', label: 'Months' },
  ];

  contentTypes = [
    {
      id: '11',
      name: 'Twitter Tweets',
      value: 'TTR',
      icon: 'fa-brands fa-twitter sky pe-2',
      isSelected: false,
    },
    {
      id: '22',
      name: 'Twitter DMs',
      value: 'TDM',
      icon: 'fa-brands fa-twitter sky pe-2',
      isSelected: false,
    },
    {
      id: '23',
      name: 'Facebook Posts',
      value: '',
      icon: 'fa-brands fa-facebook facebook pe-2',
      isSelected: false,
    },
    {
      id: '94',
      name: 'Facebook Comments',
      value: 'FC',
      icon: 'fa-brands fa-facebook facebook pe-2',
      isSelected: false,
    },
    {
      id: '66',
      name: 'Instagram Post',
      value: '',
      icon: 'fa-brands fa-instagram night pe-2',
      isSelected: false,
    },
    {
      id: '65',
      name: 'Instagram Comments',
      value: 'IC',
      icon: 'fa-brands fa-instagram night pe-2',
      isSelected: false,
    },
    // {
    //   id: '24',
    //   name: 'Youtube Comments',
    //   value: 'YC',
    //   icon: 'fa-brands fa-youtube youtube pe-2',
    //   isSelected: false,
    // },
  ];
  typeOptions = [
    { id: '123', label: 'InBound Outbound Report', isSelected: false },
    { id: '12', label: 'InBound Report', isSelected: false },
    { id: '14', label: 'Outbound Report', isSelected: false },
  ];
  tagOptions = [{ id: '', name: '', isSelected: false }];
  sentimentOptions: any[] = [];
  taggedByOptions = [{ id: '', name: '', isSelected: false }];
  subTags: any[] = [];
  searchText: string = '';
  closeToaster() {
    this.toastermessage = false;
  }

  responseReceived: boolean = false;
  getListUser() {

    if (!this.responseReceived) {
      this.responseReceived = true;
      this.commonService.GetUserList().subscribe(
        (response: any) => {
          this.taggedByOptions = response;
          this.responseReceived = false;
        },
        (error: any) => {
          console.error(error);
          this.responseReceived = false;
        }
      );
    }
  }

  makeChartResponsive() {
    window.addEventListener('resize', () => {
      if (this.inboundOutboundChart) {
        this.inboundOutboundChart.resize();
      }
      if (this.sentimentChart) {
        this.sentimentChart.resize();
      }
      if (this.tagsChart) {
        this.tagsChart.resize();
      }
      if (this.averageResponseChart) {
        this.averageResponseChart.resize();
      }
    })
  }
  getTagperChannelReport() {
    const myDom = this.TagsPerChannel.nativeElement;
    this.tagsChart = echarts.init(myDom, null, {
      renderer: 'canvas',
      useDirtyRect: false,
    });

    var option: echarts.EChartsOption;


    option = {
      tooltip: {
        trigger: 'axis',
        enterable: true,
        extraCssText: 'height: 200px !important;  overflow-y: scroll !important; pointer-events: auto !important;'
      },
      legend: {
        type: 'scroll',
        icon: 'circle',
        orient: 'horizontal',
        bottom: 0
      },
      toolbox: {
        feature: {
          saveAsImage: {},

        }

      },
      xAxis: [{ type: 'category', data: this.platformsArray }],
      yAxis: [{
        type: 'value',
        nameLocation: 'middle',
        name: 'Total Number of Tags',
        nameTextStyle: {
          fontSize: 12,
          color: 'grey',
          lineHeight: 80,
        },
      }],

      series: this.tagsPerChannel.map(series => ({
        ...series,

        // label: {
        //   show: true,
        //   formatter: (params: any) => {
        //     const total = this.tagsPerChannel.reduce((sum, s) => sum + s.data[params.dataIndex], 0);
        //     const percentage = (series.data[params.dataIndex] / total * 100).toFixed(0);
        //     return `${percentage}%`;
        //   }
        // }
      })),

    };

    this.tagsChart.setOption(option, true);
  }
  // Hourly Wise Report
  getHourlyWiseIboundReport() {
    var chartDom = document.getElementById('hourlywiseInbound');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      color: ['rgba(255,189,61,255)', 'rgba(96,191,235,255)'],
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['Inbound', 'OutBound'],
        icon: 'circle',
        bottom: 'bottom'
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '13%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        axisLabel: {
          rotate: 45,
        },
        data: this.allHoursArrayInboundoutbound
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Inbound',
          type: 'line',

          data: this.inboundCounthourlyWise
        },
        {
          name: 'OutBound',
          type: 'line',
          data: this.outboundCounthourlyWise
        }
      ]
    };

    option && myChart.setOption(option);
  }
  sentimentGraph:any
  getHourlyWiseSentimentChart() {
    debugger
    var app = {};

    var chartDom = document.getElementById('Mediacomparison');
    var myChart = echarts.init(chartDom);
    var option;
    option = {
      color: ['#4cc424', '#d13c3c', '#ffa800'],
      legend: {
        icon: 'circle',
        bottom: 'bottom'
      },
      tooltip: {},
      dataset: {
        source: this.sentimentDataPointsHourlyWise
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











    // const myDoms = this.senitimentalGraphhourlywise.nativeElement;
    // var myChart = echarts.init(myDoms, null, {
    //   renderer: 'canvas',
    //   useDirtyRect: false,
    // });
    // var option;

    // option = {
    //   legend: {},
    //   tooltip: {},
    //   dataset: {
    //     source: [
    //       ['product', '2015', '2016', '2017'],
    //       ['Matcha Latte', 43.3, 85.8, 93.7],
    //       ['Milk Tea', 83.1, 73.4, 55.1],
    //       ['Cheese Cocoa', 86.4, 65.2, 82.5],
    //       ['Walnut Brownie', 72.4, 53.9, 39.1]
    //     ]
    //   },
    //   xAxis: { type: 'category' },
    //   yAxis: {},
    //   // Declare several bar series, each will be mapped
    //   // to a column of dataset.source by default.
    //   series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
    // };

    // option && myChart.setOption(option);
  }
}
