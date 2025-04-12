import { Pipe, PipeTransform } from '@angular/core';
import { formatDistanceToNow } from 'date-fns';
import { ru, enUS } from 'date-fns/locale';
@Pipe({
  name: 'datePipe',
})
export class DatePipe implements PipeTransform {
  transform(value: string | null): string {
    if (!value) {
      return 'data unknown';
    }

    const date = new Date(value);
    if (isNaN(date.getTime())) {
      return 'wrong date';
    }
    date.setHours(date.getHours() + 3);
    return formatDistanceToNow(date, { addSuffix: true, locale: enUS });
  }
}
