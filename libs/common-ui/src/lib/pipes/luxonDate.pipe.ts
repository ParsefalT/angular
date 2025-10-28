import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

@Pipe({
  name: 'luxonDatePipe',
})
export class LuxonDatePipe implements PipeTransform {
  transform(value: string, format: 'date' | 'time' | null): string {
    const date = DateTime.fromISO(value, {zone: 'Europe/Moscow'}).setZone('system').plus({hours: 3});

    if (format == 'time') {
        return date.toFormat("HH:mm");
    } else if (format == 'date') {
        return date.setLocale('ru').toLocaleString({month: 'long', day: 'numeric'})
    }
    return 'none'
  }
}
