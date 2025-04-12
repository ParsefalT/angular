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
import { auditTime, firstValueFrom, fromEvent, tap } from 'rxjs';
import { ProfileService } from '../../../data/services/profile.service';
import { MessageInputComponent } from '../../../common-ui/message-input/message-input.component';

@Component({
  selector: 'app-post-feed',
  imports: [
    PostComponent,
    // PostInputComponent,
    MessageInputComponent,
    // ExperimentalComponent,
    // TestDirective,
  ],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss',
  providers: [
    // {provide: COLOR,
    //   useValue: "pink"
    // }
  ],
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
  profile = inject(ProfileService).me;
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
