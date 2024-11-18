import { Component, Input } from '@angular/core';
import { Profile } from '../../data/interfaces/profile-interface';
import { PipeImagePipe } from '../../helps/pipe-image.pipe';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [PipeImagePipe, NgOptimizedImage],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
})
export class ProfileCardComponent {
  @Input() profile!: Profile;
}
