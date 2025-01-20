import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import {
  CreateCommentDTO,
  Post,
  PostCreateDTO,
} from '../interfaces/post.interface';
import { map, switchMap, tap } from 'rxjs';
import { PostComponent } from '../../pages/profile-page/post/post.component';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  #http = inject(HttpClient);

  baseApiUrl = 'https://icherniakov.ru/yt-course';

  posts = signal<Post[]>([]);

  createPost(payload: PostCreateDTO) {
    return this.#http.post<Post>(`${this.baseApiUrl}/post/`, payload).pipe(
      switchMap(() => {
        return this.fetchPosts();
      })
    );
  }

  fetchPosts() {
    return this.#http
      .get<Post[]>(`${this.baseApiUrl}/post/`)
      .pipe(tap((res) => this.posts.set(res)));
  }

  createComment(payload: CreateCommentDTO) {
    return this.#http.post<PostComponent>(
      `${this.baseApiUrl}/comment/`,
      payload
    );
  }

  getCommentsByPostId(postId: number) {
    return this.#http
      .get<Post>(`${this.baseApiUrl}/post/${postId}`)
      .pipe(map((res) => res.comments));
  }
}
