import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HeaderService } from 'src/app/services/HeaderService/header.service';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
interface Tag {
  id: any;
  name: string;
  tickets: number;
  contacts: number;
}
@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  status: string = 'All';
  tags: Tag[] = [];
  perPage: number = 15;
  currentPage: number = 1;
  searchText: string = '';
  applySearchFilter(): void {
    // Convert the search text to lowercase for case-insensitive search
    const searchTextLower = this.searchText.toLowerCase();
  
    // Filter the tags based on the search text
    this.tags = this.tags.filter((tag) => {
      const tagNameLower = (tag.name || '').toLowerCase();
      return tagNameLower.includes(searchTextLower);
    });
  
    // Apply sorting after filtering
    this.sortTags();
  }
  refreshMessages() {
    this.commonService.GetTags().subscribe(
      (response: any) => {
        this.tags = response;
        // Apply sorting after refreshing tags
        this.sortTags();
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  constructor(private headerService: HeaderService, private commonService: CommonDataService, private router: Router) { }
  ngOnInit(): void {
    this.getTags();
  }
  getTags(): void {
    this.commonService.GetTags()
      .subscribe((response: any) => {
        this.tags = response; // Assign the response to the messages array
        console.log(this.tags); // Verify that the data is populated correctly
      }, (error: any) => {
        console.error(error);
      });
  }
  sortTags(): void {
    switch (this.status) {
      case 'Ascending':
        this.tags.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Descending':
        this.tags.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'Tickets':
        this.tags.sort((a, b) => a.tickets - b.tickets);
        break;
      case 'Contacts':
        this.tags.sort((a, b) => a.contacts - b.contacts);
        break;
      default:
        // For 'All', no sorting is required
        break;
    }
  }
  
  updatevalue(string: any) {
    this.headerService.updateMessage(string);
  }
  setStatus(status: string): void {
    this.status = status;
  }
  sortByTickets(): void {
    this.tags.sort((a, b) => a.tickets - b.tickets);
  }
  sortByContacts(): void {
    this.tags.sort((a, b) => a.contacts - b.contacts);
  }
  editTag(tag: Tag): void {
    this.router.navigate(['console/tag/create/:id'], {
      state: { tag }
    })
  }
  deleteTemplate(message: any) {
    const confirmation = confirm('Are you sure you want to delete this template?');
    if (confirmation) {
      this.commonService.DeleteTags(message.id).subscribe(
        () => {
          console.log('message deleted:', message);
           this.tags = this.tags.filter((msg) => msg.id !== message.id);
        },
        (error: any) => {
          console.error('Error deleting template:', error);
        }
      );
    }
  }
  disableTag(tag: Tag): void {
    console.log('Disable tag:', tag);
  }
  cloneTag(tag: Tag): void {
    const cloneTag = { ...tag }; 
    cloneTag.name += ' (Cloned)';
    this.tags.push(cloneTag);
    console.log('Cloned tag:', cloneTag);
  }
  setPerPage(perPage: number): void {
    this.perPage = perPage;
    this.currentPage = 1; 
  }
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  nextPage(): void {
    const maxPages = Math.ceil(this.tags.length / this.perPage);
    if (this.currentPage < maxPages) {
      this.currentPage++;
    }
  }
  goToPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= Math.ceil(this.tags.length / this.perPage)) {
      this.currentPage = pageNumber;
    }
  }
  getPageNumbers(): number[] {
    const maxPages = Math.ceil(this.tags.length / this.perPage);
    return Array.from({ length: maxPages }, (_, i) => i + 1);
  }
}