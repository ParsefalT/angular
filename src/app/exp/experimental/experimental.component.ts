import { JsonPipe } from '@angular/common';
import { Component, HostBinding, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
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

@Component({
  selector: 'app-experimental',
  standalone: true,
  imports: [FormsModule, JsonPipe, TestDirective],
  templateUrl: './experimental.component.html',
  styleUrl: './experimental.component.scss',
})
export class ExperimentalComponent {
  person = {
    name: '',
    lastName: '',
    address: {
      street: '',
      building: 0,
    },
  };
  directive = inject(TestDirective, {skipSelf:false});

  constructor() {
    this.directive.elRef.nativeElement.style.border = '10px solid violet';
  }

  hobby2: string = 'asd';
  hobby1: string | null = '';

  onChange(event: any) {
    console.log(event);
    this.person.name = event;
  }

  onSubmit(event: SubmitEvent) {
    console.log(this.hobby2);
    //@ts-ignore
    console.log(window.ng.getDirectives(event.target)[2].form.value);
  }
}
 