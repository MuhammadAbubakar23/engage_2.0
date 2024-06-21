import { Injectable } from '@angular/core';
import { Template } from '../../components/templates/template.model';
@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  private templates: Template[] = [];
  constructor() { }
  addTemplate(template: Template): void {
    this.templates.push(template);
  }
  getAllTemplates(): Template[] {
    return this.templates;
  }
}
