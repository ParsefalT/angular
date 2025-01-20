import { PostService } from './../../../data/services/post.service';
import {
  Component,
  ElementRef,
  HostListener,
  inject,
  Renderer2,
} from '@angular/core';
import { PostInputComponent } from '../post-input/post-input.component';
import { PostComponent } from '../post/post.component';
import { ExperimentalComponent } from '../../../exp/experimental/experimental.component';
import {
  audit,
  auditTime,
  debounce,
  debounceTime,
  firstValueFrom,
  fromEvent,
  pipe,
  tap,
  throttle,
} from 'rxjs';

@Component({
  selector: 'app-post-feed',
  standalone: true,
  imports: [PostInputComponent, PostComponent, ExperimentalComponent],
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
}
