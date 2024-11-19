import { Profile } from './../../data/interfaces/profile-interface';
import { Component, Input } from '@angular/core';
import { PipeImagePipe } from '../../helps/pipe-image.pipe';

@Component({
  selector: 'app-subscribe-card',
  standalone: true,
  imports: [PipeImagePipe],
  templateUrl: './subscribe-card.component.html',
  styleUrl: './subscribe-card.component.scss',
})
export class SubscribeCardComponent {
  @Input() profile!: Profile;
}
