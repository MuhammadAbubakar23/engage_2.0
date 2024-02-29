import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { observable } from 'rxjs';
import { HeaderService } from 'src/app/services/HeaderService/header.service';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';


@Component({
  selector: 'app-messages',

  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  messages: any[] = [];
  sortOptions: string[] = ['All', 'Ascending', 'Descending'];
  selectedSortOption: string = 'All';
  searchText: string = '';
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
      pageNumber: 0,
      pageSize: 0,
      templateType: "Message"
    }
    this.commonService.GetAllMessages(formData).subscribe(
      (response: any) => {
        this.messages = response.Templates;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }


  setSortOption(option: string) {
    
    this.selectedSortOption = option;
    this.refreshMessages(); 
  }
  
  constructor(private headerService: HeaderService, private commonService: CommonDataService, private router: Router) { }

  ngOnInit(): void {

    this.refreshMessages()

  }
  updatevalue(string: any) {
    this.headerService.updateMessage(string);
  }
  editTemplate(template: any) {

    this.router.navigate(['/console/templates/messages/create'], {
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
          // console.log('Template deleted:', template);
          // Remove the deleted template from the messages array
          this.messages = this.messages.filter((msg) => msg.id !== template.id);
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
    // console.log('Disable template:', template);
  }

  cloneTemplate(template: any) {
    // Logic for cloning the template
    const clonedTemplate = { ...template }; // Perform a shallow copy of the template
    clonedTemplate.name += ' (Cloned)';
    // You can modify other properties as well if needed
    this.messages.push(clonedTemplate);
    // console.log('Cloned template:', clonedTemplate);
  }
}
