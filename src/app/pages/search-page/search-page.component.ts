import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileCardComponent } from '../../common-ui/profile-card/profile-card.component';
import { Profile } from '../../data/interfaces/profile.interface';
import { ProfileService } from '../../data/services/profile.service';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [JsonPipe, RouterOutlet, ProfileCardComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent {
  profileService = inject(ProfileService);

  profiles: Profile[] = [];

  constructor() {
    this.profileService.getAccounts().subscribe((val) => (this.profiles = val));
  }
}
