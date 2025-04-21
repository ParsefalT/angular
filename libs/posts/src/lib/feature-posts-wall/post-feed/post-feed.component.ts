import {
  Component,
  ElementRef,
  HostListener,
  inject,
  Renderer2,
} from '@angular/core';
import { PostComponent } from '../post/post.component';
import { PostService } from '../../data';
import { auditTime, firstValueFrom, fromEvent, tap } from 'rxjs';
import { MessageInputComponent } from '@tt/common-ui';

import { GlobalService } from '@tt/shared';

@Component({
  selector: 'tt-app-post-feed',
  imports: [PostComponent, MessageInputComponent],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss',
  providers: [],
})
export class PostFeedComponent {
  postService = inject(PostService);
  feed = this.postService.posts;

  r2 = inject(Renderer2);
  hostElement = inject(ElementRef);

  @HostListener('window:resize')
  onWindowResize() {
    fromEvent(window, 'resize')
      .pipe(
        auditTime(1500),
        tap(() => this.resizeFeed())
      )
      .subscribe((val) => console.log(123));
  }

  constructor() {
    firstValueFrom(this.postService.fetchPosts());
  }
  // testt() {
  //   this.feed().map(item => this.postService.deletePost(item.id).pipe().subscribe())
  // }
  ngAfterViewInit() {
    this.resizeFeed();
  }

  resizeFeed() {
    const { top } = this.hostElement.nativeElement.getBoundingClientRect();
    const height: number = window.innerHeight - top - 24;

    this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`);
  }

  // createPost from custom Component
  profile = inject(GlobalService).me;
  onCreatePost(postText: string) {
    firstValueFrom(
      this.postService.createPost({
        title: 'amazing post',
        content: postText,
        authorId: this.profile()!.id,
      })
    );
  }
}
