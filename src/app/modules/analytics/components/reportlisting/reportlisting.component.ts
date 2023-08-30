import { Component, OnInit, ViewChild ,AfterViewInit} from '@angular/core';

import { ReportService } from '../../services/report.service';
import { ShareddataService } from '../../services/shareddata.service';
import { ChartConfiguration, ChartData, ChartDataset, ChartType, ChartTypeRegistry, Color } from 'chart.js';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgChartsModule } from 'ng2-charts';
import { HeaderService } from 'src/app/shared/services/header.service';
import { ExcelService } from '../../services/excel.service';
import { TableResponsiveComponent } from "../../../../shared/table-responsive/table-responsive.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
interface CustomChartData1<TType extends ChartType, TData extends ChartData<TType, unknown, string | string[]>> {
  type: TType | 'bar' | 'pie' | 'line' | 'polarArea' | 'radar';

  data: TData;
}

@Component({
    selector: 'app-reportlisting',
    standalone: true,
    templateUrl: './reportlisting.component.html',
    styleUrls: ['./reportlisting.component.scss'],
    imports: [
        CommonModule,
        FormsModule,
        NgSelectModule,
        NgChartsModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        DragDropModule]
})
export class ReportlistingComponent implements OnInit, AfterViewInit{
  showPanel = false;
  reports: any = [];
  columns = ['Report Name']
  dataKeys: any[] = []
  targetReport = ""
  db = "";
  query = "";
  connection = "";
  tableData: any = [];
  displayedColumns: any[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private reportService: ReportService, private _hS: HeaderService, private excelService: ExcelService) { }

  ngOnInit(): void {

    this.reportService.login().subscribe((token: any) => {
      localStorage.setItem("token", token.access);
      this.reportService.reportslistApi().subscribe((res: any) => {
        console.log("reportlisting", res);
        res.forEach((report: any) => {
          this.reports.push({ 'id': report.id, 'name': report.name, 'color': 'blue' })
        })
      });
    })
    const newObj = { title: 'Reports', url: '/analytics/reports' };
    this._hS.setHeader(newObj);

  }
  reportName:any = 'Please select Report';
  getReportData() {
    // console.log("getReportData", reportName)
    // this.reports.forEach((report: any) => {
    //   if (report.name === reportName) {
    //     report.color = 'green';
    //   }
    //   else{
    //     report.color = 'blue';
    //   }
    // })
    this.reportService.reportExecuteApi({ 'reportName': this.reportName }).subscribe((res: any) => {
      console.log("Get Data", res);
      this.tableData = this.transformDataObject(res.table);
      console.log("Get Data", this.tableData)
    });
  }
  ngAfterViewInit() {
    this.tableData.paginator = this.paginator;
    this.tableData.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableData.filter = filterValue.trim().toLowerCase();

    if (this.tableData.paginator) {
      this.tableData.paginator.firstPage();
    }
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.tableData, 'sample');
  }
  transformDataObject(dataObject: any): any[] {
    const rows: any[] = [];
    const keys = Object.keys(dataObject);
    this.dataKeys = keys;
    console.log("keys", keys);
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
}
