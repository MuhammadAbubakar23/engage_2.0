import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HeaderService } from 'src/app/services/HeaderService/header.service';
import { ToasterService } from 'src/app/layouts/engage2/toaster/toaster.service';
// import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-create-tags',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule, CommonModule, FormsModule,],
  templateUrl: './create-tags.component.html',
  styleUrls: ['./create-tags.component.scss']
})
export class CreateTagsComponent implements OnInit {
  form!: FormGroup;
  showTags = false;
  name!: string;
  desc!: string;
  AlterMsg: string = ''
  toastermessage: boolean = false
  selectedTextColor: string = '';
  parentTags: any[] = [];
  childTags: any[] = [];
  nestTags: any[] = []
  // selectedParentTag: any;
  childTag: any[] = []
  parentChildTag: any[] = []
  parentChild: any[] = []
  id: any;
  companywing: any;

  constructor(private formBuilder: FormBuilder, 
    private headerS:HeaderService,
    private commonService: CommonDataService, private route: ActivatedRoute,
    private router: Router, private dialog: MatDialog) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      desc: [''],
      parentId: [3],
      baseId: [3],
      firewallId: [0],
      icon: [''],
      indexNo: [0],
      level: [0],
      type: [3],
      companywing:['']
    });
  }
  ngOnInit() {
    
    this.companywing = sessionStorage.getItem('defaultWings');
    this.id = this.route.snapshot.paramMap.get('id')
    // 
    this.editTagbyId()
  }
  editTagbyId() {
    const template = history.state.tag;
    if (template) {
      this.name = template.name;
      this.desc = template.desc;
      this.form.patchValue({
        name: this.name,
        desc: this.desc,
      });
      this.addTag();
    } else {
      this.name = '';
      this.desc = '';
    }
  }
  addTag() {
    this.commonService.GetTagsByCompayId().subscribe(
      (response: any) => {
        
        this.parentTags = response;
        this.parentTags.forEach((x: any) => {
          x.subTags?.forEach((xyz: any) => {
            this.childTags.push(xyz)
          })
        })
        if(this.parentTags.length == 0)
        {
          this.reload('info');
        }
      },
      (error: any) => {
        alert(error.error)
      }
    );
  }
  selectParentTag(parentId: any) {
    const id = Number(parentId.target.value)
    this.nestTags = []
    this.childTags.forEach((abc: any) => {
      if (id == abc.parentId) {
        if (!this.nestTags.includes(abc)) {
          this.nestTags.push(abc)
        }
      }
    })
    // this.selectedParentTag = parentId;
    // this.commonService.GetTagById(obj).subscribe(
    //   (response: any) => {
    //     this.childTags = response;
    //   },
    //   (error: any) => {
    //     console.error(error);
    //   }
    // );
  }
  selectChildTag(childId: any) {
    var obj = {
      id: 0,
      parentId: Number(childId.target.value),
      baseId: 0
    }
    this.commonService.GetTagById(obj).subscribe(
      (response: any) => {
        this.childTag = response;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  selectParentChildTag(child: any) {
    var obj = {
      id: 0,
      parentId: Number(child.target.value),
      baseId: 0
    }
    this.commonService.GetTagById(obj).subscribe(
      (response: any) => {
        this.parentChildTag = response;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  ParentChildTag(tag: any) {
    var obj = {
      id: 0,
      parentId: Number(tag.target.value),
      baseId: 0
    }
    this.commonService.GetTagById(obj).subscribe(
      (response: any) => {
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
    this.showPopup = !this.showPopup
  }
  onTextColorChange(event: any) {
    this.selectedTextColor = event.target.value
  }
  saveVisuals() {
    this.showPopup = false
  }
  selectTags() {
    const dialogRef = this.dialog.open(CreateTagsComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  errormessage: any;
  onSave() {
    // if(this.form.value.parentId == 0){
    //   this.form.value.parentId =  this.form.value.baseId 
    //  }
    // const tagNames = [this.form.value];
    let obj = {
      "id": 0,
      "companyId": 0,
      "name": this.form.value.name,
      "desc": this.form.value.desc,
      "parentId": this.form.value.parentId,
      "baseId": this.form.value.baseId,
      "firewallId": 0,
      "icon": this.form.value.icon,
      "indexNo": 0,
      "level": 0,
      "type": this.form.value.type,
      "color": this.selectedTextColor,
      "companywing":this.companywing
    }
    const template = history.state.tag;
    if (template) {
      const updatedTemplate = {
        ...template,
      };
      
      this.commonService.UpdateTag(updatedTemplate.id, updatedTemplate).subscribe(
        (response: any) => {
          this.router.navigate(['console/tags']);
        },
        (error: any) => {
          console.error('Error updating template:', error.error);
        }
      );
    } else {
      
      this.commonService.AddTags(obj).subscribe((res: any) => {
        this.reload('addtag')
        this.router.navigate(['console/tags']);
      },
        error => {
          this.errormessage = error.error.message
          this.reload('error')
        })
      // this.commonService.AddTags(obj).subscribe(
      //   response => {
      //     
      //   },
      //   (error:any) => {
      //   }
      // );
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
  onDiscardChanges(value:any) {
    this.headerS.updateMessage(value)
    this.router.navigate(['console/tags'])

  }
  reload(value: any) {
    if (value == 'error') {
      this.AlterMsg = this.errormessage
      this.toastermessage = true
      setTimeout(() => {
        this.toastermessage = false
      }, 2000);
    }
    if (value == 'addtag') {
      this.AlterMsg = 'Tag Add Successfully ! '
      this.toastermessage = true
      setTimeout(() => {
        this.toastermessage = false
      }, 2000);
    }
    if (value == 'info') {
      this.AlterMsg = 'No Parent Tags Added Yet'
      this.toastermessage = true
      setTimeout(() => {
        this.toastermessage = false
      }, 2000);
    }
  }


  closeToaster() {
    this.toastermessage = false;
  }
}