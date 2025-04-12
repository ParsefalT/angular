import { Component, inject, input, OnInit, signal } from '@angular/core';
import { PostComment, Post } from '../../../data/interfaces/post.interface';
import { AvatarCircleComponent } from '../../../common-ui/avatar-circle/avatar-circle.component';

import { SvgIconComponent } from '../../../common-ui/svg-icon/svg-icon.component';
import { PostInputComponent } from '../post-input/post-input.component';
import { CommentComponent } from './comment/comment.component';
import { PostService } from '../../../data/services/post.service';
import { firstValueFrom } from 'rxjs';
import { DatePipe } from '../../../helpers/date.pipe';
import { TestDirective } from '../../../exp/experimental/test.directive';
import { MessageInputComponent } from '../../../common-ui/message-input/message-input.component';
import { ProfileService } from '../../../data/services/profile.service';

@Component({
  selector: 'app-post',
  imports: [
    AvatarCircleComponent,
    DatePipe,
    SvgIconComponent,
    // PostInputComponent,
    CommentComponent,
    MessageInputComponent,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent implements OnInit {
  post = input<Post>();

  comments = signal<PostComment[]>([]);

  postService = inject(PostService);

  async ngOnInit() {
    this.comments.set(
      this.post()!.comments.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )
    );
  }

  // add logic from input for create commentPost
  profile = inject(ProfileService).me;
  async onCreated(text: string) {
    if (!text) return;

    await firstValueFrom(
      this.postService.createComment({
        text: text,
        authorId: this.profile()!.id,
        postId: this.post()!.id,
      })
    );

    const comments = await firstValueFrom(
      this.postService.getCommentsByPostId(this.post()!.id)
    );
    this.comments.set(
      comments.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )
    );
  }
}
