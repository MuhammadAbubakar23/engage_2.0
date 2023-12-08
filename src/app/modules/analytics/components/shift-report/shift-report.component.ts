import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HeaderService } from 'src/app/shared/services/header.service';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { CommonModule, DatePipe } from '@angular/common';
import * as echarts from 'echarts';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import html2canvas from 'html2canvas';

@Component({
  standalone: true,
  selector: 'app-shift-report',
  templateUrl: './shift-report.component.html',
  styleUrls: ['./shift-report.component.scss'],
  imports: [CommonModule, FormsModule, SharedModule, NgxSpinnerModule],
})
export class ShiftReportComponent implements OnInit {
  shiftReportData: any;
  @ViewChild('shiftReport', { static: true }) shiftReport!: ElementRef;
  shifttagData: any[] = [];
  shiftChannelData: any[] = [];
  dateWise: any[] = [];
  tagsList: any[] = [];
  allDates: any[] = [];
  newAlldates: any[] = [];
  totaltags: number = 0;
  slectedtagId: any[] = [];
  selectedtagName: any = '';
  shiftime: any = 0;
  changedateintostring: any = '';
  changeDateformat: any;
  changedateintoarray: any[] = [];
  formateDateArray: any[] = [];
  // currentdate:any
  startDate = '';
  endDate = '';
  searchText: string = '';
  maxEndDate: any;
  currentDate: any;
  totalinboundCounts: any;
  tags: any;
  TagsStats: any[] = [];
  tagsStatsTotalCounts: any;
  dateWiseTotalCounts: any[] = [];
  commaSeparatedValuesLink: any;
  numberArrayLink: any;
  alltotalCount: any;
  daysDifference: number = 0;
  allTotalCountsfb: any[] = [];
  allTotalCountTw: any[] = [];
  allTotalCountWhatsapp: any[] = [];
  allTotalCountLink: any[] = [];
  allTotalCountPlayStore: any[] = [];
  allTotalCountInsta: any[] = [];
  allTotalCountYoutube:any[]=[]
  ChartData: any[] = [];
  _legend: any[] = [];
  shiftName:any
  shiftType: any[] = [
    { name: 'Morning', id: 0 },
    { id: 1, name: 'Evening' },
    { id: 2, name: 'Night' },
    { id: 3, name: 'Iftar' },
    { id: 4, name: 'Sehr' },
  ];
  channelIcon: any[] = [
    { fbicone: 'fa-brands fa-facebook-f', class: 'iconButton medium navyBg' },
    {
      twicone: 'fa-brands fa-twitter',
      class: 'iconButton medium twltte-bg ice',
    },
    {
      youtubeicone: 'fa-brands fa-youtube',
      class: 'iconButton medium radicalBg',
    },
    {
      linkicone: 'fa-brands fa-linkedin',
      class: 'iconButton medium linkedinBg',
    },
    { whatsappicone: 'fab fa-whatsapp', class: 'iconButton medium mintBg' },
    {
      playicone: 'fa-brands fa-google-play',
      class: 'iconButton medium darkorangeBg',
    },
  ];
  isShowGrpah:boolean=false
  downloading = false;
  toastermessage = false;
  AlterMsg: any = '';
  convertedintoArray: any;
  graphdate: any[] = [];
  noData: boolean = false;
  shiftReportChart:any;
  constructor(
    private hs: HeaderService,
    private datePipe: DatePipe,
    private commandataService: CommonDataService,
    private stor: StorageService,
    private SpinnerService: NgxSpinnerService
  ) {}
  KEbaseUrl:string="";
  KEClient:boolean=false;
  
  ngOnInit(): void {
    this.KEbaseUrl=window.location.origin
    if(this.KEbaseUrl=='https://keportal.enteract.live'){
      this.KEClient=true
    }

    this.currentDate = new Date();
    this.maxEndDate = this.currentDate.toISOString().split('T')[0];
    const obj = { title: 'Shift Report', url: 'analytics/shift-report' };
    this.hs.setHeader(obj);
    this.getShfitReport();
    this.getAlltags();
    this.getAgentsTeamList();
    this.makeChartResponsive();
  }
  keywordslist: any[] = [];
  getAlltags() {
    this.commandataService.GetAllTags().subscribe((res: any) => {
      const menu = this.stor.retrive('Tags', 'O').local;
      menu.forEach((item: any) => {
        if (item.name == 'Tags') {
          item.subTags.forEach((parentags: any) => {
            parentags.subTags.forEach((singleTagObj: any) => {
              if (!this.keywordslist.includes(singleTagObj)) {
                this.keywordslist.push(singleTagObj);
              }
            });
          });
        }
      });
    });
  }

  getShfitReport() {
  
    if (this.startDate == '' && this.endDate == '') {
      const today = this.currentDate;
      this.endDate = this.datePipe.transform(today, 'YYYY-MM-dd') || '';

      let prevDate = this.currentDate.setDate(this.currentDate.getDate() - 2);
      this.startDate = this.datePipe.transform(prevDate, 'YYYY-MM-dd') || '';
    } else if (this.startDate != '' && this.endDate != '') {
      this.startDate = this.startDate;
      this.endDate = this.endDate;
    }
    let obj = {
      fromDate: this.startDate,
      toDate: this.endDate,
      shiftId: this.shiftime,
      tags: this.changedateintostring,
    };

    if (this.startDate && this.endDate) {
      const startDateObj = new Date(this.startDate);
      const endDateObj = new Date(this.endDate);
      const timeDifference = endDateObj.getTime() - startDateObj.getTime();
      this.daysDifference = timeDifference / (1000 * 3600 * 24);
    }
    this.allDates = [];
    this.allTotalCountInsta = [];
    this.allTotalCountLink = [];
    this.allTotalCountsfb = [];
    this.allTotalCountTw = [];
    this.dateWise = [];
    this.allTotalCountPlayStore = [];
    this.allTotalCountWhatsapp = [];
    this.allTotalCountYoutube=[]
    this.isShowGrpah=false
    this._legend = [];
    this.SpinnerService.show();
    this.commandataService.GetShiftReport(obj).subscribe((res: any) => {
      this.SpinnerService.hide();

      this.shiftReportData = res;
      this.shiftChannelData = res.channelData;
      this.dateWiseTotalCounts = res.dateWiseTotal;
      this.totalinboundCounts = res.totalIboundCount;

      if (this.totalinboundCounts == 0) {
        this.allTotalCountInsta = new Array(this.daysDifference).fill(0);
        this.allTotalCountLink = new Array(this.daysDifference).fill(0);
        this.allTotalCountsfb = new Array(this.daysDifference).fill(0);
        this.allTotalCountTw = new Array(this.daysDifference).fill(0);
      }

      this.shiftChannelData.forEach((data: any) => {
        this._legend.push(data.platform);

        data.dateWise.forEach((item: any) => {
          if (!this.allDates.includes(this.datePipe.transform(item.date,'dd/MMM'))) {
            this.allDates.push(this.datePipe.transform(item.date,'dd/MMM'));
          }
          if (data.platform == 'Facebook') {
            data.dateWise.forEach((singleItem: any) => {
              // if (!this.allDates.includes(item.date.split('T')[0])) {
              //   this.allDates.push(item.date.split('T')[0]);
              // }
              this.allTotalCountsfb.push(singleItem.totalCount);
            });
          }
          if (data.platform == 'WhatsApp') {
            data.dateWise.forEach((item: any) => {
              this.allTotalCountWhatsapp.push(item.totalCount);
            });
          }
          if (data.platform == 'Twitter') {
            data.dateWise.forEach((item: any) => {
              this.allTotalCountTw.push(item.totalCount);
            });
          }

          if (data.platform == 'Instagram') {
            data.dateWise.forEach((item: any) => {
              this.allTotalCountInsta.push(item.totalCount);
            });
          }
          if (data.platform == 'LinkedIn') {
            data.dateWise.forEach((item: any) => {
              this.allTotalCountLink.push(item.totalCount);
            });
          }
          if (data.platform == 'PlayStore') {
            data.dateWise.forEach((item: any) => {
              this.allTotalCountPlayStore.push(item.totalCount);
            });
          }
          if (data.platform == 'Youtube') {
            data.dateWise.forEach((item: any) => {
              this.allTotalCountYoutube.push(item.totalCount);
            });
          }
        });
      });
      this.ChartData.push({
        name: this._legend,
        type: 'line',
        data: this.allTotalCountTw,
      });
      this.TagsStats = res.tagData.shiftReportTag;
      this.tagsStatsTotalCounts = res.tagData.totalTagsCount;
      if(this.allDates.length==0){
        this.isShowGrpah=true
      }
  
      this.getCharts();
    });
  }

  selectedunselectedtag(tag: any) {
    if (this.slectedtagId.includes(tag.slug)) {
      this.slectedtagId.splice(this.slectedtagId.indexOf(tag.slug), 1);
    } else {
      this.slectedtagId.push(tag.slug);
    }
    this.changedateintostring = this.slectedtagId.toString();
    console.log(
      'this.changeDateIntoStringfor tags===>',
      this.changedateintostring
    );
    this.getShfitReport();
  }

  searchtags(event: any) {
    this.tags = event.target.value;
    this.getAlltags();
  }
  getByShifTime(event: any) {
    debugger
    this.shiftime = event.target.value;

   
    this.getShfitReport();
  }

  
  getCharts() {
    if(this.isShowGrpah==false){
    var chartDom = document.getElementById('shiftReport');
    this.shiftReportChart = echarts.init(chartDom);
    var option;

    option = {
      // title: {
      //   text: 'Stacked Line'
      // },
      tooltip: {
        trigger: 'axis',
      },
      _legend: {
        data:this._legend,
         icon:'circle',
         bottom:0
      },
      get legend() {
        return this._legend;
      },
      set legend(value) {
        this._legend = value;
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
        name: 'Total Number of Inbound',
        nameTextStyle: {
          fontSize: 12,
          color: 'grey',
          lineHeight: 80,
        },
      },
      
        series: [
          {
            name: 'Facebook',
            type: 'line',
            data: this.allTotalCountsfb,
          },
  
          {
            name: 'Instagram',
            type: 'line',
            data: this.allTotalCountInsta,
          },
          {
            name: 'Twitter',
            type: 'line',
            data: this.allTotalCountTw,
          },
          {
            name: 'PlayStore',
            type: 'line',
            data: this.allTotalCountPlayStore,
          },
          {
            name: 'LinkedIn',
            type: 'line',
            data: this.allTotalCountLink,
          },
          {
            name: 'WhatsApp',
            type: 'line',
            data: this.allTotalCountWhatsapp,
          },
          {
            name: 'Youtube',
            type: 'line',
            data: this.allTotalCountYoutube,
          },
        ],
      };
    
      option && this.shiftReportChart.setOption(option);
    }
  }
  ActiveAgents: any[] = [];
  AgentsTeamList: any[] = [];
  getAgentsTeamList() {
    this.commandataService.GetAgentsTeamList().subscribe((res: any) => {
      if (Object.keys(res).length > 0) {
        this.AgentsTeamList = res;
        this.ActiveAgents = [];
        this.AgentsTeamList.forEach((user: any) => {
          if (user.userId != localStorage.getItem('agentId')) {
            this.ActiveAgents.push(user);
          }
        });
      }
    });
  }
  // for show 0 in totalCount if totalCount are not in date

  findTotalCount(channel: any, date: string): number {
    const dateWiseItem = channel.dateWise.find(
      (item: any) => item.date.split('T')[0] === date
    );
    return dateWiseItem ? dateWiseItem.totalCount : 0;
  }

  getStartDate() {
    this.endDate = '';
  }
  getEndDate() {
    if (this.endDate >= this.startDate) {
      this.getShfitReport();
    } else {
      alert('EndDate is lessthen StartDate');
      this.endDate = '';
    }
  }
  closeToaster() {
    this.toastermessage = false;
  }

  sendEmailReport() {
    // Select the element that you want to capture
    const captureElement = document.getElementById('shiftReport')!;

    // Call the html2canvas function and pass the element as an argument
    html2canvas(captureElement).then((canvas) => {
      // Get the image data as a base64-encoded string
      const imageData = canvas.toDataURL('image/png');

      // Do something with the image data, such as saving it as a file or sending it to a server
      // For example, you can create an anchor element and trigger a download action

      // const link = document.createElement('a');
      // link.setAttribute('download', 'screenshot.png');
      // link.setAttribute('href', imageData);
      // link.click();

      var obj = {
        fromDate: this.startDate,
        toDate: this.endDate,
        shiftId: this.shiftime,
        tags: this.changedateintostring,
        companyId: 0,
        picture: imageData
      }
      this.commandataService.EmailShiftReport(obj).subscribe((res:any)=>{
        console.log('res',res)
      })
    });
  }

  makeChartResponsive() {
    window.addEventListener('resize', () => {
      if (this.shiftReportChart) {
        this.shiftReportChart.resize();
      }
    });
  }
}
