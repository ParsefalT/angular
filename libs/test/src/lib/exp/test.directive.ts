import { Directive, ElementRef, inject } from '@angular/core';
import { COLOR } from './InjectToken';

@Directive({
  selector: '[test]',
})
export class TestDirective {
  elRef = inject(ElementRef);
  nodename = this.elRef.nativeElement;

  color = inject(COLOR);
  constructor() {
    this.nodename.style.border = `10px solid ${this.color}`;
    console.log(this.elRef);
  }
}
