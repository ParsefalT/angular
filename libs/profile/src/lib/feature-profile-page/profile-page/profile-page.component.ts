import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { ImgPipe, SvgIconComponent } from '@tt/common-ui';
import { ProfileService } from '../../data';
import { ProfileHeaderComponent } from '../../ui';
import { PostFeedComponent } from '@tt/posts';
@Component({
  selector: 'tt-app-profile-page',
  imports: [
    ProfileHeaderComponent,
    AsyncPipe,
    SvgIconComponent,
    RouterLink,
    ImgPipe,
    PostFeedComponent,
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent {
  profileService = inject(ProfileService);
  // chatsService = inject(ChatsService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  me$ = toObservable(this.profileService.me);
  subscribers$ = this.profileService.getSubscribersShortList(6);

  isMyPage = signal<boolean>(false);

  profile$ = this.route.params.pipe(
    switchMap((param) => {
      this.isMyPage.set(
        param['id'] === 'me' || param['id'] == this.profileService.me()?.id
      );
      if (param['id'] == 'me') return this.me$;

      return this.profileService.getAccount(param['id']);
    })
  );

  async sendMessage(userId: number) {
    this.router.navigate(['/chats', 'new'], { queryParams: { userId } });
  }
}
