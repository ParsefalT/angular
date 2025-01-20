import { Profile } from './profile.interface';

export interface PostCreateDTO {
  title: string;
  content: string;
  authorId: number;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  author: Profile;
  images: string[];
  createdAt: string;
  updatedAt: string;
  comments: PostComment[];
}

export interface PostComment {
  id: number;
  text: string;
  author: Pick<
    Profile,
    'avatarUrl' | 'id' | 'username' | 'subscriptionsAmount'
  >;
  postId: number;
  commentId: number;
  createdAt: string;
  updatedAt: string;
  comments: [];
}

export interface CreateCommentDTO {
  text: string;
  authorId: number;
  postId: number;
}
