import { Component, inject } from '@angular/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import { SubscriberCardComponent } from './subscriber-card/subscriber-card.component';
import { RouterLink } from '@angular/router';
import { ProfileService } from '../../data/services/profile.service';
import { firstValueFrom } from 'rxjs';
import { ImgPipe } from '../../helpers/img.pipe';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    SvgIconComponent,
    CommonModule,
    SubscriberCardComponent,
    RouterLink,
    SvgIconComponent,
    AsyncPipe,
    JsonPipe,
    ImgPipe,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  profileService = inject(ProfileService);

  subscribes$ = this.profileService.getSubscribersShortList();
  me = this.profileService.me;

  menuItems: MenuItems[] = [
    { label: 'My Page', icon: 'home', link: 'profile/me' },
    { label: 'Chats', icon: 'msg', link: '' },
    { label: 'Search', icon: 'search', link: '' },
  ];

  ngOnInit() {
    firstValueFrom(this.profileService.getMe());
  }
}

interface MenuItems {
  label: string;
  icon: string;
  link: string;
}
