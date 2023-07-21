import { Component, OnInit } from '@angular/core';

import { ReportService } from '../../services/report.service';
import { ShareddataService } from '../../services/shareddata.service';
import { ChartConfiguration, ChartData, ChartDataset, ChartType, ChartTypeRegistry } from 'chart.js';
interface CustomChartData<TType extends ChartType, TData extends ChartData<TType>> {
  type: TType;
  data: TData;
}
interface CustomChartData1<TType extends ChartType, TData extends ChartData<TType, unknown, string | string[]>> {
  type: TType | 'bar' | 'pie' | 'line' | 'polarArea' | 'radar';

  data: TData;
}

@Component({
  selector: 'app-reportlisting',
  templateUrl: './reportlisting.component.html',
  styleUrls: ['./reportlisting.component.scss']
})
export class ReportlistingComponent implements OnInit {
  reports: any = [];
  // columns=['Name','Query','Created_At']
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
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
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

  selectGraph(i: number, typeeeees: ChartType) {
    debugger
    const arrdata = this.chartDataArray1[i];
    if (arrdata) {
      // const empty:ChartData<typeof typeeeees, number[], string | string[]> = {
      //   labels: [],
      //   datasets: []
      // };
      this.chartDataArray[i].data = {
        labels: [],
        datasets: []
      };
      debugger
      const labels: string[] = (arrdata.data as ChartData<typeof typeeeees, any, any>).datasets.map((dataset: any) => dataset.label);
      const datasets: ChartDataset<typeof typeeeees, number[]>[] = arrdata.data.labels!.map((label: any, index: number) => {
        const data: number[] = arrdata.data.datasets.map((dataset: any) => {
          const value = dataset.data[index] as number | [number, number] | null;
          return typeof value === 'number' || Array.isArray(value) ? (value as number) : 0; // Replace null with 0 or any other appropriate default value
        });
        return { data, label: label };
      });
      // const output1: ChartData<typeof typeeeees, number[], string | string[]> = {
      //   labels: labels,
      //   datasets: datasets
      // };
      this.chartDataArray[i].data = {
        labels: labels,
        datasets: datasets
      };

      console.log("Final", this.chartDataArray);
    }
  }

  drop() {
    this.visualizeData();
  }
  visualizeData(): void {

    const db = localStorage.getItem('dbName');
    const connection = localStorage.getItem('connection_name');
    this.reportService.visualizeDataApi({ 'db': db, 'query': this.query, 'connection_name': connection })
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

    this.ChartData = barChartData;

    this.chartDataArray1.push({ type: 'bar', data: this.ChartData });
    this.chartDataArray.push({ type: 'bar', data: this.ChartData });
    console.log("this.chartDataArray", this.chartDataArray);
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
