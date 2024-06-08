import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function lettersAndSpacesValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valid = /^[a-zA-Z\s]*$/.test(control.value);
    return valid ? null : { lettersAndSpaces: true };
  };
}