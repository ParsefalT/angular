import { Component, input } from '@angular/core';
import { Profile } from '../../data/interfaces/profile.interface';
import { ImgPipe } from "../../helpers/img.pipe";

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [ImgPipe],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss'
})
export class ProfileHeaderComponent {
  profile = input<Profile>()
}
