import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
  CreateCommentDTO,
  Post,
  PostCreateDTO,
} from '../interfaces/post.interface';

export const postActions = createActionGroup({
  source: 'post',
  events: {
    'get posts': emptyProps(),
    'set posts': props<{ feed: Post[] }>(),
    'create post': props<PostCreateDTO>(),
    'create comment': props<CreateCommentDTO>(),
    'get comments by post id': props<{ postId: number }>(),
  },
});
