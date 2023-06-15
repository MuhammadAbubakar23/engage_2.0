import { Component, OnInit } from '@angular/core';
import { Tooltip } from 'bootstrap';
import { ReportService } from '../../services/report.service';
import { ShareddataService } from '../../services/shareddata.service';
import { Route } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {
  limitValue: number = 0;
  offsetValue: number = 0;
  columnName = 'Select Column';
  groupName = "Select Group";
  groupcolumnName = "Select Column";
  columns: any = [];
  groupselectedItems: any[] = [];
  order = "Order By";
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
  constructor(private reportService: ReportService, private shareddataService: ShareddataService, private route: Router) { }

  ngOnInit(): void {
    const tableName = localStorage.getItem('selectedtable')
    console.log("tableName: " + tableName)
    const dbName = localStorage.getItem('dbName')

    if (dbName && tableName) {
      this.shareddataService.query$.subscribe((query) => {
        this.query = query;

      })

      if (dbName) {
        this.shareddataService.tables$.subscribe((res) => {
          this.tables = res;
          console.log("actions", this.tables)
        })
      }
      const connection = localStorage.getItem('connection_name')
      this.reportService.columnsApi({ 'db': dbName, 'tableName': tableName, 'connection_name': connection }).subscribe((res: any) => {
        console.log("columnsApi: " + res)
        this.columns = res;
      })
    }
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
  limitData(): void {
    console.log("limitData()")
    const db = localStorage.getItem('dbName');
    const selectedtable = localStorage.getItem('selectedtable');
    const connection = localStorage.getItem('connection_name');
    this.reportService.limitDataApi({ 'db': db, 'tableName': selectedtable, 'limit': this.limitValue, 'connection_name': connection }).subscribe((res: any) => {
      console.log("limit==>", res);
      this.shareddataService.updateData(res);

    });
  }


  sortData(): void {
    console.log("sortData()")
    const db = localStorage.getItem('dbName')
    const selectedtable = localStorage.getItem('selectedtable')
    const connection = localStorage.getItem('connection_name')
    this.reportService.sortDataApi({ 'db': db, 'tableName': selectedtable, 'column': this.columnName, 'order': this.order, 'offset': this.offsetValue, 'connection_name': connection }).subscribe((res: any) => {
      console.log("sort", res);
      this.shareddataService.updateData(res);

    });
  }
  groupData(): void {
    console.log("groupData()")
    const db = localStorage.getItem('dbName')
    const selectedtable = localStorage.getItem('selectedtable')
    console.log("groupData() selected", this.groupcolumnName, this.groupselectedItems, this.groupName)
    const connection = localStorage.getItem('connection_name');
    this.reportService.groupDataApi({ 'db': db, 'tableName': selectedtable, 'column': this.groupcolumnName, 'columns': this.groupselectedItems, 'aggr': this.groupName, 'connection_name': connection }).subscribe((res: any) => {
      console.log("group", res);
      this.shareddataService.updateData(res);

    });
  }
  summarizData(): void {
    console.log("summarizeData()")
    const db = localStorage.getItem('dbName')
    const connection = localStorage.getItem('connection_name');
    this.reportService.summarizeDataApi({ 'db': db, 'query': this.query, 'connection_name': connection }).subscribe((res: any) => {
      console.log("group", res);
      this.shareddataService.updateData(res);

    });
  }
  visualizeData(): void {
    console.log("summarizeData()")
    const db = localStorage.getItem('dbName')

    const connection = localStorage.getItem('connection_name');
    this.reportService.visualizeDataApi({ 'db': db, 'query': this.query, 'connection_name': connection }).subscribe((res: any) => {
      console.log("visualize", res);
      this.shareddataService.updateVisual(res);
    });
  }
  counterArray(): number[] {
    return Array(this.numberoftables);
  }

  onTableSelect(value: string, index: number) {

    console.log("value==>", value, index);
    if (value !== undefined) {
      this.selectedTables[index] = value;
    } else {
      console.log("value from selected table>", this.selectedTables[index]);
      this.isOn = false;
      this.selectedValues1 = [];
      this.selectedValues2 = [];

      this.selectedTables.splice(index, 1);

    }

    console.log('Selected Values:', this.selectedTables);
  }
  getColumns(): void {
    const db = localStorage.getItem('dbName');
    const connection = localStorage.getItem('connection_name');
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
    const values: any[] = Object.values(table); // Get the values from the object
    return values.reduce((acc, arr) => acc.concat(arr), []); // Flatten the arrays into a single array
  }

  onColumnsSelect(table: any, index: any, isJoinSection: boolean): void {
    const key = Object.keys(table);
    const selectedvalues1 = this.selectedValues1[index];
    const selectedvalues2 = this.selectedValues2[index];
    if (isJoinSection) {
      console.log("Join")
      const existingIndex = this.datajoincolumns.findIndex(obj => obj[key[0]]);
      if (existingIndex !== -1) {
        this.datajoincolumns[existingIndex][key[0]] = selectedvalues2; // Update existing object
      } else {
        const keyvalue = { [key[0]]: selectedvalues2 };
        this.datajoincolumns.push(keyvalue); // Add new object
      }

      console.log("datajoincolumns", this.datajoincolumns);
    }
    else {
      console.log("data part")
      const existingIndex = this.datacolumns.findIndex(obj => obj[key[0]]);
      if (existingIndex !== -1) {
        this.datacolumns[existingIndex][key[0]] = selectedvalues1; // Update existing object
      } else {
        const keyvalue = { [key[0]]: selectedvalues1 };
        this.datacolumns.push(keyvalue); // Add new object
      }

      console.log("dataColumns", this.datacolumns);
    }

  }
  joinTables(): void {
    console.log("joinTables()")
    const db = localStorage.getItem('dbName')
    const connection = localStorage.getItem('connection_name')
    this.reportService.joinDataApi({ 'db': db, 'datacolumns': this.datacolumns, 'datajoincolumns': this.datajoincolumns, 'jointype': this.selectedJoin, 'connection_name': connection }).subscribe((res: any) => {
      console.log("JoinResult", res);
      this.shareddataService.updateData(res);


    });
  }
  runSql(): void {
    if (this.query !== "Please Type Query") {
      const db = localStorage.getItem('dbName')
      const connection = localStorage.getItem('connection_name');
      this.reportService.runSqlApi({ "query": this.query, 'db': db, 'connection_name': connection }).subscribe(res => {
        console.log("sql", res);
        this.shareddataService.updateData(res)
      })
    }
    else {
      alert("Please Define Name of Report and Query");
    }
  }
  submitReport(): void {
    if (this.reportName !== "" && this.query !== "Please Type Query") {
      this.reportService.createReportApi({ "query": this.query, 'name': this.reportName }).subscribe(res => {
        console.log(res);
        this.route.navigateByUrl('/analytics/reports');
        alert(res.message);
      })
    }
    else {
      alert("Please Define Name of Report and Query");
    }

  }

}
