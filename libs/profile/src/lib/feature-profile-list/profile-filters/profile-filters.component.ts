import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, startWith, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { profileActions, ProfileService } from '../../data';
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
    this.searchForm.valueChanges
      .pipe(
        startWith({}),
        debounceTime(350),
        // switchMap((formValue) => {
          // this.profileService.filterProfiles(formValue)
        // }),
        takeUntilDestroyed()
      )
      .subscribe(formValue => {
        this.store.dispatch(profileActions.filterEvents({filters: formValue}))
      });
  }
}
