import { inject } from '@angular/core';
import {signalStore, withMethods, withState, } from '@ngrx/signals'
import { Profile } from '@tt/interfaces/profile';
import { ProfileService, ProfileState } from '@tt/profile';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

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
    withMethods((state, profileService = inject(ProfileService)) => {


        return {

        }
    })
)