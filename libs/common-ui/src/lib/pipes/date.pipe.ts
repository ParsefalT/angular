import { Pipe, PipeTransform } from '@angular/core';
import { formatDistance, formatDistanceToNow } from 'date-fns';
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
    const options: Intl.DateTimeFormatOptions = { 
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    } as const;
      
    date.setHours(date.getHours() + 3); 
    date.setMinutes(date.getMinutes() - 6)
    //  return  date.toLocaleTimeString("ru-RU", options);
    return formatDistance(date, new Date(), { addSuffix: true, locale: ru });
  }
}
