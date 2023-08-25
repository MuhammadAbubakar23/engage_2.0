import { Component, OnInit } from '@angular/core';

import { ReportService } from '../../services/report.service';
import { ShareddataService } from '../../services/shareddata.service';
import { ChartConfiguration, ChartData, ChartDataset, ChartType, ChartTypeRegistry, Color } from 'chart.js';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgChartsModule } from 'ng2-charts';

interface CustomChartData1<TType extends ChartType, TData extends ChartData<TType, unknown, string | string[]>> {
  type: TType | 'bar' | 'pie' | 'line' | 'polarArea' | 'radar';

  data: TData;
}

@Component({
  selector: 'app-reportlisting',
  standalone: true,
  imports:[CommonModule,
    FormsModule,
    NgSelectModule,
    NgChartsModule,
    DragDropModule,],
  templateUrl: './reportlisting.component.html',
  styleUrls: ['./reportlisting.component.scss']
})
export class ReportlistingComponent implements OnInit {

  showPanel=false;
  
    reports: any = [];
  columns = ['Report Name']
  targetReport = ""
  db = "";
  query = "";
  connection = "";
  finalGrapData: any;
  graphLabels: string[] = [];
  selectedGraph = "";
  graphTypes: any[] = [{ "Bar Chart": "bar", "Pie Chart": "pie", "Line Chart": "line", "Polar Area Chart": "polarArea", "Radar Chart": "radar" }];
  public chartDataArray: CustomChartData1<keyof ChartTypeRegistry, ChartData<keyof ChartTypeRegistry, unknown, string | string[]>>[] = [];
  public chartDataArray1: CustomChartData1<keyof ChartTypeRegistry, ChartData<keyof ChartTypeRegistry, unknown, string | string[]>>[] = [];
  public ChartData: ChartData<keyof ChartTypeRegistry, unknown, string | string[]> = {
    labels: [],
    datasets: []
  };

  public ChartOptions: ChartConfiguration<keyof ChartTypeRegistry>['options'] = {
    responsive: false,
  };

  public ChartPlugins = [];
  public ChartLegend = true;

  constructor(private reportService: ReportService, private sharedService: ShareddataService) { }

  ngOnInit(): void {

    this.reportService.login().subscribe((token: any) => {
      localStorage.setItem("token", token.access);
      this.reportService.reportslistApi().subscribe((res: any) => {
        this.reports = res;
      });
    })


  }

  selectGraph(i: number, type: ChartType) {
    const arrdata = this.chartDataArray1[i];
    if (arrdata) {
      this.chartDataArray[i].data = {
        labels: [],
        datasets: []
      };
      if (type === 'bar') {
        this.chartDataArray[i].data = this.ChartData
      }
      else {
        const labels: string[] = (arrdata.data as ChartData<typeof type, any, any>).datasets.map((dataset: any) => dataset.label);
        const datasets: ChartDataset<typeof type, number[]>[] = arrdata.data.labels!.map((label: any, index: number) => {
          const data: number[] = arrdata.data.datasets.map((dataset: any) => {
            const value = dataset.data[index] as number | [number, number] | null;
            return typeof value === 'number' || Array.isArray(value) ? (value as number) : 0;
          });
          return { data, label: label };
        });
        this.chartDataArray[i].data = {
          labels: labels,
          datasets: datasets
        };
      }


    }
  }

  drop() {
    this.visualizeData();
  }
  visualizeData(): void {
    this.reportService.visualizeDataApi({ 'db': this.db, 'query': this.query, 'connection_name': this.connection })
      .subscribe((res: any) => {
        this.finalGrapData = res.graph_data;
        const keys: string[] = [];
        Object.values(res.graph_data).forEach((values: any) => {
          values.forEach((item: { [key: string]: unknown }) => {
            keys.push(...Object.keys(item));
          });
        });
        const uniqueKeys: string[] = [...new Set(keys)];
        this.graphLabels = uniqueKeys;
        this.graphFormatData(res.graph_data)
      });
  }
  graphFormatData(data: any) {
    const barChartData: ChartData<keyof ChartTypeRegistry, unknown, string | string[]> = {
      labels: [],
      datasets: []
    };

    const visualKeys = Object.keys(data);
    visualKeys.forEach((item, index) => {
      let values = Object.values(data[item]);
      const l = values.map((obj: any) => Object.keys(obj)[0]);
      barChartData.labels = l;
      const d = values.map((obj: any) => Number(Object.values(obj)[0]));
      barChartData.datasets.push({ data: d, label: item });
    });

    // ,
    // backgroundColor: [
    //   'red',
    //   'green',
    //   'yellow',
    //   'orange',
    //   'gray'
    // ]

    this.ChartData = barChartData;

    this.chartDataArray1.push({ type: 'bar', data: this.ChartData });
    this.chartDataArray.push({ type: 'bar', data: this.ChartData });
  }
  onDragStarted(report: any) {
    this.db = report.dbName;
    this.connection = report.connection_name;
    this.query = report.query;
  }
  removeGraph(i: number) {
    this.chartDataArray = this.chartDataArray.filter((obj, index) => index !== i);
  }

}
