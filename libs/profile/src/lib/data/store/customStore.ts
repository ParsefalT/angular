import { computed, signal, Signal } from '@angular/core';

export class SignalStoreService<T> {
  readonly state = signal({} as T);

  select<K extends keyof T>(key: K): Signal<T[K]> {
    return computed(() => this.state()[key])
  }

  set<K extends keyof T>(key:K, data: T[K]):void {
    this.state.update((currentValue:T):T => ({...currentValue, [key]: data}))
  }

  pathState(partialState: Partial<T>):void {
    this.state.update((currentValue:T): T & Partial<T> => ({...currentValue, ...partialState}))
  }
}
