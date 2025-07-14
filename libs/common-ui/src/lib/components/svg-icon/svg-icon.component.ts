import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'svg[icon]',
  imports: [],
  standalone: true,
  template: '<svg:use [attr.href]="href"></svg:use>',
  styles: [''],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SvgIconComponent {
  @Input() icon = '';

  get href() {
    return `${this.icon}.svg#${this.icon}`;
  }
}
