import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[no-react]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: NoReactValid,
      multi: true,
    },
  ],
})
export class NoReactValid implements Validator {
  change!: () => void;

  validate(control: AbstractControl): ValidationErrors | null {
    console.log(control.value);
    return control.value == 'react'
      ? {
          react: { msg: 'nothing react' },
        }
      : null;
    // throw new Error('Method not implemented.');
  }
  registerOnValidatorChange?(fn: () => void): void {
    this.change = fn;
    // throw new Error('Method not implemented.');
  }
}
