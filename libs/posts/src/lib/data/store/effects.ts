import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PostService } from '../services/post.service';
import { postActions } from './actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostEffects {
  postService = inject(PostService);
  actions$ = inject(Actions);

  getPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(postActions.getPosts),
      switchMap(() => {
        return this.postService.fetchPosts().pipe(
          catchError((err) => {
            console.log('Error of fetch posts ' + err);
            return of([]);
          })
        );
      }),
      map((posts) => postActions.setPosts({ feed: posts }))
    );
  });

  createPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(postActions.createPost),
      switchMap((postValue) => {
        return this.postService.createPost({
          authorId: postValue.authorId,
          content: postValue.content,
          title: 'amazing post',
        });
      }),
      map(() => postActions.getPosts())
    );
  });

  createComment$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(postActions.createComment),
      switchMap((postComment) => {
        return this.postService
          .createComment({
            authorId: postComment.authorId,
            postId: postComment.postId,
            text: postComment.text,
          })
          .pipe(
            switchMap((val) => {
              return this.postService.getCommentsByPostId(val.postId);
            })
          );
      }),
      map(() => postActions.getPosts())
    );
  });
}
