import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[test]',
  standalone: true,
})
export class TestDirective {
  elRef = inject(ElementRef);
  nodename = this.elRef.nativeElement;
  constructor() {
    this.nodename.style.border = '10px solid red';
  }
}
