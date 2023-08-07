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
    // Convert the search text to lowercase for case-insensitive search
    const searchTextLower = this.searchText.toLowerCase();
    
    // Filter the messages based on the search text
    this.messages = this.messages.filter((message) => {
      const templateNameLower = (message.templateName || '').toLowerCase();
      const subjectLower = (message.subject || '').toLowerCase();
      
      return templateNameLower.includes(searchTextLower) || subjectLower.includes(searchTextLower);
    });
    this.sortMessages();

  }
  
  refreshMessages() {
    this.commonService.GetAllMessages('Message').subscribe(
      (response: any) => {
        this.messages = response;
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
        this.messages.sort((a, b) => a.templateName.localeCompare(b.templateName));
        break;
      case 'Descending':
        this.messages.sort((a, b) => b.templateName.localeCompare(a.templateName));
        break;
      default:
        // For 'All', no sorting is required
        break;
    }
  }
  constructor(private headerService: HeaderService ,private commonService: CommonDataService , private router: Router ) { }

  ngOnInit(): void {
   this.commonService.GetAllMessages('Message')
  .subscribe((response: any) => {
    this.messages = response; 
    // console.log(this.messages); 
  }, (error: any) => {
    console.error(error);
  });

  }
  updatevalue(string:any){
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
