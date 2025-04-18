import { Component, inject } from '@angular/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { SubscriberCardComponent } from './subscriber-card/subscriber-card.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProfileService } from '../../data/services/profile.service';
import { firstValueFrom } from 'rxjs';
import { ImgPipe } from '../../helpers/img.pipe';

@Component({
  selector: 'app-sidebar',
  imports: [
    SvgIconComponent,
    CommonModule,
    SubscriberCardComponent,
    RouterLink,
    RouterLinkActive,
    SvgIconComponent,
    AsyncPipe,
    ImgPipe,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  profileService = inject(ProfileService);

  subscribers$ = this.profileService.getSubscribersShortList();
  me = this.profileService.me;

  menuItems: MenuItems[] = [
    { label: 'My Page', icon: 'home', link: 'profile/me' },
    { label: 'Chats', icon: 'msg', link: '/chats' },
    { label: 'Search', icon: 'search', link: '/search' },
    { label: 'example', icon: '', link: '/example' },
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
