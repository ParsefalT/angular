import {
  AfterViewChecked,
  Component,
  ElementRef,
  inject,
  input,
  OnInit,
  ViewChild,
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
})
export class PostComponent implements AfterViewChecked {
  store = inject(Store);
  post = input<Post>();
  @ViewChild('test') elem!: ElementRef;

  // ngOnInit() {
  //     this.store.dispatch(
  //       postActions.getCommentsByPostId({ postId: this.post()!.id })
  //     );
  // }
  // maybe you find another best way
  ngAfterViewChecked() {
    this.elem.nativeElement.scroll(0, this.elem.nativeElement.scrollHeight);
  }

  // add logic from input for create commentPost
  profile = inject(GlobalService).me;
  onCreated(text: string) {
    if (!text) return;

    this.store.dispatch(
      postActions.createComment({
        text: text,
        authorId: this.profile()!.id,
        postId: this.post()!.id,
      })
    );
  }
}
