import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ImgPipe } from '@tt/common-ui';
import { Profile } from '@tt/interfaces/profile';

@Component({
  selector: 'tt-app-subscriber-card',
  imports: [ImgPipe],
  templateUrl: './subscriber-card.component.html',
  styleUrl: './subscriber-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubscriberCardComponent {
  @Input() profile!: Profile;
}
