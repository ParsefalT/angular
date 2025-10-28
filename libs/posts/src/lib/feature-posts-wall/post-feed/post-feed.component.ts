import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  Renderer2,
} from '@angular/core';
import { PostComponent } from '../post/post.component';
import { postActions, postSelector } from '../../data';
import { auditTime, fromEvent, tap } from 'rxjs';
import { MessageInputComponent } from '@tt/common-ui';

import { GlobalService } from '@tt/shared';
import { Store } from '@ngrx/store';

@Component({
  selector: 'tt-app-post-feed',
  imports: [PostComponent, MessageInputComponent],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss',
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostFeedComponent implements AfterViewInit {
  store = inject(Store);
  feed = this.store.selectSignal(postSelector);

  r2 = inject(Renderer2);
  hostElement = inject(ElementRef);

  constructor() {
    this.store.dispatch(postActions.getPosts());
  }

  @HostListener('window:resize')
  onWindowResize() {
    fromEvent(window, 'resize')
      .pipe(
        auditTime(1500),
        tap(() => this.resizeFeed())
      )
      .subscribe();
  }

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
    if (!postText) return;

    this.store.dispatch(
      postActions.createPost({
        title: 'amazing post',
        content: postText,
        authorId: this.profile()?.id || 0,
      })
    );
  }
}
