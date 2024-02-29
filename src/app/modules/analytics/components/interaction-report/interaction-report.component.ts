import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { HeaderService } from 'src/app/shared/services/header.service';
import * as echarts from 'echarts';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
// @ts-ignore
import * as html2pdf from 'html2pdf.js';
@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, NgxSpinnerModule],
  selector: 'app-interaction-report',
  templateUrl: './interaction-report.component.html',
  styleUrls: ['./interaction-report.component.scss']
})
export class InteractionReportComponent implements OnInit {
  @ViewChild('dashboardContent') dashboardContent!: ElementRef;
  sentimentDataPoints: {
    name: string;
    type: string;
    data: any[];

  }[] = [];
  userData: number = 0
  avgResponseTimeSum: any = 0;
  avgMinCaterTime: any = 0;
  avgMaxCaterTime: any = 0;
  totalAgentsCount: any;


  constructor(
    private _hS: HeaderService,
    private commonData: CommonDataService,
    private SpinnerService: NgxSpinnerService,
    private cdr: ChangeDetectorRef,
    private datePipe: DatePipe,
  ) {

  }

  ngOnInit(): void {
    const newObj = { title: 'Interaction Report', url: '/analytics/interaction-report' };

    this._hS.setHeader(newObj);
    this.currentDate = new Date();
    this.maxEndDate = this.currentDate.toISOString().split('T')[0];
    this.GetStatsInteractionReport()
    this.makeChartResponsive()
    // charts 
    // this.interactionByDate()
    // this.pieChart()
  }
  finalAverage: any = 0;
  LastfinalAverage: any = 0
  finalAverageMinimum: any = 0;
  LastfinalAverageMinimum: any = 0
  finalAverageMaximum: any = 0;
  LastfinalAverageMaximum: any = 0;
  finalAverageFirstResponse: any = 0;
  startDate: any = ""
  endDate: any = ""
  bsValue: any;
  maxEndDate: any;
  currentDate: any;
  interactionStats: any
  positiveCount: number = 0;
  negativeCount: number = 0;
  neutralCount: number = 0;
  csatArray: any[] = [];
  CSATobj: any
  data: any[] = [];
  interactionData: any[] = [];
  _legend: any[] = [];
  newArray: any[] = []
  allDates: any[] = [];
  totalLoginsAgent: any[] = []
  channelCountsArray: any[] = []
  socialMediaData: any[] = [];
  previousSocialMediaData: any[] = []
  inProgressCount: number = 0;
  assignToMeCount: number = 0;
  followUpCount: number = 0;
  completedCount: number = 0;
  averageResponseData: number = 0
  previousInprogressCount: number = 0
  previousAssigntoMeCount: number = 0
  previousFollowUpCount: number = 0
  previousCompletedCount: number = 0
  averageResponseRateSum: number = 0
  PreviousTotalInteractionCount : number=0
  preAveragePercentage :number=0
  totalInteractionCount: any = 0
  CSATGraph: any
  platformIconMapping: any = {
    'Facebook': 'fa-brands fa-facebook fs-4 navy',
    'Twitter': 'fa-brands fa-twitter fs-4 sky',
    'Instagram': 'fa-brands fa-instagram fs-4 berry',
    'LinkedIn': 'fa-brands fa-linkedin fs-4 linkedinTxt',
    'Email': 'fa-light fa-envelope  fs-4 berry',
    'Youtube': 'fa-brands fa-youtube fs-4 radical',
    'SMS': 'fa-message-sms fs-4 cherry ',
    'WebChat': 'fa-light fa-messages fs-4 webchatcolor',
    'WhatsApp': 'fab fa-whatsapp fs-4 mint',
    'PlayStore': 'fa-brands fa-google-play fs-4 googleplaycolor',
    'OfficeEmail': 'fa-light fa-envelope  fs-4 navy '
  };
  formatFirstResponseTime(timeString: string): string {
    if (!timeString) {
      return '';
    }
    const milliseconds = Date.parse(timeString);
    if (isNaN(milliseconds)) {
      return '';
    }
    const date = new Date(milliseconds);
    const hours = this.padZero(date.getHours());
    const minutes = this.padZero(date.getMinutes());
    const seconds = this.padZero(date.getSeconds());
    return `${hours}:${minutes}:${seconds}`;
  }

  padZero(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  calculateAverageTime(agentPerformance: any[], field: string) {
    let totalSeconds = 0;
    for (const agent of agentPerformance) {
      totalSeconds += this.timeToSeconds(agent[field]);
    }
    const averageSeconds = totalSeconds / agentPerformance.length;
    return this.secondsToTime(averageSeconds);
  }

  timeToSeconds(timeStr: string): number {
    const [hours, minutes, seconds] = timeStr.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  }

  secondsToTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(remainingSeconds)}`;
  }


  pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }
  convertTimeToSeconds(timeString: any) {
    let [hours, minutes, seconds] = timeString.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  }
  getAgentsTeamList() {
    this.commonData.GetAgentsTeamList().subscribe((res: any) => {
      console.log("agents data ====>", res)
      this.totalLoginsAgent = res
      this.totalAgentsCount = res.length
    });
  }
  selectedChannel: any
  toggleChannelSelection(channel: string) {
    if (this.selectedChannel === channel) {
      this.selectedChannel = null;
    } else {
      this.selectedChannel = channel;
    }
    this.GetStatsInteractionReport()
  }
  GetStatsInteractionReport() {
    if (this.startDate == "" && this.endDate == "") {

      const today = this.currentDate;
      this.endDate = this.datePipe.transform(today, "YYYY-MM-dd") || '';

      let prevDate = this.currentDate.setDate(this.currentDate.getDate() - 6);
      this.startDate = this.datePipe.transform(prevDate, "YYYY-MM-dd") || '';

    }
    // const startDateObj = new Date(this.startDate);
    // const endDateObj = new Date(this.endDate);
    // const timeDiff = Math.abs(endDateObj.getTime() - startDateObj.getTime());
    // const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    // if (diffDays > 30) {
    //   alert('Select a date range of 30 days or less');
    //   this.endDate=''
    //   return;
    // }
    const formData = {
      fromDate: this.startDate,
      toDate: this.endDate,
      agents: "",
      channels: this.selectedChannel || "",

    }
    console.log("data form===>", formData)
    this.SpinnerService.show();
    this.interactionStats = null;
    this.data = [];
    this.socialMediaData = [];
    this.previousSocialMediaData = []
    this.inProgressCount = 0;
    this.assignToMeCount = 0;
    this.followUpCount = 0;
    this.completedCount = 0;
    this.previousInprogressCount = 0
    this.previousAssigntoMeCount = 0
    this.previousFollowUpCount = 0
    this.previousCompletedCount = 0
    this.totalInteractionCount = 0
    this.averageResponseData = 0
    this.preAveragePercentage =0
    this.PreviousTotalInteractionCount =0
    this.averageResponseRateSum = 0
    this.totalInteractionCount = 0;
    this.sentimentDataPoints = [];
    this.csatArray = [];
    this._legend = [];
    this.channelCountsArray = [];
    this.allDates = [];
    this.newArray = [];
    this.commonData.GetInteractionReport(formData).subscribe((res: any) => {

      this.SpinnerService.hide();
      this.getAllCSATData()

      this.interactionStats = res
      this.data = res.agentPerformance
      this.socialMediaData = res.plateFormWiseInteraction
      this.socialMediaData.forEach((x: any) => {
        this.inProgressCount += x.unRespondedCount;
        this.assignToMeCount += x.assignTomeCount;
        this.followUpCount += x.followUpCount
        this.completedCount += x.completed
      });
      this.totalInteractionCount = this.inProgressCount + this.assignToMeCount + this.followUpCount + this.completedCount
      // avg response rate count 
      this.averageResponseRateSum = this.inProgressCount + this.assignToMeCount + this.followUpCount
      this.averageResponseData = Math.abs(((this.averageResponseRateSum) / this.completedCount) * 100)

      this.previousSocialMediaData = res.previousPlateFormWiseInteraction
      this.previousSocialMediaData.forEach((y: any) => {
        this.previousInprogressCount += y.unRespondedCount
        this.previousAssigntoMeCount += y.assignTomeCount
        this.previousFollowUpCount += y.followUpCount
        this.previousCompletedCount += y.completed
      })
      this.PreviousTotalInteractionCount = this.previousInprogressCount + this.previousAssigntoMeCount + this.previousFollowUpCount

      this.preAveragePercentage = ((this.averageResponseRateSum - this.PreviousTotalInteractionCount)/this.PreviousTotalInteractionCount)*100
      // current time sum 
      this.finalAverage = this.calculateAverageTime(this.interactionStats.agentPerformance, 'averageTime')
      this.finalAverageMinimum = this.calculateAverageTime(this.interactionStats.agentPerformance, 'minimumTime');
      this.finalAverageMaximum = this.calculateAverageTime(this.interactionStats.agentPerformance, 'maximumTime');
      // last week time sum 
      this.LastfinalAverage = this.calculateAverageTime(this.interactionStats.previousAgentPerformance, 'averageTime')
      this.LastfinalAverageMinimum = this.calculateAverageTime(this.interactionStats.previousAgentPerformance, 'minimumTime')
      this.LastfinalAverageMaximum = this.calculateAverageTime(this.interactionStats.previousAgentPerformance, 'maximumTime')

      // averageTime average for increase and decrease 

      let finalAverageInSeconds = this.convertTimeToSeconds(this.finalAverage);
      let LastfinalAverageInSeconds = this.convertTimeToSeconds(this.LastfinalAverage);
      if (finalAverageInSeconds >= LastfinalAverageInSeconds) {
        this.avgResponseTimeSum = Math.abs(((LastfinalAverageInSeconds - finalAverageInSeconds) / finalAverageInSeconds) * 100);
      }
      if (finalAverageInSeconds <= LastfinalAverageInSeconds) {
        this.avgResponseTimeSum = Math.abs(((finalAverageInSeconds - LastfinalAverageInSeconds) / LastfinalAverageInSeconds) * 100);
      }

      // min cater time average percentage 
      let finalMinCater = this.convertTimeToSeconds(this.finalAverageMinimum);
      let LastfinalMinCater = this.convertTimeToSeconds(this.LastfinalAverage);
      if (finalMinCater >= LastfinalMinCater) {
        this.avgMinCaterTime = Math.abs(((LastfinalMinCater - finalMinCater) / finalMinCater) * 100);

      }
      if (finalMinCater <= LastfinalMinCater) {
        this.avgMinCaterTime = Math.abs(((finalMinCater - LastfinalMinCater) / LastfinalMinCater) * 100);

      }

      let finalMaxCater = this.convertTimeToSeconds(this.finalAverageMaximum);
      let LastfinalMaxCater = this.convertTimeToSeconds(this.LastfinalAverageMaximum);
      if (finalMaxCater >= LastfinalMaxCater) {
        this.avgMaxCaterTime = Math.abs(((LastfinalMaxCater - finalMaxCater) / finalMaxCater) * 100);

      }
      if (finalMaxCater <= LastfinalMaxCater) {
        this.avgMaxCaterTime = Math.abs(((finalMaxCater - LastfinalMaxCater) / LastfinalMaxCater) * 100);

      }

      console.log("everage data===>", this.avgResponseTimeSum)


      // this.finalAverageFirstResponse = this.calculateAverageTime(this.interactionStats.agentPerformance, 'firstResponseTime');
      console.log("interaction data ==>", this.data)
      this.interactionData = res.dateWiseInteraction
      this.interactionData.forEach((platform: any) => {
        this._legend.push(platform.plateForm);
        const platformName = platform.plateForm;
        platform.dateWiseInteraction.forEach((interaction: any) => {

          const date = this.datePipe.transform(interaction.date, 'dd/MMM');
          if (!this.allDates.includes(date)) {
            this.allDates.push(date);
          }


          let sentimentCounts: { [key: string]: number } = {

          };
          sentimentCounts = interaction.count;
          this.newArray.push(sentimentCounts)
          if (!this.sentimentDataPoints.find((x: any) => x.name == platformName)) {
            this.sentimentDataPoints.push({
              name: platformName,
              type: 'line',
              data: this.newArray
            });
          }



          //           this.newArray.push(interaction.count)
          // 

          //           this.channelCountsArray.push({
          //             name: this._legend.toString(),
          //             type: 'line',
          //             data: this.newArray
          //           });

        });


      });
      this.positiveCount = this.interactionStats.sentimentData.find((data: any) => data.name === 'positive')?.count || 0;
      this.negativeCount = this.interactionStats.sentimentData.find((data: any) => data.name === 'negative')?.count || 0;
      this.neutralCount = this.interactionStats.sentimentData.find((data: any) => data.name === 'neutral')?.count || 0;
      this.interactionByDate()
    })
    this.getAgentsTeamList()

  }
  resetStartDate() {
    this.endDate = ''

  }
  agentCount: number = 0;

  getTableStyle() {
    const threshold = 10;
    const maxHeight = threshold * 50 + 40;
    const style = {
      'max-height': this.agentCount > threshold ? `${maxHeight}px` : 'auto',
    };
    return style;
  }
  resetEndDate() {

    if (this.endDate >= this.startDate) {
      this.GetStatsInteractionReport();
    } else {
      alert('EndDate is lessthen StartDate');
      this.endDate = '';
    }
  }
  getAllCSATData() {

    let obj = {
      "fromDate": this.startDate,
      "toDate": this.endDate,
      "agents": '',
      "plateForm": "string"
    }
    this.csatArray = []
    this.SpinnerService.show()
    this.cdr.detectChanges()
    this.commonData.GetCSATReport(obj).subscribe((res: any) => {

      this.SpinnerService.hide()
      this.CSATobj = res
      if (!this.csatArray.includes({
        name: 'Very Satisfied' && 'Unsatisfied' && 'Satisfied' && 'Not Satisfied' && 'Neutral'
      })) {

        this.csatArray.push(
          { value: this.CSATobj.verSatisfiedCount, name: 'Very Satisfied' },
          { value: this.CSATobj.unsatisfiedCount, name: 'Unsatisfied' },
          { value: this.CSATobj.satisfiedCount, name: 'Satisfied' },
          { value: this.CSATobj.notSatisfiedCount, name: 'Not Satisfied' },
          { value: this.CSATobj.neutralCount, name: 'Neutral' }
        )
      }


      this.getCSATGraph()
    }

    )

  }
  interactionByDate() {
    var chartDom = document.getElementById('interactions');
    this.interactionchart = echarts.init(chartDom);
    var option;

    option = {
      // title: {
      //   text: 'Stacked Line'
      // },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: this._legend,
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
        data: this.allDates
      },
      yAxis: {
        type: 'value'
      },
      series: this.sentimentDataPoints
    };

    option && this.interactionchart.setOption(option);
  }


  getCSATGraph() {

    var chartDom = document.getElementById('piechart');
    this.CSATGraph = echarts.init(chartDom);
    var option;

    option = {

      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'horizontal',
        bottom: 'bottom',
        icon: 'circle'
      },
      series: [
        {
          name: 'CUSTOMER SATISFACTION',
          type: 'pie',
          radius: '60%',
          data: this.csatArray,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,

            }
          }
        }
      ]
    };

    option && this.CSATGraph.setOption(option);
  }

  channelOptions = [

    // { id: '11', name: 'Select All Channels', icon: '', isSelected: false },
    { id: '11', name: 'Twitter', icon: 'fa-brands fa-twitter sky pe-2', isSelected: false },
    { id: '12', name: 'Instagram', icon: 'fa-brands fa-instagram pe-2 berry', isSelected: false },
    { id: '13', name: 'LinkedIn', icon: 'fa-brands fa-linkedin-in linkedinTxt pe-2', isSelected: false },
    { id: '14', name: 'Facebook', icon: 'fab fa-facebook navytext pe-2 radical', isSelected: false },
    { id: '15', name: 'YouTube', icon: 'fa-brands fa-youtube pe-2', isSelected: false },
    { id: '16', name: 'SMS', icon: 'fa-solid fa-comment-alt pe-2 cherry', isSelected: false },
    { id: '17', name: 'WhatsApp', icon: 'fa-brands fa-whatsapp pe-2 mint', isSelected: false },
    { id: '18', name: 'Email', icon: 'fa-solid fa-envelope pe-2', isSelected: false },
    { id: '19', name: 'OfficeEmail', icon: 'fa-solid fa-envelope pe-2', isSelected: false },
    { id: '20', name: 'WebChat', icon: 'fa-solid fa-comment-dots pe-2 webchatcolor', isSelected: false },
    { id: '21', name: 'PlayStore', icon: '  fa-brands fa-google-play  googleplaycolor pe-2', isSelected: false },

  ];
  isDownloading: boolean = false;

  downloadPdf() {
    this.isDownloading = true
    const element = document.getElementById('dashboardContent');
    const options = {
      filename: 'Dashboard.pdf',
      margin: [0, 1, 0, 6],
      image: { type: 'jpeg', quality: 1.0 },
      html2canvas: { scale: 3 },
      jsPDF: { unit: 'in', format: 'Tabloid', orientation: 'landscape', },

    };

    html2pdf().set(options).from(element).save();
    this.isDownloading = false

  }
  interactionchart: any
  makeChartResponsive() {
    window.addEventListener('resize', () => {
      if (this.interactionchart) {
        this.interactionchart.resize();
      }

      if (this.CSATGraph) {
        this.CSATGraph.resize()
      }
    })
  }
}
