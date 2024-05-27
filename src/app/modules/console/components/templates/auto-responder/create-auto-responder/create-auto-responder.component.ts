import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CKEditorModule } from 'ckeditor4-angular';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
@Component({
  selector: 'app-create-auto-responder',
  templateUrl: './create-auto-responder.component.html',
  styleUrls: ['./create-auto-responder.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, CKEditorModule, FormsModule, ReactiveFormsModule]
})
export class CreateAutoResponderComponent implements OnInit {

  messageForm!: FormGroup;
  name!: string;
  subject!: string;
  editorContent!: string;
  channels = [
    { id: 1, name: 'Facebook' },
    { id: 2, name: 'Twitter' },
    { id: 3, name: 'Linkedin' }
  ];
  companyPages: any[] = [
    {
      name: 'Ibex socialcrm',
      uniqueId: "100507598977567",
      url: null,
      isActive: false
    }
  ];
  selectedEntity: string = "";
  formDisabled = false;
  errorMessage = '';
  editorConfig = {};
  entities: string[] = [];
  showEntitiesDropdown = false;
  templateVariables: string = "";
  
  constructor(private formBuilder: FormBuilder, private commonService: CommonDataService, private router: Router) {
    
  }

  ngOnInit(): void { 
    this.messageForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      // subject: ['', Validators.required],
      template_Message: ['', Validators.required],
      // templateType: ['']
    });
  }

  getEntityProperties(): void {
    if (this.selectedEntity) {
      this.commonService.GetRuleEntityProperties(this.selectedEntity).subscribe(
        (res: any) => {
          this.templateVariables = res.map((entity: any) => `{${entity.entityName}}`).join('');
        },
        (error: any) => {
          console.error('Error fetching entity properties:', error);
        }
      );
    }
  }
  onEntitySelect(event: any): void {
    this.selectedEntity = event.target.value;
    this.getEntityProperties();
  }

  onChangeChannel(event: any): void {
    const channelId = event.target.value;
    if (channelId === '1') {
      this.commonService.GetCompanyPages().subscribe(
        (res: any) => {
          this.companyPages = res;
          if (this.companyPages.length === 0) {
            this.formDisabled = true;
            this.errorMessage = 'No company pages available. Template cannot be created.';
          } else {
            this.formDisabled = false;
            this.errorMessage = '';
          }
        },
        (error: any) => {
          console.error('Error fetching company pages:', error);
          this.formDisabled = true;
          this.errorMessage = 'Error fetching company pages. Template cannot be created.';
        }
      );
    } else {
      this.showEntitiesDropdown = false;
    }
  }

  onPageSelect() {
    this.showEntitiesDropdown = true;
    this.commonService.GetEntitiesRule().subscribe((response: any) => {
      this.entities = response;
    });
  }



  saveForm(): void {
    if (this.messageForm.valid && !this.formDisabled) {
      const updatedTemplate = {
        name: this.messageForm.value.name,
        template_Message: this.messageForm.value.template_Message
      };
      this.commonService.AddFbResponed(updatedTemplate).subscribe(
        (response: any) => {
          this.router.navigate(['/console/templates/auto-responder']);
        },
        (error: any) => {
          console.error('Error creating template:', error);
        }
      );
    } else {
      console.log('Form is invalid or disabled');
    }
  }
  cancelForm(): void {
    this.router.navigate(['/console/templates/auto-responder']);
  }
}
