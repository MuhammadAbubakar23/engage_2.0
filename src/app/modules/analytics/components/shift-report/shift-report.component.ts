import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HeaderService } from 'src/app/shared/services/header.service';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { CommonModule, DatePipe } from '@angular/common'
import * as echarts from 'echarts';
import { FormsModule } from '@angular/forms';
import { SharedModule } from "../../../../shared/shared.module";
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
@Component({
  standalone: true,
  selector: 'app-shift-report',
  templateUrl: './shift-report.component.html',
  styleUrls: ['./shift-report.component.scss'],
  imports: [CommonModule, FormsModule, SharedModule, NgxSpinnerModule]
})
export class ShiftReportComponent implements OnInit {
  shiftReportData: any;
  @ViewChild('shiftReport', { static: true }) shiftReport!: ElementRef;
  shifttagData: any[] = [];
  shiftChannelData: any[] = [];
  dateWise: any[] = [];
  tagsList: any[] = [];
  allDates: any[] = [];
  newAlldates: any[] = []
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
  searchText: string = ''
  maxEndDate: any;
  currentDate: any;
  totalinboundCounts: any
  tags: any;
  TagsStats: any[] = [];
  tagsStatsTotalCounts: any;
  dateWiseTotalCounts: any[] = [];
  commaSeparatedValuesLink: any;
  numberArrayLink: any;
  alltotalCount: any;
  daysDifference: number = 0
  allTotalCountsfb: any[] = [];
  allTotalCountTw: any[] = [];
  allTotalCountLink: any[] = [];
  allTotalCountInsta: any[] = [];
  shiftType: any[] = [
    { name: 'Morning', id: 0 },
    { id: 1, name: 'Evening' },
    { id: 2, name: 'Night' },
    { id: 3, name: 'Iftar' },
    { id: 4, name: 'Sehr' },
  ];

  downloading = false;
  toastermessage = false;
  AlterMsg: any = '';
  constructor(
    private hs: HeaderService,
    private datePipe: DatePipe,
    private commandataService: CommonDataService,
    private SpinnerService: NgxSpinnerService
  ) { }
  ngOnInit(): void {
    this.currentDate = new Date();
    this.maxEndDate = this.currentDate.toISOString().split('T')[0];
    const obj = { title: 'Shift Report', url: 'analytics/shift-report' };
    this.hs.setHeader(obj);
    this.getShfitReport();
    this.getAlltags();
    this.getAgentsTeamList();
    this.calculateDateRange()
  }
  keywordslist: any[] = []
  getAlltags() {
    this.commandataService.GetTagsList().subscribe((res: any) => {
      
      console.log('All tags===>', res);
      this.tagsList = res;
      this.tagsList.forEach((xyz: any) => {
        xyz.keywordList.forEach((abc: any) => {
          this.keywordslist.push(abc)
          console.log("this.keywordslist===>", this.keywordslist)
        })
      })
    });
  }
  convertedintoArray: any;
  graphdate: any[] = [];
  noData: boolean = false;

  calculateDateRange() {

  }


  getShfitReport() {
    this.allDates = [];
    if (this.startDate == '' && this.endDate == '') {
      const today = this.currentDate;
      this.endDate = this.datePipe.transform(today, 'YYYY-MM-dd') || '';

      let prevDate = this.currentDate.setDate(this.currentDate.getDate() - 2);
      this.startDate = this.datePipe.transform(prevDate, 'YYYY-MM-dd') || '';
    } else if (this.startDate != '' && this.endDate != '') {
      //   this.startDate = this.startDate;
      //   this.endDate = this.endDate;
      // }
      const startDateObj = new Date(this.startDate);
      const endDateObj = new Date(this.endDate);
      const timeDiff = Math.abs(endDateObj.getTime() - startDateObj.getTime());
      const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      if (diffDays > 30) {
        alert('Select a date range of 30 days or less');
        return;
      }
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
      this.daysDifference = timeDifference / (1000 * 3600 * 24)
    }
    // find date
    // if (this.startDate && this.endDate) {
    //   const start = new Date(this.startDate);
    //   const end = new Date(this.endDate);
    //   const currentDate = new Date();


    //   if (start < currentDate) {
    //     start.setDate(currentDate.getDate() + 1);
    //   }

    //   while (start <= end) {
    //     const currentDateISO = start.toISOString().split('T')[0];
    //     this.allDates.push(currentDateISO);
    //     start.setDate(start.getDate() + 1);
    //   }


    // }

    //  if(this.endDate<=this.startDate){
    //   this.allDates.push(this.startDate)
    //  }
    this.allTotalCountInsta = [];
    this.allTotalCountLink = [];
    this.allTotalCountsfb = [];
    this.allTotalCountTw = [];
    this.dateWise = [];
    this.SpinnerService.show();
    this.commandataService.GetShiftReport(obj).subscribe((res: any) => {
      this.SpinnerService.hide();

      this.shiftReportData = res;
      this.shiftChannelData = res.channelData;
      this.dateWiseTotalCounts = res.dateWiseTotal;
      this.totalinboundCounts = res.totalIboundCount;


      if (this.totalinboundCounts == 0) {
        this.allTotalCountInsta = new Array(this.daysDifference).fill(0)
        this.allTotalCountLink = new Array(this.daysDifference).fill(0)
        this.allTotalCountsfb = new Array(this.daysDifference).fill(0)
        this.allTotalCountTw = new Array(this.daysDifference).fill(0)

      }
      // else{
      //   this.allTotalCountInsta = [];
      //   this.allTotalCountLink = [];
      //   this.allTotalCountsfb = [];
      //   this.allTotalCountTw = [];
      //   this.dateWise = [];




      // }
      this.shiftChannelData.forEach((data: any) => {
        data.dateWise.forEach((item: any) => {
          if (!this.allDates.includes(item.date.split('T')[0])) {
            this.allDates.push(item.date.split('T')[0]);

            if (data.platform == 'Facebook') {
              
              data.dateWise.forEach((singleItem: any) => {
                this.allTotalCountsfb.push(singleItem.totalCount);
              });
            }
          }
          if (data.platform == 'WhatsApp') {
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
        });
      });
      this.TagsStats = res.tagData.shiftReportTag;
      this.tagsStatsTotalCounts = res.tagData.totalTagsCount;

      this.getCharts();
    });

  }

  selectedunselectedtag(tag: any) {
    if (this.slectedtagId.includes(tag.id)) {
      this.slectedtagId.splice(this.slectedtagId.indexOf(tag.id), 1);
    } else {
      this.slectedtagId.push(tag.id);
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
    this.shiftime = event.target.value;
    this.getShfitReport();
  }

  getCharts() {
    
    var chartDom = document.getElementById('shiftReport')
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      color:['#0ed4a7','#fb468c', '#8e60a8','#99bdc9'],
      // title: {
      //   text: 'Inbound Traffic - Morning Shift'
      // },
      tooltip: {
        trigger: 'axis',
      },
      _legend: {
        data: ['WhatsApp', 'LinkedIn', 'Facebook', 'Instagram'],
      },
      get legend() {
        return this._legend;
      },
      set legend(value) {
        this._legend = value;
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
          name: 'WhatsApp',
          type: 'line',
          data: this.allTotalCountTw,
        },
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
          name: 'LinkedIn',
          type: 'line',
          data: this.allTotalCountLink,
        },
      ],
    };

    option && myChart.setOption(option);
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
    this.endDate = ''
  }
  getEndDate() {
    if (this.endDate >= this.startDate) {
      this.getShfitReport()
    }
    else {
      alert("EndDate is lessthen StartDate")
      this.endDate = ''
    }
  }
  closeToaster() {
    this.toastermessage = false;
  }
}
