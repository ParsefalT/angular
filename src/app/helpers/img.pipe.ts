import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imgPipe',
  standalone: true,
})
export class ImgPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): string {
    return `https://icherniakov.ru/yt-course/${value}`;
  }
}
