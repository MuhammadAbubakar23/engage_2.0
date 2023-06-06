import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { TemplateDto } from 'src/app/shared/Models/TemplateDto';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';

@Component({
  selector: 'app-create-message-templates',
  templateUrl: './create-message-templates.component.html',
  styleUrls: ['./create-message-templates.component.scss']
})
export class CreateMessageTemplatesComponent implements OnInit {

  messageTemplate='';
  messageTemplateForm !: FormGroup;
  templateDto = new TemplateDto;


  constructor(
    private commonService : CommonDataService
  ) { 
    this.messageTemplateForm = new FormGroup({
      messageTemplateId : new FormControl(0, Validators.required),
      messageTemplateName : new FormControl('', Validators.required),
      messageTemplateSubject : new FormControl('', Validators.required),
      messageTemplate : new FormControl('', Validators.required),
      templateType : new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
  }

  configureEditor: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter Message here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['']
      ],
    // customClasses: [
    //   {
    //     name: "quote",
    //     class: "quote",
    //   },
    //   {
    //     name: 'redText',
    //     class: 'redText'
    //   },
    //   {
    //     name: "titleText",
    //     class: "titleText",
    //     tag: "h1",
    //   },
    // ]
  };

  createMessageTemplate() {
    
    this.templateDto = {
      id : this.messageTemplateForm.value.messageTemplateId,
      templateName : this.messageTemplateForm.value.messageTemplateName,
      subject : this.messageTemplateForm.value.messageTemplateSubject,
      message : this.messageTemplateForm.value.messageTemplate,
      templateType : "Message",
      companyId : 0
    }

    this.commonService.CreateMessageTemplate(this.templateDto).subscribe((res:any)=>{
      
    })
    
  }

}
