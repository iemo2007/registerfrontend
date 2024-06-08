import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function mobileNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valid = /^\+201\d{9}$/.test(control.value);
    return valid ? null : { invalidMobileNumber: { value: control.value } };
  };
}