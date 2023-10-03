import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { HeaderService } from 'src/app/shared/services/header.service';
@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-unique-customers',
  templateUrl: './unique-customers.component.html',
  styleUrls: ['./unique-customers.component.scss']
})
export class UniqueCustomersComponent implements OnInit {
  startDate: string = '';
  endDate: string = '';
  currentDate: any;
  TotalCount: any = []
  totalPages: any
  endingPoint: any
  startingPoint: any
  unique_customer: any[] = [];
  pageNumber = 1;
  itemsPerPage = 20;
  maxEndDate: any
  constructor(private _hS: HeaderService,
    private commonService: CommonDataService,
    private cdr: ChangeDetectorRef,
    private datePipe: DatePipe,) { }
  ngOnInit(): void {
    this.currentDate = new Date();
    this.maxEndDate = this.currentDate.toISOString().split("T")[0];
    const newObj = { title: 'Unique Interactions', url: '/analytics/umique-customers' };
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
    if (this.startDate == "" && this.endDate == "") {

      const today = this.currentDate;
      this.endDate = this.datePipe.transform(today, "YYYY-MM-dd") || '';

      let prevDate = this.currentDate.setDate(this.currentDate.getDate() - 6);
      this.startDate = this.datePipe.transform(prevDate, "YYYY-MM-dd") || '';
    }
    else if (this.startDate != "" && this.endDate != ""
    ) {
      this.startDate = this.startDate
      this.endDate = this.endDate
    }
    const requestData = {
      fromDate: this.startDate,
      toDate: this.endDate,
      pageNumber: this.pageNumber,
      pageSize: this.itemsPerPage
    };
    if (this.endDate >= this.startDate) {
    this.commonService.AddUniqueCustomer(requestData).subscribe(
      (response: any) => {

        this.unique_customer = response.List
        this.TotalCount = response.TotalCount;
        if (this.pageNumber == 1) {
          this.startingPoint = 1
        }
        else {
          this.startingPoint = (this.pageNumber - 1) * (this.itemsPerPage) + 1
        }
        this.totalPages = Math.ceil(this.TotalCount / this.itemsPerPage)
        if (this.TotalCount <= this.startingPoint + this.itemsPerPage - 1) {
          this.endingPoint = this.TotalCount
        }
        else {
          this.endingPoint = this.startingPoint + this.itemsPerPage - 1
        }
      },
      (error: any) => {

      });
    } else {
      alert('End Date is less than Start Date')
    }
  }
  exportToCSV() {
    const requestData = {
      fromDate: this.startDate,
      toDate: this.endDate,
      pageNumber: this.pageNumber,
      pageSize: this.itemsPerPage
    };
    this.commonService.UniqueExportCsv(requestData).subscribe(
      (response: any) => {
        console.log('Response Data:', response);
        const a = document.createElement('a');
        a.href = response;
        a.download = 'uniqueReport.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      },
      (error: any) => {
        console.error("error", error)
      }
    );
  }
  nextPage(pageNumber: any) {
    let page = pageNumber + 1
    if (page < this.totalPages + 1) {
      this.pageNumber = page
      this.addUniqueData()
    }
  }
  prevPage(pageNumber: any) {
    if (pageNumber >= 1) {
      let page = pageNumber - 1
      if (page > 0) {
        this.pageNumber = page
      }
    }
    this.addUniqueData()
  }


}
