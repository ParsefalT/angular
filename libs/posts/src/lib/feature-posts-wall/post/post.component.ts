import { Component, inject, input, OnInit, signal } from '@angular/core';
import { CommentComponent } from '../../ui';
import { Post, PostComment, PostService } from '../../data';
import { firstValueFrom } from 'rxjs';
import {
  AvatarCircleComponent,
  DatePipe,
  MessageInputComponent,
  SvgIconComponent,
} from '@tt/common-ui';
import { GlobalService } from '@tt/shared';

@Component({
  selector: 'tt-app-post',
  imports: [
    AvatarCircleComponent,
    DatePipe,
    SvgIconComponent,
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
  profile = inject(GlobalService).me;
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
