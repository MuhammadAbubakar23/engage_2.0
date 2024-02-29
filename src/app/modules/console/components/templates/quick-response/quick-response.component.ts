import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { observable } from 'rxjs';
import { HeaderService } from 'src/app/services/HeaderService/header.service';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';

@Component({
  selector: 'app-quick-response',
  templateUrl: './quick-response.component.html',
  styleUrls: ['./quick-response.component.scss']
})
export class QuickResponseComponent implements OnInit {
  templates!: any[];
  sortOptions: string[] = ['All', 'Ascending', 'Descending'];
  selectedSortOption: string = 'All';
  messages: any;
  searchText: string = '';
  applySearchFilter() {
    if (this.searchText.trim() !== '') {
      this.refreshMessages();
    } else {

      this.searchText = '';
      this.refreshMessages();
    }

  }
  setSortOption(option: string) {
    
    this.selectedSortOption = option;
    this.refreshMessages(); 
  }
  
  refreshMessages() {
    const formData ={
      search: this.searchText,
      sorting: this.selectedSortOption,
      pageNumber: 0,
      pageSize: 0,
    }
    this.commonService.GetQuickReply(formData).subscribe(
      (response: any) => {
        this.messages = response.QuickReply;
        // Apply sorting after refreshing messages
        this.sortMessages();
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  
  sortMessages() {
    switch (this.selectedSortOption) {
      case 'Ascending':
        this.messages.sort((a: { text: string; }, b: { text: any; }) => a.text.localeCompare(b.text));
        break;
      case 'Descending':
        this.messages.sort((a: { text: any; }, b: { text: string; }) => b.text.localeCompare(a.text));
        break;
      default:
        break;
    }
  }
  
  constructor(private headerService: HeaderService, private commonService: CommonDataService, private router: Router) { }

  ngOnInit(): void {
   this.refreshMessages()
  }

  updatevalue(string: any) {
    this.headerService.updateMessage(string);
  }
  editTemplate(template: any) {
    this.router.navigate(['/console/createresponse'], {
      state: { template }
    });
  }


  deleteTemplate(template: any) {
    // Confirm deletion with user if needed

    const confirmation = confirm('Are you sure you want to delete this template?');
    if (confirmation) {
      this.commonService.DeleteQuickReply(template.id).subscribe(
        () => {
          // Success callback
          console.log('Template deleted:', template);
          // Remove the deleted template from the messages array
          this.messages = this.messages.filter((msg: { id: any; }) => msg.id !== template.id);
        },
        (error: any) => {
          // Error callback
          console.error('Error deleting template:', error);
        }
      );
    }
  }


  disableTemplate(template: any) {
    // Logic for disabling the template
    template.disabled = true;
    console.log('Disable template:', template);
  }

  cloneTemplate(template: any) {
    // Logic for cloning the template
    const clonedTemplate = { ...template }; // Perform a shallow copy of the template
    clonedTemplate.name += ' (Cloned)';
    // You can modify other properties as well if needed
    this.templates.push(clonedTemplate);
    console.log('Cloned template:', clonedTemplate);
  }
}
