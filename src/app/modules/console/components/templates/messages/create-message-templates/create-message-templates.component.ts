import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
@Component({
  selector: 'app-create-message-templates',
  templateUrl: './create-message-templates.component.html',
  styleUrls: ['./create-message-templates.component.scss']
})
export class CreateMessageTemplatesComponent implements OnInit {
  messageForm!: FormGroup;
  templateName!: string;
  subject!: string;
  editorContent!: string;
  editorConfig = {
    // Add any desired configuration options here
  };
  constructor(private formBuilder: FormBuilder, private commonService: CommonDataService, private router: Router) { }
  ngOnInit(): void {
    this.messageForm = this.formBuilder.group({
      templateName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
      templateType:['']
    });
    const template = history.state.template; // Get the template value from the state
    if (template) {
      // Update the form values with the selected template
      this.templateName = template.templateName;
      this.subject = template.subject;
      this.editorContent = template.message;
      // You can also set other form fields if needed
      this.messageForm.patchValue({
        templateName: this.templateName,
        subject: this.subject,
        message: this.editorContent
      });
    } else {
      // Set initial values when no template is selected
      this.templateName = 'Complaint';
      this.subject = '';
      this.editorContent = '';
    }
  }
  saveForm() {
    if (this.messageForm.valid) {
      this.messageForm.patchValue({
        templateType: "Message"
      });
      const template = history.state.template; // Get the template value from the state
      if (template) {
        const updatedTemplate = {
          ...template,
          templateName: this.messageForm.value.templateName,
          subject: this.messageForm.value.subject,
          message: this.messageForm.value.message
        };
        this.commonService.UpdateTemplate(updatedTemplate.id, updatedTemplate).subscribe(
          (response: any) => {
            // Handle the successful response after updating the template
            this.router.navigate(['/console/templates/message']);
          },
          (error: any) => {
            // Handle the error if the update fails
            console.error('Error updating template:', error);
          }
        );
      } else {
        this.commonService.Addtemplate(this.messageForm.value).subscribe(
          (response: any) => {
            // Handle the successful response after creating a new template
            this.router.navigate(['/console/templates/message']);
          },
          (error: any) => {
            // Handle the error if the template creation fails
            console.error('Error creating template:', error);
          }
        );
      }
    } else {
      // Handle form validation errors
    }
  }
  cancelForm(): void {
    // Redirect to the main page without resetting the form
    this.router.navigate(['/console/templates/message']);
  }
}