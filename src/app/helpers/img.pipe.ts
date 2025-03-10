import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imgPipe',
  standalone: true,
})
export class ImgPipe implements PipeTransform {
  transform(value: string | null, ...args: unknown[]): string {
    if(value == null) {
      return 'Content.png'
    } else {
      return `https://icherniakov.ru/yt-course/${value}`;
    }
  }
}
