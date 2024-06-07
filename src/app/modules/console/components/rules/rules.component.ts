import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { HeaderService } from 'src/app/services/HeaderService/header.service';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
@Component({
  selector: 'app-rules',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, NgxSpinnerModule],
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent implements OnInit {
  tableData = [{ name: '', description: '', rulesJson: '' },];
  searchText: string = '';
  perPage: number = 15;
  currentPage: number = 1;
  totalCount: any;
  applySearchFilter() {
    if (this.searchText.trim() !== '') {
      this.refreshtableData()
    }
    else {
      this.searchText = '';
      this.refreshtableData()
    }
  }

  refreshtableData() {
    const data = {
      search: this.searchText,
      sorting: this.selectedSortOption,
      pageNumber: this.currentPage,
      pageSize: this.perPage
    }
    this.spinnerServerice.show()
    this.commonService.GetAllRules(data).subscribe(
      (response: any) => {
        this.spinnerServerice.hide()
        this.tableData = response.Rules;
        this.totalCount = response.TotalCount

      },
      (error: any) => {
        this.spinnerServerice.hide()

        console.error(error);
      }
    );
  }
  selectedSortOption: any;

  setSortOption(option: string) {

    this.selectedSortOption = option;
    this.refreshtableData();
  }
  constructor(private headerService: HeaderService, private commonService: CommonDataService, private router: Router, private spinnerServerice: NgxSpinnerService) { }
  ngOnInit(): void {
    this.refreshtableData()
  }
  updatevalue(string: any) {
    this.headerService.updateMessage(string);
  }
  editTemplate(message: any) {

    this.router.navigate(['/console/add-rules', message.id])
  }
  canEditOrDelete(row: any): boolean {
    // Add your condition here, for example:
    return row.companyId !== 0;
  }

  deleteTemplate(message: any) {

    const confirmation = confirm('Are you sure you want to delete this template?');
    if (confirmation) {
      this.commonService.DeleteRules(message.groupId).subscribe(
        () => {
          this.tableData = this.tableData.filter((msg: any) => msg.id !== message.id);

        },
        (error: any) => {
          console.error('Error deleting template:', error);
        }
      );
    }
  }
  disableTemplate(message: any) {
  }
  cloneTemplate(message: any) {
  }
  setPerPage(perPage: number): void {
    this.perPage = perPage;
    this.currentPage = 1;
    this.refreshtableData()
  }
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
    this.refreshtableData()
  }
  nextPage(): void {
    const maxPages = Math.ceil(this.totalCount / this.perPage);
    if (this.currentPage < maxPages) {
      this.currentPage++;
    }
    this.refreshtableData()
  }
  goToPage(pageNumber: number): void {

    if (pageNumber >= 1 && pageNumber <= Math.ceil(this.totalCount / this.perPage)) {
      this.currentPage = pageNumber;
    }
    this.refreshtableData()
  }

  getVisiblePageNumbers(): number[] {
    const maxPages = Math.ceil(this.totalCount / this.perPage);
    const visiblePages = 5;

    let startPage = Math.max(1, this.currentPage - Math.floor(visiblePages / 2));
    let endPage = Math.min(startPage + visiblePages - 1, maxPages);

    if (endPage - startPage + 1 < visiblePages) {
      startPage = Math.max(1, endPage - visiblePages + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }
}
