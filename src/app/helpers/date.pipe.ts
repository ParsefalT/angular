import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datePipe',
  standalone: true,
})
export class DatePipe implements PipeTransform {
  transform(value: any, ...args: unknown[]): string {
    const time = new Date(value).toLocaleTimeString().slice(0, 2).includes(':');
    if (time) {
      return new Date(value).toLocaleTimeString().slice(0, 1) + 'hours ago';
    }
    return new Date(value).toLocaleTimeString().slice(0, 2) + 'hours ago';
  }
}
