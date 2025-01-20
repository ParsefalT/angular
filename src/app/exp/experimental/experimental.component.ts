import { Component } from '@angular/core';
import {
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
  imports: [],
  templateUrl: './experimental.component.html',
  styleUrl: './experimental.component.scss',
})
export class ExperimentalComponent {

  subject$ = new Subject()
  constructor() {
    // customFromEvent(document.body, 'click')
    //   .pipe(take(5))
    //   .subscribe((val) => console.log(val));

    // customTimer(1000)
    //   .pipe(take(5))
    //   .subscribe((val) => console.log(val));

    // let timer = customTime(1000)
    // timer.subscribe(console.log)
    // timer.subscribe(console.log)

    // let som = random().pipe(shareReplay())
    // som.subscribe(console.log)
    // som.subscribe(console.log)
    // som.subscribe(console.log)
    // const obs = new Observable((subscribe) => {
    //   subscribe.next(1);
    //   subscribe.next(2);
    //   subscribe.next(3);
    //   subscribe.next(4);
    //   return () => {
    //     console.log('destroy');
    //   };
    // });
    // const sub = obs.subscribe((val) => console.log(val));

    // setTimeout(() => {
    //   sub.unsubscribe();
    // }, 3000);

    // const observable$ = forkJoin([
    //   interval(3000).pipe(map((i) => '1_' + i),take(2)),
    //   interval(200).pipe(map((i) => '2_' + i),take(2)),
    //   // fromEvent(document.body, 'click'),
    // ])

    // observable$.subscribe({
    //   next: (val) => console.log('next', val),
    //   error: (val) => console.log('error', val),
    //   complete: () => console.log('complete'),
    // });

    this.subject$.subscribe(val => {
      console.log(val)
    })
    

    this.subject$.next(123)
    this.subject$.next(12)
  }
}
