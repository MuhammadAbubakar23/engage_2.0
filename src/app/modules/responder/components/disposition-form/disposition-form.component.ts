import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DispositionFormDto } from 'src/app/shared/Models/DispositionFormDto';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { ToggleService } from 'src/app/services/ToggleService/Toggle.service';
import { ModulesService } from 'src/app/shared/services/module-service/modules.service';

@Component({
  selector: 'app-disposition-form',
  templateUrl: './disposition-form.component.html',
  styleUrls: ['./disposition-form.component.scss']
})
export class DispositionFormComponent implements OnInit {

  dispositionForm!: FormGroup;
  dispositionFormDto = new DispositionFormDto();

  constructor(private commonService : CommonDataService,
    private route : Router,
    private toggleService : ToggleService,
    private lodeModuleService : ModulesService) {
      
    this.dispositionForm = new FormGroup({
      dispositionId: new FormControl('', Validators.required),
      reasonId: new FormControl(''),
      agentId: new FormControl(''),
      customerProfileId: new FormControl(''),
      comment: new FormControl('', Validators.required),

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
  }

  submitDispositionForm(){

    this.dispositionFormDto = {
      dispositionId: this.dispositionForm.value.dispositionId,
      reasonId: this.dispositionForm.value.reasonId,
      customerProfileId: this.customerProfileId,
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
      this.route.navigateByUrl('/all-inboxes');
      this.lodeModuleService.updateModule('all-inboxes')
      
    })
  }

  routeToParentComponent() {
    
    this.toggleService.updateDispositionForm('close-disposition-form')
  }

}
