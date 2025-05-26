import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { Profile } from '@tt/interfaces/profile';
import { ProfileService } from '@tt/profile';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';

export interface ProfileStateModel {
  profiles: Profile[];
  profileFilters: Record<string, any>;
}

export const initialState: ProfileStateModel = {
  profiles: [],
  profileFilters: {},
};

export const profileStore = signalStore(
  withState(initialState),
  withComputed((state) => {
    return {
      profiles2: computed(() => state.profiles().map(profile => ({...profile, lastName: "Great_Human"})))
    }
  }),

  withMethods((state, profileService = inject(ProfileService)) => {
    const filterProjects = rxMethod<Record<string, any>>(
      pipe(
        switchMap((filters) => {
          return profileService
            .filterProfiles(filters)
            .pipe(tap((res) => patchState(state, { profiles: res.items })));
        })
      )
    );

    return {
      filterProjects,
    };
  }),

  withHooks({
    onInit(store) {
        store.filterProjects({})
    },
  })
);
