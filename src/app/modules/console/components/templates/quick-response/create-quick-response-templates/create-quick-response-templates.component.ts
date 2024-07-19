import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HeaderService } from 'src/app/services/HeaderService/header.service';
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
  templates!: any[];
  sortOptions: string[] = ['All', 'Ascending', 'Descending'];
  selectedSortOption: string = 'All';
  messages: any;
  searchText: string = '';
  perPage: number = 15;
  currentPage: number = 1;
  totalCount: any;
  parentId:number = 0;

  constructor(private headerService: HeaderService,private spinnerServerice: NgxSpinnerService,
     private formBuilder: FormBuilder, private commonService: CommonDataService, private router: Router) { }
  ngOnInit(): void {
    this.refreshMessages();
    this.messageForm = this.formBuilder.group({
      parentId:1,
      baseId:1,
      text: ['', Validators.required],
      parentText: ''
    });
    const template = history.state.template; 
    if (template) {
      this.editorContent = template.text;
      this.messageForm.patchValue({
        text: this.editorContent
      });
    } else {
      this.editorContent = '';
    }
  }
  saveForm() {
    if (this.messageForm.valid) {
      // const messageContentValue = this.messageForm.value.text;
      // const strippedMessageContent = messageContentValue.replace(/<[^>]+>|&nbsp;/g, '');
      const formData = {
        text: this.messageForm.value.text,
        baseId: this.messageForm.value.baseId,
        parentId: this.parentId > 0 ? this.parentId : this.messageForm.value.parentId
      };
      const template = history.state.template;
      if (template) {
        this.commonService.UpdateQuickReply(template.id, formData).subscribe(
          (response: any) => {
            this.router.navigate(['/console/templates/quick-responses']);
          },
          (error: any) => {
            console.error('Failed to update template', error);
          }
        );
      } else {
        this.commonService.AddQuickReply(formData).subscribe(
          (response: any) => {
            this.router.navigate(['/console/templates/quick-responses']);
          },
          (error: any) => {
            console.error('Failed to create template', error);
          }
        );
      }
    } else {
    }
  }

  onParentSelection(template:any)
  {
    this.parentId = template.id;
    const updatedValues = {
      parentText: template.text
    };
    this.messageForm.patchValue(updatedValues);
    this.messageForm.get('parentText')?.disable();
  }


  cancelForm(): void {
    this.router.navigate(['/console/templates/quick-responses']);
  }


  applySearchFilter() {
    if (this.searchText.trim() !== '') {
      this.refreshMessages();
    } else {
      this.searchText = '';
      this.refreshMessages();
    }
  }
  setSortOption(option: string) {
    this.selectedSortOption = option;
    this.refreshMessages();
  }
  refreshMessages() {
    const formData ={
      search: this.searchText,
      sorting: this.selectedSortOption,
      pageNumber: this.currentPage,
      pageSize: this.perPage,
    }
    this.spinnerServerice.show()
    this.commonService.GetActiveQuickReply(formData).subscribe(
      (response: any) => {
        this.spinnerServerice.hide()
        this.messages = response.QuickReply;
        this.totalCount = response.TotalCount
        // Apply sorting after refreshing messages
        this.sortMessages();
      },
      (error: any) => {
        this.spinnerServerice.hide()
        console.error(error);
      }
    );
  }
  sortMessages() {
    switch (this.selectedSortOption) {
      case 'Ascending':
        this.messages.sort((a: { text: string; }, b: { text: any; }) => a.text.localeCompare(b.text));
        break;
      case 'Descending':
        this.messages.sort((a: { text: any; }, b: { text: string; }) => b.text.localeCompare(a.text));
        break;
      default:
        break;
    }
  }

  updatevalue(string: any) {
    this.headerService.updateMessage(string);
  }
  editTemplate(template: any) {
    this.router.navigate(['/console/createresponse'], {
      state: { template }
    });
  }
  setPerPage(perPage: number): void {
    this.perPage = perPage;
    this.currentPage = 1;
    this.refreshMessages()
  }
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
    this.refreshMessages()
  }
  nextPage(): void {
    const maxPages = Math.ceil(this.totalCount / this.perPage);
    if (this.currentPage < maxPages) {
      this.currentPage++;
    }
    this.refreshMessages()
  }
  goToPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= Math.ceil(this.totalCount / this.perPage)) {
      this.currentPage = pageNumber;
    }
    this.refreshMessages()
  }
  getVisiblePageNumbers(): number[] {
    const maxPages = Math.ceil(this.totalCount / this.perPage);
    const visiblePages = 5;
    let startPage = Math.max(1, this.currentPage - Math.floor(visiblePages / 2));
    let endPage = Math.min(startPage + visiblePages - 1, maxPages);
    if (endPage - startPage + 1 < visiblePages) {
      startPage = Math.max(1, endPage - visiblePages + 1);
    }
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }





}