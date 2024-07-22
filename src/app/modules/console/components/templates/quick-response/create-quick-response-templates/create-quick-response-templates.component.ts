import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/services/HeaderService/header.service';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
@Component({
  selector: 'app-create-quick-response-templates',
  templateUrl: './create-quick-response-templates.component.html',
  styleUrls: ['./create-quick-response-templates.component.scss'],
})
export class CreateQuickResponseTemplatesComponent implements OnInit {
  messageForm!: FormGroup;
  editorContent!: string;
  editorConfig = {};
  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonDataService,
    private router: Router,
    private headerService: HeaderService
  ) {}
  ngOnInit(): void {
    this.messageForm = this.formBuilder.group({
      text: ['', Validators.required],
    });
    const template = history.state.template;
    if (template) {
      this.editorContent = template.text;
      this.messageForm.patchValue({
        text: this.editorContent,
      });
    } else {
      this.editorContent = '';
    }
  }
  saveForm() {
    if (this.messageForm.valid) {
      const messageContentValue = this.messageForm.value.text;
      const strippedMessageContent = messageContentValue.replace(
        /<[^>]+>|&nbsp;/g,
        ''
      );
      const formData = {
        text: strippedMessageContent,
      };
      const template = history.state.template;
      if (template) {
        this.commonService.UpdateQuickReply(template.id, formData).subscribe(
          (response: any) => {
            this.router.navigate(['/console/templates/quick-response']);
          },
          (error: any) => {
            console.error('Failed to update template', error);
          }
        );
      } else {
        this.commonService.AddQuickReply(formData).subscribe(
          (response: any) => {
            this.router.navigate(['/console/templates/quick-response']);
          },
          (error: any) => {
            console.error('Failed to create template', error);
          }
        );
      }
    } else {
    }
  }
  cancelForm(): void {
    this.router.navigate(['/console/templates/quick-responses']);
    this.headerService.updateMessage('templates/quick-responses');
  }
}
