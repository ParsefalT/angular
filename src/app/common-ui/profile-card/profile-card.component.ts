import { Component, Input } from '@angular/core';
import { Profile } from '../../data/interfaces/profile.interface';
import { ImgPipe } from '../../helpers/img.pipe';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [ImgPipe],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
})
export class ProfileCardComponent {
  @Input("profile") profile!: Profile;
}
