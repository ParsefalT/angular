import { Component, inject } from '@angular/core';
import { ProfileCardComponent } from '../../ui';
import { ProfileService, selectFilteredProfiles } from '../../data';
import { ProfileFiltersComponent } from '../profile-filters/profile-filters.component';
import { Store } from '@ngrx/store';

@Component({
  selector: 'tt-app-search-page',
  imports: [ProfileCardComponent, ProfileFiltersComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent {
  profileService = inject(ProfileService);

  store = inject(Store)

  // profiles = this.profileService.filteredProfiles;
  profiles = this.store.selectSignal(selectFilteredProfiles);
}
