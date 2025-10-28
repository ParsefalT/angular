import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  Signal,
  ViewChild,
  viewChild,
} from '@angular/core';
import { CommentComponent } from '../../ui';
import { Post, postActions } from '../../data';
import {
  AvatarCircleComponent,
  DatePipe,
  MessageInputComponent,
  SvgIconComponent,
} from '@tt/common-ui';
import { GlobalService } from '@tt/shared';
import { Store } from '@ngrx/store';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent implements AfterViewChecked {
  store = inject(Store);
  post = input<Post>();
  // hostElement: ElementRef<HTMLDivElement> = inject(ElementRef);
  elementRef: Signal<ElementRef<HTMLDivElement>> = viewChild.required('test');
  // ngOnInit() {
  //     this.store.dispatch(
  //       postActions.getCommentsByPostId({ postId: this.post()!.id })
  //     );
  // }
  // maybe you find another best way

  // ngOnInit() {
  //     this.store.dispatch(
  //       postActions.getCommentsByPostId({ postId: this.post()!.id })
  //     );
  // }
  // maybe you find another best way
  ngAfterViewChecked() {
    this.elementRef()?.nativeElement.scroll(
      0,
      this.elementRef()?.nativeElement.scrollHeight
    );
  }

  // add logic from input for create commentPost
  profile = inject(GlobalService).me;
  onCreated(text: string) {
    if (!text) return;

    this.store.dispatch(
      postActions.createComment({
        text: text,
        authorId: this.profile()?.id || 0,
        postId: this.post()?.id || 0,
      })
    );
  }
}
