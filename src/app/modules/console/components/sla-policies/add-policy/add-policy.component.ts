import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { TeamsService } from '../../../services/teams.service';
import { HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { HeaderService } from 'src/app/services/HeaderService/header.service';
@Component({
  selector: 'app-add-policy',
  templateUrl: './add-policy.component.html',
  styleUrls: ['./add-policy.component.scss']
})
export class AddPolicyComponent implements OnInit {
  oprationalHours: any[] = ['hours', 'actions'];
  messageForm: FormGroup;
  policyId: any;
  showSLAForm:boolean = false;
  teams: Array<any> = [];
  initialTeams: Array<any> = []
  teamId:any = 0;
  teamslug: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private commonService: CommonDataService,
    private headerService: HeaderService,
    private _route: ActivatedRoute
  ){
    this.messageForm = this.formBuilder.group({
      policyName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      description: ['', Validators.required],
      timeZone: ['', Validators.required],
      wing:['', Validators.required],
      slaTargets: this.formBuilder.array([
        this.createSlaTargetGroup('high',20),
        this.createSlaTargetGroup('urgent',16),
        this.createSlaTargetGroup('medium',12),
        this.createSlaTargetGroup('low',8)
      ])
    });
  }
  createSlaTargetGroup(priority: string,value:number): FormGroup {
    return this.formBuilder.group({
      priority: [priority],
      firstResponseTime: [value,[Validators.required, Validators.pattern('^[0-9]\\d*$')]],
      everyResponseTime: [value,[Validators.required, Validators.pattern('^[0-9]\\d*$')]],
      resolutionTime: [value,[Validators.required, Validators.pattern('^[0-9]\\d*$')]],
      isEscalated: [false],
      // oprationHoursId: ['']
    });
  }
  get SLATargetsControls(): FormArray {
    return this.messageForm.get('slaTargets') as FormArray;
  }
  ngOnInit(): void {
    // this.getOperationalHours();
    // this.policyId = this.route.snapshot.paramMap.get('id')
    // this.getPolicyById(this.policyId)

    this.getCompanyTeams();

    this.policyId = this._route.snapshot.paramMap.get('id')
    // this.patchFormValues(this.businessId)
    // const template = history.state.template;
    if (this.policyId) {
      this.getPolicyById(this.policyId);
    } else {
      this.disableForm();
    }
    //    if (template) {
    //   this.policyId = template.policyId; 
    //   this.getPolicyById(template.policyId);
    // }
  }

  
  getPolicyByWing(wing: string) {
    this.commonService.GetPolicyByWing(wing).subscribe(
      (policy: any) => {
        if(policy.id == null)
        {
            this.messageForm = this.formBuilder.group({
              policyName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
              description: ['', Validators.required],
              timeZone: ['', Validators.required],
              slaTargets: this.formBuilder.array([
                this.createSlaTargetGroup('high',20),
                this.createSlaTargetGroup('urgent',16),
                this.createSlaTargetGroup('medium',12),
                this.createSlaTargetGroup('low',8)
              ])
            });
        }
        else{
        //this.policyId = policy.id;
        this.messageForm.patchValue({
          policyName: policy.policyName,
          description: policy.description,
          timeZone: policy.timeZone,
          wing:policy.wing,
        });
        this.SLATargetsControls.clear();
        policy.slaTargets.forEach((target: any) => {
          const slaTargetGroup = this.createSlaTargetGroup(target.priority,0);
          slaTargetGroup.patchValue(target);
          this.SLATargetsControls.push(slaTargetGroup);
        });
        }
      },
      (error: any) => {
      }
    );
  }


  getPolicyById(id: string) {
    this.commonService.GetPolicyById(id).subscribe(
      (policy: any) => {
        this.policyId = policy.id;
        this.messageForm.patchValue({
          policyName: policy.policyName,
          description: policy.description,
          timeZone: policy.timeZone,
          wing:policy.wing,
        });
        this.SLATargetsControls.clear();
        policy.slaTargets.forEach((target: any) => {
          const slaTargetGroup = this.createSlaTargetGroup(target.priority,0);
          slaTargetGroup.patchValue(target);
          this.SLATargetsControls.push(slaTargetGroup);
        });
      },
      (error: any) => {
      }
    );
  }
  getOperationalHours(): void {
    this.commonService.GetOperationalHours().subscribe(
      (response: any) => {
        this.oprationalHours = response;
      },
      (error: any) => {
      }
    );
  }
  selectOperationalhours(value: any, index: any) {
    const slaTargets = this.messageForm.get('slaTargets') as FormArray;
    if (index >= 0 && index < slaTargets.controls.length) {
      const formGroup = slaTargets.controls[index] as FormGroup;
      // formGroup.patchValue({ oprationHoursId: value });
    } else {
      console.error('Invalid index:', index);
    }
  }
  onSubmit() {
    const slaTargets = this.messageForm.get('slaTargets') as FormArray;
    // for (let i = slaTargets.controls.length - 1; i >= 0; i--) {
      // if (!slaTargets.controls[i].value.oprationHoursId) {
      //   slaTargets.removeAt(i);
      // }
    // }
    if (this.messageForm.valid) {
      // const template = history.state.template;
      if (this.policyId) {
        const updatedTemplate = {
          // ...template,
          id: this.policyId,
          policyName: this.messageForm.value.policyName,
          description: this.messageForm.value.description,
          timeZone: this.messageForm.value.timeZone,
          wing:this.messageForm.value.wing,
          slaTargets: this.messageForm.value.slaTargets,
        };
        this.commonService.UpdateSlaPolicy( updatedTemplate).subscribe(
          response => {
            this.router.navigate(['/console/sla-policies']);
          },
          error => {
          }
        );
      }
      else {
        this.messageForm.value.wing = this.teamslug;
        this.commonService.AddSlaPolicy(this.messageForm.value).subscribe(
          response => {
            this.router.navigate(['/console/sla-policies']);
          },
          error => {
          }
        );
      }
    } else {
    }
  }

   getCompanyTeams(){
    this.commonService.GetWings().subscribe({
      next: (res: any) => {
        this.initialTeams = res;
        this.initialTeams = this.initialTeams.filter(a=>a.typeId > 10);
        this.teams = this.initialTeams.length > 0? this.initialTeams : res;
      },
      error: (err: HttpErrorResponse) => {
        // this.errorMessage = err.message;
        // this.showError = true;
      }
    });
  }

  onTeamSelect()
  {
     let team = this.teams.find(a=>a.id == this.teamId);
     this.teamslug = team.slug;
     this.getPolicyByWing(team.slug);
     this.enableForm();
  }


  disableForm() {
    this.messageForm.disable(); 
  }

  enableForm() {
    this.messageForm.enable(); 
  }

  cancelForm() {
    this.router.navigate(['/console/sla-policies']);
    this.headerService.updateMessage('sla-policies')
  }
}
