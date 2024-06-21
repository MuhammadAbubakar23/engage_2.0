import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HeaderService } from 'src/app/services/HeaderService/header.service';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
@Component({
  selector: 'app-signatures',
  templateUrl: './signatures.component.html',
  styleUrls: ['./signatures.component.scss']
})
export class SignaturesComponent implements OnInit {
  signatures: any[] = [];
  selectedSortOption: string = '';
  searchText: string = '';
  perPage: number = 15;
  currentPage: number = 1;
  totalCount: any;
  applySearchFilter() {
    if (this.searchText.trim() !== '') {
      this.refreshMessages();
    } else {
      this.searchText = '';
      this.refreshMessages();
    }
  }
  refreshMessages() {
    const formData = {
      search: this.searchText,
      sorting: this.selectedSortOption,
      pageNumber: this.currentPage,
      pageSize: this.perPage,
      templateType: "Signature"
    }
    this.spinnerServerice.show()
    this.commonService.GetAllMessages(formData).subscribe(
      (response: any) => {
        this.spinnerServerice.hide()
        this.signatures = response.Templates;
        this.totalCount = response.TotalCount
      },
      (error: any) => {
        this.spinnerServerice.hide()
        console.error(error);
      }
    );
  }
  setSortOption(option: string) {
    this.selectedSortOption = option;
    this.refreshMessages(); 
  }
  constructor(private headerService: HeaderService ,private commonService: CommonDataService , private router: Router,
    private spinnerServerice: NgxSpinnerService ) { }
  ngOnInit(): void {
   this.refreshMessages()
  }
  updatevalue(string:any){
    this.headerService.updateMessage(string);
  }
  editTemplate(template: any) {
      this.router.navigate(['/console/templates/createSignatures'], {
        state: { template }
      });
  }
  deleteTemplate(template: any) {
    // Confirm deletion with user if needed
    const confirmation = confirm('Are you sure you want to delete this template?');
    if (confirmation) {
      this.commonService.DeleteMessage(template.id).subscribe(
        () => {
          // Success callback
          // Remove the deleted template from the messages array
          this.signatures = this.signatures.filter((msg) => msg.id !== template.id);
        },
        (error: any) => {
          // Error callback
        }
      );
    }
  }
  disableTemplate(template: any) {
    // Logic for disabling the template
    template.disabled = true;
  }
  cloneTemplate(template: any) {
    // Logic for cloning the template
    const clonedTemplate = { ...template }; // Perform a shallow copy of the template
    clonedTemplate.name += ' (Cloned)';
    // You can modify other properties as well if needed
    this.signatures.push(clonedTemplate);
  }
  setPerPage(perPage: number): void {
    this.perPage = perPage;
    this.currentPage = 1;
    this.refreshMessages()
  }
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
    this.refreshMessages()
  }
  nextPage(): void {
    const maxPages = Math.ceil(this.totalCount / this.perPage);
    if (this.currentPage < maxPages) {
      this.currentPage++;
    }
    this.refreshMessages()
  }
  goToPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= Math.ceil(this.totalCount / this.perPage)) {
      this.currentPage = pageNumber;
    }
    this.refreshMessages()
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
