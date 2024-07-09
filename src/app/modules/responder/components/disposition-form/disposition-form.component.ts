import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DispositionFormDto } from 'src/app/shared/Models/DispositionFormDto';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { ToggleService } from 'src/app/services/ToggleService/Toggle.service';
import { ModulesService } from 'src/app/shared/services/module-service/modules.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { DatePipe } from '@angular/common';
import { GetWingsService } from 'src/app/services/GetWings/get-wings.service';
import { SkillslugService } from 'src/app/services/skillSlug/skillslug.service';
@Component({
  selector: 'app-disposition-form',
  templateUrl: './disposition-form.component.html',
  styleUrls: ['./disposition-form.component.scss'],
})
export class DispositionFormComponent implements OnInit {
  dispositionForm!: FormGroup;
  dispositionFormDto = new DispositionFormDto();
  dispositionTags: any;
  dispositionMenu: any[] = [];
  selectedTag: any; // This will hold the selected tag
  isFollowUp: boolean = false;
  currentDate: any;
  currentDatetime: any;
  toastermessage: boolean = false;
  AlterMsg: any;
  responseMsg: any;
  platform = sessionStorage.getItem('parent');
  agentId = Number(sessionStorage.getItem('agentId'));
  customerProfileId = Number(sessionStorage.getItem('profileId'));
  userId = sessionStorage.getItem('storeHeaderOpenedId');
  companyId = 0;
  previousUrl: any;
  currentTab:string=""
  constructor(
    private commonService: CommonDataService,
    private route: Router,
    private datePipe: DatePipe,
    private toggleService: ToggleService,
    private lodeModuleService: ModulesService,
    private stor: StorageService,
    private fb: FormBuilder,
    private getWing: GetWingsService,
    private getSkillSlug: SkillslugService
  ) {}
  ngOnInit(): void {
    this.currentTab=this.route.url.split('/')[2];
    this.dispositionForm = this.fb.group({
      disposition: ['completed', Validators.required],
      reasonId: [''],
      agentId: [''],
      customerProfileId: [''],
      follow_Up_Date: [null],
      comment: ['Completed', Validators.required],
      wings: [this.getWing.wings],
      user: [''],
      plateFrom: [''],
      userId: [''],
      companyId: [''],
    });
    this.dispositionForm
      .get('disposition')
      ?.valueChanges.subscribe((value: any) => {
        const conditionalField = this.dispositionForm.get('follow_Up_Date');
        if (value == 'follow_up') {
          conditionalField?.setValidators(Validators.required);
        } else {
          conditionalField?.clearValidators();
        }
        conditionalField?.updateValueAndValidity();
      });
    this.currentDate = new Date();
    this.currentDatetime = this.datePipe.transform(
      this.currentDate,
      'yyyy-MM-ddTHH:mm'
    );
    const menu = this.stor.retrive('Tags', 'O').local;
    menu.forEach((item: any) => {
      if (item.name == 'Dispositions') {
        item.subTags.forEach((singleMenu: any) => {
          if (!this.dispositionMenu.includes(singleMenu)) {
            this.dispositionMenu.push(singleMenu);
          }
        });
      }
    });
  }
  getDispositionTags() {
    this.commonService.GetDispositionTags().subscribe((res: any) => {
      this.dispositionTags = res;
    });
  }
  submitDispositionForm() {
    this.dispositionFormDto = {
      disposition: this.dispositionForm.value.disposition,
      reasonId: this.dispositionForm.value.reasonId,
      customerProfileId: this.customerProfileId,
      follow_Up_Date: this.dispositionForm.value.follow_Up_Date,
      comment: this.dispositionForm.value.comment,
      wings: this.getWing.wings,
      skillSlug: this.getSkillSlug.skillSlug[0],
      tab:this.currentTab,
      completedData: {
        user: this.userId || '{}',
        plateFrom: this.platform || '{}',
        userId: this.agentId,
        companyId: this.companyId,
        LastQueryId: Number(sessionStorage.getItem('lastQueryId')),
      },
    };
    const customerNumber = sessionStorage.getItem('storeOpenedId');
    const ClientNumber = sessionStorage.getItem('senderId');
    this.commonService
      .SubmitDispositionForm(this.dispositionFormDto)
      .subscribe((res: any) => {
        this.commonService.getSessionId(customerNumber, ClientNumber).subscribe(
          (response: any) => {
            if (response == 'true') {
              // alert(response)
              // this.reloadComponent('sessionClose')
            }
          },
          (error) => {
            this.responseMsg = error.error.Message;
            // this.reloadComponent('error')
          }
        );
        sessionStorage.setItem('assignedProfile', '');
        this.previousUrl = sessionStorage.getItem('previousUrl');
        this.route.navigateByUrl(this.previousUrl);
        this.lodeModuleService.updateModule('all-inboxes');
      });
  }
  routeToParentComponent() {
    this.toggleService.updateDispositionForm('close-disposition-form');
  }
  updateCommentBasedOnDisposition() {
    if (this.dispositionForm.value.disposition == 'follow_up') {
      this.isFollowUp = true;
    } else {
      this.isFollowUp = false;
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
  // reloadComponent(value: any) {
  //   if (value == 'error') {
  //     this.AlterMsg = this.responseMsg;
  //     this.toastermessage = true;
  //     setTimeout(() => {
  //       this.toastermessage = false;
  //     }, 4000);
  //   }
  //   if (value == 'sessionClose') {
  //     this.AlterMsg = 'Session Close Successfully !';
  //     this.toastermessage = true;
  //     setTimeout(() => {
  //       this.toastermessage = false;
  //     }, 4000);
  //   }
  // }
  closeToaster() {
    this.toastermessage = false;
  }
}
