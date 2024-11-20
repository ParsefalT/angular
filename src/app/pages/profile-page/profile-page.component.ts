import { Component, inject } from '@angular/core';
import { ProfileHeaderComponent } from '../../common-ui/profile-header/profile-header.component';
import { ProfileService } from '../../data/services/profile.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { PipeImagePipe } from "../../helps/pipe-image.pipe";
import { PostComponent } from "../../common-ui/post/post.component";
import { PostFeedComponent } from "../../common-ui/post-feed/post-feed.component";

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [ProfileHeaderComponent, AsyncPipe, RouterLink, PipeImagePipe, PostComponent, PostFeedComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent {
  profileService = inject(ProfileService);
  activateRoute = inject(ActivatedRoute);

  me$ = toObservable(this.profileService.me);
  subscribers$ = this.profileService.getSubscribers(5);

  profile$ = this.activateRoute.params.pipe(
    switchMap(({ id }) => {
      if (id == 'me') return this.me$;
      return this.profileService.getAccount(id);
    })
  );
}
