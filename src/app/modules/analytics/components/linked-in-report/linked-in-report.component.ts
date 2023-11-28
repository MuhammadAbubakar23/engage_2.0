import { CommonModule, DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as echarts from 'echarts';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { HeaderService } from 'src/app/services/HeaderService/header.service';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { ExcelService } from '../../services/excel.service';

@Component({
  selector: 'app-linked-in-report',
  templateUrl: './linked-in-report.component.html',
  styleUrls: ['./linked-in-report.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, NgxSpinnerModule],
})
export class LinkedInReportComponent implements OnInit {
  fromDate: string = '';
  toDate: string = '';
  maxEndDate: any;
  downloading = false;
  toastermessage = false;
  AlterMsg: any = '';
  allDates: any[] = [];
  ImpressionsGraphData: any[] = [];
  UniqueImpressionsGraphData: any[] = [];
  EngagementGraphData: any[] = [];
  EngagementRateGraphData: any[] = [];
  ClickThroughRateGraphData: any[] = [];
  topFiveUpdates: any[] = [];
  impressionGraph: any;
  uniqueImpressionsGraph: any;
  engagementGraph: any;
  engagementRateGraph: any;
  clickThroughRateGraph: any;
  LinkedInReport:any
  // LinkedInReport = {
  //   likes_TotalCount: 4,
  //   comments_TotalCount: 82,
  //   shares_TotalCount: 0,
  //   engagement_TotalCount: 6,
  //   impressions_TotalCount: 924,
  //   uniqueImpressions_TotalCount: 223,
  //   engangement_Rate_TotalPercent: 0,
  //   click_TotalTCount: 10,
  //   shared_Social_Activity: [
  //     {
  //       from: '2023-09-10T00:00:00Z',
  //       to: '2023-09-11T00:00:00Z',
  //       engagement: 0,
  //       engagement_Rate: 0,
  //       impressions: 5,
  //       uniqueImpressions: 1,
  //       clicks: 0,
  //     },
  //     {
  //       from: '2023-09-11T00:00:00Z',
  //       to: '2023-09-12T00:00:00Z',
  //       engagement: 0,
  //       engagement_Rate: 0,
  //       impressions: 27,
  //       uniqueImpressions: 2,
  //       clicks: 0,
  //     },
  //     {
  //       from: '2023-09-12T00:00:00Z',
  //       to: '2023-09-13T00:00:00Z',
  //       engagement: 0,
  //       engagement_Rate: 0,
  //       impressions: 2,
  //       uniqueImpressions: 2,
  //       clicks: 0,
  //     },
  //     {
  //       from: '2023-09-13T00:00:00Z',
  //       to: '2023-09-14T00:00:00Z',
  //       engagement: 0,
  //       engagement_Rate: 0,
  //       impressions: 1,
  //       uniqueImpressions: 1,
  //       clicks: 0,
  //     },
  //     {
  //       from: '2023-09-14T00:00:00Z',
  //       to: '2023-09-15T00:00:00Z',
  //       engagement: 2,
  //       engagement_Rate: 100,
  //       impressions: 2,
  //       uniqueImpressions: 1,
  //       clicks: 0,
  //     },
  //     {
  //       from: '2023-09-15T00:00:00Z',
  //       to: '2023-09-16T00:00:00Z',
  //       engagement: 0,
  //       engagement_Rate: 0,
  //       impressions: 17,
  //       uniqueImpressions: 1,
  //       clicks: 0,
  //     },
  //     {
  //       from: '2023-09-16T00:00:00Z',
  //       to: '2023-09-17T00:00:00Z',
  //       engagement: 0,
  //       engagement_Rate: 0,
  //       impressions: 0,
  //       uniqueImpressions: 0,
  //       clicks: 0,
  //     },
  //     {
  //       from: '2023-09-17T00:00:00Z',
  //       to: '2023-09-18T00:00:00Z',
  //       engagement: 0,
  //       engagement_Rate: 0,
  //       impressions: 0,
  //       uniqueImpressions: 0,
  //       clicks: 0,
  //     },
  //     {
  //       from: '2023-09-18T00:00:00Z',
  //       to: '2023-09-19T00:00:00Z',
  //       engagement: 0,
  //       engagement_Rate: 0,
  //       impressions: 58,
  //       uniqueImpressions: 2,
  //       clicks: 0,
  //     },
  //     {
  //       from: '2023-09-19T00:00:00Z',
  //       to: '2023-09-20T00:00:00Z',
  //       engagement: 0,
  //       engagement_Rate: 0,
  //       impressions: 274,
  //       uniqueImpressions: 48,
  //       clicks: 1,
  //     },
  //     {
  //       from: '2023-09-20T00:00:00Z',
  //       to: '2023-09-21T00:00:00Z',
  //       engagement: 0,
  //       engagement_Rate: 0,
  //       impressions: 33,
  //       uniqueImpressions: 14,
  //       clicks: 0,
  //     },
  //     {
  //       from: '2023-09-21T00:00:00Z',
  //       to: '2023-09-22T00:00:00Z',
  //       engagement: 1,
  //       engagement_Rate: 0,
  //       impressions: 11,
  //       uniqueImpressions: 9,
  //       clicks: 0,
  //     },
  //     {
  //       from: '2023-09-22T00:00:00Z',
  //       to: '2023-09-23T00:00:00Z',
  //       engagement: 0,
  //       engagement_Rate: 0,
  //       impressions: 12,
  //       uniqueImpressions: 6,
  //       clicks: 0,
  //     },
  //     {
  //       from: '2023-09-23T00:00:00Z',
  //       to: '2023-09-24T00:00:00Z',
  //       engagement: 0,
  //       engagement_Rate: 0,
  //       impressions: 25,
  //       uniqueImpressions: 7,
  //       clicks: 0,
  //     },
  //     {
  //       from: '2023-09-24T00:00:00Z',
  //       to: '2023-09-25T00:00:00Z',
  //       engagement: 0,
  //       engagement_Rate: 0,
  //       impressions: 22,
  //       uniqueImpressions: 7,
  //       clicks: 1,
  //     },
  //     {
  //       from: '2023-09-25T00:00:00Z',
  //       to: '2023-09-26T00:00:00Z',
  //       engagement: 0,
  //       engagement_Rate: 0,
  //       impressions: 2,
  //       uniqueImpressions: 2,
  //       clicks: 0,
  //     },
  //     {
  //       from: '2023-09-26T00:00:00Z',
  //       to: '2023-09-27T00:00:00Z',
  //       engagement: 0,
  //       engagement_Rate: 0,
  //       impressions: 1,
  //       uniqueImpressions: 1,
  //       clicks: 0,
  //     },
  //     {
  //       from: '2023-09-27T00:00:00Z',
  //       to: '2023-09-28T00:00:00Z',
  //       engagement: 0,
  //       engagement_Rate: 0,
  //       impressions: 10,
  //       uniqueImpressions: 3,
  //       clicks: 0,
  //     },
  //     {
  //       from: '2023-09-28T00:00:00Z',
  //       to: '2023-09-29T00:00:00Z',
  //       engagement: 0,
  //       engagement_Rate: 0,
  //       impressions: 132,
  //       uniqueImpressions: 39,
  //       clicks: 6,
  //     },
  //     {
  //       from: '2023-09-29T00:00:00Z',
  //       to: '2023-09-30T00:00:00Z',
  //       engagement: 0,
  //       engagement_Rate: 0,
  //       impressions: 25,
  //       uniqueImpressions: 5,
  //       clicks: 0,
  //     },
  //     {
  //       from: '2023-09-30T00:00:00Z',
  //       to: '2023-10-01T00:00:00Z',
  //       engagement: 0,
  //       engagement_Rate: 0,
  //       impressions: 15,
  //       uniqueImpressions: 6,
  //       clicks: 0,
  //     },
  //     {
  //       from: '2023-10-01T00:00:00Z',
  //       to: '2023-10-02T00:00:00Z',
  //       engagement: 0,
  //       engagement_Rate: 0,
  //       impressions: 14,
  //       uniqueImpressions: 7,
  //       clicks: 0,
  //     },
  //     {
  //       from: '2023-10-02T00:00:00Z',
  //       to: '2023-10-03T00:00:00Z',
  //       engagement: 0,
  //       engagement_Rate: 0,
  //       impressions: 11,
  //       uniqueImpressions: 5,
  //       clicks: 0,
  //     },
  //     {
  //       from: '2023-10-03T00:00:00Z',
  //       to: '2023-10-04T00:00:00Z',
  //       engagement: 0,
  //       engagement_Rate: 0,
  //       impressions: 7,
  //       uniqueImpressions: 2,
  //       clicks: 0,
  //     },
  //     {
  //       from: '2023-10-04T00:00:00Z',
  //       to: '2023-10-05T00:00:00Z',
  //       engagement: 0,
  //       engagement_Rate: 0,
  //       impressions: 16,
  //       uniqueImpressions: 1,
  //       clicks: 0,
  //     },
  //     {
  //       from: '2023-10-05T00:00:00Z',
  //       to: '2023-10-06T00:00:00Z',
  //       engagement: 0,
  //       engagement_Rate: 0,
  //       impressions: 11,
  //       uniqueImpressions: 5,
  //       clicks: 0,
  //     },
  //     {
  //       from: '2023-10-06T00:00:00Z',
  //       to: '2023-10-07T00:00:00Z',
  //       engagement: 0,
  //       engagement_Rate: 0,
  //       impressions: 6,
  //       uniqueImpressions: 2,
  //       clicks: 0,
  //     },
  //     {
  //       from: '2023-10-07T00:00:00Z',
  //       to: '2023-10-08T00:00:00Z',
  //       engagement: 0,
  //       engagement_Rate: 0,
  //       impressions: 8,
  //       uniqueImpressions: 4,
  //       clicks: 0,
  //     },
  //     {
  //       from: '2023-10-08T00:00:00Z',
  //       to: '2023-10-09T00:00:00Z',
  //       engagement: 0,
  //       engagement_Rate: 0,
  //       impressions: 4,
  //       uniqueImpressions: 3,
  //       clicks: 0,
  //     },
  //     {
  //       from: '2023-10-09T00:00:00Z',
  //       to: '2023-10-10T00:00:00Z',
  //       engagement: 0,
  //       engagement_Rate: 0,
  //       impressions: 31,
  //       uniqueImpressions: 3,
  //       clicks: 0,
  //     },
  //     {
  //       from: '2023-10-10T00:00:00Z',
  //       to: '2023-10-11T00:00:00Z',
  //       engagement: 0,
  //       engagement_Rate: 0,
  //       impressions: 1,
  //       uniqueImpressions: 1,
  //       clicks: 0,
  //     },
  //     {
  //       from: '2023-10-11T00:00:00Z',
  //       to: '2023-10-12T00:00:00Z',
  //       engagement: 0,
  //       engagement_Rate: 0,
  //       impressions: 6,
  //       uniqueImpressions: 2,
  //       clicks: 0,
  //     },
  //     {
  //       from: '2023-10-12T00:00:00Z',
  //       to: '2023-10-13T00:00:00Z',
  //       engagement: 0,
  //       engagement_Rate: 0,
  //       impressions: 2,
  //       uniqueImpressions: 2,
  //       clicks: 0,
  //     },
  //     {
  //       from: '2023-10-13T00:00:00Z',
  //       to: '2023-10-14T00:00:00Z',
  //       engagement: 0,
  //       engagement_Rate: 0,
  //       impressions: 24,
  //       uniqueImpressions: 2,
  //       clicks: 0,
  //     },
  //     {
  //       from: '2023-10-14T00:00:00Z',
  //       to: '2023-10-15T00:00:00Z',
  //       engagement: 0,
  //       engagement_Rate: 0,
  //       impressions: 0,
  //       uniqueImpressions: 0,
  //       clicks: 0,
  //     },
  //     {
  //       from: '2023-10-15T00:00:00Z',
  //       to: '2023-10-16T00:00:00Z',
  //       engagement: 0,
  //       engagement_Rate: 0,
  //       impressions: 6,
  //       uniqueImpressions: 1,
  //       clicks: 0,
  //     },
  //     {
  //       from: '2023-10-16T00:00:00Z',
  //       to: '2023-10-17T00:00:00Z',
  //       engagement: 0,
  //       engagement_Rate: 0,
  //       impressions: 0,
  //       uniqueImpressions: 0,
  //       clicks: 0,
  //     },
  //     {
  //       from: '2023-10-17T00:00:00Z',
  //       to: '2023-10-18T00:00:00Z',
  //       engagement: 0,
  //       engagement_Rate: 0,
  //       impressions: 0,
  //       uniqueImpressions: 0,
  //       clicks: 0,
  //     },
  //     {
  //       from: '2023-10-18T00:00:00Z',
  //       to: '2023-10-19T00:00:00Z',
  //       engagement: 0,
  //       engagement_Rate: 0,
  //       impressions: 5,
  //       uniqueImpressions: 1,
  //       clicks: 0,
  //     },
  //     {
  //       from: '2023-10-19T00:00:00Z',
  //       to: '2023-10-20T00:00:00Z',
  //       engagement: 0,
  //       engagement_Rate: 0,
  //       impressions: 0,
  //       uniqueImpressions: 0,
  //       clicks: 0,
  //     },
  //     {
  //       from: '2023-10-20T00:00:00Z',
  //       to: '2023-10-21T00:00:00Z',
  //       engagement: 0,
  //       engagement_Rate: 0,
  //       impressions: 3,
  //       uniqueImpressions: 1,
  //       clicks: 0,
  //     },
  //     {
  //       from: '2023-10-21T00:00:00Z',
  //       to: '2023-10-22T00:00:00Z',
  //       engagement: 0,
  //       engagement_Rate: 0,
  //       impressions: 1,
  //       uniqueImpressions: 1,
  //       clicks: 0,
  //     },
  //     {
  //       from: '2023-10-22T00:00:00Z',
  //       to: '2023-10-23T00:00:00Z',
  //       engagement: 0,
  //       engagement_Rate: 0,
  //       impressions: 9,
  //       uniqueImpressions: 2,
  //       clicks: 0,
  //     },
  //     {
  //       from: '2023-10-23T00:00:00Z',
  //       to: '2023-10-24T00:00:00Z',
  //       engagement: 0,
  //       engagement_Rate: 0,
  //       impressions: 0,
  //       uniqueImpressions: 0,
  //       clicks: 0,
  //     },
  //     {
  //       from: '2023-10-24T00:00:00Z',
  //       to: '2023-10-25T00:00:00Z',
  //       engagement: 0,
  //       engagement_Rate: 0,
  //       impressions: 0,
  //       uniqueImpressions: 0,
  //       clicks: 0,
  //     },
  //     {
  //       from: '2023-10-25T00:00:00Z',
  //       to: '2023-10-26T00:00:00Z',
  //       engagement: 0,
  //       engagement_Rate: 0,
  //       impressions: 0,
  //       uniqueImpressions: 0,
  //       clicks: 0,
  //     },
  //     {
  //       from: '2023-10-26T00:00:00Z',
  //       to: '2023-10-27T00:00:00Z',
  //       engagement: 0,
  //       engagement_Rate: 0,
  //       impressions: 0,
  //       uniqueImpressions: 0,
  //       clicks: 0,
  //     },
  //     {
  //       from: '2023-10-27T00:00:00Z',
  //       to: '2023-10-28T00:00:00Z',
  //       engagement: 0,
  //       engagement_Rate: 0,
  //       impressions: 0,
  //       uniqueImpressions: 0,
  //       clicks: 0,
  //     },
  //     {
  //       from: '2023-10-28T00:00:00Z',
  //       to: '2023-10-29T00:00:00Z',
  //       engagement: 0,
  //       engagement_Rate: 0,
  //       impressions: 0,
  //       uniqueImpressions: 0,
  //       clicks: 0,
  //     },
  //     {
  //       from: '2023-10-29T00:00:00Z',
  //       to: '2023-10-30T00:00:00Z',
  //       engagement: 0,
  //       engagement_Rate: 0,
  //       impressions: 0,
  //       uniqueImpressions: 0,
  //       clicks: 0,
  //     },
  //     {
  //       from: '2023-10-30T00:00:00Z',
  //       to: '2023-10-31T00:00:00Z',
  //       engagement: 0,
  //       engagement_Rate: 0,
  //       impressions: 0,
  //       uniqueImpressions: 0,
  //       clicks: 0,
  //     },
  //     {
  //       from: '2023-10-31T00:00:00Z',
  //       to: '2023-11-01T00:00:00Z',
  //       engagement: 0,
  //       engagement_Rate: 0,
  //       impressions: 0,
  //       uniqueImpressions: 0,
  //       clicks: 0,
  //     },
  //     {
  //       from: '2023-11-01T00:00:00Z',
  //       to: '2023-11-02T00:00:00Z',
  //       engagement: 0,
  //       engagement_Rate: 0,
  //       impressions: 0,
  //       uniqueImpressions: 0,
  //       clicks: 0,
  //     },
  //     {
  //       from: '2023-11-02T00:00:00Z',
  //       to: '2023-11-03T00:00:00Z',
  //       engagement: 0,
  //       engagement_Rate: 0,
  //       impressions: 41,
  //       uniqueImpressions: 5,
  //       clicks: 0,
  //     },
  //     {
  //       from: '2023-11-03T00:00:00Z',
  //       to: '2023-11-04T00:00:00Z',
  //       engagement: 1,
  //       engagement_Rate: 0,
  //       impressions: 3,
  //       uniqueImpressions: 1,
  //       clicks: 0,
  //     },
  //     {
  //       from: '2023-11-04T00:00:00Z',
  //       to: '2023-11-05T00:00:00Z',
  //       engagement: 0,
  //       engagement_Rate: 0,
  //       impressions: 0,
  //       uniqueImpressions: 0,
  //       clicks: 0,
  //     },
  //     {
  //       from: '2023-11-05T00:00:00Z',
  //       to: '2023-11-06T00:00:00Z',
  //       engagement: 0,
  //       engagement_Rate: 0,
  //       impressions: 0,
  //       uniqueImpressions: 0,
  //       clicks: 0,
  //     },
  //     {
  //       from: '2023-11-06T00:00:00Z',
  //       to: '2023-11-07T00:00:00Z',
  //       engagement: 1,
  //       engagement_Rate: 0,
  //       impressions: 4,
  //       uniqueImpressions: 2,
  //       clicks: 2,
  //     },
  //     {
  //       from: '2023-11-07T00:00:00Z',
  //       to: '2023-11-08T00:00:00Z',
  //       engagement: 1,
  //       engagement_Rate: 0,
  //       impressions: 2,
  //       uniqueImpressions: 1,
  //       clicks: 0,
  //     },
  //     {
  //       from: '2023-11-08T00:00:00Z',
  //       to: '2023-11-09T00:00:00Z',
  //       engagement: 0,
  //       engagement_Rate: 0,
  //       impressions: 7,
  //       uniqueImpressions: 5,
  //       clicks: 0,
  //     },
  //     {
  //       from: '2023-11-09T00:00:00Z',
  //       to: '2023-11-10T00:00:00Z',
  //       engagement: 0,
  //       engagement_Rate: 0,
  //       impressions: 1,
  //       uniqueImpressions: 1,
  //       clicks: 0,
  //     },
  //     {
  //       from: '2023-11-10T00:00:00Z',
  //       to: '2023-11-11T00:00:00Z',
  //       engagement: 0,
  //       engagement_Rate: 0,
  //       impressions: 0,
  //       uniqueImpressions: 0,
  //       clicks: 0,
  //     },
  //     {
  //       from: '2023-11-11T00:00:00Z',
  //       to: '2023-11-12T00:00:00Z',
  //       engagement: 0,
  //       engagement_Rate: 0,
  //       impressions: 0,
  //       uniqueImpressions: 0,
  //       clicks: 0,
  //     },
  //     {
  //       from: '2023-11-12T00:00:00Z',
  //       to: '2023-11-13T00:00:00Z',
  //       engagement: 0,
  //       engagement_Rate: 0,
  //       impressions: 2,
  //       uniqueImpressions: 1,
  //       clicks: 0,
  //     },
  //     {
  //       from: '2023-11-13T00:00:00Z',
  //       to: '2023-11-14T00:00:00Z',
  //       engagement: 0,
  //       engagement_Rate: 0,
  //       impressions: 1,
  //       uniqueImpressions: 1,
  //       clicks: 0,
  //     },
  //     {
  //       from: '2023-11-14T00:00:00Z',
  //       to: '2023-11-15T00:00:00Z',
  //       engagement: 0,
  //       engagement_Rate: 0,
  //       impressions: 0,
  //       uniqueImpressions: 0,
  //       clicks: 0,
  //     },
  //     {
  //       from: '2023-11-15T00:00:00Z',
  //       to: '2023-11-16T00:00:00Z',
  //       engagement: 0,
  //       engagement_Rate: 0,
  //       impressions: 2,
  //       uniqueImpressions: 2,
  //       clicks: 0,
  //     },
  //     {
  //       from: '2023-11-16T00:00:00Z',
  //       to: '2023-11-17T00:00:00Z',
  //       engagement: 0,
  //       engagement_Rate: 0,
  //       impressions: 20,
  //       uniqueImpressions: 1,
  //       clicks: 0,
  //     },
  //     {
  //       from: '2023-11-17T00:00:00Z',
  //       to: '2023-11-18T00:00:00Z',
  //       engagement: 0,
  //       engagement_Rate: 0,
  //       impressions: 0,
  //       uniqueImpressions: 0,
  //       clicks: 0,
  //     },
  //     {
  //       from: '2023-11-18T00:00:00Z',
  //       to: '2023-11-19T00:00:00Z',
  //       engagement: 0,
  //       engagement_Rate: 0,
  //       impressions: 2,
  //       uniqueImpressions: 1,
  //       clicks: 0,
  //     },
  //   ],
  //   updates: [
  //     {
  //       name: '',
  //       date: '2023-09-10T00:00:00Z',
  //       impressions: 5,
  //       ctr: 0,
  //       engagementRate: 0,
  //     },
  //     {
  //       name: '',
  //       date: '2023-09-11T00:00:00Z',
  //       impressions: 27,
  //       ctr: 0,
  //       engagementRate: 0,
  //     },
  //     {
  //       name: '',
  //       date: '2023-09-12T00:00:00Z',
  //       impressions: 2,
  //       ctr: 0,
  //       engagementRate: 0,
  //     },
  //     {
  //       name: '',
  //       date: '2023-09-13T00:00:00Z',
  //       impressions: 1,
  //       ctr: 0,
  //       engagementRate: 0,
  //     },
  //     {
  //       name: '',
  //       date: '2023-09-14T00:00:00Z',
  //       impressions: 2,
  //       ctr: 0,
  //       engagementRate: 100,
  //     },
  //     {
  //       name: '',
  //       date: '2023-09-15T00:00:00Z',
  //       impressions: 17,
  //       ctr: 0,
  //       engagementRate: 0,
  //     },
  //     {
  //       name: '',
  //       date: '2023-09-16T00:00:00Z',
  //       impressions: 0,
  //       ctr: 0,
  //       engagementRate: 0,
  //     },
  //     {
  //       name: '',
  //       date: '2023-09-17T00:00:00Z',
  //       impressions: 0,
  //       ctr: 0,
  //       engagementRate: 0,
  //     },
  //     {
  //       name: '',
  //       date: '2023-09-18T00:00:00Z',
  //       impressions: 58,
  //       ctr: 0,
  //       engagementRate: 0,
  //     },
  //     {
  //       name: '',
  //       date: '2023-09-19T00:00:00Z',
  //       impressions: 274,
  //       ctr: 0,
  //       engagementRate: 0,
  //     },
  //     {
  //       name: '',
  //       date: '2023-09-20T00:00:00Z',
  //       impressions: 33,
  //       ctr: 0,
  //       engagementRate: 0,
  //     },
  //     {
  //       name: '',
  //       date: '2023-09-21T00:00:00Z',
  //       impressions: 11,
  //       ctr: 0,
  //       engagementRate: 0,
  //     },
  //     {
  //       name: '',
  //       date: '2023-09-22T00:00:00Z',
  //       impressions: 12,
  //       ctr: 0,
  //       engagementRate: 0,
  //     },
  //     {
  //       name: '',
  //       date: '2023-09-23T00:00:00Z',
  //       impressions: 25,
  //       ctr: 0,
  //       engagementRate: 0,
  //     },
  //     {
  //       name: '',
  //       date: '2023-09-24T00:00:00Z',
  //       impressions: 22,
  //       ctr: 0,
  //       engagementRate: 0,
  //     },
  //     {
  //       name: '',
  //       date: '2023-09-25T00:00:00Z',
  //       impressions: 2,
  //       ctr: 0,
  //       engagementRate: 0,
  //     },
  //     {
  //       name: '',
  //       date: '2023-09-26T00:00:00Z',
  //       impressions: 1,
  //       ctr: 0,
  //       engagementRate: 0,
  //     },
  //     {
  //       name: '',
  //       date: '2023-09-27T00:00:00Z',
  //       impressions: 10,
  //       ctr: 0,
  //       engagementRate: 0,
  //     },
  //     {
  //       name: '',
  //       date: '2023-09-28T00:00:00Z',
  //       impressions: 132,
  //       ctr: 0,
  //       engagementRate: 0,
  //     },
  //     {
  //       name: '',
  //       date: '2023-09-29T00:00:00Z',
  //       impressions: 25,
  //       ctr: 0,
  //       engagementRate: 0,
  //     },
  //     {
  //       name: '',
  //       date: '2023-09-30T00:00:00Z',
  //       impressions: 15,
  //       ctr: 0,
  //       engagementRate: 0,
  //     },
  //     {
  //       name: '',
  //       date: '2023-10-01T00:00:00Z',
  //       impressions: 14,
  //       ctr: 0,
  //       engagementRate: 0,
  //     },
  //     {
  //       name: '',
  //       date: '2023-10-02T00:00:00Z',
  //       impressions: 11,
  //       ctr: 0,
  //       engagementRate: 0,
  //     },
  //     {
  //       name: '',
  //       date: '2023-10-03T00:00:00Z',
  //       impressions: 7,
  //       ctr: 0,
  //       engagementRate: 0,
  //     },
  //     {
  //       name: '',
  //       date: '2023-10-04T00:00:00Z',
  //       impressions: 16,
  //       ctr: 0,
  //       engagementRate: 0,
  //     },
  //     {
  //       name: '',
  //       date: '2023-10-05T00:00:00Z',
  //       impressions: 11,
  //       ctr: 0,
  //       engagementRate: 0,
  //     },
  //     {
  //       name: '',
  //       date: '2023-10-06T00:00:00Z',
  //       impressions: 6,
  //       ctr: 0,
  //       engagementRate: 0,
  //     },
  //     {
  //       name: '',
  //       date: '2023-10-07T00:00:00Z',
  //       impressions: 8,
  //       ctr: 0,
  //       engagementRate: 0,
  //     },
  //     {
  //       name: '',
  //       date: '2023-10-08T00:00:00Z',
  //       impressions: 4,
  //       ctr: 0,
  //       engagementRate: 0,
  //     },
  //     {
  //       name: '',
  //       date: '2023-10-09T00:00:00Z',
  //       impressions: 31,
  //       ctr: 0,
  //       engagementRate: 0,
  //     },
  //     {
  //       name: '',
  //       date: '2023-10-10T00:00:00Z',
  //       impressions: 1,
  //       ctr: 0,
  //       engagementRate: 0,
  //     },
  //     {
  //       name: '',
  //       date: '2023-10-11T00:00:00Z',
  //       impressions: 6,
  //       ctr: 0,
  //       engagementRate: 0,
  //     },
  //     {
  //       name: '',
  //       date: '2023-10-12T00:00:00Z',
  //       impressions: 2,
  //       ctr: 0,
  //       engagementRate: 0,
  //     },
  //     {
  //       name: '',
  //       date: '2023-10-13T00:00:00Z',
  //       impressions: 24,
  //       ctr: 0,
  //       engagementRate: 0,
  //     },
  //     {
  //       name: '',
  //       date: '2023-10-14T00:00:00Z',
  //       impressions: 0,
  //       ctr: 0,
  //       engagementRate: 0,
  //     },
  //     {
  //       name: '',
  //       date: '2023-10-15T00:00:00Z',
  //       impressions: 6,
  //       ctr: 0,
  //       engagementRate: 0,
  //     },
  //     {
  //       name: '',
  //       date: '2023-10-16T00:00:00Z',
  //       impressions: 0,
  //       ctr: 0,
  //       engagementRate: 0,
  //     },
  //     {
  //       name: '',
  //       date: '2023-10-17T00:00:00Z',
  //       impressions: 0,
  //       ctr: 0,
  //       engagementRate: 0,
  //     },
  //     {
  //       name: '',
  //       date: '2023-10-18T00:00:00Z',
  //       impressions: 5,
  //       ctr: 0,
  //       engagementRate: 0,
  //     },
  //     {
  //       name: '',
  //       date: '2023-10-19T00:00:00Z',
  //       impressions: 0,
  //       ctr: 0,
  //       engagementRate: 0,
  //     },
  //     {
  //       name: '',
  //       date: '2023-10-20T00:00:00Z',
  //       impressions: 3,
  //       ctr: 0,
  //       engagementRate: 0,
  //     },
  //     {
  //       name: '',
  //       date: '2023-10-21T00:00:00Z',
  //       impressions: 1,
  //       ctr: 0,
  //       engagementRate: 0,
  //     },
  //     {
  //       name: '',
  //       date: '2023-10-22T00:00:00Z',
  //       impressions: 9,
  //       ctr: 0,
  //       engagementRate: 0,
  //     },
  //     {
  //       name: '',
  //       date: '2023-10-23T00:00:00Z',
  //       impressions: 0,
  //       ctr: 0,
  //       engagementRate: 0,
  //     },
  //     {
  //       name: '',
  //       date: '2023-10-24T00:00:00Z',
  //       impressions: 0,
  //       ctr: 0,
  //       engagementRate: 0,
  //     },
  //     {
  //       name: '',
  //       date: '2023-10-25T00:00:00Z',
  //       impressions: 0,
  //       ctr: 0,
  //       engagementRate: 0,
  //     },
  //     {
  //       name: '',
  //       date: '2023-10-26T00:00:00Z',
  //       impressions: 0,
  //       ctr: 0,
  //       engagementRate: 0,
  //     },
  //     {
  //       name: '',
  //       date: '2023-10-27T00:00:00Z',
  //       impressions: 0,
  //       ctr: 0,
  //       engagementRate: 0,
  //     },
  //     {
  //       name: '',
  //       date: '2023-10-28T00:00:00Z',
  //       impressions: 0,
  //       ctr: 0,
  //       engagementRate: 0,
  //     },
  //     {
  //       name: '',
  //       date: '2023-10-29T00:00:00Z',
  //       impressions: 0,
  //       ctr: 0,
  //       engagementRate: 0,
  //     },
  //     {
  //       name: '',
  //       date: '2023-10-30T00:00:00Z',
  //       impressions: 0,
  //       ctr: 0,
  //       engagementRate: 0,
  //     },
  //     {
  //       name: '',
  //       date: '2023-10-31T00:00:00Z',
  //       impressions: 0,
  //       ctr: 0,
  //       engagementRate: 0,
  //     },
  //     {
  //       name: '',
  //       date: '2023-11-01T00:00:00Z',
  //       impressions: 0,
  //       ctr: 0,
  //       engagementRate: 0,
  //     },
  //     {
  //       name: '',
  //       date: '2023-11-02T00:00:00Z',
  //       impressions: 41,
  //       ctr: 0,
  //       engagementRate: 0,
  //     },
  //     {
  //       name: '',
  //       date: '2023-11-03T00:00:00Z',
  //       impressions: 3,
  //       ctr: 0,
  //       engagementRate: 0,
  //     },
  //     {
  //       name: '',
  //       date: '2023-11-04T00:00:00Z',
  //       impressions: 0,
  //       ctr: 0,
  //       engagementRate: 0,
  //     },
  //     {
  //       name: '',
  //       date: '2023-11-05T00:00:00Z',
  //       impressions: 0,
  //       ctr: 0,
  //       engagementRate: 0,
  //     },
  //     {
  //       name: '',
  //       date: '2023-11-06T00:00:00Z',
  //       impressions: 4,
  //       ctr: 0,
  //       engagementRate: 0,
  //     },
  //     {
  //       name: '',
  //       date: '2023-11-07T00:00:00Z',
  //       impressions: 2,
  //       ctr: 0,
  //       engagementRate: 0,
  //     },
  //     {
  //       name: '',
  //       date: '2023-11-08T00:00:00Z',
  //       impressions: 7,
  //       ctr: 0,
  //       engagementRate: 0,
  //     },
  //     {
  //       name: '',
  //       date: '2023-11-09T00:00:00Z',
  //       impressions: 1,
  //       ctr: 0,
  //       engagementRate: 0,
  //     },
  //     {
  //       name: '',
  //       date: '2023-11-10T00:00:00Z',
  //       impressions: 0,
  //       ctr: 0,
  //       engagementRate: 0,
  //     },
  //     {
  //       name: '',
  //       date: '2023-11-11T00:00:00Z',
  //       impressions: 0,
  //       ctr: 0,
  //       engagementRate: 0,
  //     },
  //     {
  //       name: '',
  //       date: '2023-11-12T00:00:00Z',
  //       impressions: 2,
  //       ctr: 0,
  //       engagementRate: 0,
  //     },
  //     {
  //       name: '',
  //       date: '2023-11-13T00:00:00Z',
  //       impressions: 1,
  //       ctr: 0,
  //       engagementRate: 0,
  //     },
  //     {
  //       name: '',
  //       date: '2023-11-14T00:00:00Z',
  //       impressions: 0,
  //       ctr: 0,
  //       engagementRate: 0,
  //     },
  //     {
  //       name: '',
  //       date: '2023-11-15T00:00:00Z',
  //       impressions: 2,
  //       ctr: 0,
  //       engagementRate: 0,
  //     },
  //     {
  //       name: '',
  //       date: '2023-11-16T00:00:00Z',
  //       impressions: 20,
  //       ctr: 0,
  //       engagementRate: 0,
  //     },
  //     {
  //       name: '',
  //       date: '2023-11-17T00:00:00Z',
  //       impressions: 0,
  //       ctr: 0,
  //       engagementRate: 0,
  //     },
  //     {
  //       name: '',
  //       date: '2023-11-18T00:00:00Z',
  //       impressions: 2,
  //       ctr: 0,
  //       engagementRate: 0,
  //     },
  //   ],
  // };

  constructor(
    private _hS: HeaderService,
    private commonDataService: CommonDataService,
    private excelServices: ExcelService,
    private datePipe: DatePipe,
    private SpinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    // const newObj = { title: 'LinkedIn Report', url: '/analytics/linkedin-report' };
    // this._hS.setHeader(newObj);

    // const currentDate = new Date();
    // this.maxEndDate = currentDate.toISOString().split('T')[0];

    this.getLinkedInReportData();
    this.makeChartResponsive();
  }
  date_pagination(days: number) {
    let currentDate = new Date();
    let prevDate = currentDate.setDate(currentDate.getDate() - days);
    this.fromDate = this.datePipe.transform(prevDate, 'YYYY-MM-dd') || '';
    this.toDate = this.datePipe.transform(new Date(), 'YYYY-MM-dd') || '';
  }
  closeToaster() {
    this.toastermessage = false;
  }
  resetEndDate() {
    this.toDate = '';
  }
  export() {
    this.excelServices.exportAsExcelFile(this.topFiveUpdates, 'LinkedIn-Top-Five-Updates')
  }

  getLinkedInReportData() {
    this.allDates = [];
    this.ImpressionsGraphData = [];
    this.UniqueImpressionsGraphData = [];
    this.EngagementGraphData = [];
    this.EngagementRateGraphData = [];
    this.ClickThroughRateGraphData = [];
    var obj = {
      pageId: '76213578',
      from: '2023-09-10T13:30:32.175Z',
      to: '2023-11-21T13:30:32.175Z',
      lastPostId: 0,
    };
    this.commonDataService.GetLinkedInReportData(obj).subscribe((res:any)=>{
      debugger
      this.LinkedInReport = res;
    this.topFiveUpdates = this.LinkedInReport.updates;
    this.LinkedInReport.shared_Social_Activity.forEach((data: any) => {
      if (!this.allDates.includes(data.from)) {
        this.allDates.push(this.datePipe.transform(data.from, 'dd MMM'));
      }

      this.ImpressionsGraphData.push(data.impressions);
      this.UniqueImpressionsGraphData.push(data.uniqueImpressions);
      this.EngagementGraphData.push(data.engagement);
      this.EngagementRateGraphData.push(data.engagement_Rate);
      this.ClickThroughRateGraphData.push(data.clicks);
    });

    this.populateImpressionsGraph();
    this.populateUniqueImpressionsGraph();
    this.populateEngagementGraph();
    this.populateEngagementRateGraph();
    this.populateClickThroughRateGraph();
    },
    (errr:any)=>{
      debugger
      console.log("Policy error====>",errr)
    });
  }

  populateImpressionsGraph() {
    type EChartsOption = echarts.EChartsOption;

    const dom = document.getElementById('ImpressionsGraph');
    this.impressionGraph = echarts.init(dom, null, {
      renderer: 'canvas',
      useDirtyRect: false,
    });
    var option: EChartsOption;

    option = {
      color: ['#5a3692'],
      title: {
        text: '',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['Page Impressions & Reach'],
        icon: 'circle',
        bottom: 0,
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '15%',
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
      },
      series: [
        {
          name: 'Page Impressions & Reach',
          type: 'line',
          data: this.ImpressionsGraphData,
        },
      ],
    };

    option && this.impressionGraph.setOption(option);
  }
  populateUniqueImpressionsGraph() {
    type EChartsOption = echarts.EChartsOption;

    const dom = document.getElementById('UniqueImpressionsGraph');
    this.uniqueImpressionsGraph = echarts.init(dom, null, {
      renderer: 'canvas',
      useDirtyRect: false,
    });
    var option: EChartsOption;

    option = {
      color: ['#f51160'],
      title: {
        text: '',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['Reach (Unique Impressions)'],
        icon: 'circle',
        bottom: 0,
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '15%',
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
      },
      series: [
        {
          name: 'Reach (Unique Impressions)',
          type: 'line',
          data: this.UniqueImpressionsGraphData,
        },
      ],
    };

    option && this.uniqueImpressionsGraph.setOption(option);
  }
  populateEngagementGraph() {
    type EChartsOption = echarts.EChartsOption;

    const dom = document.getElementById('EngagementGraph');
    this.engagementGraph = echarts.init(dom, null, {
      renderer: 'canvas',
      useDirtyRect: false,
    });
    var option: EChartsOption;

    option = {
      color: ['#f51160'],
      title: {
        text: '',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['Total Engagements'],
        icon: 'circle',
        bottom: 0,
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '15%',
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
      },
      series: [
        {
          name: 'Total Engagements',
          type: 'line',
          data: this.EngagementGraphData,
        },
      ],
    };

    option && this.engagementGraph.setOption(option);
  }
  populateEngagementRateGraph() {
    type EChartsOption = echarts.EChartsOption;

    const dom = document.getElementById('EngagementRateGraph');
    this.engagementRateGraph = echarts.init(dom, null, {
      renderer: 'canvas',
      useDirtyRect: false,
    });
    var option: EChartsOption;

    option = {
      color: ['#5a3692'],
      title: {
        text: '',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['Engagement Rate'],
        icon: 'circle',
        bottom: 0,
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '15%',
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
      },
      series: [
        {
          name: 'Engagement Rate',
          type: 'line',
          data: this.EngagementRateGraphData,
        },
      ],
    };

    option && this.engagementRateGraph.setOption(option);
  }
  populateClickThroughRateGraph() {
    type EChartsOption = echarts.EChartsOption;

    const dom = document.getElementById('ClickThroughRateGraph');
    this.clickThroughRateGraph = echarts.init(dom, null, {
      renderer: 'canvas',
      useDirtyRect: false,
    });
    var option: EChartsOption;

    option = {
      color: ['#2a75ed'],
      title: {
        text: '',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['Link Clicks'],
        icon: 'circle',
        bottom: 0,
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '15%',
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
      },
      series: [
        {
          name: 'Link Clicks',
          type: 'line',
          data: this.ClickThroughRateGraphData,
        },
      ],
    };

    option && this.clickThroughRateGraph.setOption(option);
  }

  makeChartResponsive() {
    window.addEventListener('resize', () => {
      if (this.impressionGraph) {
        this.impressionGraph.resize();
      }
      if (this.uniqueImpressionsGraph) {
        this.uniqueImpressionsGraph.resize();
      }
      if (this.engagementGraph) {
        this.engagementGraph.resize();
      }
      if (this.engagementRateGraph) {
        this.engagementRateGraph.resize();
      }
      if (this.clickThroughRateGraph) {
        this.clickThroughRateGraph.resize();
      }
    });
  }
}
