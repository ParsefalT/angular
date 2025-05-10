import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';

export interface Features {
  code: string;
  label: string;
  value: boolean;
}
interface Address {
  city?: string;
  street?: string;
  building?: number | null;
  flat?: number | null;
}

@Injectable({
  providedIn: 'root',
})
export class MockService {
  constructor() {}

  getAddress(): Observable<Address[]> {
    return of<Address[]>([
      {
        city: 'wow',
        building: 23,
        flat: 4,
        street: 'feodoisu',
      },
      {
        city: 'spb',
        building: 18,
        flat: 11,
        street: 'lazani',
      },
      // {
      //   city: 'www',
      //   building: 1,
      //   flat: 41,
      //   street: 'garfild',
      // },
    ]);
  }

  getFeatures(): Observable<Features[]> {
    return of<Features[]>([
      {
        code: 'lift',
        label: 'up the floor',
        value: true,
      },
      {
        code: 'strong-package',
        label: 'strong package',
        value: true,
      },
      {
        code: 'fast',
        label: 'fast receive',
        value: false,
      },
    ]);
  }
}
