import { Component, input } from '@angular/core';
import { ImgPipe } from '../../pipes';

@Component({
  selector: 'tt-app-avatar-circle',
  imports: [ImgPipe],
  templateUrl: './avatar-circle.component.html',
  styleUrl: './avatar-circle.component.scss',
})
export class AvatarCircleComponent {
  avatarUrl = input<string | null>();
}
