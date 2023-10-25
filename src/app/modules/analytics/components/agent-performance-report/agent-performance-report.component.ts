import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import * as echarts from 'echarts';
import { HeaderService } from 'src/app/shared/services/header.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { SharedModule } from "../../../../shared/shared.module";
@Component({
  standalone: true,
  selector: 'app-agent-performance-report',
  templateUrl: './agent-performance-report.component.html',
  styleUrls: ['./agent-performance-report.component.scss'],
  imports: [CommonModule, RouterModule, FormsModule, NgxSpinnerModule, SharedModule]
})
export class AgentPerformanceReportComponent implements OnInit {

  @ViewChild('main', { static: true }) main!: ElementRef
  @ViewChild('message', { static: true }) message!: ElementRef
  searchText: string = '';
  startDate: string = '';
  endDate: string = '';
  selectedTagBy: string = ''
  agent_performance_report: any
   AllChannels: any = ''
  singleChanenel: string='';
  Agent_data: any[] = [];
  Message_data: any[] = [];
  currentDate: any;
  tweetsOptions: any
  directMessage: any
  selectedChannelLabel: string = 'Comments';
  maxEndDate: any

  downloading = false;
  toastermessage = false;
  AlterMsg: any = '';

  constructor(private _hS: HeaderService,
    private commonService: CommonDataService,
    private cdr: ChangeDetectorRef,
    private datePipe: DatePipe,
    private SpinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.currentDate = new Date();
    this.maxEndDate = this.currentDate.toISOString().split("T")[0];

    this.addAgentGraph();
    this.getListUser();
    const newObj = { title: 'Agent Performance Report', url: '/analytics/performance-report' };
    this._hS.setHeader(newObj);
  }
  getListUser(): void {
    this.commonService.GetUserList()
      .subscribe((response: any) => {
        this.totalAgents = response;
        console.log(this.totalAgents);
      }, (error: any) => {
        console.error(error);
      });
  }
  onCheckboxChange(name: string) {
    this.singleChanenel = name
    this.addAgentGraph();
    this.cdr.detectChanges();
  }
  resetEndDate() {
    this.endDate = '';
  }
  calculateTotalTweets(): number {
    return this.agent_performance_report?.agentPerformance.reduce(
      (total: any, agent: { commentCount: any; }) => total + (agent.commentCount || 0),
      0
    );
  }

  calculateTotalDirectMessages(): number {
    return this.agent_performance_report?.agentPerformance.reduce(
      (total: any, agent: { messageCount: any; }) => total + (agent.messageCount || 0),
      0
    );
  }

  addAgentGraph() {
    // debugger
    if (this.singleChanenel != '') {
      this.AllChannels = this.singleChanenel
    }
    else {
      let singleChanenelArray = this.channelOptions.filter(item => item.isSelected).map(item => item.name);
      this.AllChannels = singleChanenelArray.toString();
    }
    let selectedTagByArray = this.totalAgents.filter(item => item.isSelected).map(item => item.id);
    this.selectedTagBy = selectedTagByArray.toString();
    if (this.startDate == "" && this.endDate == "") {

      const today = this.currentDate;
      this.endDate = this.datePipe.transform(today, "YYYY-MM-dd") || '';

      let prevDate = this.currentDate.setDate(this.currentDate.getDate() - 6);
      this.startDate = this.datePipe.transform(prevDate, "YYYY-MM-dd") || '';
    }
    else if (this.startDate != "" && this.endDate != ""
    ) {
    //   this.startDate = this.startDate
    //   this.endDate = this.endDate
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

    if (this.AllChannels) {

      this.selectedChannelLabel = this.AllChannels;
    } else {
      this.selectedChannelLabel = 'Comments';
    }
    const requestData = {
      fromDate: this.startDate,
      toDate: this.endDate,
      agents: this.selectedTagBy,
      channels: this.AllChannels
    };
    if (this.endDate >= this.startDate) {
      this.SpinnerService.show();
      this.commonService.AddAgentPerformance(requestData).subscribe(
        (response: any) => {
          this.SpinnerService.hide();
          this.agent_performance_report = response;
          this.Agent_data = [];
          this.Message_data = []
          const commentDateWise = this.agent_performance_report.commentDateWise;
          commentDateWise.forEach((data: any) => {
            const date = new Date(data.date);
            this.Agent_data.push({ x: date, y: data.count });
          });
          const doms = this.main.nativeElement;
          const myCharts = echarts.init(doms, null, {
            renderer: 'canvas',
            useDirtyRect: false
          });
          var option: echarts.EChartsOption;

          function dataFormat(date: Date): string {
            const day: number = date.getDate();
            const monthNames: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const month: string = monthNames[date.getMonth()];
            return `${day} ${month}`;
          }
          option = {
            xAxis: {
              type: 'category',
              data: this.Agent_data.map(item => dataFormat(item.x)),
              axisLabel: {
                show: true,
                interval: 0,
                formatter: function (value: string) {
                  return value;
                },
              },
            },
            yAxis: {
              type: 'value',
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: [this.selectedChannelLabel],
            },
            toolbox: {
              feature: {
                saveAsImage: {},
              },
            },
            series: [
              {
                name: this.selectedChannelLabel,
                data: this.Agent_data.map(item => item.y),
                type: 'line',
                itemStyle: {
                  color: 'red',
                },
                lineStyle: {
                  width: 2,
                },
              },
            ],
          };

          option && myCharts.setOption(option);

          // messageDateWise
          const messageDateWise = this.agent_performance_report.messageDateWise;
          messageDateWise.forEach((data: any) => {
            const date = new Date(data.date);
            this.Message_data.push({ x: date, y: data.count });
          });

          const myDom = this.message.nativeElement;
          const myChart = echarts.init(myDom, null, {
            renderer: 'canvas',
            useDirtyRect: false
          });
          var option: echarts.EChartsOption;

          function formatDate(date: Date): string {
            const day: number = date.getDate();
            const monthNames: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const month: string = monthNames[date.getMonth()];
            return `${day} ${month}`;
          }

          option = {
            xAxis: {
              type: 'category',
              data: this.Message_data.map(item => formatDate(item.x)),
              axisLabel: {
                show: true,
                interval: 0,
                formatter: function (value: string) {
                  return value;
                },
              },
            },
            yAxis: {
              type: 'value',
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['Direct Message'],
            },
            toolbox: {
              feature: {
                saveAsImage: {},
              },
            },
            series: [
              {
                name: 'Direct Message',
                data: this.Message_data.map(item => item.y),
                type: 'line',
                itemStyle: {
                  color: 'lightgreen',
                },
                lineStyle: {
                  width: 2,
                },
              },
            ],
          };

          option && myChart.setOption(option);
        },
        (error: any) => {
          console.error('Error adding agent performance report:', error);
        });
    } else {
      this.SpinnerService.hide();
      alert('End Date is less than Start Date')
    }
  }
  totalAgents = [{ id: '', name: '', isSelected: false }];

  channelOptions = [
    { id: '11', name: 'Twitter', icon: 'fa-brands fa-twitter sky pe-2', isSelected: false },
    { id: '12', name: 'Instagram', icon: 'fa-brands fa-instagram pe-2', isSelected: false },
    { id: '13', name: 'LinkedIn', icon: 'fa-brands fa-linkedin pe-2', isSelected: false },
    { id: '14', name: 'Facebook', icon: 'fa-brands fa-facebook facebook pe-2', isSelected: false },
    // { id: '15', name: 'YouTube', icon: 'fa-brands fa-youtube pe-2', isSelected: false },
    // { id: '16', name: 'SMS', icon: 'fa-solid fa-comment-alt pe-2', isSelected: false },
    // { id: '17', name: 'WhatsApp', icon: 'fa-brands fa-whatsapp pe-2', isSelected: false },
    // { id: '18', name: 'Email', icon: 'fa-solid fa-envelope pe-2', isSelected: false },
    // { id: '19', name: 'OfficeEmail', icon: 'fa-solid fa-envelope pe-2', isSelected: false },
    // { id: '20', name: 'WebChat', icon: 'fa-solid fa-comment-dots pe-2', isSelected: false }
  ];
  getChannelIcon(channelName: string): string {
    const selectedChannel = this.channelOptions.find(channel => channel.name === channelName);
    return selectedChannel ? selectedChannel.icon : '';
  }

  closeToaster() {
    this.toastermessage = false;
  }
  date_pagination(days: number) {
    debugger
    let currentDate = new Date();
    let prevDate = currentDate.setDate(currentDate.getDate() - days);
    this.startDate = this.datePipe.transform(prevDate, 'YYYY-MM-dd') || '';
    this.endDate = this.datePipe.transform(new Date(), 'YYYY-MM-dd') || '';
    this.addAgentGraph()
  }
}
