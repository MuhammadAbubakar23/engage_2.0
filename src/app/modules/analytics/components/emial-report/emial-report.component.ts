import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderService } from 'src/app/shared/services/header.service';
import * as echarts from 'echarts';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { FormControl, FormGroup, Validators, FormControlName, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { ExcelService } from '../../services/excel.service';
// @ts-ignore
import * as html2pdf from 'html2pdf.js';
// @ts-ignore
// import { ExportToCsv } from 'export-to-csv';
@Component({
  standalone: true,
  selector: 'app-emial-report',
  templateUrl: './emial-report.component.html',
  styleUrls: ['./emial-report.component.scss'],
  imports: [CommonModule, LayoutsModule, ReactiveFormsModule, FormsModule, SharedModule, NgxSpinnerModule]
})
export class EmialReportComponent implements OnInit {
  [x: string]: any;
  ActiveAgents: any[] = []
  AgentsTeamList: any[] = [];
  searchText: any
  UserList: any[] = []
  agentPerformancedata: any[] = []
  interacitonbyDate: any
  seriesInteractionbyDate: any[] = []
  allDate: any[] = []
  totalInteractions: any
  maxEndDate: any
  selectedAgentLsit: any[] = []
  totalInteractionCount: number = 0
  emailreportData: any
  fromDate: string = ''
  toDate: string = ''
  currentDate: any
  positiveCount: number = 0
  negativeCount: number = 0
  neutralCount: number = 0
  inprogressCount: number = 0
  assingTomeCount: number = 0
  followUpCount: number = 0
  completedCount: number = 0
  slaCount: number = 0
  endDate: any
  checkNumber: number = 123.887;
  emailShiftForm = new FormGroup({
    shiftType: new FormControl('')
  })
  constructor(
    private headerService: HeaderService,
    private commonDataService: CommonDataService,
    private spinnerService: NgxSpinnerService,
    private datePipe: DatePipe,
    private excelService: ExcelService,
  ) { }
  ngOnInit(): void {
    const newObj = { title: 'Email Report ', url: '/analytics/email-report' };
    this.headerService.setHeader(newObj);
    this.currentDate = new Date()
    this.maxEndDate = this.currentDate.toISOString().split('T')[0]
    this.getEmailReportData()
    this.getAgentsTeamList()
    this.getUserList()
  
  }

  getEmailReportData() {
    if (this.fromDate == '' && this.toDate == '') {
      const today = new Date()
      this.toDate = this.datePipe.transform(this.currentDate, 'YYYY-MM-dd') || '';
      let prevDate = this.currentDate.setDate(this.currentDate.getDate() - 5);
      this.fromDate = this.datePipe.transform(prevDate, 'YYYY-MM-dd') || '';
    }
    else if (this.fromDate != '' && this.toDate != '') {
      this.toDate = this.toDate
      this.fromDate = this.fromDate
    }
    let data = {
      fromDate: this.fromDate,
      toDate: this.toDate,
      agents: this.selectedAgentLsit.toString()
    }
    this.seriesInteractionbyDate = []
    this.allDate = []
    this.totalInteractions = ''
    this.totalInteractionCount = 0
    this.positiveCount = 0
    this.negativeCount = 0
    this.neutralCount = 0
    this.inprogressCount = 0
    this.followUpCount = 0
    this.completedCount = 0
    this.assingTomeCount = 0
    this.slaCount = 0
    this.spinnerService.show();
    this.commonDataService.GetemailReport(data).subscribe((res: any) => {
      this.emailreportData = res
      this.spinnerService.hide()
      const sla = this.emailreportData.averageSLA
      this.checkNumberType(sla)
      this.agentPerformancedata = this.emailreportData.agentPerformance
      this.interacitonbyDate = this.emailreportData.dateWiseInteraction
      this.interacitonbyDate.forEach((x: any) => {
        const datewiseinteraction = x.dateWiseInteraction
        datewiseinteraction.forEach((abc: any) => {
          if (!this.allDate.includes(this.datePipe.transform(abc.date, 'dd MMM'))) {
            this.allDate.push(this.datePipe.transform(abc.date, 'dd MMM'))
          }
          this.seriesInteractionbyDate.push(abc.count)
        })
      })
      const totalcount = this.emailreportData.plateFormWiseInteraction
      totalcount.forEach((x: any) => {
        this.inprogressCount += x.unRespondedCount
        this.assingTomeCount += x.assignTomeCount
        this.followUpCount += x.followUpCount
        this.completedCount += x.completed
      })
      this.totalInteractionCount = this.inprogressCount + this.assingTomeCount + this.followUpCount + this.completedCount
      this.positiveCount =
        this.emailreportData.sentimentData.find(
          (data: any) => data.name === 'positive'
        )?.count || 0;
      this.negativeCount =
        this.emailreportData.sentimentData.find(
          (data: any) => data.name === 'negative'
        )?.count || 0;
      this.neutralCount =
        this.emailreportData.sentimentData.find(
          (data: any) => data.name === 'neutral'
        )?.count || 0;
      this.emailGraph()
    },
      error => {
        this.spinnerService.hide()
      }
    )
  }
  getUserList() {
    this.commonDataService.GetUserList().subscribe((res: any) => {
      this.UserList = res
    })
  }
  getAgentsTeamList() {
    this.commonDataService.GetAgentsTeamList().subscribe((res: any) => {
      if (Object.keys(res).length > 0) {
        this.AgentsTeamList = res;
      }
    });
  }
  emailGraph() {
    var chartDom = document.getElementById('emailGraph');
    var myChart = echarts.init(chartDom);
    var option;
    option = {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['Email'],
        icon: 'circle',
        bottom: 0
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
        data: this.allDate,
        axisLabel: {
          rotate: 45,
        },
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Email',
          type: 'line',
          data: this.seriesInteractionbyDate
        },
      ]
    };
    option && myChart.setOption(option);
  }
  isDownloading: boolean = false;
  downloadPdf() {
    this.isDownloading = true;
    const element = document.getElementById('dashboardContent');
    const options = {
      filename: 'Email Report.pdf',
      margin: [0, 1, 0, 6],
      image: { type: 'jpeg', quality: 1.0 },
      html2canvas: { scale: 3 },
      jsPDF: { unit: 'in', format: 'Tabloid', orientation: 'landscape' },
    };
    html2pdf().set(options).from(element).save();
    this.isDownloading = false;
  }
  selectorUnselectAgents(id: any) {
    const index = this.selectedAgentLsit.findIndex((x: any) => x == id)
    if (index != -1) {
      this.selectedAgentLsit.splice(index, 1)
    }
    else {
      this.selectedAgentLsit.push(id)
    }
    this.getEmailReportData()
  }
  checkNumberType(value: any) {
    if (Number.isInteger(value)) {
      this.slaCount = value
    } else if (value % 1 !== 0) {
      this.slaCount = value.toFixed(2)
    } else {
    }
  }
  resetendDate(){
    this.toDate=''
  }
  export() {
    this.excelService.exportAsExcelFile(this.agentPerformancedata,'Email report')
  }
}
