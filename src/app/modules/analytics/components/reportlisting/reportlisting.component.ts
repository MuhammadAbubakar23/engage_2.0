import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from '../../services/report.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgChartsModule } from 'ng2-charts';
import { HeaderService } from 'src/app/shared/services/header.service';
import { ExcelService } from '../../services/excel.service';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';


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
export class ReportlistingComponent implements OnInit {
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
  page = 1;
  pageSizes = [10, 25, 50, 100];
  pageSize = 10;
  totalCount: number = 0;
  startPage: number = 1;
  endPage: number = this.pageSize;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private reportService: ReportService, private _hS: HeaderService, private excelService: ExcelService) { }

  ngOnInit(): void {

    this.reportService.login().subscribe((token: any) => {
      localStorage.setItem("token", token.access);
      this.reportService.reportslistApi().subscribe((res: any) => {
        this.reports = res;

      });
    })
    const newObj = { title: 'Reports', url: '/analytics/reports' };
    this._hS.setHeader(newObj);

  }
  reportName: any = 'Please select Report';
  getReportData() {
    this.pageSize = 10
    this.startPage = 1;
    this.endPage = this.pageSize;
    this.page = 1;
    this.reportService.reportExecuteApi({ 'reportName': this.reportName, page: this.page, page_size: this.pageSize }).subscribe((res: any) => {
      if (res.error) {
        alert(res.error);
      }
      else {
        this.tableData = this.transformDataObject(res.table);
        this.totalCount = res.total_count;
        if (res.last_records < this.pageSize) {
          this.endPage = res.total_count;
        }
      }

    });
  }
  
  limitData(): void {
    this.startPage = 0;
    this.endPage = this.pageSize;
    this.reportService.reportExecuteApi({ 'reportName': this.reportName, page: this.page, page_size: this.pageSize }).subscribe((res: any) => {

      this.tableData = this.transformDataObject(res.table);
      this.totalCount = res.total_count;
      if (res.last_records < this.pageSize) {
        this.endPage = res.total_count;
      }

    });

  }
  getPaginatedData() {
    this.reportService.reportExecuteApi({ 'reportName': this.reportName, page: this.page, page_size: this.pageSize }).subscribe((res: any) => {
      this.tableData = this.transformDataObject(res.table);
      this.totalCount = res.total_count;
      if (res.last_records < this.pageSize) {
        this.endPage = res.total_count;
      }
    });
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.tableData, 'sample');
  }
  transformDataObject(dataObject: any): any[] {
    const rows: any[] = [];
    const keys = Object.keys(dataObject);
    this.dataKeys = keys;
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

  incrementPage() {
    if (this.endPage + this.pageSize <= this.totalCount) {
      this.startPage += this.pageSize;
      this.endPage += this.pageSize;
      this.page += 1;
      this.getPaginatedData();
    }
  }

  decrementPage() {
    if (this.startPage >= this.pageSize) {
      this.startPage -= this.pageSize;
      this.endPage -= this.pageSize;
      this.page -= 1,
        this.getPaginatedData();
    }
  }
}
