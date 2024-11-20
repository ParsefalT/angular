import { Component, inject } from '@angular/core';
import { SubscribeCardComponent } from '../subscribe-card/subscribe-card.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProfileService } from '../../data/services/profile.service';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

interface MenuItems {
  label: string;
  link: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SubscribeCardComponent, RouterLink,RouterLinkActive, AsyncPipe],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  profileService = inject(ProfileService);
  authService = inject(AuthService);
  me = this.profileService.me;
  subscribers$ = this.profileService.getSubscribers();
  menuItems: MenuItems[] = [
    {
      label: 'My page',
      link: '',
    },
    {
      label: 'Chats',
      link: 'chats',
    },
    {
      label: 'Search',
      link: 'search',
    },
  ];

  ngOnInit() {
    firstValueFrom(this.profileService.getMe());
  }

  logout() {
    this.authService.logout()
  }
}
