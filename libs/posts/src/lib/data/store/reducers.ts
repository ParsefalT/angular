import { createFeature, createReducer, on } from '@ngrx/store';
import { postActions } from './actions';
import { Post } from '../interfaces/post.interface';

export interface InitialState {
  feed: Post[];
}

export const initialState: InitialState = {
  feed: [],
};

export const postFeature = createFeature({
  name: 'postFeature',
  reducer: createReducer(
    initialState,
    on(postActions.setPosts, (state, action) => {
      return {
        ...state,
        feed: action.feed,
      };
    })
  ),
});
