import { Component, input } from '@angular/core';
import { PostComment } from '../../data';
import { AvatarCircleComponent, DatePipe } from '@tt/common-ui';

@Component({
  selector: 'tt-app-comment',
  imports: [AvatarCircleComponent, DatePipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  comment = input<PostComment>();
}
