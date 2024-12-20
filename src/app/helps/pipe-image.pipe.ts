import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeImage',
  standalone: true,
})
export class PipeImagePipe implements PipeTransform {
  transform(value: string | null): string {
    return 'https://icherniakov.ru/yt-course/' + value;
  }
}
