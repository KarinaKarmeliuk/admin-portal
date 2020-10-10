import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

export function validateEmailWithExclude(excludeEmail : string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    if (control.value === excludeEmail) {
      return null;
    }
    return Validators.email(control);
  };
}

export function validatePriority() : ValidatorFn {
   return (control: AbstractControl) : {[key : string]: any} => {
     return Validators.pattern('High|Medium|Low|Высокий|Средний|Низкий');
   }
}
