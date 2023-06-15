import { Component, OnInit } from '@angular/core';
import { ShareddataService } from '../../services/shareddata.service';
import { ReportService } from '../../services/report.service';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { ExcelService } from '../../services/excel.service';
@Component({
  selector: 'app-report-builder',
  templateUrl: './report-builder.component.html',
  styleUrls: ['./report-builder.component.scss']
})
export class ReportBuilderComponent implements OnInit {
  databases: string[] = [];
  dbsettings: any[] = [];
  DBC:string="Please select connection"
  tables: string[] = [];
  dbName: string = "All DataBases";
  tableName: string = "All Tables";
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
  public barChartLegend = true;
  public barChartPlugins = [];
  xaxis: any[] = [];
  labels: any[] = [];
  values: any[] = [];
  collective: any[] = [];
  bar: any;
  isGraph=false;

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };

  // Pie
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels = [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'];
  public pieChartexcelsets = [{
    data: [300, 500, 100]
  }];
  public pieChartLegend = true;
  public pieChartPlugins = [];
  constructor(private sharedataservice: ShareddataService, private reportservice: ReportService,private excelService:ExcelService) { }
  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.tableData, 'sample');
  }
  ngOnInit(): void {
    this.reportservice.login().subscribe((token: any)=>{
      localStorage.setItem("token", token.access);
      this.reportservice.listDbSetiingApi().subscribe((res: any) => {

        this.dbsettings = res;

      })
    })



    this.sharedataservice.data$.subscribe((newData: any) => {
      this.sharedataservice.updateQuery(newData.query);
      if (newData.isStats == false) {
        console.log("false new Data", newData);
        this.isStats = false;
        this.tableData = this.transformDataObject(newData.table);
        console.log(this.tableData);
        this.dataKeys = newData.columnswithdtypes;
        console.log(this.dataKeys);


      }
      else {
        console.log("true new Data", newData);
        this.isStats = true;
        this.statsdataKeys = Object.keys(newData.table);
        this.tableData = this.transformDataObject(newData.table);
      }
    });
    this.sharedataservice.visual$.subscribe((res) => {

      if(res!=="Initial Data"){
        this.isGraph=true;
      }
      const barChartData: ChartConfiguration<'bar'>['data'] = {
        labels: [],
        datasets: []
      };

 const graph_data=res.graph_data;


 const visualKeys = Object.keys(graph_data);


visualKeys.forEach((item, index) => {
  let values = Object.values(graph_data[item]);
  const l = values.map((obj:any) => Object.keys(obj)[0]);
  barChartData.labels=l;
  const d = values.map((obj:any) => Number(Object.values(obj)[0]));
  barChartData.datasets.push({data: d, label: item});
});

       this.bar=barChartData;
    });



  }


  selectDataBase(): void {
    this.isGraph=false;
    this.reportservice.selectDatabaseApi({ 'dbName': this.dbName,'connection_name':this.DBC }).subscribe((res) => {
      this.tables = res.tablesList;
      this.sharedataservice.updateTables(this.tables);
      this.dbName = res.db;

    })
  }
  selectConnection():void{
    this.dataKeys=[];
    this.statsdataKeys=[];
    this.tableData=[];
    this.isGraph=false;
    localStorage.setItem('connection_name',this.DBC);
    this.reportservice.getConnectiondatabases(this.DBC).subscribe((res)=>{
      alert("Connection Successful")
      this.databases = res;
    },(error:any)=>{
     alert(error.error);
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
    this.isGraph=false;
    localStorage.setItem('selectedtable', this.tableName);
    localStorage.setItem('dbName', this.dbName);
    this.reportservice.selectTableApi({ 'db': this.dbName, 'tableName': this.tableName,'connection_name':this.DBC }).subscribe((res) => {
      console.log("res", res);
      this.isStats = false;
      this.tableData = this.transformDataObject(res.table);
      this.dataKeys = res.columnswithdtypes;
      this.sharedataservice.updateQuery(res.query);
      console.log("this.dataKeys", this.dataKeys);

    })
  }
  handleFilters(columntype: any, columnname: any): void {
    this.selectedFilterColumn = columnname;
    if (columntype === 'i' || columntype === 'f') {
      this.isFilter = true;
      this.isNumber = true;
      this.filterConditions = ["Is", "Is not", "Greater than", "Less than", "Greater than or Equel to", "Less than or Equel to"];
      this.resetfilters();
      console.log("ok", this.filterConditions);
    } else if (columntype === 'dt') {
      this.isFilter = true;
      this.isNumber = false;
      this.filterConditions = ["Today", "Yesterday", "Last Week", "Last 7 Days", "Last 30 Days", "Last 3 Months", "Last 12 Months"];
      this.resetfilters();
    } else {
      this.filterConditions = [];
      this.isFilter = false;
    }
    console.log("Now filtering data", columntype);
  }
  resetfilters(): void {
    this.selectedFilter = "Select Filter"
  }
  addFilter(): void {
    const connection=localStorage.getItem("connection_name");
    this.reportservice.filtersDataApi({
      'column': this.selectedFilterColumn,
      'columnid': this.filterNumber,
      'db': this.dbName,
      'tableName': this.tableName,
      'condition': this.selectedFilter,
      'connection_name':connection
    }).subscribe((res) => {
      this.tableData = this.transformDataObject(res.table);
      this.sharedataservice.updateQuery(res.query);
      this.dataKeys = res.columnswithdtypes;
    })
    console.log("Adding Filters", this.selectedFilter, this.selectedFilterColumn, this.filterNumber);
  }
}
