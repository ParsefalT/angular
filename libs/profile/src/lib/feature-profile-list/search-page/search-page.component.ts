import { Component, inject } from '@angular/core';
import { ProfileCardComponent } from '../../ui';
import { ProfileService } from '../../data';
import { ProfileFiltersComponent } from '../profile-filters/profile-filters.component';

@Component({
  selector: 'tt-app-search-page',
  imports: [ProfileCardComponent, ProfileFiltersComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent {
  profileService = inject(ProfileService);

  profiles = this.profileService.filteredProfiles;
}
