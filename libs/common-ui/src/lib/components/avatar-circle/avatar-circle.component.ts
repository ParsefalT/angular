import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ImgPipe } from '../../pipes';

@Component({
  selector: 'tt-app-avatar-circle',
  imports: [ImgPipe],
  templateUrl: './avatar-circle.component.html',
  styleUrl: './avatar-circle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarCircleComponent {
  avatarUrl = input<string | null>();
}
