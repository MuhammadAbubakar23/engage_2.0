import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/services/HeaderService/header.service';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';

@Component({
  selector: 'app-signatures',
  templateUrl: './signatures.component.html',
  styleUrls: ['./signatures.component.scss']
})
export class SignaturesComponent implements OnInit {
  signatures: any[] = [];

  selectedSortOption: string = 'All';
  searchText: string = '';
  applySearchFilter() {
    const searchTextLower = this.searchText.toLowerCase();
    this.signatures = this.signatures.filter((signature) => {
      const templateNameLower = (signature.templateName || '').toLowerCase();
      const subjectLower = (signature.subject || '').toLowerCase();
      return templateNameLower.includes(searchTextLower) || subjectLower.includes(searchTextLower);
    });
    this.sortSignatures();
  }
  refreshMessages() {
    this.commonService.GetAllMessages('Signature').subscribe(
      (response: any) => {
        this.signatures = response;
        this.sortSignatures();
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  
  sortSignatures() {
    switch (this.selectedSortOption) {
      case 'Ascending':
        this.signatures.sort((a, b) => a.templateName.localeCompare(b.templateName));
        break;
      case 'Descending':
        this.signatures.sort((a, b) => b.templateName.localeCompare(a.templateName));
        break;
      default:
        break;
    }
  }
  
  constructor(private headerService: HeaderService ,private commonService: CommonDataService , private router: Router ) { }

  ngOnInit(): void {
   this.commonService.GetAllMessages('Signature')
  .subscribe((response: any) => {
    this.signatures = response; // Assign the response to the signatures array
    // console.log(this.signatures); // Verify that the data is populated correctly
  }, (error: any) => {
    console.error(error);
  });

  }
  updatevalue(string:any){
    this.headerService.updateMessage(string);
  }
  editTemplate(template: any) {
   
      this.router.navigate(['/console/templates/createSignatures'], {
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
          this.signatures = this.signatures.filter((msg) => msg.id !== template.id);
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
    this.signatures.push(clonedTemplate);
    // console.log('Cloned template:', clonedTemplate);
  }
  }
