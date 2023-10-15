import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { HeaderService } from 'src/app/shared/services/header.service';
@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, NgxSpinnerModule],
  selector: 'app-unique-customers',
  templateUrl: './unique-customers.component.html',
  styleUrls: ['./unique-customers.component.scss'],
})
export class UniqueCustomersComponent implements OnInit {
  startDate: string = '';
  endDate: string = '';
  currentDate: any;
  TotalCount: any = [];
  totalPages: any;
  endingPoint: any;
  startingPoint: any;
  unique_customer: any[] = [];
  pageNumber = 1;
  itemsPerPage = 20;
  maxEndDate: any;

  downloading = false;
  toastermessage = false;
  AlterMsg: any = '';
  constructor(
    private _hS: HeaderService,
    private commonService: CommonDataService,
    private cdr: ChangeDetectorRef,
    private datePipe: DatePipe,
    private SpinnerService: NgxSpinnerService
  ) {}
  ngOnInit(): void {
    const currentDate = new Date();
    const oneDayBeforeCurrentDate = currentDate.setDate(
      currentDate.getDate() - 1
    );
    this.maxEndDate = this.datePipe.transform(
      oneDayBeforeCurrentDate,
      'YYYY-MM-dd'
    );
    const newObj = {
      title: 'Unique Interactions',
      url: '/analytics/umique-customers',
    };
    this._hS.setHeader(newObj);
    this.addUniqueData();
  }
  resetEndDate() {
    this.endDate = '';
  }
  onCheckboxChange() {
    this.addUniqueData();
    this.cdr.detectChanges();
  }
  addUniqueData() {
    if (this.startDate == '' && this.endDate == '') {
      // let currentDate = new Date();
      // let prevDate = currentDate.setDate(currentDate.getDate() - 5);
      // this.fromDate = this.datePipe.transform(prevDate, 'YYYY-MM-dd') || '';

      // this.toDate = this.datePipe.transform(new Date(), 'YYYY-MM-dd') || '';
      this.startDate = this.maxEndDate;
      this.endDate = this.maxEndDate;
    } else if (this.startDate != '' && this.endDate != '') {
      this.startDate = this.startDate;
      this.endDate = this.startDate;
    }
    const requestData = {
      fromDate: this.startDate,
      toDate: this.endDate,
      pageNumber: this.pageNumber,
      pageSize: this.itemsPerPage,
    };
    if (this.endDate >= this.startDate) {
      this.SpinnerService.show();
      this.commonService.AddUniqueCustomer(requestData).subscribe(
        (response: any) => {
          this.SpinnerService.hide();
          this.unique_customer = response.List;
          this.TotalCount = response.TotalCount;
          if (this.pageNumber == 1) {
            this.startingPoint = 1;
          } else {
            this.startingPoint = (this.pageNumber - 1) * this.itemsPerPage + 1;
          }
          this.totalPages = Math.ceil(this.TotalCount / this.itemsPerPage);
          if (this.TotalCount <= this.startingPoint + this.itemsPerPage - 1) {
            this.endingPoint = this.TotalCount;
          } else {
            this.endingPoint = this.startingPoint + this.itemsPerPage - 1;
          }
        },
        (error: any) => {}
      );
    } else {
      this.SpinnerService.hide();
      alert('End Date is less than Start Date');
    }
  }
  exportToCSV() {
    const requestData = {
      fromDate: this.startDate,
      toDate: this.endDate,
      pageNumber: this.pageNumber,
      pageSize: this.itemsPerPage,
    };
    this.downloading = true;
    this.reloadComponent('downloading');
    this.commonService.UniqueExportCsv(requestData).subscribe(
      (response: any) => {
        const a = document.createElement('a');
        a.href = response;
        a.download = 'uniqueReport' + this.startDate + '.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        this.downloading = false;
        this.reloadComponent('downloaded');
      },
      (error: any) => {
        console.error('error', error);
      }
    );
  }
  nextPage(pageNumber: any) {
    let page = pageNumber + 1;
    if (page < this.totalPages + 1) {
      this.pageNumber = page;
      this.addUniqueData();
    }
  }
  prevPage(pageNumber: any) {
    if (pageNumber >= 1) {
      let page = pageNumber - 1;
      if (page > 0) {
        this.pageNumber = page;
      }
    }
    this.addUniqueData();
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
