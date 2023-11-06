import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DispositionFormDto } from 'src/app/shared/Models/DispositionFormDto';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { ToggleService } from 'src/app/services/ToggleService/Toggle.service';
import { ModulesService } from 'src/app/shared/services/module-service/modules.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-disposition-form',
  templateUrl: './disposition-form.component.html',
  styleUrls: ['./disposition-form.component.scss']
})
export class DispositionFormComponent implements OnInit {

  dispositionForm!: FormGroup;
  dispositionFormDto = new DispositionFormDto();
  dispositionTags:any;
  dispositionMenu:any[]=[];
  selectedTag: any; // This will hold the selected tag
  isFollowUp: boolean = false
  constructor(private commonService : CommonDataService,
    private route : Router,
    private datePipe:DatePipe,
    private toggleService : ToggleService,
    private lodeModuleService : ModulesService,
    private stor : StorageService) {
      
      this.dispositionForm = new FormGroup({
        disposition: new FormControl('completed', Validators.required),
        reasonId: new FormControl(''),
        agentId: new FormControl(''),
        customerProfileId: new FormControl(''),
        follow_Up_Date: new FormControl(null),
        comment: new FormControl('Completed', Validators.required),
  
        user: new FormControl(''),
        plateFrom: new FormControl(''),
        userId: new FormControl(''),
        companyId: new FormControl(''),
  
      });
    }

  platform = localStorage.getItem('parent');
  agentId = Number(localStorage.getItem('agentId'))
  customerProfileId = Number(localStorage.getItem('profileId'))
  userId = localStorage.getItem('storeHeaderOpenedId')
  companyId = 0;

  ngOnInit(): void {
    const menu = this.stor.retrive('Tags', 'O').local;
      menu.forEach((item:any) => {
        if(item.name == "Dispositions"){
          item.subTags.forEach((singleMenu:any) => {
            if(!this.dispositionMenu.includes(singleMenu)){
            this.dispositionMenu.push(singleMenu)
            }
          });
        }
      });
  }

  getDispositionTags(){
    this.commonService.GetDispositionTags().subscribe((res:any)=>{
      this.dispositionTags = res;
    })
  }
  previousUrl:any;
  submitDispositionForm(){
debugger
// if(this.dispositionForm.value.follow_Up_Date!==''){
//   this.dispositionForm.value.follow_Up_Date=this.dispositionForm.value.follow_Up_Date
// }
    this.dispositionFormDto = {
      disposition: this.dispositionForm.value.disposition,
      reasonId: this.dispositionForm.value.reasonId,
      customerProfileId: this.customerProfileId,
      follow_Up_Date: this.dispositionForm.value.follow_Up_Date,
      comment: this.dispositionForm.value.comment,
      completedData : 
        {
          user: this.userId ||'{}',
          plateFrom: this.platform ||'{}',
          userId: this.agentId,
          companyId: this.companyId,
        }
    };
    this.commonService.SubmitDispositionForm(this.dispositionFormDto).subscribe((res:any)=>{
      // console.log('disposition response',res)
      localStorage.setItem('assignedProfile','')
      // this.route.navigateByUrl('/all-inboxes/focused/all');
      this.previousUrl = localStorage.getItem('previousUrl') 
      this.route.navigateByUrl(this.previousUrl);
      this.lodeModuleService.updateModule('all-inboxes');
      
    })
  }
  routeToParentComponent() { 
    this.toggleService.updateDispositionForm('close-disposition-form')
  }

  updateCommentBasedOnDisposition() {
    if(this.dispositionForm.value.disposition=='follow_up'){
      this.isFollowUp=true
    }
    else{
      this.isFollowUp=false
    }
    const disposition = this.dispositionForm.get('disposition')?.value;
    if (disposition === 'follow_up') {
      this.dispositionForm.get('comment')?.setValue('Follow-up');
    } else if (disposition === 'responded') {
      this.dispositionForm.get('comment')?.setValue('Responded');
    } else {
      this.dispositionForm.get('comment')?.setValue('Completed');
    }
  }
}

  

