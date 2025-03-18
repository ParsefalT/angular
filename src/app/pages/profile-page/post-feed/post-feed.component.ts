import { PostService } from './../../../data/services/post.service';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  inject,
  input,
  Output,
  Renderer2,
} from '@angular/core';
import { PostInputComponent } from '../post-input/post-input.component';
import { PostComponent } from '../post/post.component';
import { ExperimentalComponent } from '../../../exp/experimental/experimental.component';
import { auditTime, firstValueFrom, fromEvent, tap } from 'rxjs';
import { ProfileService } from '../../../data/services/profile.service';
import { TestDirective } from '../../../exp/experimental/test.directive';

@Component({
  selector: 'app-post-feed',
  standalone: true,
  imports: [
    PostInputComponent,
    PostComponent,
    ExperimentalComponent,
    TestDirective
  ],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss',
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

  ngAfterViewInit() {
    this.resizeFeed();
  }

  resizeFeed() {
    const { top } = this.hostElement.nativeElement.getBoundingClientRect();
    const height: number = window.innerHeight - top - 24;

    this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`);
  }

  profile = inject(ProfileService).me;
  postId = input<number>(0);
  isCommentInput = input(false);
  postText: string = '';
  @Output() created = new EventEmitter();

  @HostBinding('class.comment')
  get isComment() {
    return this.isCommentInput();
  }

  onCreatePost(postText: string) {
    if (!postText) return;

    if (this.isCommentInput()) {
      firstValueFrom(
        this.postService.createComment({
          text: postText,
          authorId: this.profile()!.id,
          postId: this.postId(),
        })
      ).then((res) => {
        this.postText = '';
        this.created.emit();
      });
      return;
    }

    firstValueFrom(
      this.postService.createPost({
        title: 'amazing post',
        content: postText,
        authorId: this.profile()!.id,
      })
    ).then((res) => (this.postText = ''));
  }

  test(event: string) {
    this.onCreatePost(event);
  }
}
