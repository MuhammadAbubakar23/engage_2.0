import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderService } from 'src/app/shared/services/header.service';
import * as echarts from 'echarts';
@Component({
  standalone:true,
  selector: 'app-linkedin-report-scrm',
  templateUrl: './linkedin-report-scrm.component.html',
  styleUrls: ['./linkedin-report-scrm.component.scss'],
  imports:[CommonModule]
})
export class LinkedinReportScrmComponent implements OnInit {

  constructor(
    private _hs:HeaderService
  ) { }

  ngOnInit(): void {
let obj={title:'Linkedin Report',url:'/analytics/linkedin-report-scrm'};
this._hs.setHeader(obj)
this.getEngagementRateGraph()
this.getEngagementTotalGrahp()
this.getFollowersGraph()
this.getImpressionGraph()
this.getUniqueImpressionGraph()
this.getClickThroughRataGraph()
  }
getEngagementRateGraph(){
  var chartDom = document.getElementById('engagementrate');
var myChart = echarts.init(chartDom);
var option;

option = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }
  ]
};

option && myChart.setOption(option);
}
getEngagementTotalGrahp(){
  var chartDom = document.getElementById('engagementtotal');
  var myChart = echarts.init(chartDom);
  var option;
  
  option = {
    legend: {
      data: 'Enagagement Rate'
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
      }
    ]
  };
  
  option && myChart.setOption(option);
}
getFollowersGraph(){
  var chartDom = document.getElementById('followerschart');
  var myChart = echarts.init(chartDom);
  var option;
  
  option = {
    legend: {
      data: ' Total  Enagagements'
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
      }
    ]
  };
  
  option && myChart.setOption(option);
}
getClickThroughRataGraph(){
  var chartDom = document.getElementById('clickthroughrate');
  var myChart = echarts.init(chartDom);
  var option;
  
  option = {
    xAxis: {
      legend: {
        data: 'Total Followers'
      },
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
      }
    ]
  };
  
  option && myChart.setOption(option);
}
getImpressionGraph(){
  var chartDom = document.getElementById('Impressions');
  var myChart = echarts.init(chartDom);
  var option;
  
  option = {
    legend: {
      data: 'Link Click'
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
      }
    ]
  };
  
  option && myChart.setOption(option);
}
getUniqueImpressionGraph(){
  var chartDom = document.getElementById('UniqueImpression');
  var myChart = echarts.init(chartDom);
  var option;
  
  option = {
    legend: {
      data: 'Page Imressions & Reach'
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
      }
    ]
  };
  
  option && myChart.setOption(option);
}
}
