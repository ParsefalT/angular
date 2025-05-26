import { inject, Injectable } from "@angular/core";
import { Profile } from "@tt/interfaces/profile";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { FilterEvents } from "./actions.ngxs";
import { Observable, tap } from "rxjs";
import { ProfileService } from "../services/profile.service";
import { Pageble } from "@tt/shared";

export interface ProfileStateModel {
  profiles: Profile[];
  profileFilters: Record<string, any>;
}

@State({
    name: "profileState",
    defaults: {
        profiles: [],
        profilesFilter: {}
    }
})
@Injectable()
export class ProfileState {
    #profileService = inject(ProfileService)

    @Selector()
    static getProfiles(state: ProfileStateModel): Profile[] {
        return state.profiles
    }

    @Action(FilterEvents)
    onFilterEvents(ctx: StateContext<ProfileStateModel>, {filters}:FilterEvents): Observable<Pageble<Profile>> {
        return this.#profileService.filterProfiles(filters).pipe(
            tap(res => {
                ctx.patchState({
                    profiles: res.items
                })
            })
        )
    }
}