import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priorityFormatNumber'
})
export class PriorityFormatNumberPipe implements PipeTransform {

  transform(value: string, ...args: any[]): number {
    switch (value.toLowerCase()) {
      case 'high':
        case 'высокий':
        return 1;
      case 'medium':
        case 'средний':
        return 2;
      case 'low':
        case 'низкий':
        return 3;
      default:
        return 0;
    }
  }

}
