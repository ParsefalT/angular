import { Component, Input } from '@angular/core';
import { ImgPipe } from '@tt/common-ui';
import { Profile } from '@tt/interfaces/profile';

@Component({
  selector: 'tt-app-profile-card',
  imports: [ImgPipe],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
})
export class ProfileCardComponent {
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('profile') profile!: Profile;
}
