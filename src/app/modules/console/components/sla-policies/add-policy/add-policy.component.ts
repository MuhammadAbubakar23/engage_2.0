import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';

@Component({
  selector: 'app-add-policy',
  templateUrl: './add-policy.component.html',
  styleUrls: ['./add-policy.component.scss']
})
export class AddPolicyComponent implements OnInit {
  oprationalHours: any[] = ['hours', 'actions'];
  messageForm: FormGroup;
  policyId!: string;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private commonService: CommonDataService
  ) {
    this.messageForm = this.formBuilder.group({
      policyName: [''],
      description: [''],
      timeZone: [''],
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
      firstResponseTime: [''],
      everyResponseTime: [''],
      resolutionTime: [''],
      isEscalated: [false],
      oprationHoursId: ['']
    });
  }

  get SLATargetsControls(): FormArray {
    return this.messageForm.get('slaTargets') as FormArray;
  }
  ngOnInit(): void {
    this.getOperationalHours(); // Call the method to fetch operational hours
  }
  getOperationalHours(): void {
    this.commonService.GetOperationalHours().subscribe(
      (response: any) => {
        console.log("hours of operations", )
        this.oprationalHours = response; // Assuming the API response is an array
      },
      (error: any) => {
        console.log('API error:', error);
        // Handle the API error appropriately
      }
    );
  }
  selectOperationalhours(value: any, index: any) {
    const slaTargets = this.messageForm.get('slaTargets') as FormArray;
    const formGroup = slaTargets.controls[index] as FormGroup;

    formGroup.patchValue({ oprationHoursId: Number(value) });

    console.log("Operation hours ID", formGroup.value.OperationalHoursId);
  }
  onSubmit() {
    debugger
    const slaTargets = this.messageForm.get('slaTargets') as FormArray;
   
    for (let i = 0; i < slaTargets.controls.length; i++) {
      const formGroup = slaTargets.controls[i] as FormGroup;
      const formValues = formGroup.value;
      console.log("Form values for oprationHoursId", formValues.oprationHoursId);

    }
    //if (this.messageForm.valid) {.....
    const formData = this.messageForm.value;
    
    this.commonService.AddSlaPolicy(formData).subscribe(
      response => {
        console.log('API response:', response);

        this.router.navigate(['/console/sla-policies']);

      },
      error => {
        console.log('API error:', error);

      }
    );
    //} else {
    // console.log('Form is invalid');
    // Form is invalid, display error messages or take appropriate action
    //}
  }
  cancelForm() {
    this.router.navigate(['/console/sla-policies']);
  }
}
