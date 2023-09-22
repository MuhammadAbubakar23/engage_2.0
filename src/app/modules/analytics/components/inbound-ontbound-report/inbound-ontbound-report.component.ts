import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { HeaderService } from 'src/app/shared/services/header.service';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, CanvasJSAngularChartsModule],
  selector: 'app-inbound-ontbound-report',
  templateUrl: './inbound-ontbound-report.component.html',
  styleUrls: ['./inbound-ontbound-report.component.scss']
})
export class InboundOntboundReportComponent implements OnInit {


  selectedChannels: string = ''
  selectedContent: string = ''
  selectedTagOption: string = ''
  selectedSentiment: string = ''
  selectedType: string = ''
  selectedTagBy: string = ''
  Inbound_Outbound_Report: any;
  startDate: string = '';
  endDate: string = '';
  senitimentalGraph: any;
  Inbound_Outbound_Graph: any;
  ChannelWiseGraph: any;
  TagsPerChannel: any;
  Inbound_data: any[] = [];
  Outbound_data: any[] = [];
  inboundOutboundDataAvailable = false;
  sentimentalDataAvailable = false;
  averageResponseDataAvailable = false;
  tagsPerChannelDataAvailable = false;

  currentDate: any;
  constructor(private _hS: HeaderService,
    private commonService: CommonDataService,
    private datePipe: DatePipe,
    private cdr: ChangeDetectorRef) { }
  ngOnInit(): void {
    this.currentDate = new Date();
    this.AddGraph()
    const newObj = { title: 'Inbound/Outbound Report', url: '/analytics/inbound-outbound-report' };
    this._hS.setHeader(newObj);
    this.getTags();
    this.getListUser();
    this.getSentiments()
  }
  onCheckboxChange() {
    this.AddGraph();
    this.cdr.detectChanges();
  }
  AddGraph() {
    // debugger
    let selectedChannelsArray = this.channelOptions.filter(item => item.isSelected).map(item => item.label);
    this.selectedChannels = selectedChannelsArray.toString();

    let selectedContentTypesArray = this.contentTypes.filter(item => item.isSelected).map(item => item.value);
    this.selectedContent = selectedContentTypesArray.toString();

    let selectedTagOptionArray = this.tagOptions.filter(item => item.isSelected).map(item => item.id);
    this.selectedTagOption = selectedTagOptionArray.toString();

    let selectedSentimentsArray = this.sentimentOptions.filter(item => item.isSelected).map(item => item.id);
    this.selectedSentiment = selectedSentimentsArray.toString();

    let selectedTagByArray = this.taggedByOptions.filter(item => item.isSelected).map(item => item.id);
    this.selectedTagBy = selectedTagByArray.toString();

    let selectedTypeArray = this.typeOptions.filter(item => item.isSelected).map(item => item.label);
    this.selectedType = selectedTypeArray.toString();

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
      channels: this.selectedChannels,
      contentTypes: this.selectedContent,
      tags: this.selectedTagOption,
      sentiments: this.selectedSentiment,
      agents: this.selectedTagBy,
      inbound: true,
      outbound: true,
      inboundOutbound: true,
      dateSubFilter: 0
    };

    this.commonService.Addinboundoutbound(requestData).subscribe(
      (response: any) => {
          this.Inbound_data = [];
        this.Outbound_data = [];
      
        if (response) {
          this.Inbound_Outbound_Report = response;
          this.Inbound_Outbound_Report.channelReportData.dateWiseData.forEach((data: any) => {
            this.Inbound_data.push({ 'x': new Date(data.createdDate), 'y': data.inboundData });
            this.Outbound_data.push({ 'x': new Date(data.createdDate), 'y': data.outboundData });
          });

            // inbound 
          this.Inbound_Outbound_Graph = {
            animationEnabled: true,
            exportEnabled: false,
            title: {
              text: ""
            },
            axisY: {
            },

            axisX: {
              valueFormatString: "DD-MM-YYYY"
            },
            toolTip: {
              shared: true,
              content: "{name}: {y}"
            },
            legend: {
              fontSize: 13
            },
            data: [
              {
                type: "splineArea",
                showInLegend: true,
                name: "Inbound",
                markerSize: 8,
                color: "rgba(54,158,173,.9)",

                dataPoints: this.Inbound_data
              },
              {
                type: "splineArea",
                showInLegend: true,
                name: "OutBound",
                markerSize: 8,
                color: "rgba(134,180,2,.9)",
                dataPoints: this.Outbound_data
              }
            ]
          }
          // Update the ChannelWiseGraph
          const totalAnswered = this.Inbound_Outbound_Report.channelReportData.answered;
          const totalUnanswered = this.Inbound_Outbound_Report.channelReportData.unAnswered;
          let answeredPercentage: number;
          let unansweredPercentage: number;
          if (totalAnswered === 0 && totalUnanswered === 0) {
            answeredPercentage = 0;
            unansweredPercentage = 0;
          } else {
            answeredPercentage = (totalAnswered / (totalAnswered + totalUnanswered)) * 100;
            unansweredPercentage = (totalUnanswered / (totalAnswered + totalUnanswered)) * 100;
          }
          this.ChannelWiseGraph = {
            animationEnabled: true,
            data: [{
              type: "doughnut",
              yValueFormatString: "#,###.##'%'",
              dataPoints: [
                { y: unansweredPercentage, indexLabel: + '%' },
                { y: answeredPercentage, indexLabel: + '%' },
              ]
            }]
          };
          // Update TagsPerChannel
          const tagReportData = this.Inbound_Outbound_Report.tagReportData;
          const tagDataPoints: any[] = [];
          tagReportData.forEach((platformData: any) => {
            const platformName = platformData.platform;
            const platformCounts: any[] = [];
            platformData.data.forEach((tag: any) => {
              platformCounts.push({
                label: tag.name,
                y: tag.count,
              });
            });
            tagDataPoints.push({
              type: "stackedColumn",
              name: platformName,
              showInLegend: true,
              dataPoints: platformCounts,
            });
          });

          this.TagsPerChannel = {
            animationEnabled: true,
            toolTip: {
              shared: true,
            },
            legend: {
              horizontalAlign: "right",
              verticalAlign: "center",
              reversed: true,
            },
            axisY: {
              includeZero: true,
            },
            data: tagDataPoints,
          };
          // Update senitimentalGraph
          const sentimentReportData = this.Inbound_Outbound_Report.sentimentReportData;
          const sentimentDataPoints: { type: string, showInLegend: boolean, name: string, dataPoints: { label: string, y: number, color: string }[] }[] = [];
          sentimentReportData.forEach((platformData: any) => {
            const platformName = platformData.platform;
            const sentimentCounts: { [key: string]: number } = {};
            platformData.data.forEach((sentiment: any) => {
              sentimentCounts[sentiment.name] = sentiment.count;
            });
            sentimentDataPoints.push({
              type: "column", // Change the chart type to "column"
              showInLegend: true,
              name: platformName,
              dataPoints: [
                { label: "Positive", y: sentimentCounts["Positive"] || 0, color: "green" }, // Light green for Positive
                { label: "Negative", y: sentimentCounts["Negative"] || 0, color: "lightcoral" }, // Light coral for Negative
                { label: "Neutral", y: sentimentCounts["Neutral"] || 0, color: "lightyellow" },   // Light yellow for Neutral
              ],
            });
          });
          this.senitimentalGraph = {
            animationEnabled: true,
            toolTip: {
              shared: true,
              fontColor: "dark", // Set the text color to dark
            },
            data: sentimentDataPoints,
          };
          
          
        }

        // Check for data availability flags
        this.inboundOutboundDataAvailable = (this.Inbound_data.length > 0 && this.Outbound_data.length > 0);
        this.sentimentalDataAvailable = (this.senitimentalGraph && this.senitimentalGraph.data && this.senitimentalGraph.data.length > 0);
        this.averageResponseDataAvailable = (this.ChannelWiseGraph && this.ChannelWiseGraph.data && this.ChannelWiseGraph.data.length > 0);
        this.tagsPerChannelDataAvailable = (this.TagsPerChannel && this.TagsPerChannel.data && this.TagsPerChannel.data.length > 0);
      },
      (error: any) => {
        console.error('HTTP Error:', error);
      }
    );



  }

  reportOptions = [
    { id: '11', label: 'Date' },
    { id: '22', label: 'Days' },
    { id: '23', label: 'Hours' },
    { id: '94', label: 'Months' }
  ];

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
  contentTypes = [
    { id: '11', label: 'Twitter Tweets', value: 'TTR', icon: 'fa-brands fa-twitter sky pe-2', isSelected: false },
    { id: '22', label: 'Twitter DMs', value: 'TDM', icon: 'fa-brands fa-twitter sky pe-2', isSelected: false },
    { id: '23', label: 'Facebook Posts', value: '', icon: 'fa-brands fa-facebook facebook pe-2', isSelected: false },
    { id: '94', label: 'Facebook Comments', value: 'FC', icon: 'fa-brands fa-facebook facebook pe-2', isSelected: false },
    { id: '66', label: 'Instagram Post', value: '', icon: 'fa-brands fa-instagram night pe-2', isSelected: false },
    { id: '65', label: 'Instagram Comments', value: 'IC', icon: 'fa-brands fa-instagram night pe-2', isSelected: false },
    { id: '24', label: 'Youtube Comments', value: 'YC', icon: 'fa-brands fa-youtube youtube pe-2', isSelected: false }
  ];
  typeOptions = [
    { id: '123', label: 'InBound Outbound Report', isSelected: false },
    { id: '12', label: 'InBound Report', isSelected: false },
    { id: '14', label: 'Outbound Report', isSelected: false }
  ];
  tagOptions = [{ id: '', name: '', isSelected: false }];
  sentimentOptions = [{ id: '', name: '', isSelected: false }];
  taggedByOptions = [{ id: '', name: '', isSelected: false }];

  getTags(): void {
    this.commonService.GetTagsList()
      .subscribe((response: any) => {
        this.tagOptions = response;
        console.log(this.tagOptions);
      }, (error: any) => {
        console.error(error);
      });
  }
  getSentiments(): void {
    this.commonService.GetSentimentData()
      .subscribe((response: any) => {
        this.sentimentOptions = response;
        console.log(this.sentimentOptions);
      }, (error: any) => {
        console.error(error);
      });
  }
  getListUser(): void {
    this.commonService.GetUserList()
      .subscribe((response: any) => {
        this.taggedByOptions = response;
        console.log(this.taggedByOptions);
      }, (error: any) => {
        console.error(error);
      });
  }
}
