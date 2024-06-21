import { AbstractControl, ValidatorFn } from '@angular/forms';
export default class Validation {
  static match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);
      if (!checkControl?.value?.length) {
        return null;
      }
      if (checkControl?.errors) {
        return null;
      }
      if (control?.value !== checkControl?.value) {
        controls.get(checkControlName)?.setErrors({ mismatch: true });
        return { mismatch: true };
      } else {
        return null;
      }
    };
  }
}