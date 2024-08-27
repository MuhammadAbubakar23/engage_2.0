import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import {
  ReactiveFormsModule,
  FormsModule,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
  FormControl,
  FormControlName,
  FormBuilder,
  FormGroup,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DataExchangeServicesService } from 'src/app/services/dataExchangeServices/data-exchange-services.service';
import { Subscription, finalize } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { descriptors } from 'chart.js/dist/core/core.defaults';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { HttpErrorResponse } from '@angular/common/http';
import { HeaderService } from 'src/app/services/HeaderService/header.service';

@Component({
  standalone: true,
  selector: 'app-create-queues',
  templateUrl: './create-queues.component.html',
  styleUrls: ['./create-queues.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatChipsModule,
    MatIconModule,
    MatSelectModule,
  ],
})
export class CreateQueuesComponent implements OnInit {
  channelsList: any[] = [];
  teamsList: any[] = [];
  groupsList: any[] = [];
  initialTeams: any[] = [];
  supreamId: number = 0;
  userForm!: FormGroup;
  skillTeamId: any;
  wingsList: any[] = [];

  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private commondata: CommonDataService,
    private activeRoute: ActivatedRoute,
    private headerService: HeaderService
  ) {
    this.initializeForm();
  }

  ngOnInit() {
    this.skillTeamId = this.activeRoute.snapshot.paramMap.get('id');
    this.getGroups();
    this.getChannels();
    this.getCompanyTeams();
    this.getWings();
    if (this.skillTeamId > 0) {
      this.getSkillTeamById(this.skillTeamId);
    }
  }

  getSkillTeamById(id: string) {
    this.commondata.GetSkillTeamById(id).subscribe(
      (skillTeam: any) => {
        this.skillTeamId = skillTeam.id;
        this.userForm.patchValue({
          teamSlug: skillTeam.teamSlug,
          groupSlug: skillTeam.groupSlug,
          tagId: skillTeam.tagId,
          status: skillTeam.status,
        });
      },
      (error: any) => {}
    );
  }

  initializeForm(): void {
    this.userForm = this.formbuilder.group({
      teamSlug: ['', Validators.required],
      groupSlug: ['', Validators.required],
      wingSlug: [ '', Validators.required],
      tagId: ['', Validators.required],
      status: true,
      Weight: [null, Validators.required],
      Count:[null, Validators.required],
      Priority:[null, Validators.required],
      TimeWise:[null, Validators.required],
    });
  }

  getCompanyTeams() {
    this.commondata.GetCompanyTeams().subscribe({
      next: (res: any) => {
        this.initialTeams = res;
        this.initialTeams = this.initialTeams.filter((a) => a.typeId > 10);
        this.teamsList = this.initialTeams.length > 0 ? this.initialTeams : res;
      },
      error: (err: HttpErrorResponse) => {
        // this.errorMessage = err.message;
        // this.showError = true;
      },
    });
  }

  getWings(){
    this.commondata.GetWings().subscribe((res:any)=>{
      
      this.wingsList = res;
    },
    (error:any)=>{

    }
  )
  }

  getChannels() {
    this.supreamId = 11;
    this.commondata.GetTagBySupreamId(this.supreamId).subscribe({
      next: (res: any) => {
        this.channelsList = res;
      },
      error: (err: HttpErrorResponse) => {
        // this.errorMessage = err.message;
        // this.showError = true;
      },
    });
  }
  getGroups() {
    this.supreamId = 14;
    this.commondata.GetTagBySupreamId(this.supreamId).subscribe({
      next: (res: any) => {
        this.groupsList = res;
      },
      error: (err: HttpErrorResponse) => {
        // this.errorMessage = err.message;
        // this.showError = true;
      },
    });
  }
  onSubmit(): void {
    
    if (this.userForm.valid) {
      const template = history.state.template;
      if (this.skillTeamId > 0) {
        const updatedTemplate = {
          ...template,
          id: this.skillTeamId,
          teamSlug: this.userForm.value.teamSlug,
          groupSlug: this.userForm.value.groupSlug,
          tagId: this.userForm.value.tagId,
          status: true,
        };
        this.commondata.UpdateTagTeams(updatedTemplate).subscribe(
          (response: any) => {
            this.router.navigate(['/console/queues']);
          },
          (error: any) => {
            console.error('Error updating template:', error);
          }
        );
      } else {
        this.commondata.AddTagTeams(this.userForm.value).subscribe(
          (response: any) => {
            this.router.navigate(['/console/queues']);
          },
          (error: any) => {
            console.error('Error creating template:', error);
          }
        );
      }
    } else {
      // Handle form validation errors
    }
  }
  routerLink() {
    this.router.navigateByUrl('/console/queues');
    this.headerService.updateMessage('queues')
  }
}
