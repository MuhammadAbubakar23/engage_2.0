import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { HeaderService } from 'src/app/services/HeaderService/header.service';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';

@Component({
  standalone: true,
  selector: 'app-queues',
  templateUrl: './queues.component.html',
  styleUrls: ['./queues.component.scss'],
  imports: [CommonModule, RouterModule, FormsModule , NgxSpinnerModule],
})
export class QueuesComponent implements OnInit {
  templates!: any[];
  sortOptions: string[] = ['All', 'Ascending', 'Descending'];
  selectedSortOption: string = 'All';
  skills!: any[];
  searchText: string = '';
  perPage: number = 15;
  currentPage: number = 1;
  totalCount: any;
  applySearchFilter() {
    if(this.searchText.length> 2){
      this.refreshMessages()
    }
    if(this.searchText.length == 0){
      this.refreshMessages()
    }
  }
  refreshMessages() {
    const formData = {
      search: this.searchText,
      sorting: this.selectedSortOption,
      pageNumber: this.currentPage,
      pageSize: this.perPage,
    }
    this.spinnerServerice.show()
    this.commonService.GetAllSkills(formData).subscribe(
      (response: any) => {
        this.spinnerServerice.hide()
        this.skills = response.Skills;
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
  constructor(private headerService: HeaderService, private commonService: CommonDataService, private router: Router , private spinnerServerice: NgxSpinnerService) { }
  ngOnInit(): void {
    this.refreshMessages()
  }
  updatevalue(string: any) {
    this.headerService.updateMessage(string);
  }
  editTemplate(template: any) {
    this.router.navigate(['/console/queues/create', template.skillTeamId], {
      state: { template }
    });
  }
  deleteTemplate(template: any) {
    const confirmation = confirm('Are you sure you want to delete this queue?');
    if (confirmation) {
      this.commonService.DeleteTagTeam(template.skillTeamId).subscribe(
        () => {
          
          window.location.reload()
          this.skills = this.skills.filter((msg) => msg.skillTeamId !== template.skillTeamId);
        },
        (error: any) => {
          console.error('Error deleting template:', error);
        }
      );
    }
  }
  disableTemplate(template: any) {
    template.disabled = true;
  }
  cloneTemplate(template: any) {
    const clonedTemplate = { ...template };
    clonedTemplate.name += ' (Cloned)';
    this.templates.push(clonedTemplate);
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
