import { Component, input } from '@angular/core';
import { Profile } from '../../data/interfaces/profile-interface';
import { PipeImagePipe } from '../../helps/pipe-image.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [PipeImagePipe, RouterLink],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss',
})
export class ProfileHeaderComponent {
  profile = input<Profile>();
}
