import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  businessId: any
  showhideWorkingDays(value:boolean) {
    this.showWorkingDaysSection = value;
  }
  // showWorkingDays() {
  //   this.showWorkingDaysSection = true;
  // }
  getSelectedDaysCount(): number {
    return this.businessWorkingDays.controls.length;
  }
  messageForm!: FormGroup;
  get BusinessControls(): FormArray {
    return this.messageForm.get('businessWorkingDays') as FormArray;
  }
  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonDataService,
    private router: Router,
    private _route: ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.initializeForm();
    this.businessId = this._route.snapshot.paramMap.get('id')
    // this.patchFormValues(this.businessId)
    // const template = history.state.template;
    if (this.businessId) {
      this.patchFormValues(this.businessId);
    } else {
      this.setInitialFormValues();
    }
  }
  isDaySelected(day: string): boolean {
    const formArray = this.businessWorkingDays;
    return formArray.controls.some(
      (control) => control.get('workingDay')?.value === day
    );
  }
  initializeForm(): void {
    this.messageForm = this.formBuilder.group({
      templateName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
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
      roundTheClock: true,
      customBusinessHours: true
    });
  }
  patchFormValues(template: any): void {
    this.commonService.GetBusinessById(template).subscribe(
      (res: any) => {
        this.messageForm.patchValue({
          templateName: res.templateName,
          description: res.description,
          timeZone: res.timeZone,
          roundTheClock: res.roundTheClock,
          customBusinessHours: res.customBusinessHours,
        });
        this.showWorkingDaysSection = !res.roundTheClock;
        this.clearBusinessWorkingDays();
        const businessWorkingDays = this.messageForm.get('businessWorkingDays') as FormArray;
        res.businessWorkingDays.forEach((workingDay: any) => {
          businessWorkingDays.push(
            this.formBuilder.group({
              workingDay: workingDay.workingDay,
              shiftStart: workingDay.shiftStart,
              shiftEnd: workingDay.shiftEnd,
            })
          );
        });
      })
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
      // const template = history.state.template;
      if (this.businessId) {
        const updatedTemplate = {
          // ...template,
          id: this.businessId,
          templateName: this.messageForm.value.templateName,
          description: this.messageForm.value.description,
          timeZone: this.messageForm.value.timeZone,
          roundTheClock: this.messageForm.value.roundTheClock,
          customBusinessHours: this.messageForm.value.customBusinessHours,
          businessWorkingDays: this.messageForm.value.businessWorkingDays
        };
        this.commonService
          .UpdateBusinessHours(updatedTemplate)
          .subscribe(
            (response: any) => {
              this.router.navigate(['/console/business-hours']);
            },
            (error: any) => {
              console.error('Error updating template:', error);
            }
          );
      } else {
        this.commonService.AddBusinessHours(this.messageForm.value).subscribe(
          (response: any) => {
            this.router.navigate(['/console/business-hours']);
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

  copyToAll(value:any)
  {
    this.workingDaysFormArray.controls.forEach((control, index) => {
      control.get('shiftStart')?.setValue(value?.shiftStart);
      control.get('shiftEnd')?.setValue(value?.shiftEnd);
    });

  }

  get workingDaysFormArray() {
    return this.messageForm.get('businessWorkingDays') as FormArray;
  }

  cancelForm(): void {
    this.router.navigate(['/console/business-hours']);
  }
}
