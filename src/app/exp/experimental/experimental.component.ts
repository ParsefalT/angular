import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, HostBinding, inject, signal } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  NgModelGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  BehaviorSubject,
  combineLatest,
  filter,
  first,
  forkJoin,
  from,
  fromEvent,
  interval,
  map,
  Observable,
  of,
  pipe,
  shareReplay,
  Subject,
  take,
  throwError,
  timer,
  zip,
} from 'rxjs';
import { TestDirective } from './test.directive';
import { NoReactValid } from './no-react.valid';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

function customFromEvent(el: HTMLElement, eventName: string) {
  return new Observable((subscribe) => {
    const handleEvent = (e: Event) => {
      subscribe.next(e);
    };
    el.addEventListener(eventName, handleEvent);

    return () => {
      console.log('destroy');
      el.removeEventListener(eventName, handleEvent);
    };
  });
}

function customTimer(timer: number) {
  return new Observable((subscribe) => {
    const id = setInterval(() => {
      subscribe.next(timer);
    }, timer);

    return () => {
      console.log('destroy');
      clearInterval(id);
    };
  });
}

function customTime(timer: number) {
  return new Observable((subscribe) => {
    let inc: number = 0;
    const id = setTimeout(() => {
      subscribe.next(inc++);
    }, timer);

    return () => {
      console.log('destroy');
      clearTimeout(id);
    };
  });
}

function random() {
  return new Observable((subscribe) => {
    const random = Math.random();
    subscribe.next(random);
  });
}

enum ReceiverType {
  PERSON = 'PERSON',
  LEGAL = 'LEGAL',
}

@Component({
  selector: 'app-experimental',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    JsonPipe,
    // NoReactValid,
  ],
  templateUrl: './experimental.component.html',
  styleUrl: './experimental.component.scss',
})
export class ExperimentalComponent {
  ReceiverType = ReceiverType;
  form = new FormGroup({
    type: new FormControl<ReceiverType>(ReceiverType.PERSON),
    inn: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    lastName: new FormControl(''),
    address: new FormGroup({
      city: new FormControl(''),
      street: new FormControl(''),
      building: new FormControl<number | null>(null),
      flat: new FormControl<number | null>(null),
    }),
  });

  constructor() {
    this.form.controls.type.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((val) => {
        console.log(val);
        this.form.controls.inn.clearValidators();
        if (val == ReceiverType.LEGAL) {
          this.form.controls.inn.setValidators([
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10),
          ]);
        }
        this.form.controls.inn.updateValueAndValidity();
      });

    // let values = {
    //   name: 'pars',
    //   lastName: 'alexander',
    // };
      this.form.controls.lastName.disable()
    // this.form.patchValue(values);
  }

  onSubmit(event: Event) {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) return;
    console.log(this.form.getRawValue())
    console.log(this.form.value)
    // this.form.reset({
    //   type: this.ReceiverType.PERSON,
    //   name: 'sex',
    // });
  }
}
