import { createSelector } from 'reselect';

const selectPosts = (state) => state.posts;

export const selectCollections = createSelector(
  [selectPosts],
  (posts) => posts.collections
);

export const selectSlideCollection = createSelector(
  [selectPosts],
  (posts) => posts.slideCollections
);

export const selectSingleHighlightCollection = createSelector(
  [selectPosts],
  (posts) => posts.singleHighlightCollections
);

export const selectUserCollections = createSelector(
  [selectPosts],
  (posts) => posts.userCollections
);

export const selectHashTagCollections = createSelector(
  [selectPosts],
  (posts) => posts.hashTagCollections
);

export const selectHighlightCollections = createSelector(
  [selectPosts],
  (posts) => posts.highlightCollections
);

export const selectStoryCollections = createSelector(
  [selectPosts],
  (posts) => posts.storyCollections
);

export const selectHashTagPostType = createSelector(
  [selectPosts],
  (posts) => posts.hashTagForm
);

export const selectSources = createSelector(
  [selectPosts],
  (posts) => posts.source
);

export const selectCredentials = createSelector(
  [selectPosts],
  (posts) => posts.credentials
);

export const selectStoryForm = createSelector(
  [selectPosts],
  (posts) => posts.storyForm
);

export const selectErrors = createSelector(
  [selectPosts],
  (posts) => posts.errorMessage
);

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  (collections) =>
    collections ? Object.keys(collections).map((key) => collections[key]) : []
);

export const selectCollection = createSelector(
  [selectCollections, selectSources],
  (collections) => (collections ? collections : null)
);

export const selectSource = createSelector([selectSources], (source) =>
  source ? source : null
);

export const selectError = createSelector([selectErrors], (error) =>
  error ? error : null
);

export const selectIsCollectionFetching = createSelector(
  [selectPosts],
  (posts) => posts.isFetching
);

export const selectIsSlideCollectionFetching = createSelector(
  [selectPosts],
  (posts) => posts.isSlide
);

export const selectIsSingleHighlightCollectionFetching = createSelector(
  [selectPosts],
  (posts) => posts.isSingleHighlight
);

export const selectIsCollectionsLoaded = createSelector(
  [selectPosts],
  (posts) => !!posts.collections
);
