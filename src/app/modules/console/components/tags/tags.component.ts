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
  standalone:true,
  imports:[CommonModule, RouterModule , FormsModule],
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  status: string = 'All';
  tags: Tag[] = [];
  perPage: number = 15;
  currentPage: number = 1;
  searchText: string = '';
  applySearchFilter() {
    // Convert the search text to lowercase for case-insensitive search
    const searchTextLower = this.searchText.toLowerCase();
    
    // Filter the messages based on the search text
    this.tags = this.tags.filter((message) => {
      const templateNameLower = (message.name || '').toLowerCase();
 
      return templateNameLower.includes(searchTextLower) || templateNameLower.includes(searchTextLower) 
    });
  }
  
  refreshMessages() {
    this.commonService.GetTags().subscribe(
      (response: any) => {
        this.tags = response;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  constructor(private headerService: HeaderService , private commonService : CommonDataService , private router: Router) { }

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

  updatevalue(string: any) {
    this.headerService.updateMessage(string);
  }

  setStatus(status: string): void {
    this.status = status;
  }

  sortByTickets(): void {
    // Implement sorting logic based on tickets
    this.tags.sort((a, b) => a.tickets - b.tickets);
  }

  sortByContacts(): void {
    // Implement sorting logic based on contacts
    this.tags.sort((a, b) => a.contacts - b.contacts);
  }

  editTag(tag: Tag): void {
    // Implement logic to edit a tag
  this.router.navigate(['console/tag/create/:id'],{
    state:{tag}
  })
  }

  deleteTemplate(message: any) {
    const confirmation = confirm('Are you sure you want to delete this template?');
    if (confirmation) {
      this.commonService.DeleteTags(message.id).subscribe(
        () => {
          // Success callback
          console.log('message deleted:', message);
          // Remove the deleted message from the messages array
          this.tags = this.tags.filter((msg) => msg.id !== message.id);
        },
        (error: any) => {
          // Error callback
          console.error('Error deleting template:', error);
        }
      );
    }
  }
  disableTag(tag: Tag): void {
    // Implement logic to disable a tag
    console.log('Disable tag:', tag);
  }

  // cloneTag(tag: Tag): void {
  //   // Implement logic to clone a tag
  //   console.log('Clone tag:', tag);
  // }
  
  cloneTag(tag: Tag): void {
    // Logic for cloning the template
    const cloneTag = { ...tag }; // Perform a shallow copy of the template
    cloneTag.name += ' (Cloned)';
    // You can modify other properties as well if needed
    this.tags.push(cloneTag);
    console.log('Cloned tag:', cloneTag);
  }

  setPerPage(perPage: number): void {
    this.perPage = perPage;
    this.currentPage = 1; // Reset to the first page
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