import { Component, OnInit } from '@angular/core';
import { Tooltip } from 'bootstrap';
import { ReportService } from '../../services/report.service';
import { ShareddataService } from '../../services/shareddata.service';
import { Route } from '@angular/router';
import { Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DragDropService } from '../../services/dragdrop.service';
import { CommonModule } from '@angular/common';

import { ToastrComponent } from '../toastr/toastr.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-actions',
  standalone: true,
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    ToastrComponent],
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {
  limitValue: number = 5;
  offsetValue: number = 0;
  columnName = 'Select Column';
  groupName = "Select Group";
  groupcolumnName = "Select Column";
  columns: any = [];
  groupselectedItems: any[] = [];
  order = "ASC";
  orders = ["ASC", "DESC"];
  groupsby = ["COUNT", "AVG", "MIN", "MAX", "SUM", "STDEV"];
  query = "";
  numberoftables: number = 0;
  tables = [];
  selectedTables: any[] = [];
  selectedTablesColumns: any[] = [];
  isOn = false;
  selectedValues1: any[] = [];
  selectedValues2: any[] = [];
  datajoincolumns: any[] = [];
  datacolumns: any[] = [];
  reportName = "";
  jointypes = ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN"]
  selectedJoin = "Join";
  toastermessage: string = '';
  isToaster: boolean = false;
  graphTypes: any[] = ["Bar Chart", "Pie Chart", "Line Chart", "Polar Area Chart", "Radar Chart"];
  selectedGraph = ""
  items: string[] = [];

  constructor(private reportService: ReportService, private shareddataService: ShareddataService, private route: Router, private dragDropService: DragDropService) { }

  ngOnInit(): void {
    const tableName = sessionStorage.getItem('selectedtable')

    const dbName = sessionStorage.getItem('dbName')

    if (dbName && tableName) {


      if (dbName) {
        this.shareddataService.tables$.subscribe((res) => {
          this.tables = res;

        })
      }
      const connection = sessionStorage.getItem('connection_name')
      this.reportService.columnsApi({ 'db': dbName, 'tableName': tableName, 'connection_name': connection }).subscribe((res: any) => {

        this.columns = res;
      })
    }
    this.shareddataService.charttype$.subscribe((res: any) => {
      this.selectedGraph = res;
    })
    this.shareddataService.query$.subscribe((item) => {
      if (item) {
        this.query = item;
      }
    });
  }

  show: any = false;
  click(val: any) {

    if (val == true) {
      this.show = false
    }
    if (val == false) {
      this.show = true;
    }

  }
  isDropdownVisible = true;

  toggleDropdown(show: boolean) {
    this.isDropdownVisible = show;
  }

  showTablePlaceholder(index: number): boolean {
    return !this.selectedTables[index];
  }
  showColumns1Placeholder(index: number): boolean {
    return !this.selectedValues1[index] || this.selectedValues1[index].length === 0;
  }
  showColumns2Placeholder(index: number): boolean {
    return !this.selectedValues2[index] || this.selectedValues2[index].length === 0;
  }

  limitData(): void {
    const db = sessionStorage.getItem('dbName');
    const selectedtable = sessionStorage.getItem('selectedtable');
    const connection = sessionStorage.getItem('connection_name');
    this.reportService.limitDataApi({ 'db': db, 'tableName': selectedtable, 'limit': this.limitValue, 'connection_name': connection }).subscribe((res: any) => {
      this.shareddataService.updateData(res);
    });
  }


  // sortData(): void {
  //   const db = sessionStorage.getItem('dbName')
  //   const selectedtable = sessionStorage.getItem('selectedtable')
  //   const connection = sessionStorage.getItem('connection_name')
  //   this.reportService.sortDataApi({ 'db': db, 'tableName': selectedtable, 'column': this.columnName, 'order': this.order, 'connection_name': connection }).subscribe((res: any) => {
  //     this.shareddataService.updateData(res);

  //   });
  // }
  groupData(): void {

    const db = sessionStorage.getItem('dbName')
    const selectedtable = sessionStorage.getItem('selectedtable')

    const connection = sessionStorage.getItem('connection_name');
    this.reportService.groupDataApi({ 'db': db, 'tableName': selectedtable, 'column': this.groupcolumnName, 'columns': this.groupselectedItems, 'aggr': this.groupName, 'connection_name': connection }).subscribe((res: any) => {

      this.shareddataService.updateData(res);

    });
  }
  summarizData(): void {

    const db = sessionStorage.getItem('dbName')
    const connection = sessionStorage.getItem('connection_name');
    this.reportService.summarizeDataApi({ 'db': db, 'query': this.query, 'connection_name': connection }).subscribe((res: any) => {
      this.shareddataService.updateData(res);
    });
  }
  visualizeData(): void {

    const db = sessionStorage.getItem('dbName')

    const connection = sessionStorage.getItem('connection_name');
    this.reportService.visualizeDataApi({ 'db': db, 'query': this.query, 'connection_name': connection }).subscribe((res: any) => {

      this.shareddataService.updateVisual(res);
    });
  }
  counterArray(): number[] {

    return Array(this.numberoftables);
  }
  resetTable() {
    this.selectedTables = [];
    this.selectedTablesColumns = [];
    this.isOn = false;
  }
  onTableSelect(value: string, index: number) {

    if (value !== undefined) {
      this.selectedTables[index] = value;
    } else {

      this.isOn = false;
      this.selectedValues1 = [];
      this.selectedValues2 = [];

      this.selectedTables.splice(index, 1);

    }

  }

  getColumns(): void {
    const db = sessionStorage.getItem('dbName');
    const connection = sessionStorage.getItem('connection_name');
    this.reportService.selectedtablesDataApi({ 'db': db, 'tables': this.selectedTables, 'connection_name': connection }).subscribe((res: any) => {
      this.datajoincolumns = [];
      this.datacolumns = [];
      this.selectedValues1 = [];
      this.selectedValues2 = [];
      this.isOn = true;
      this.selectedTablesColumns = res.columns;

    });
  }

  getObjectValues(table: any): any[] {
    const values: any[] = Object.values(table);
    return values.reduce((acc, arr) => acc.concat(arr), []);
  }

  onColumnsSelect(table: any, index: any, isJoinSection: boolean): void {
    const key = Object.keys(table);
    const selectedvalues1 = this.selectedValues1[index];
    const selectedvalues2 = this.selectedValues2[index];
    if (isJoinSection) {

      const existingIndex = this.datajoincolumns.findIndex(obj => obj[key[0]]);
      if (existingIndex !== -1) {
        this.datajoincolumns[existingIndex][key[0]] = selectedvalues2;
      } else {
        const keyvalue = { [key[0]]: selectedvalues2 };
        this.datajoincolumns.push(keyvalue);
      }


    }
    else {

      const existingIndex = this.datacolumns.findIndex(obj => obj[key[0]]);
      if (existingIndex !== -1) {
        this.datacolumns[existingIndex][key[0]] = selectedvalues1; // Update existing object
      } else {
        const keyvalue = { [key[0]]: selectedvalues1 };
        this.datacolumns.push(keyvalue); // Add new object
      }


    }

  }
  joinTables(): void {

    const db = sessionStorage.getItem('dbName')
    const connection = sessionStorage.getItem('connection_name')
    this.reportService.joinDataApi({ 'db': db, 'datacolumns': this.datacolumns, 'datajoincolumns': this.datajoincolumns, 'jointype': this.selectedJoin, 'connection_name': connection }).subscribe((res: any) => {

      this.shareddataService.updateData(res);


    });
  }
  runSql(): void {
    if (this.query !== "Please Type Query") {
      const db = sessionStorage.getItem('dbName')
      const connection = sessionStorage.getItem('connection_name');
      this.reportService.runSqlApi({ "query": this.query, 'db': db, 'connection_name': connection }).subscribe(res => {
        this.shareddataService.updateData(res)
      })
    }
    else {
      this.toastermessage = 'Please Define Name of Report and Query';
      this.isToaster = true;
      setTimeout(() => {
        this.isToaster = false;
      }, 4000);
    }
  }

  submitReport(): void {
    if (this.reportName !== "" && this.query !== "Please Type Query" && this.query !== "") {
      const connection = sessionStorage.getItem('connection_name')
      const db = sessionStorage.getItem('dbName');
      const table = sessionStorage.getItem('selectedtable');
      this.reportService.createReportApi({ "query": this.query, 'name': this.reportName, 'tableName': table, 'dbName': db, 'connectionName': connection }).subscribe(res => {
        if (res === "Report Name already exists") {

          this.toastermessage = `${res}`;
          this.isToaster = true;
          setTimeout(() => {
            this.isToaster = false;
          }, 4000);

        }
        else {
          alert(res.message);
          this.route.navigateByUrl('/analytics/reports');
        }


      })
    }
    else {
      this.toastermessage = 'Please Define Name of Report and Query';
      this.isToaster = true;
      setTimeout(() => {
        this.isToaster = false;
      }, 4000);
    }

  }
  selectGraph() {
    this.shareddataService.updatechartType(this.selectedGraph);
  }

  refreshData() {
    this.numberoftables = 0;
    this.resetTable();
    this.limitValue = 5;
    this.columnName = 'Select Column';
    this.order = 'Order By';
    this.offsetValue = 0;
    this.groupName = "Select Group";
    this.groupcolumnName = "Select Column";
    this.groupselectedItems = [];
    const q = JSON.stringify(sessionStorage.getItem('query'));
    this.query = JSON.stringify(sessionStorage.getItem('query'));
    this.selectedGraph = "Bar Chart"
    this.shareddataService.updatechartType('Bar Chart')
    this.shareddataService.emitRefreshEvent('calling');
  }
}
