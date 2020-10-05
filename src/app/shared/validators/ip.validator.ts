import { AbstractControl, ValidatorFn } from '@angular/forms';

const ipv4AddressRegexp = new RegExp('^([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\.' +
  '([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\.' +
  '([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\.' +
  '([01]?\\d\\d?|2[0-4]\\d|25[0-5])$');

export function ipv4(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const ipAddress: string = control.value ? control.value.toString() : '';
    if (ipAddress.length > 0 && !ipv4AddressRegexp.test(ipAddress.toString())) {
      return { ip: true };
    }
    return null;
  };
}
