import { Component, inject } from '@angular/core';
import { ProfileCardComponent } from '../../common-ui/profile-card/profile-card.component';
import { ProfileFiltersComponent } from './profile-filters/profile-filters.component';
import { ProfileService } from '../../data/services/profile.service';

@Component({
  selector: 'app-search-page',
  imports: [ProfileCardComponent, ProfileFiltersComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent {
  profileService = inject(ProfileService);

  profiles = this.profileService.filteredProfiles;
}
