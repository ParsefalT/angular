import { inject, Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from "@ngrx/effects"
import { ProfileService } from '../services/profile.service';
import { profileActions } from './actions';
import { map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileEffects {
  profileService = inject(ProfileService);

  actions$ = inject(Actions)

  filterProfiles = createEffect(() => {
    return this.actions$.pipe(
          ofType(profileActions.filterEvents),
          switchMap(({ filters }) => {
              return this.profileService.filterProfiles(filters);
          }),
          map(res => profileActions.profilesLoaded({ profiles: res.items }))
      );
  })
}
