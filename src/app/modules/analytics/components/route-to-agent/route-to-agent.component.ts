import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';
//  import { ExportToCsv } from 'export-to-csv';
import { HeaderService } from 'src/app/shared/services/header.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, NgxSpinnerModule],
  selector: 'app-route-to-agent',
  templateUrl: './route-to-agent.component.html',
  styleUrls: ['./route-to-agent.component.scss'],
})
export class RouteToAgentComponent implements OnInit {
  agentsDate: any[] = [];
  totalCounts: any;
  startDate: string = '';
  EndDate: string = '';
  itemperPage: number = 20;
  pageNumber: number = 1;
  totalPages: any;
  maxEndDate: any;
  downloadCsv: any;
  startingPoint: any;
  endingPoint: any;
  currentDate: any;

  downloading = false;
  toastermessage = false;
  AlterMsg: any = '';
  constructor(
    private commondataServices: CommonDataService,
    private headerServices: HeaderService,
    private datePipe: DatePipe,
    private SpinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    const obj = {
      title: 'Live Agent Interactions',
      url: 'analytics/route-to-agent',
    };
    this.headerServices.setHeader(obj);
    const currentDate = new Date();
    const oneDayBeforeCurrentDate = currentDate.setDate(
      currentDate.getDate() - 1
    );
    this.maxEndDate = this.datePipe.transform(
      oneDayBeforeCurrentDate,
      'YYYY-MM-dd'
    );
    this.getRoutetoAgent();
    // this.downloadRouteAgentsCvs()
  }
  getRoutetoAgent() {
    if (this.startDate == '' && this.EndDate == '') {
      // let currentDate = new Date();
      // let prevDate = currentDate.setDate(currentDate.getDate() - 5);
      // this.fromDate = this.datePipe.transform(prevDate, 'YYYY-MM-dd') || '';

      // this.toDate = this.datePipe.transform(new Date(), 'YYYY-MM-dd') || '';
      this.startDate = this.maxEndDate;
      this.EndDate = this.maxEndDate;
    } else if (this.startDate != '' && this.EndDate != '') {
      this.startDate = this.startDate;
      this.EndDate = this.startDate;
    }
    let data = {
      fromDate: this.startDate,
      toDate: this.EndDate,
      pageNumber: this.pageNumber,
      pageSize: this.itemperPage,
    };
    if (this.startDate != '' || this.EndDate != '') {
      this.SpinnerService.show();
      this.commondataServices.GetRouteToAgents(data).subscribe((res: any) => {
        this.SpinnerService.hide();
        this.agentsDate = res.List;
        this.totalCounts = res.TotalCount;
        if (this.pageNumber == 1) {
          this.startingPoint = 1;
        } else {
          this.startingPoint = (this.pageNumber - 1) * this.itemperPage + 1;
        }
        this.totalPages = Math.ceil(this.totalCounts / this.itemperPage);
        if (this.totalCounts <= this.startingPoint + this.itemperPage - 1) {
          this.endingPoint = this.totalCounts;
        } else {
          this.endingPoint = this.startingPoint + this.itemperPage - 1;
        }
      });
    }
  }
  downloadRouteAgentsCvs() {
    let data = {
      fromDate: this.startDate,
      toDate: this.EndDate,
      pageNumber: this.pageNumber,
      pageSize: this.itemperPage,
    };
    this.downloading = true;
    this.reloadComponent('downloading');
    this.commondataServices.GetRouteToAgentsCsv(data).subscribe((res: any) => {
      const a = document.createElement('a');
      a.href = res;
      a.download = 'RouteToAgentReport' + this.startDate + '.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      this.downloading = false;
      this.reloadComponent('downloaded');
    });
  }

  generateExcelFile() {
    const worksheet = XLSX.utils.json_to_sheet(this.downloadCsv);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    return blob;
  }

  // export() {
  //   const options = {
  //     fieldSeparator: ',',
  //     quoteStrings: '"',
  //     decimalSeparator: '.',
  //     showLabels: true,
  //     showTitle: true,
  //     title: 'Charge Report',
  //     useTextFile: false,
  //     useBom: true,
  //     headers: ['Name', 'Age', 'Average', 'Approved','Description']
  // };
  //  const csvExporter = new ExportToCsv(options);
  //   csvExporter.generateCsv(this.);

  getBystartDate() {
    this.EndDate = '';
  }
  getByEndDate() {
    if (this.EndDate >= this.startDate) {
      this.getRoutetoAgent();
    } else {
      alert('EndDate is lessthen StartDate');
      this.EndDate = '';
    }
  }
  nextPage(pageNumber: any) {
    let page = pageNumber + 1;
    if (page < this.totalPages + 1) {
      this.pageNumber = page;
      this.getRoutetoAgent();
    }
  }
  perviousPage(pageNumber: any) {
    if (pageNumber >= 1) {
      let page = pageNumber - 1;
      if (page > 0) {
        this.pageNumber = page;
      }
    }
    this.getRoutetoAgent();
  }

  closeToaster() {
    this.toastermessage = false;
  }

  reloadComponent(type: any) {
    if (type == 'downloading') {
      this.AlterMsg = 'Downloading Started';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'downloaded') {
      this.AlterMsg = 'Your File has been downloaded Successfully!';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
  }
}
