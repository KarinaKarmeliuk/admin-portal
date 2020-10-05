import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priorityFormatString'
})
export class PriorityFormatStringPipe implements PipeTransform {

  transform(value: number, ...args: any[]): string {
    switch (value) {
      case 1:
        return 'high';
      case 2:
        return 'medium';
      case 3:
        return 'low';
      default:
        return 'undefined';
    }
  }

}
