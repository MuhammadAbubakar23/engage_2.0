import { Component, OnInit, ViewChild } from '@angular/core';
import { ShareddataService } from '../../services/shareddata.service';
import { ReportService } from '../../services/report.service';
import { ChartConfiguration, ChartData, ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { ExcelService } from '../../services/excel.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-report-builder',
  templateUrl: './report-builder.component.html',
  styleUrls: ['./report-builder.component.scss']
})
export class ReportBuilderComponent implements OnInit {
  databases: string[] = [];
  dbsettings: any[] = [];
  DBC: any = "Please select connection"
  tables: string[] = [];
  dbName: any = "All DataBases";
  tableName: any = "All Tables";
  tableData: any = [];
  dataKeys: { [key: string]: any } = {};
  columns = {}
  filterConditions: string[] = []
  isFilter: boolean = false;
  selectedFilter = "Select Filter";
  selectedFilterColumn = "";
  filterNumber = 0
  isNumber: boolean = false;
  statsdataKeys: any = [];
  isStats = false;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  public barChartLegend = true;
  public barChartPlugins = [];
  xaxis: any[] = [];
  labels: any[] = [];
  values: any[] = [];
  collective: any[] = [];

  isGraph: boolean = false;
  Labels = []
  graphLabels: any = []

  selectedGraph = "";
  selectedLabels: any[] = [];
  selectedColumns: any[] = [];
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };

  isVisual = false;
  isTabular = false;
  isPie = false;
  isBar = true;
  isLine = false;
  isPolar = false;
  isRadar = false;
  isScatter = false;
  public pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: false,
  };
  public lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: false,
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: []
  };
  public pieChartType: ChartType = 'pie';
  public lineChartData: ChartData<'line', number[], string | string[]> = {
    datasets: [],
    labels: []
  };
  public polarAreaChartData: ChartData<'polarArea'> = {
    labels: [],
    datasets: []
  };
  public radarChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };
  public radarChartData: ChartData<'radar'> = {
    labels: [],
    datasets: []
  };
  public scatterChartData: ChartData<'scatter'> = {
    labels: [],
    datasets: []
  };
  public scatterChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };
  toastermessage: string = "";
  isToaster: boolean = false;
  query: any;
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: []
  };
  finalGraphresponse = [];
  finalGrapData: any = {};
  finalTableData: any[] = [];
  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.tableData, 'sample');
  }
  constructor(private sharedataservice: ShareddataService, private reportservice: ReportService, private excelService: ExcelService) { }
  ngOnInit(): void {

    this.reportservice.login().subscribe((token: any) => {
      localStorage.setItem("token", token.access);
      this.reportservice.listDbSetiingApi().subscribe((res: any) => {
        this.dbsettings = res;
      })
    })

    this.sharedataservice.query$.subscribe((res: any) => {
      this.query = res;
    })

    this.sharedataservice.charttype$.subscribe((res: any) => {
      this.selectedGraph = res;
      this.selectGraph();
    })

    this.sharedataservice.data$.subscribe((newData: any) => {
      this.isGraph = true;

      this.sharedataservice.updateQuery(newData.query);
      this.visualizeData();
      if (newData.isStats == false) {
        this.isStats = false;
        this.tableData = this.transformDataObject(newData.table);
        this.finalTableData = this.tableData
        if (this.selectedColumns.length !== 0) {
          this.tableData = this.filterTableByColumns(this.tableData, this.selectedColumns);
        }

        this.dataKeys = newData.columnswithdtypes;
      }
      else {
        this.isStats = true;
        this.statsdataKeys = Object.keys(newData.table);
        this.tableData = this.transformDataObject(newData.table);

        if (this.tableData.length === 0) {
          this.toastermessage = 'No Data Found!';
          this.isToaster = true;
          setTimeout(() => {
            this.isToaster = false;
          }, 4000);
        }
      }
    });
    this.sharedataservice.visual$.subscribe((res) => {

      if (res !== "Initial Data") {


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

      }


    });
    this.sharedataservice.getrRfreshEvent().subscribe(data => {
      this.refreshData();
    })
  }

  graphFormatData(data: any) {
    debugger
    const barChartData: ChartConfiguration<'bar'>['data'] = {
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

    this.barChartData = barChartData;


    return this.barChartData

  }

  selectDataBase(): void {
    this.reportservice.selectDatabaseApi({ 'dbName': this.dbName, 'connection_name': this.DBC }).subscribe((res) => {
      this.tables = res.tablesList;
      this.sharedataservice.updateTables(this.tables);
      this.dbName = res.db;
      localStorage.setItem('dbName', this.dbName);
    })
  }
  selectConnection(): void {
    this.dataKeys = [];
    this.statsdataKeys = [];
    this.tableData = [];
    this.databases = [];
    this.tables = [];
    this.dbName = "All DataBases";
    this.tableName = "All Tables";
    localStorage.setItem('connection_name', this.DBC);
    this.reportservice.getConnectiondatabases(this.DBC).subscribe((res) => {
      this.toastermessage = 'Connection SuccessFull!';
      this.isToaster = true;
      setTimeout(() => {
        this.isToaster = false;
      }, 4000);
      this.databases = res;
    }, (error: any) => {
      console.log(error);
      let errorMessage = error

      this.toastermessage = `${errorMessage}`;
      this.isToaster = true;
      setTimeout(() => {
        this.isToaster = false;
      }, 4000);
    }
    )
  }

  transformDataObject(dataObject: any): any[] {
    const rows: any[] = [];
    const keys = Object.keys(dataObject);
    const maxLength = Math.max(...keys.map(key => dataObject[key].length));

    for (let i = 0; i < maxLength; i++) {
      const row: any = {};

      for (const key of keys) {
        row[key] = i < dataObject[key].length ? dataObject[key][i] : null;
      }

      rows.push(row);
    }

    return rows;
  }

  selectTable(): void {

    console.log("selectTable", this.tableName, this.DBC, this.dbName);
    localStorage.setItem('selectedtable', this.tableName);
    if (this.dbName !== "All DataBases" && this.tableName !== "All Tables" && this.DBC !== "Please select connection") {
      this.reportservice.selectTableApi({ 'db': this.dbName, 'tableName': this.tableName, 'connection_name': this.DBC }).subscribe((res) => {

        this.isGraph = true;
        this.isStats = false;
        this.tableData = this.transformDataObject(res.table);
        this.finalTableData = this.tableData;

        if (this.tableData.length === 0) {
          this.toastermessage = 'No Data Available';
          this.isToaster = true;
          setTimeout(() => {
            this.isToaster = false;
          }, 4000);
        }
        this.dataKeys = res.columnswithdtypes;
        this.isTabular = true;
        this.isVisual = false;

        this.sharedataservice.updateQuery(res.query);
        localStorage.setItem('query', res.query);

      })
    }

  }

  handleFilters(columntype: any, columnname: any): void {
    this.selectedFilterColumn = columnname;
    if (columntype === 'i' || columntype === 'f') {
      this.isFilter = true;
      this.isNumber = true;
      this.filterConditions = ["Is", "Is not", "Greater than", "Less than", "Greater than or Equel to", "Less than or Equel to"];
      this.resetfilters();

    } else if (columntype === 'dt') {
      this.isFilter = true;
      this.isNumber = false;
      this.filterConditions = ["Today", "Yesterday", "Last Week", "Last 7 Days", "Last 30 Days", "Last 3 Months", "Last 12 Months"];
      this.resetfilters();
    } else {
      this.filterConditions = [];
      this.isFilter = false;
    }

  }
  resetfilters(): void {
    this.selectedFilter = "Select Filter"
  }
  addFilter(): void {
    const connection = localStorage.getItem("connection_name");
    this.reportservice.filtersDataApi({
      'column': this.selectedFilterColumn,
      'columnid': this.filterNumber,
      'db': this.dbName,
      'tableName': this.tableName,
      'condition': this.selectedFilter,
      'connection_name': connection
    }).subscribe((res) => {
      this.tableData = this.transformDataObject(res.table);
      this.sharedataservice.updateQuery(res.query);
      this.dataKeys = res.columnswithdtypes;
    })

  }


  visualizeData(): void {
    const db = localStorage.getItem('dbName');
    const connection = localStorage.getItem('connection_name');
    if (db !== null && this.query !== "Please Type Query" && connection !== null) {
      this.isVisual = true;
      this.isTabular = false
      this.reportservice.visualizeDataApi({ 'db': db, 'query': this.query, 'connection_name': connection })
        .subscribe((res: any) => {
          this.finalGraphresponse = res;
          this.sharedataservice.updateVisual(res);
          this.selectGraph();
        });
    }

  }
  tabularData(): void {
    this.isVisual = false;
    this.isTabular = true;
  }
  selectGraph() {
    if (this.selectedGraph === 'Bar Chart') {
      this.isPie = false;
      this.isBar = true;
      this.isLine = false;
      this.isPolar = false;
      this.isRadar = false;
    } else if (this.selectedGraph === 'Pie Chart') {

      this.isBar = false;
      this.isLine = false;
      this.isPolar = false;
      this.isPie = true;
      this.isRadar = false;

      const labels1: string[] = this.barChartData.datasets.map((dataset: any) => dataset.label);
      const datasets1: ChartDataset<"pie", number[]>[] = this.barChartData.labels!.map((label: any, index: number) => {
        const data: number[] = this.barChartData.datasets.map((dataset: any) => {
          const value = dataset.data[index] as number | [number, number] | null;
          return typeof value === 'number' || Array.isArray(value) ? (value as number) : 0; // Replace null with 0 or any other appropriate default value
        });
        return { data, label: label };
      });
      const output1: ChartData<"pie", number[], string | string[]> = {
        labels: labels1,
        datasets: datasets1
      };

      this.pieChartData = output1;
    } else if (this.selectedGraph === 'Line Chart') {
      this.isBar = false;
      this.isPie = false;
      this.isLine = true;
      this.isPolar = false;
      this.isRadar = false;

      const labels2: string[] = this.barChartData.datasets.map((dataset: any) => dataset.label);
      const datasets2: ChartDataset<"line", number[]>[] = this.barChartData.labels!.map((label: any, index: number) => {
        const data: number[] = this.barChartData.datasets.map((dataset: any) => {
          const value = dataset.data[index] as number | [number, number] | null;
          return typeof value === 'number' || Array.isArray(value) ? (value as number) : 0; // Replace null with 0 or any other appropriate default value
        });
        return { data, label: label };
      });
      const output2: ChartData<"line", number[], string | string[]> = {
        labels: labels2,
        datasets: datasets2
      };

      this.lineChartData = output2;
    } else if (this.selectedGraph === 'Polar Area Chart') {
      this.isBar = false;
      this.isPie = false;
      this.isLine = false;
      this.isPolar = true;
      this.isRadar = false;

      const labels3: string[] = this.barChartData.datasets.map((dataset: any) => dataset.label);
      const datasets3: ChartDataset<"polarArea", number[]>[] = this.barChartData.labels!.map((label: any, index: number) => {
        const data: number[] = this.barChartData.datasets.map((dataset: any) => {
          const value = dataset.data[index] as number | [number, number] | null;
          return typeof value === 'number' || Array.isArray(value) ? (value as number) : 0;
        });
        return { data, label: label };
      });
      const output3: ChartData<"polarArea", number[], string | string[]> = {
        labels: labels3,
        datasets: datasets3
      };

      this.polarAreaChartData = output3;
    } else if (this.selectedGraph === 'Radar Chart') {
      this.isBar = false;
      this.isPie = false;
      this.isLine = false;
      this.isPolar = false;
      this.isRadar = true;

      const labels4: string[] = this.barChartData.datasets.map((dataset: any) => dataset.label);
      const datasets4: ChartDataset<"radar", number[]>[] = this.barChartData.labels!.map((label: any, index: number) => {
        const data: number[] = this.barChartData.datasets.map((dataset: any) => {
          const value = dataset.data[index] as number | [number, number] | null;
          return typeof value === 'number' || Array.isArray(value) ? (value as number) : 0;
        });
        return { data, label: label };
      });
      const output4: ChartData<"radar", number[], string | string[]> = {
        labels: labels4,
        datasets: datasets4
      };
      this.radarChartData = output4;
    } else {
      this.isBar = true;
      this.isPie = false;
      this.isLine = false;
      this.isPolar = false;
      this.isRadar = false;
    }


  }

  filterObjectByColumns(obj: any, columnNames: string[]): any {
    const filteredObj: any = {};

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const filteredData: any = obj[key].filter((item: any) => columnNames.includes(Object.keys(item)[0]));
        filteredObj[key] = filteredData;
      }
    }

    return filteredObj;
  }

  filterTableByColumns(arr: any[], columnNames: string[]): any[] {
    return arr.map(obj => {
      const filteredObj: { [key: string]: any } = {};
      columnNames.forEach(column => {
        if (obj.hasOwnProperty(column)) {
          const value = obj[column];
          if (Array.isArray(value)) {
            const filteredValue = value.filter(item => item !== null);
            if (filteredValue.length > 0) {
              filteredObj[column] = filteredValue;
            }
          } else if (value !== null) {
            filteredObj[column] = value;
          }
        }
      });
      return filteredObj;
    });

  }



  selectLabel() {
    const filteredObject = this.filterObjectByColumns(this.finalGrapData, this.selectedLabels);
    this.barChartData = this.graphFormatData(filteredObject);
    this.selectGraph();
  }
  selectColumn() {
    const filteredArray = this.filterTableByColumns(this.finalTableData, this.selectedColumns);
    this.tableData = filteredArray;
  }

  refreshData() {
    this.selectedColumns = [];
    this.selectedLabels = [];
    this.selectTable();
    this.visualizeData();
    this.selectGraph();
  }
}

