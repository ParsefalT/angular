import { createSelector } from '@ngrx/store';
import { postFeature } from './reducers';

export const postSelector = createSelector(postFeature.selectFeed, (feed) => {
  return feed;
});
