import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HeaderService } from 'src/app/services/HeaderService/header.service';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';

@Component({
  selector: 'app-business-hours',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './business-hours.component.html',
  styleUrls: ['./business-hours.component.scss']
})
export class BusinessHoursComponent implements OnInit {
  templates!: any[];
  sortOptions: string[] = ['All', 'Ascending', 'Descending'];
  selectedSortOption: string = 'All';
  messages: any;
  searchText: string = '';
  applySearchFilter() {
    const searchTextLower = this.searchText.toLowerCase();
    this.messages = this.messages.filter((message: { templateName: any; }) => {
      const templateNameLower = (message.templateName || '').toLowerCase();
      return templateNameLower.includes(searchTextLower) || templateNameLower.includes(searchTextLower)
    });
  }
  refreshMessages() {
    this.commonService.GetBusinessHours().subscribe(
      (response: any) => {
        this.messages = response;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  sortPolicies() {
    switch (this.selectedSortOption) {
      case 'Ascending':
        this.messages.sort((a: { templateName: string; }, b: { templateName: any; }) => a.templateName.localeCompare(b.templateName));
        break;
      case 'Descending':
        this.messages.sort((a: { templateName: any; }, b: { templateName: string; }) => b.templateName.localeCompare(a.templateName));
        break;
      default:
        break;
    }
  }
  setStatus(status: string): void {
    this.selectedSortOption = status;
    this.sortPolicies();
  }

  constructor(private headerService: HeaderService, private commonService: CommonDataService, private router: Router) { }

  ngOnInit(): void {
    this.commonService.GetBusinessHours()
      .subscribe((response: any) => {
        this.messages = response; // Assign the response to the messages array
        console.log(this.messages); // Verify that the data is populated correctly
      }, (error: any) => {
        console.error(error);
      });
  }

  updatevalue(string: any) {
    this.headerService.updateMessage(string);
  }
  editTemplate(template: any) {
    this.router.navigate(['/console/business-hours/create',template.id], {
      state: { template }
    });
  }
  
  deleteTemplate(template: any) {
    // Confirm deletion with user if needed

    const confirmation = confirm('Are you sure you want to delete this template?');
    if (confirmation) {
      this.commonService.DeleteBusinessHours(template.id).subscribe(
        () => {
          // Success callback
          console.log('Template deleted:', template);
          // Remove the deleted template from the messages array
          this.templates = this.templates.filter((msg) => msg.id !== template.id);
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
