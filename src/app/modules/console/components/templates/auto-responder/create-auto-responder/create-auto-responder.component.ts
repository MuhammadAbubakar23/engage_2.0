import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CKEditorModule } from 'ckeditor4-angular';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { entries } from 'lodash';
import { number } from 'echarts';
@Component({
  selector: 'app-create-auto-responder',
  templateUrl: './create-auto-responder.component.html',
  styleUrls: ['./create-auto-responder.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, CKEditorModule, FormsModule, ReactiveFormsModule]
})
export class CreateAutoResponderComponent implements OnInit {
  assingClients: any;
  selectedFruits: any;
  switchId = 'flexSwitchCheckChecked';
  newtempletvaiablesArray: any[] = []
  messageForm!: FormGroup;
  name!: string;
  subject!: string;
  editorContent!: string;
  channels :any[]=[];
  content :any[]= [];
  editorConfig = {};
  entities: any[] = [];
  currentTags: any[] = [];
  templateVariables: string = "";
  constructor(
    private formBuilder: FormBuilder
    , private commonService: CommonDataService
    , private router: Router) {
  }
  ngOnInit() {
    this.messageForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      description: ['', Validators.required],
      template_Message: ['',],
      entityName: ['',],
      ruleTag: ['', Validators.required],
      variables: ['',],
      status: [true,],
      contentType: ['',],
    });
    this.loadPlatform();
    this.getAutoResponderTag()
  }
  loadPlatform() {
    this.commonService.GetServicetree().subscribe((res: any) => {
      this.channels = res
    });
  }
  getAutoResponderTag() {
    this.commonService.GetRuleTag(13).subscribe(
      (response: any) => {
        this.currentTags = response
      },
      (error: any) => {
        console.error('Error fetching rule tags:', error);
      }
    );
  }
  loadTemplateVariables(templateVariable: any) {
    this.editorContent += templateVariable.entityName;
  }
  updateFormVariables() {
    const variables = this.newtempletvaiablesArray.map(variable => variable.entityName).join(', ');
    this.messageForm.get('variables')?.setValue(variables);
  }
  onChangeChannel(event: any) {
    this.entities=[]
    this.newtempletvaiablesArray=[]
    const channelName = event.target.value;
    const selectedChannel = this.channels.find(channel => channel.name === channelName);
    if (selectedChannel) {
      this.content = selectedChannel.subService;
      this.entities = []; 
    }
  }
  getEntites(event:any){
    this.entities=[]
    this.newtempletvaiablesArray=[]
    const contentType= event.target.value
    this.content.forEach((table:any)=>{
    if(contentType==table.prefix){
      this.entities.push(table.name)
    }
    })
  }
  getTableProperites(event:any){
    const tableproperties=event.target.value
    this.content.forEach((loadproperties:any)=>{
      if(tableproperties==loadproperties.name){
        const template=loadproperties.subService
        template.forEach((x:any)=>{
          this.newtempletvaiablesArray.push({
            id: x.id,
            entityName: `{${x.name}}`
          });
        })
      }
    })
    this.updateFormVariables();
  }
  saveForm() {
    if (this.messageForm.valid) {
      const obj = {
        id:0,
        companyId: 0,
        uniqueId: "",
        name: this.messageForm.value.name,
        description: this.messageForm.value.description,
        template_Message: this.messageForm.value.template_Message,
        entityName: this.messageForm.value.entityName,
        ruleTag: this.messageForm.value.ruleTag,
        variables: this.messageForm.value.variables,
        status: this.messageForm.value.status,
        contentType: this.messageForm.value.contentType
      };
      this.commonService.AddFbResponed(obj).subscribe(
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
  cancelForm() {
    this.router.navigate(['/console/templates/auto-responder']);
  }
}
