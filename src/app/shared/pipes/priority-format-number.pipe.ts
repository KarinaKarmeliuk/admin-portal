import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priorityFormatNumber'
})
export class PriorityFormatNumberPipe implements PipeTransform {

  transform(value: string, ...args: any[]): number {
    switch (value) {
      case 'High' || 'Высокий':
        return 1;
      case 'Medium' || 'Средний':
        return 2;
      case 'Low' || 'Низкий':
        return 3;
      default:
        return 0;
    }
  }

}
