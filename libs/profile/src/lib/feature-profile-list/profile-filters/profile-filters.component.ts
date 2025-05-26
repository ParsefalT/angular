import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, startWith } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { profileActions, selectFilteredProfiles } from '../../data';
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

  store = inject(Store);

  searchForm = this.fd.group({
    firstName: [''],
    lastName: [''],
    stack: [''],
  });

  constructor() {
    const filters = this.store.selectSignal(selectFilteredProfiles);
    this.searchForm.patchValue(filters().selectProfiles);
    this.searchForm.valueChanges
      .pipe(
        startWith(filters().selectProfiles),
        debounceTime(350),
        takeUntilDestroyed()
      )
      .subscribe((formValue) => {
        this.store.dispatch(profileActions.setFilters({ filters: formValue }));
        this.store.dispatch(
          profileActions.filterEvents({ filters: formValue })
        );
      });
  }
}
