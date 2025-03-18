import { Component, inject } from '@angular/core';
import { ProfileHeaderComponent } from '../../common-ui/profile-header/profile-header.component';
import { ProfileService } from '../../data/services/profile.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { SvgIconComponent } from '../../common-ui/svg-icon/svg-icon.component';
import { SubscriberCardComponent } from '../../common-ui/sidebar/subscriber-card/subscriber-card.component';
import { ImgPipe } from '../../helpers/img.pipe';
import { PostFeedComponent } from './post-feed/post-feed.component';
import { TestDirective } from '../../exp/experimental/test.directive';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    ProfileHeaderComponent,
    AsyncPipe,
    SvgIconComponent,
    RouterLink,
    SubscriberCardComponent,
    ImgPipe,
    PostFeedComponent,
    TestDirective,
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent {
  profileService = inject(ProfileService);
  route = inject(ActivatedRoute);

  me$ = toObservable(this.profileService.me);
  subscribers$ = this.profileService.getSubscribersShortList(6);

  profile$ = this.route.params.pipe(
    switchMap((param) => {
      if (param['id'] == 'me') return this.me$;

      return this.profileService.getAccount(param['id']);
    })
  );
}
