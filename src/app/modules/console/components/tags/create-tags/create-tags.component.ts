import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-create-tags',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule, CommonModule, FormsModule],
  templateUrl: './create-tags.component.html',
  styleUrls: ['./create-tags.component.scss']
})
export class CreateTagsComponent implements OnInit {
  form!: FormGroup;
  showTags = false;
  name!: string;
  parentTags: any[] = [];
  childTags: any[] = [];
  // selectedParentTag: any;
  childTag : any[] = []
  parentChildTag : any[] = []
  parentChild : any[] = []
  constructor(private formBuilder: FormBuilder, private commonService: CommonDataService, private router: Router, private dialog: MatDialog) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      desc: [''],
      parentId: [0],
      baseId: [0],
      firewallId: [0],
      icon: [''],
      indexNo: [0],
      level: [0],
      type: [0]
    });
  }
  ngOnInit() {
    const template = history.state.tag;
    if (template) {
      this.name = template.name;
      this.form.patchValue({
        name: this.name,
      });
      this.addTag();
    } else {
      this.name = '';
    }
  }
  addTag() {
    this.commonService.GetParents().subscribe(
      (response: any) => {
        this.parentTags = response;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  selectParentTag(parentId: any) {
    var obj = {
      id: 0,
      parentId: Number(parentId.target.value),
      baseId: 0
    }
    // this.selectedParentTag = parentId;
    this.commonService.GetTagById(obj).subscribe(
      (response: any) => {
        this.childTags = response;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  selectChildTag(childId: any){
    var obj = {
      id: 0,
      parentId: Number(childId.target.value),
      baseId: 0
    }
    this.commonService.GetTagById(obj).subscribe(
      (response: any) => {
        // debugger
        this.childTag = response;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  selectParentChildTag( child : any){
    var obj = {
      id: 0,
      parentId: Number(child.target.value),
      baseId: 0
    }
    this.commonService.GetTagById(obj).subscribe(
      (response: any) => {
        // debugger
        this.parentChildTag = response;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  ParentChildTag(tag : any){
    var obj = {
      id: 0,
      parentId: Number(tag.target.value),
      baseId: 0
    }
    this.commonService.GetTagById(obj).subscribe(
      (response: any) => {
        // debugger
        this.parentChild = response;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  
  showPopup: boolean = false;
  selectedColor: string = '';
  openPopup() {
    this.showPopup = true;
  }
  saveVisuals() {
    const selectedVisual = this.selectedColor;
    console.log('Selected Color:', selectedVisual);
    this.showPopup = false;
  }
  selectTags() {
    const dialogRef = this.dialog.open(CreateTagsComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  onSave() {
    // debugger
    if (this.form.invalid) {
      this.markFormGroupTouched(this.form);
      return;
    }
    const tagNames = [this.form.value];


    const template = history.state.tag;
    if (template) {
      const updatedTemplate = {
        ...template,
        
      };
      this.commonService.UpdateTag(updatedTemplate.id, updatedTemplate).subscribe(
        (response: any) => {
          console.log('Template updated:', response);
          this.router.navigate(['console/tags']);
        },
        (error: any) => {
          console.error('Error updating template:', error);
        }
      );
    } else {
      this.commonService.AddTags(tagNames).subscribe(
        response => {
          console.log('Tags added successfully', response);
          this.router.navigate(['console/tags']);
        },
        error => {
          console.error('Failed to add tags', error);
        }
      );
    }
  }
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
  onDiscardChanges() {
    this.router.navigate(['console/tags'])
  }
}