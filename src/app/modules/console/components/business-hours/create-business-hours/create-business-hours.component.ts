import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';

@Component({
  selector: 'app-create-business-hours',
  templateUrl: './create-business-hours.component.html',
  styleUrls: ['./create-business-hours.component.scss']
})
export class CreateBusinessHoursComponent implements OnInit {
  daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  shiftTiming = ['8:00 am', '9:00 am', '10:00 am', '11:00 am', '12:00 pm', '1:00 pm', '2:00 pm', '3:00 pm', '4:00 pm', '5:00 pm', '6:00 pm', '7:00 pm', '8:00 pm']
  workingDay = ""
  showWorkingDaysSection: boolean = false;
  hideWorkingDays() {
    this.showWorkingDaysSection = false;
  }
  showWorkingDays() {
    this.showWorkingDaysSection = true;
  }
  messageForm!: FormGroup;

  get BusinessControls(): FormArray {
    return this.messageForm.get('businessWorkingDays') as FormArray;
  }
  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonDataService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.initializeForm();
    const template = history.state.template; // Get the template value from the state

    if (template) {
      this.patchFormValues(template);
    } else {
      this.setInitialFormValues();
    }
  }
  initializeForm(): void {
    this.messageForm = this.formBuilder.group({
      templateName: ['', Validators.required],
      description: ['', Validators.required],
      timeZone: ['', Validators.required],
      roundTheClock: false,
      customBusinessHours: false,
      businessWorkingDays: this.formBuilder.array([])
    });
  }
  setInitialFormValues(): void {
    this.messageForm.patchValue({
      templateName: '',
      description: '',
      timeZone: '',
      roundTheClock: false,
      customBusinessHours: true
    });
  }
patchFormValues(template: any): void {
  this.messageForm.patchValue({
    templateName: template.templateName,
    description: template.description,
    timeZone: template.timeZone,
    roundTheClock: template.roundTheClock,
    customBusinessHours: template.customBusinessHours,
  });

  // Clear the existing businessWorkingDays form array before patching new values
  this.clearBusinessWorkingDays();

  // Iterate through the businessWorkingDays array and add form groups one by one
  const businessWorkingDays = this.messageForm.get('businessWorkingDays') as FormArray;
  template.businessWorkingDays.forEach((workingDay: any) => {
    businessWorkingDays.push(
      this.formBuilder.group({
        workingDay: workingDay.workingDay,
        shiftStart: workingDay.shiftStart,
        shiftEnd: workingDay.shiftEnd,
      })
    );
  });
}
clearBusinessWorkingDays(): void {
  const businessWorkingDays = this.messageForm.get('businessWorkingDays') as FormArray;
  while (businessWorkingDays.length !== 0) {
    businessWorkingDays.removeAt(0);
  }
}
  get businessWorkingDays(): FormArray {
    return this.messageForm.get('businessWorkingDays') as FormArray;
  }
  addBusinessWorkingDay(workingDay: string): void {
    const formArray = this.businessWorkingDays;
    const existingIndex = formArray.controls.findIndex(
      (control) => control.get('workingDay')?.value === workingDay
    );

    if (existingIndex !== -1) {
      formArray.removeAt(existingIndex);
    } else {
      formArray.push(
        this.formBuilder.group({
          workingDay: workingDay,
          shiftStart: ['', Validators.required],
          shiftEnd: ['', Validators.required]
        })
      );
    }
  }
  getValueByIndex(index: number): string {
    const formArray = this.businessWorkingDays;
    const formGroup = formArray.at(index) as FormGroup;
    let formValue = formGroup.value.workingDay;

    switch (formValue) {
      case 'Mon':
        formValue = 'Monday';
        break;
      case 'Tue':
        formValue = 'Tuesday';
        break;
      case 'Wed':
        formValue = 'Wednesday';
        break;
      case 'Thu':
        formValue = 'Thursday';
        break;
      case 'Fri':
        formValue = 'Friday';
        break;
      case 'Sat':
        formValue = 'Saturday';
        break;
      default:
        formValue = 'Sunday';
    }
    return formValue;
  }
  removeBusinessWorkingDay(index: number): void {
    this.businessWorkingDays.removeAt(index);
  }
  onSubmit(): void {
    if (this.messageForm.valid) {
      const template = history.state.template; // Get the template value from the state

      if (template) {
        const updatedTemplate = {
          ...template,
          templateName: this.messageForm.value.templateName,
          description: this.messageForm.value.description,
          timeZone: this.messageForm.value.timeZone,
          roundTheClock: this.messageForm.value.roundTheClock,
          customBusinessHours: this.messageForm.value.customBusinessHours,
          businessWorkingDays: this.messageForm.value.businessWorkingDays
        };

        this.commonService
          .UpdateBusinessHours(updatedTemplate.id, updatedTemplate)
          .subscribe(
            (response: any) => {
              // Handle the successful response after updating the template
              console.log('Template updated:', response);
              this.router.navigate(['/console/business-hours']);
            },
            (error: any) => {
              // Handle the error if the update fails
              console.error('Error updating template:', error);
            }
          );
      } else {
        this.commonService.AddBusinessHours(this.messageForm.value).subscribe(
          (response: any) => {
            // Handle the successful response after creating a new template
            console.log('Template created:', response);
            this.router.navigate(['/console/business-hours']);
          },
          (error: any) => {
            // Handle the error if the template creation fails
            console.error('Error creating template:', error);
          }
        );
      }
    } else {
      // Handle form validation errors
      console.log('Form is invalid');
    }
  }

  cancelForm(): void {
    this.router.navigate(['/console/business-hours']);
  }
}
