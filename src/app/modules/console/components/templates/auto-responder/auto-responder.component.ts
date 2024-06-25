import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { HeaderService } from 'src/app/services/HeaderService/header.service';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
@Component({
  selector: 'app-auto-responder',
  templateUrl: './auto-responder.component.html',
  styleUrls: ['./auto-responder.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, NgxSpinnerModule, FormsModule]
})
export class AutoResponderComponent implements OnInit {
  templates:any[] = [];
  channels:any[] = [];
  searchText: string = '';
  perPage: number = 15;
  currentPage: number = 1;
  totalCount: any;
  selectedChannel = '';
  channelRules: any
  constructor(private headerService: HeaderService, private commonData: CommonDataService, private spinnerServerice: NgxSpinnerService) { }
  ngOnInit(): void {
    this.refreshtableData()
    this.loadServices()
  }
  updatevalue(string: any) {
    this.headerService.updateMessage(string);
  }
  applySearchFilter() {
    if (this.searchText.trim() !== '') {
      this.refreshtableData()
    }
    else {
      this.searchText = '';
      this.refreshtableData()
    }
  }
  onChannelChange(event: any) {
    const selectedChannelId = event.target.value;
    this.selectedChannel = this.channels.find(channel => channel.id == selectedChannelId)?.name || 'Engage';
    this.refreshtableData();
  }
  loadAPI(){
    this.refreshtableData()
  }
  loadServices(): void {
    this.commonData.GetPlatorm().subscribe(
      (response: any) => {
        this.channels = Object.keys(response).map(key => ({
          id: parseInt(key),
          name: response[key]
        }));
      },
      (error: any) => {
        console.error('Error fetching services:', error);
      }
    );
  }
  toggleStatus(template: any) {
    this.commonData.GetTemplateStatus(template.uniqueId).subscribe(
      (response: any) => {
        template.status = !template.status;
      },
      (error: any) => {
        console.error('Error toggling status:', error);
      }
    );
  }
  refreshtableData() {
    const data = {
      search: this.searchText,
      sorting: this.selectedSortOption,
      pageNumber: this.currentPage,
      pageSize: this.perPage
    };
    this.spinnerServerice.show();
    // if (this.selectedChannel === 'Facebook') {
      this.commonData.getAutoRespondFB(data).subscribe(
        (response: any) => {
          this.spinnerServerice.hide();
          this.templates = response.Rules
          this.totalCount = response.TotalCount;
        },
        (error: any) => {
          this.spinnerServerice.hide();
          console.error(error);
        }
      );
    // }
    // else {
    //   this.commonData.GetAllRules(data).subscribe(
    //     (response: any) => {
    //       this.spinnerServerice.hide();
    //      this.templates=response
    //       this.totalCount = response.TotalCount;
    //     },
    //     (error: any) => {
    //       this.spinnerServerice.hide();
    //       console.error(error);
    //     }
    //   );
    // }
    // this.commonData.getAutoRespondFB(nativeIdentifier).subscribe((res: any) => {
    //   console.log("data fb ", res)
    //   this.templates = res
    // })
  }
  selectedSortOption: any;
  deleteTemplate(template: any) {
    const confirmation = confirm('Are you sure you want to delete this template?');
    if (confirmation) {
      this.commonData.DeleteTemplate(template.uniqueId).subscribe(
        () => {
          this.templates = this.templates.filter((msg) => msg.uniqueId !== template.uniqueId);
        },
        (error: any) => {
          console.error('Error deleting template:', error);
        }
      );
    }
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
