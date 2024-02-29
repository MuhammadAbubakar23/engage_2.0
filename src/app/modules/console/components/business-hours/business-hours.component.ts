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
    if(this.searchText.trim() !== ''){
      this.refreshMessages()
    }
    else{
      this.searchText = '';
      this.refreshMessages()
    }
  }
  refreshMessages() {
    const formData = {
      search: this.searchText,
      sorting: this.selectedSortOption,
      pageNumber: 0,
      pageSize: 0
    }
    this.commonService.GetBusinessHours(formData).subscribe(
      (response: any) => {
        this.messages = response.BusinessHours;
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
    this.router.navigate(['/console/business-hours/create',template.id], {
      state: { template }
    });
  }
  
  deleteTemplate(template: any) {
    const confirmation = confirm('Are you sure you want to delete this template?');
    if (confirmation) {
      this.commonService.DeleteBusinessHours(template.id).subscribe(
        () => {
          window.location.reload()

          console.log('Template deleted:', template);
          this.templates = this.templates.filter((msg) => msg.id !== template.id);
        },
        (error: any) => {
          console.error('Error deleting template:', error);
        }
      );
    }
  }
  disableTemplate(template: any) {
    template.disabled = true;
    console.log('Disable template:', template);
  }

  cloneTemplate(template: any) {
    const clonedTemplate = { ...template }; 
    clonedTemplate.name += ' (Cloned)';
    this.templates.push(clonedTemplate);
    console.log('Cloned template:', clonedTemplate);
  }
}
