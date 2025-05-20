import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, startWith, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { profileActions, ProfileService, selectFilteredProfiles } from '../../data';
import { Store } from '@ngrx/store';

@Component({
  selector: 'tt-app-profile-filters',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile-filters.component.html',
  styleUrl: './profile-filters.component.scss',
})
export class ProfileFiltersComponent {
  fd = inject(FormBuilder);
  profileService = inject(ProfileService);

  store = inject(Store)

  searchForm = this.fd.group({
    firstName: [''],
    lastName: [''],
    stack: [''],
  });

  constructor() {
    const filters = this.store.selectSignal(selectFilteredProfiles)
    // this.store.dispatch(profileActions.setFilters())
    this.searchForm.patchValue(filters().selectProfiles)
    this.searchForm.valueChanges
      .pipe(
        startWith(filters().selectProfiles),
        debounceTime(350),
        // switchMap((formValue) => {
          // this.profileService.filterProfiles(formValue)
        // }),
        takeUntilDestroyed()
      )
      .subscribe(formValue => {
        this.store.dispatch(profileActions.setFilters({filters: formValue}))
        this.store.dispatch(profileActions.filterEvents({filters: formValue}))
      });
  }
}
