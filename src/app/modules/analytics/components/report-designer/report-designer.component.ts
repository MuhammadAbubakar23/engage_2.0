import { CommonModule } from '@angular/common';
import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ChartConfiguration, ChartData, ChartType, ChartDataset } from 'chart.js';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { ToggleService } from 'src/app/services/ToggleService/Toggle.service';
import { HeaderService } from 'src/app/shared/services/header.service';
import { ExcelService } from '../../services/excel.service';
import { ReportService } from '../../services/report.service';
import { ShareddataService } from '../../services/shareddata.service';
import { ActionsComponent } from '../actions/actions.component';
import { ToastrComponent } from '../toastr/toastr.component';
import { ClosePanelService } from 'src/app/services/ClosePanelServices/close-panel.service';
@Component({
  selector: 'app-report-designer',
  standalone: true,
  imports: [
    CommonModule,
    LayoutsModule,
    FormsModule,
    NgSelectModule,
    NgChartsModule,
    ToastrComponent,
  ],
  templateUrl: './report-designer.component.html',
  styleUrls: ['./report-designer.component.scss']
})
export class ReportDesignerComponent implements OnInit {
  showPanel = false;
  databases: string[] = [];
  dbsettings: any[] = [];
  DBC: any = 'Please select connection';
  tables: string[] = [];
  dbName: any = 'All DataBases';
  tableName: any = 'All Tables';
  tableData: any = [];
  paginatedData: any = [];
  dataKeys: { [key: string]: any } = {};
  columns = {};
  sortColumns:any=[];
  filterConditions: string[] = [];
  isFilter: boolean = false;
  selectedFilter = 'Select Filter';
  selectedFilterColumn = '';
  filterNumber = 0;
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
  page = 1;
  pageSize = 10;
  totalCount: number = 0;
  startPage: number = 1;
  endPage: number = this.pageSize;
  pageSizes = [10, 25, 50, 100];
  order = "ASC";
  orders = ["ASC", "DESC"];
  columnName = 'Sort by';
  isGraph: boolean = false;
  Labels = [];
  graphLabels: any = [];
  selectedGraph = '';
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
    datasets: [],
  };
  public pieChartType: ChartType = 'pie';
  public lineChartData: ChartData<'line', number[], string | string[]> = {
    datasets: [],
    labels: [],
  };
  public polarAreaChartData: ChartData<'polarArea'> = {
    labels: [],
    datasets: [],
  };
  public radarChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };
  public radarChartData: ChartData<'radar'> = {
    labels: [],
    datasets: [],
  };
  public scatterChartData: ChartData<'scatter'> = {
    labels: [],
    datasets: [],
  };
  public scatterChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };
  toastermessage: string = '';
  isToaster: boolean = false;
  query: any;
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [],
  };
  finalGraphresponse = [];
  finalGrapData: any = {};
  finalTableData: any[] = [];
  isPaginated: boolean = false;
  limitValue = 10;
  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.tableData, 'sample');
  }
  constructor(
    private sharedataservice: ShareddataService,
    private reportservice: ReportService,
    private excelService: ExcelService,
    private closePanelservices:ClosePanelService,
    private resolver: ComponentFactoryResolver,
    private toggleService: ToggleService,
    private _hS: HeaderService
  ) { }
  ngOnInit(): void {
    this.reportservice.login().subscribe((token: any) => {
      localStorage.setItem('token', token.access);
      this.reportservice.listDbSetiingApi().subscribe((res: any) => {
        this.dbsettings = res;
      });
    });
    const newObj = { title: 'Report Designer', url: '/analytics/report-builder' };
    this._hS.setHeader(newObj);
    this.sharedataservice.query$.subscribe((res: any) => {
      this.query = res;
    });
    this.sharedataservice.charttype$.subscribe((res: any) => {
      this.selectedGraph = res;
      this.selectGraph();
    });
    this.sharedataservice.data$.subscribe((newData: any) => {
      if (newData !== "Initial Data") {
        this.isGraph = true;
      }
      this.sharedataservice.updateQuery(newData.query);
      this.visualizeData();
      if (newData.isStats == false) {
        this.isStats = false;
        this.tableData = this.transformDataObject(newData.table);
        this.finalTableData = this.tableData;
        if (this.selectedColumns.length !== 0) {
          this.tableData = this.filterTableByColumns(
            this.tableData,
            this.selectedColumns
          );
        }
        this.dataKeys = newData.columnswithdtypes;
      } else {
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
      if (res !== 'Initial Data') {
        this.finalGrapData = res.graph_data;
        const keys: string[] = [];
        Object.values(res.graph_data).forEach((values: any) => {
          values.forEach((item: { [key: string]: unknown }) => {
            keys.push(...Object.keys(item));
          });
        });
        const uniqueKeys: string[] = [...new Set(keys)];
        this.graphLabels = uniqueKeys;
        this.graphFormatData(res.graph_data);
      }
    });
    this.sharedataservice.getrRfreshEvent().subscribe((data) => {
      this.refreshkeys();
      this.refreshLabels();
    });
    this.subscription = this.toggleService
      .getTogglePanel()
      .subscribe((msg3) => {
        if (msg3) {
          this.rightcontainer?.clear();
          localStorage.setItem('child', msg3);
          this.showPanel = true;
          this.closePanelservices.sendLeftBarToggleValue(false)
          this.loadComponent(msg3);
        } else {
          this.showPanel = false;
          this.rightcontainer?.clear();
          localStorage.setItem('child', '');
        }
      });
      this.subscription = this.closePanelservices.receiveRightBarToggleValue().subscribe(res=>{
        this.showPanel = res;
      })
  }
  componentRef: any;
  @ViewChild('rightcontainer', { read: ViewContainerRef })
  rightcontainer!: ViewContainerRef;
  childComponentName!: any;
  public subscription!: Subscription;
  panelToggled: any;
  ngAfterViewInit() {
    this.rightcontainer?.clear();
    if (this.childComponentName != null) {
      this.showPanel = true;
      this.closePanelservices.sendLeftBarToggleValue(false)
      this.loadComponent(this.childComponentName);
    }
  }
  loadComponent(rightSideName: string) {
    let componentFactory = null;
    switch (rightSideName) {
      case 'contacts':
        componentFactory =
          this.resolver.resolveComponentFactory(ActionsComponent);
        this.rightcontainer?.createComponent(componentFactory);
        break;
      default:
        componentFactory =
          this.resolver.resolveComponentFactory(ActionsComponent);
        this.rightcontainer?.createComponent(componentFactory);
        break;
    }
  }
  graphFormatData(data: any) {
    const barChartData: ChartConfiguration<'bar'>['data'] = {
      labels: [],
      datasets: [],
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
    return this.barChartData;
  }
  selectDataBase(): void {
    this.reportservice
      .selectDatabaseApi({ dbName: this.dbName, connection_name: this.DBC })
      .subscribe((res) => {
        this.tables = res.tablesList;
        this.sharedataservice.updateTables(this.tables);
        this.dbName = res.db;
        localStorage.setItem('dbName', this.dbName);
      });
  }
  selectConnection(): void {
    this.dataKeys = [];
    this.statsdataKeys = [];
    this.tableData = [];
    this.databases = [];
    this.tables = [];
    this.dbName = 'All DataBases';
    this.tableName = 'All Tables';
    localStorage.setItem('connection_name', this.DBC);
    this.reportservice.getConnectiondatabases(this.DBC).subscribe(
      (res) => {
        // Success case
        this.toastermessage = 'Connection Successful!';
        this.isToaster = true;
        setTimeout(() => {
          this.isToaster = false;
        }, 4000);
        this.databases = res;
      },
      (error: any) => {
        // Error case
        let errorMessage = 'An error occurred. Please try again later.';
        try {
          const errorObj = JSON.parse(error.error);
          if (errorObj && errorObj.error) {
            errorMessage = errorObj.error;
          }
        } catch (parseError) {
          console.error('Error parsing error response:', parseError);
        }
        this.toastermessage = errorMessage;
        this.isToaster = true;
        setTimeout(() => {
          this.isToaster = false;
        }, 4000);
      }
    );
  }
  transformDataObject(dataObject: any): any[] {
    const rows: any[] = [];
    const keys = Object.keys(dataObject);
    const maxLength = Math.max(...keys.map((key) => dataObject[key].length));
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
    this.pageSize = 10
    this.startPage = 1;
    this.endPage = this.pageSize;
    this.page = 1;
    localStorage.setItem('selectedtable', this.tableName);
    if (
      this.dbName !== 'All DataBases' &&
      this.tableName !== 'All Tables' &&
      this.DBC !== 'Please select connection'
    ) {
      this.reportservice
        .selectTableApi({
          db: this.dbName,
          tableName: this.tableName,
          connection_name: this.DBC,
          page: this.page,
          page_size: this.pageSize
        })
        .subscribe((res) => {
          this.isGraph = true;
          this.isStats = false;
          this.tableData = this.transformDataObject(res.table);
          this.totalCount = res.total_count;
          if (res.last_records < this.pageSize) {
            this.endPage = res.total_count;
            this.limitValue = res.total_count;
          }
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
        });
    }
  }
  limitData(): void {
    this.startPage = 0;
    this.endPage = this.pageSize;
    this.reportservice.paginatedDataApi({
      db: this.dbName,
      query: this.query,
      connection_name: this.DBC,
      page: this.page,
      page_size: this.pageSize
    }).subscribe((res: any) => {
      this.paginatedData = res.table;
      if (res.last_records < this.pageSize) {
        this.endPage = res.total_count;
      }
      this.isPaginated = true;
      this.tableData = this.transformDataObject(res.table);
    });
  }
  sortData(): void {
    const db = localStorage.getItem('dbName')
    const selectedtable = localStorage.getItem('selectedtable')
    const connection = localStorage.getItem('connection_name')
    this.reportservice.sortDataApi({ 'db': db, 'tableName': selectedtable, 'column': this.columnName, 'order': this.order, 'connection_name': connection }).subscribe((res: any) => {
      this.sharedataservice.updateData(res);
    });
  }
  incrementPage() {
    if (this.endPage + this.pageSize <= this.totalCount) {
      this.startPage += this.pageSize;
      this.endPage += this.pageSize;
      this.page += 1;
      this.paginationApi()
    }
  }
  decrementPage() {
    if (this.startPage >= this.pageSize) {
      this.startPage -= this.pageSize;
      this.endPage -= this.pageSize;
      this.page -= 1,
      this.paginationApi()
    }
  }
  paginationApi() {
    this.reportservice
      .paginatedDataApi({
        db: this.dbName,
        query: this.query,
        connection_name: this.DBC,
        page: this.page,
        page_size: this.pageSize
      })
      .subscribe((res: any) => {
        this.paginatedData = res.table;
        if (res.last_records < this.pageSize) {
          this.endPage = res.total_count;
        }
        this.isPaginated = true;
        this.tableData = this.transformDataObject(res.table);
      });
  }
  handleFilters(columntype: any, columnname: any): void {
    this.selectedFilterColumn = columnname;
    if (columntype === 'i' || columntype === 'f') {
      this.isFilter = true;
      this.isNumber = true;
      this.filterConditions = [
        'Is',
        'Is not',
        'Greater than',
        'Less than',
        'Greater than or Equel to',
        'Less than or Equel to',
      ];
      this.resetfilters();
    } else if (columntype === 'dt') {
      this.isFilter = true;
      this.isNumber = false;
      this.filterConditions = [
        'Today',
        'Yesterday',
        'Last Week',
        'Last 7 Days',
        'Last 30 Days',
        'Last 3 Months',
        'Last 12 Months',
      ];
      this.resetfilters();
    } else {
      this.filterConditions = [];
      this.isFilter = false;
    }
  }
  resetfilters(): void {
    this.selectedFilter = 'Select Filter';
  }
  addFilter(): void {
    const connection = localStorage.getItem('connection_name');
    this.reportservice
      .filtersDataApi({
        column: this.selectedFilterColumn,
        columnid: this.filterNumber,
        db: this.dbName,
        tableName: this.tableName,
        condition: this.selectedFilter,
        connection_name: connection,
      })
      .subscribe((res) => {
        this.tableData = this.transformDataObject(res.table);
        this.sharedataservice.updateQuery(res.query);
        this.dataKeys = res.columnswithdtypes;
      });
  }
  visualizeData(): void {
    const db = localStorage.getItem('dbName');
    const connection = localStorage.getItem('connection_name');
    if (
      db !== null &&
      this.query !== 'Please Type Query' &&
      connection !== null
    ) {
      this.isVisual = true;
      this.isTabular = false;
      this.reportservice
        .visualizeDataApi({
          db: db,
          query: this.query,
          connection_name: connection,
        })
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
      const labels1: string[] = this.barChartData.datasets.map(
        (dataset: any) => dataset.label
      );
      const datasets1: ChartDataset<'pie', number[]>[] =
        this.barChartData.labels!.map((label: any, index: number) => {
          const data: number[] = this.barChartData.datasets.map(
            (dataset: any) => {
              const value = dataset.data[index] as
                | number
                | [number, number]
                | null;
              return typeof value === 'number' || Array.isArray(value)
                ? (value as number)
                : 0;
            }
          );
          return { data, label: label };
        });
      const output1: ChartData<'pie', number[], string | string[]> = {
        labels: labels1,
        datasets: datasets1,
      };
      this.pieChartData = output1;
    } else if (this.selectedGraph === 'Line Chart') {
      this.isBar = false;
      this.isPie = false;
      this.isLine = true;
      this.isPolar = false;
      this.isRadar = false;
      const labels2: string[] = this.barChartData.datasets.map(
        (dataset: any) => dataset.label
      );
      const datasets2: ChartDataset<'line', number[]>[] =
        this.barChartData.labels!.map((label: any, index: number) => {
          const data: number[] = this.barChartData.datasets.map(
            (dataset: any) => {
              const value = dataset.data[index] as
                | number
                | [number, number]
                | null;
              return typeof value === 'number' || Array.isArray(value)
                ? (value as number)
                : 0;
            }
          );
          return { data, label: label };
        });
      const output2: ChartData<'line', number[], string | string[]> = {
        labels: labels2,
        datasets: datasets2,
      };
      this.lineChartData = output2;
    } else if (this.selectedGraph === 'Polar Area Chart') {
      this.isBar = false;
      this.isPie = false;
      this.isLine = false;
      this.isPolar = true;
      this.isRadar = false;
      const labels3: string[] = this.barChartData.datasets.map(
        (dataset: any) => dataset.label
      );
      const datasets3: ChartDataset<'polarArea', number[]>[] =
        this.barChartData.labels!.map((label: any, index: number) => {
          const data: number[] = this.barChartData.datasets.map(
            (dataset: any) => {
              const value = dataset.data[index] as
                | number
                | [number, number]
                | null;
              return typeof value === 'number' || Array.isArray(value)
                ? (value as number)
                : 0;
            }
          );
          return { data, label: label };
        });
      const output3: ChartData<'polarArea', number[], string | string[]> = {
        labels: labels3,
        datasets: datasets3,
      };
      this.polarAreaChartData = output3;
    } else if (this.selectedGraph === 'Radar Chart') {
      this.isBar = false;
      this.isPie = false;
      this.isLine = false;
      this.isPolar = false;
      this.isRadar = true;
      const labels4: string[] = this.barChartData.datasets.map(
        (dataset: any) => dataset.label
      );
      const datasets4: ChartDataset<'radar', number[]>[] =
        this.barChartData.labels!.map((label: any, index: number) => {
          const data: number[] = this.barChartData.datasets.map(
            (dataset: any) => {
              const value = dataset.data[index] as
                | number
                | [number, number]
                | null;
              return typeof value === 'number' || Array.isArray(value)
                ? (value as number)
                : 0;
            }
          );
          return { data, label: label };
        });
      const output4: ChartData<'radar', number[], string | string[]> = {
        labels: labels4,
        datasets: datasets4,
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
        const filteredData: any = obj[key].filter((item: any) =>
          columnNames.includes(Object.keys(item)[0])
        );
        filteredObj[key] = filteredData;
      }
    }
    return filteredObj;
  }
  filterTableByColumns(arr: any[], columnNames: string[]): any[] {
    return arr.map((obj) => {
      const filteredObj: { [key: string]: any } = {};
      columnNames.forEach((column) => {
        if (obj.hasOwnProperty(column)) {
          const value = obj[column];
          if (Array.isArray(value)) {
            const filteredValue = value.filter((item) => item !== null);
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
    const filteredObject = this.filterObjectByColumns(
      this.finalGrapData,
      this.selectedLabels
    );
    this.barChartData = this.graphFormatData(filteredObject);
    this.selectGraph();
  }
  selectColumn() {
    const filteredArray = this.filterTableByColumns(
      this.finalTableData,
      this.selectedColumns
    );
    this.tableData = filteredArray;
  }
  refreshkeys() {
    if (this.isPaginated) {
      this.selectedColumns = [];
      this.tableData = this.transformDataObject(this.paginatedData);
    }
    else {
      this.selectedColumns = [];
      this.tableData = this.finalTableData;
    }
  }
  refreshLabels() {
    this.selectedLabels = [];
    this.visualizeData();
    this.selectGraph();
  }
}
