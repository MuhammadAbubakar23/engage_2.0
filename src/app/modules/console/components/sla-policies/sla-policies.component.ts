import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { HeaderService } from 'src/app/services/HeaderService/header.service';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';

@Component({
  selector: 'app-sla-policies',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, NgxSpinnerModule],
  templateUrl: './sla-policies.component.html',
  styleUrls: ['./sla-policies.component.scss']
})
export class SlaPoliciesComponent implements OnInit {
  messages: any[] = [];
  searchText: string = '';
  selectedSortOption: string = '';
  perPage: number = 15;
  currentPage: number = 1;
  totalCount: any;
  applySearchFilter() {
    if (this.searchText.trim() !== '') {
      this.refreshMessages()
    }
    else {
      this.searchText = '';
      this.refreshMessages()
    }
  }

  refreshMessages() {
    const formData = {
      search: this.searchText,
      sorting: this.selectedSortOption,
      pageNumber: this.currentPage,
      pageSize: this.perPage
    }
    this.spinnerServerice.show()
    this.commonService.GetSlaPolicy(formData).subscribe(
      (response: any) => {
        this.spinnerServerice.hide()

        this.messages = response.SLAPolices;
        this.totalCount = response.TotalCount

      },
      (error: any) => {
        this.spinnerServerice.hide()

        console.error(error);
      }
    );
  }
  constructor(private headerService: HeaderService, 
    private commonService: CommonDataService, 
    private router: Router, 
    private spinnerServerice: NgxSpinnerService) { }

  ngOnInit(): void {
    this.refreshMessages()
  }
  setSortOption(option: string) {

    this.selectedSortOption = option;
    this.refreshMessages();
  }



  updatevalue(string: any) {
    this.headerService.updateMessage(string);
  }

  // editTemplate(message: any) {
  //   this.router.navigate(['/console/sla-policy/create'], {
  //     state: { message }
  //   });
  // }
  editTemplate(message: any) {
    this.router.navigate(['/console/sla-policy/create', message.id]);
  }


  deleteTemplate(message: any) {
    const confirmation = confirm('Are you sure you want to delete this template?');
    if (confirmation) {
      this.commonService.DeleteSlaPolicy(message.id).subscribe(
        () => {
          // Success callback
          console.log('message deleted:', message);
          // Remove the deleted message from the messages array
          this.messages = this.messages.filter((msg) => msg.id !== message.id);
        },
        (error: any) => {
          // Error callback
          console.error('Error deleting template:', error);
        }
      );
    }
  }

  disableTemplate(message: any) {
    // Logic for disabling the template goes here
    console.log('Disabling template:', message);
  }

  cloneTemplate(message: any) {
    const clonedMessage = { ...message };
    clonedMessage.id = this.generateNewId();
    this.messages.push(clonedMessage);
    console.log('Cloning template:', message);
    console.log('Cloned template:', clonedMessage);
  }
  generateNewId() {
    return Math.floor(Math.random() * 100000) + 1;
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
