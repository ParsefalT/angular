import { Component, inject } from '@angular/core';
import { ProfileCardComponent } from '../../common-ui/profile-card/profile-card.component';
import { Profile } from '../../data/interfaces/profile-interface';
import { ProfileService } from '../../data/services/profile.service';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [ProfileCardComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent {
  [x: string]: any;

  title = 'angular';
  profileService = inject(ProfileService);
  profiles: Profile[] = [];

  constructor() {
    this.profileService
      .getTestAccounts()
      .subscribe((val) => (this.profiles = val));
  }
}