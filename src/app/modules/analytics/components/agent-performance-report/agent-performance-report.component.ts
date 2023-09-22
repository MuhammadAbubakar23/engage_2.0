import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderService } from 'src/app/services/HeaderService/header.service';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, CanvasJSAngularChartsModule],
  selector: 'app-agent-performance-report',
  templateUrl: './agent-performance-report.component.html',
  styleUrls: ['./agent-performance-report.component.scss']
})
export class AgentPerformanceReportComponent implements OnInit {
  startDate: string = '';
  endDate: string = '';
  selectedTagBy: string = ''
  agent_performance_report: any
  selectedChannels: string = ''
  Agent_data: any[] = [];
  Message_data: any[] = [];
  currentDate: any;
  tweetsOptions: any
  directMessage: any
  constructor(private _hS: HeaderService,
    private commonService: CommonDataService,
    private cdr: ChangeDetectorRef,
    private datePipe: DatePipe,) { }

  ngOnInit(): void {
    this.currentDate = new Date();
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
  onCheckboxChange() {
    this.addAgentGraph();
    this.cdr.detectChanges();
  }
  addAgentGraph() {
    let selectedChannelsArray = this.channelOptions.filter(item => item.isSelected).map(item => item.label);
    this.selectedChannels = selectedChannelsArray.toString();
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
      this.startDate = this.startDate
      this.endDate = this.endDate
    }
    const requestData = {
      fromDate: this.startDate,
      toDate: this.endDate,
      agents: this.selectedTagBy,
      channels: this.selectedChannels
    };

    this.commonService.AddAgentPerformance(requestData).subscribe(
      (response: any) => {
        this.agent_performance_report = response;
        this.Agent_data = [];
        this.Message_data = []
        const commentDateWise = this.agent_performance_report.commentDateWise;
        commentDateWise.forEach((data: any) => {
          const date = new Date(data.date);
          this.Agent_data.push({ x: date, y: data.count });
        });
        this.tweetsOptions = {
          animationEnabled: true,
          theme: "light2",
          axisX: {
            valueFormatString: "DD-MM-YYYY"
          },
          toolTip: {
            shared: true
          },
          legend: {
            cursor: "pointer",
            itemclick: function (e: any) {
              if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                e.dataSeries.visible = false;
              } else {
                e.dataSeries.visible = true;
              }
              e.chart.render();
            }
          },
          data: [{
            type: "line",
            showInLegend: true,
            name: "Comment Count",
            xValueFormatString: "MMM DD, YYYY",
            dataPoints: this.Agent_data
          }]
        };
        // messageDateWise
        const messageDateWise = this.agent_performance_report.messageDateWise;
        messageDateWise.forEach((data: any) => {
          const date = new Date(data.date);
          this.Message_data.push({ x: date, y: data.count });
        });

        this.directMessage = {
          animationEnabled: true,
          theme: "light2",
          axisX: {
            valueFormatString: "DD-MM-YYYY"
          },
          toolTip: {
            shared: true
          },
          legend: {
            cursor: "pointer",
            itemclick: function (e: any) {
              if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                e.dataSeries.visible = false;
              } else {
                e.dataSeries.visible = true;
              }
              e.chart.render();
            }
          },
          data: [
            {
              type: "line",
              showInLegend: true,
              name: "Message Count",
              xValueFormatString: "MMM DD, YYYY",
              dataPoints: this.Message_data
            }
          ]
        }
      },
      (error: any) => {
        console.error('Error adding agent performance report:', error);
      }
    );
  }
  totalAgents = [{ id: '', name: '', isSelected: false }];

  channelOptions = [
    { id: '123', label: 'Twitter', icon: 'fa-brands fa-twitter sky pe-2', isSelected: false },
    { id: '12', label: 'Instagram', icon: 'fa-brands fa-instagram pe-2', isSelected: false },
    { id: '14', label: 'LinkedIn', icon: 'fa-brands fa-linkedin pe-2', isSelected: false },
    { id: '15', label: 'Facebook', icon: 'fa-brands fa-facebook facebook pe-2', isSelected: false },
    { id: '14', label: 'YouTube', icon: 'fa-brands fa-youtube pe-2', isSelected: false },
    { id: '15', label: 'SMS', icon: 'fa-solid fa-comment-alt pe-2', isSelected: false },
    { id: '14', label: 'WhatsApp', icon: 'fa-brands fa-whatsapp pe-2', isSelected: false },
    { id: '15', label: 'Email', icon: 'fa-solid fa-envelope pe-2', isSelected: false },
    { id: '14', label: 'OfficeEmail', icon: 'fa-solid fa-envelope pe-2', isSelected: false },
    { id: '14', label: 'WebChat', icon: 'fa-solid fa-comment-dots pe-2', isSelected: false }
  ];

}
