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
  imports: [FormsModule, ReactiveFormsModule, JsonPipe, NoReactValid],
  templateUrl: './experimental.component.html',
  styleUrl: './experimental.component.scss',
})
export class ExperimentalComponent {
  person = {
    name: '',
    lastName: '',
    address: {
      street: '',
      building: '',
    },
  };

  hobby = '';

  onChange(event: string) {
    this.person.name = event;
  }

  onSubmit(form: NgForm) {
    //@ts-ignore
    // console.log(window.ng.getDirectives(event.target)[2].form.value);
    console.log(form.value);
  }
}
