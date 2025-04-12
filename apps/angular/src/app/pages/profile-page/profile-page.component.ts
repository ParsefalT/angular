import { Component, inject, signal } from '@angular/core';
import { ProfileHeaderComponent } from '../../common-ui/profile-header/profile-header.component';
import { ProfileService } from '../../data/services/profile.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { firstValueFrom, switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { SvgIconComponent } from '../../common-ui/svg-icon/svg-icon.component';
import { ImgPipe } from '../../helpers/img.pipe';
import { PostFeedComponent } from './post-feed/post-feed.component';
import { ChatsService } from '../../data/services/chats.service';

@Component({
  selector: 'app-profile-page',
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
  chatsService = inject(ChatsService);
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

  async sendMessage(id: number) {
    firstValueFrom(this.chatsService.createChat(id)).then((res) => {
      this.router.navigate(['/chats', res.id]);
    });
  }
}
