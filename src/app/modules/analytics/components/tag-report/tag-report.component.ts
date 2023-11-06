import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as echarts from 'echarts';
import { HeaderService } from 'src/app/shared/services/header.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgxSpinnerModule],
  standalone: true,
  selector: 'app-tag-report',
  templateUrl: './tag-report.component.html',
  styleUrls: ['./tag-report.component.scss'],
})
export class TagReportComponent implements OnInit {
  startDate = '';
  endDate = '';
  currentDate: any;
  endMaxDate: any;
  tagsReportDetails: any;
  showDetails: boolean = false;
  facebookCommentsArray: any[] = [];
  facebookComments: any[] = [];
  tagslist: any[] = [];
  tagsReportCSv: any[] = [];
  userlist: any;
  agentId: any;
  constructor(
    private _hs: HeaderService,
    private spinerServices: NgxSpinnerService,
    private datePipe: DatePipe,
    private commonService: CommonDataService
  ) {}

  ngOnInit(): void {
    this.currentDate = new Date();
    this.endMaxDate = this.currentDate.toISOString().split('T')[0];
    let obj = { title: 'Tag Report', url: '/analytics/tag-report' };
    this._hs.setHeader(obj);
    this.getAllTagsReport();
  }
  getAllTagsReport() {
    if (this.endDate == '' && this.startDate == '') {
      const today = this.currentDate;
      this.endDate = this.datePipe.transform(today, 'YYYY-MM-dd') || '';
      let prevDate = this.currentDate.setDate(this.currentDate.getDate() - 4);
      this.startDate = this.datePipe.transform(prevDate, 'YYYY-MM-dd') || '';
    } else if (this.endDate !== '' && this.startDate !== '') {
      this.startDate =
        this.datePipe.transform(this.startDate, 'YYYY-MM-dd') || '';

      this.endDate = this.datePipe.transform(this.endDate, 'YYYY-MM-dd') || '';
    }
    let obj = {
      from: this.startDate,
      to: this.endDate,
      pageId: '',
    };
    this.tagslist = [];
    this.facebookCommentsArray = [];
    this.spinerServices.show();
    this.commonService.GetAllTagsReport(obj).subscribe((res: any) => {
      this.spinerServices.hide();
      console.log('AllTags res===>', res);

      this.tagsReportDetails = res;

      // this.tagsReportDetails?.forEach((y:any)=>{
      //     this.tagslist.push(y.tags)
      //     console.log('Tagslist==>',this.tagslist)
      // })
      this.userlist = res.userListDtos;
      // this.userlist.forEach((x:any)=>{
      //     if(!this.tagslist.includes(x.tags)){
      //
      //         this.tagslist.push(x.tags)
      //         console.log("This.tagslist===>",this.tagslist)
      //     }

      // })
      this.facebookComments = res.tagsWisePercentageDtos;
      this.facebookComments.forEach((x: any) => {
        if (!this.facebookCommentsArray.includes(x.tagPercentage && x.tag)) {
          this.facebookCommentsArray.push({
            value: x.tagPercentage,
            name: x.tag,
          });
        }
      });
      this.tagChart();
    });
  }

  tagChart() {
    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom);
    var option;
    option = {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        left: 'center',
      },
      series: [
        {
          type: 'pie',
          radius: ['60%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 20,
              fontWeight: 'bold',
              formatter: '{b} \n {c}',
            },
          },
          labelLine: {
            show: false,
          },
          data: this.facebookCommentsArray,
        },
      ],
    };

    option && myChart.setOption(option);
  }
  resetStartDate() {
    this.endDate = '';
  }
  resetEndDate() {
    if (this.endDate >= this.startDate) {
      this.getAllTagsReport();
    } else {
      alert('EndDate is greater Then StartDate');
      this.endDate = '';
    }
  }
  getPagenationDay(value: any) {
    const today = new Date();
    let prevDate = today.setDate(today.getDate() - value);
    this.startDate = this.datePipe.transform(prevDate, 'YYYY-MM-dd') || '';
    this.endDate = this.datePipe.transform(new Date(), 'YYYY-MM-dd') || '';
    this.getAllTagsReport();
  }
  expotCSv(user: any) {
    let data = {
      from: this.startDate,
      to: this.endDate,
      agentId: user.agentId,
    };
    this.commonService.DownloadTagsReport(data).subscribe((res: any) => {
      const a = document.createElement('a');
      a.href = res;
      a.download = 'AgentTagsReport' + this.startDate + '.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }
}
