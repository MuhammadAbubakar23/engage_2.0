import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
@Component({
  selector: 'app-create-quick-response-templates',
  templateUrl: './create-quick-response-templates.component.html',
  styleUrls: ['./create-quick-response-templates.component.scss']
})
export class CreateQuickResponseTemplatesComponent implements OnInit {
  messageForm!: FormGroup;
  editorContent!: string;
  editorConfig = {};
  constructor(private formBuilder: FormBuilder, private commonService: CommonDataService, private router: Router) { }
  ngOnInit(): void {
    this.messageForm = this.formBuilder.group({
      messageContent: ['', Validators.required]
    });

    const template = history.state.template; // Get the template value from the state
    if (template) {
      // Update the form values with the selected template
      this.editorContent = template.message;
      // You can also set other form fields if needed
      this.messageForm.patchValue({
        messageContent: this.editorContent
      });
    } else {
      // Set initial values when no template is selected
      this.editorContent = '';
    }
  }
  saveForm() {
    if (this.messageForm.valid) {
      const messageContentValue = this.messageForm.value.messageContent;
      const strippedMessageContent = messageContentValue.replace(/<[^>]+>|&nbsp;/g, '');

      const formData = {
        text: strippedMessageContent
      };
      const template = history.state.template; // Get the template value from the state
      if (template) {
        // Update existing template
        this.commonService.UpdateQuickReply(template.id, formData).subscribe(
          (response: any) => {
            // Handle the successful API response here
            // console.log('Template updated successfully', response);
            this.router.navigate(['/console/templates/quickResponse']);
          },
          (error: any) => {
            // Handle any API errors here
            console.error('Failed to update template', error);
          }
        );
      } else {
        // Create new template
        // Remove the tags and &nbsp; from the form data before sending the request
        const strippedFormData = {
          text: strippedMessageContent
        };

        this.commonService.AddQuickReply(strippedFormData).subscribe(
          (response: any) => {
            // Handle the successful API response here
            // console.log('Template created successfully', response);
            this.router.navigate(['/console/templates/quickResponse']);
          },
          (error: any) => {
            // Handle any API errors here
            console.error('Failed to create template', error);
          }
        );
      }
    } else {
      // Handle form validation errors
      // console.log('Form is invalid');
    }
  }



  cancelForm(): void {
    this.router.navigate(['/console/templates/quickResponse']);

  }
}