import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';

@Component({
  selector: 'app-add-policy',
  templateUrl: './add-policy.component.html',
  styleUrls: ['./add-policy.component.scss']
})
export class AddPolicyComponent implements OnInit {
  oprationalHours: any[] = ['hours', 'actions'];
  messageForm: FormGroup;
  policyId: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private commonService: CommonDataService,
    private route: ActivatedRoute
  ) {
    this.messageForm = this.formBuilder.group({
      policyName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      description: ['', Validators.required],
      timeZone: ['', Validators.required],
      slaTargets: this.formBuilder.array([
        this.createSlaTargetGroup('high'),
        this.createSlaTargetGroup('urgent'),
        this.createSlaTargetGroup('medium'),
        this.createSlaTargetGroup('low')
      ])
    });
  }
  createSlaTargetGroup(priority: string): FormGroup {
    return this.formBuilder.group({
      priority: [priority],
      firstResponseTime: ['', Validators.required],
      everyResponseTime: ['', Validators.required],
      resolutionTime: ['', Validators.required],
      isEscalated: [false],
      // oprationHoursId: ['']
    });
  }
  get SLATargetsControls(): FormArray {
    return this.messageForm.get('slaTargets') as FormArray;
  }
  ngOnInit(): void {

    // this.getOperationalHours();
    this.policyId = this.route.snapshot.paramMap.get('id')
    this.getPolicyById(this.policyId)
    //    if (template) {
    //   this.policyId = template.policyId; 
    //   this.getPolicyById(template.policyId);
    // }
  }
  getPolicyById(policyId: string) {
    this.commonService.GetPolicyById(policyId).subscribe(
      (policy: any) => {
        this.messageForm.patchValue({
          policyName: policy.policyName,
          description: policy.description,
          timeZone: policy.timeZone,
        });
        this.SLATargetsControls.clear();
        policy.slaTargets.forEach((target: any) => {
          const slaTargetGroup = this.createSlaTargetGroup(target.priority);
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
  cancelForm() {
    this.router.navigate(['/console/sla-policies']);
  }
}
