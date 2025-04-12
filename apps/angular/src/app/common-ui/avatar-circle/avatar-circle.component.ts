import { Component, input } from '@angular/core';
import { ImgPipe } from '../../helpers/img.pipe';
import { Profile } from '../../data/interfaces/profile.interface';

@Component({
  selector: 'app-avatar-circle',
  imports: [ImgPipe],
  templateUrl: './avatar-circle.component.html',
  styleUrl: './avatar-circle.component.scss',
})
export class AvatarCircleComponent {
  avatarUrl = input<string | null>();
}
