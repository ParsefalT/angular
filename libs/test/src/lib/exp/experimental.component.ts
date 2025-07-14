import { AsyncPipe, JsonPipe, KeyValuePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
  NgModule,
  signal,
} from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormRecord,
  FormsModule,
  NgForm,
  NgModel,
  NgModelGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  BehaviorSubject,
  combineLatest,
  concatWith,
  filter,
  first,
  forkJoin,
  from,
  fromEvent,
  interval,
  map,
  Observable,
  of,
  OperatorFunction,
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
import { Features, MockService } from './mock.service';

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
    let inc = 0;
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

interface Address {
  city?: string;
  street?: string;
  building?: number | null;
  flat?: number | null;
}

function getMockFields(initAddress: Address = {}): FormGroup<{
  city: FormControl<string | null>;
  street: FormControl<string | null>;
  building: FormControl<number | null>;
  flat: FormControl<number | null>;
}> {
  return new FormGroup({
    city: new FormControl(initAddress.city ?? ''),
    street: new FormControl(initAddress.street ?? ''),
    building: new FormControl<number | null>(initAddress.building ?? null),
    flat: new FormControl<number | null>(initAddress.flat ?? null),
  });
}
function test(): OperatorFunction<number, number[]> {
  return (source: Observable<number>) => {
    return new Observable((observer) => {
      return source.subscribe({
        next: (val) => {
          console.log(val);
          return observer.next([val]);
        },
        error: (err) => console.log(err),
        complete: () => {
          console.log('compleat take');
        },
      });
    });
  };
}

@Component({
  selector: 'lib-app-experimental',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    JsonPipe,
    NoReactValid,
    KeyValuePipe,
    AsyncPipe,
  ],
  templateUrl: './experimental.component.html',
  styleUrl: './experimental.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExperimentalComponent {
  mockService = inject(MockService);
test=""
  s$ = from([1, 2, 3, 4, 5]).pipe(test());

  ReceiverType = ReceiverType;
  features: Features[] = [];
  form = new FormGroup({
    type: new FormControl<ReceiverType>(ReceiverType.PERSON),
    inn: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    lastName: new FormControl('Alexander'),
    addresses: new FormArray([getMockFields()]),
    feature: new FormRecord({}),
  });

  constructor() {
    this.mockService
      .getAddress()
      .pipe(takeUntilDestroyed())
      .subscribe((addrs) => {
        // while (this.form.controls.addresses.controls.length > 0) {
        //   this.form.controls.addresses.removeAt(0);
        // }

        this.form.controls.addresses.clear();

        for (const addr of addrs) {
          this.form.controls.addresses.push(getMockFields(addr));
        }
        //@ts-ignore
        // this.form.controls.addresses.setValue(addrs)
        // this.form.controls.addresses.setControl(1, getMockFields(addrs[0]));

        console.log(this.form.controls.addresses.at(0));
      });

    this.mockService
      .getFeatures()
      .pipe(takeUntilDestroyed())
      .subscribe((features) => {
        this.features = features;

        for (const feat of features) {
          this.form.controls.feature.addControl(
            feat.code,
            new FormControl(feat.value)
          );
        }
      });

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
    //   name: 'pars228',
    //   lastName: 'alexander',
    // };
    this.form.controls.lastName.disable();
    // this.form.patchValue(values);
    // this.form.setValue(values);
  }

  deleteOneAddress(index: number) {
    this.form.controls.addresses.removeAt(index, { emitEvent: false });
  }
  addOneAddress() {
    this.form.controls.addresses.push(getMockFields());
    // this.form.controls.addresses.insert(0, getMockFields());
  }
  sort = () => 0;
  tests = [1, 2, 3, 4, 5];
  onSubmit(event: Event) {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) return;
    console.log(this.form.getRawValue());
    console.log(this.form.value);
    // this.form.reset({
    //   type: this.ReceiverType.PERSON,
    //   name: 'bob',
    // });
  }
}
