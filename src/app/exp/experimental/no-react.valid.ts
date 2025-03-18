import { Directive } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';

@Directive({
  standalone: true,
  selector: '[no0react]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: NoReactValid,
      multi: true,
    },
  ],
})
export class NoReactValid {}
