import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule, NgFor } from '@angular/common';
import { SubscriberCardComponent } from './subscriber-card/subscriber-card.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ImgPipe, SvgIconComponent } from '@tt/common-ui';
import { ProfileService } from '@tt/profile';

@Component({
  selector: 'tt-app-sidebar',
  imports: [
    SvgIconComponent,
    CommonModule,
    SubscriberCardComponent,
    RouterLink,
    RouterLinkActive,
    SvgIconComponent,
    AsyncPipe,
    ImgPipe,
    NgFor
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
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
