import { AbstractControl, ValidationErrors } from '@angular/forms';

export const matchValues = (controlName: string): ValidationErrors | null => {
  return (control: AbstractControl): ValidationErrors | null => {
    return !!control.value &&
      control.parent?.value &&
      control.value === control.parent.get(controlName)?.value
      ? null
      : { mismatch: true };
  };
};
