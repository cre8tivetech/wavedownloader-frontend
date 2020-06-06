import { createSelector } from 'reselect';

const selectInstagram = (state) => state.instagram;

export const selectCollections = createSelector(
  [selectInstagram],
  (instagram) => instagram.collections
);

export const selectSlideCollection = createSelector(
  [selectInstagram],
  (instagram) => instagram.slideCollections
);

export const selectSingleHighlightCollection = createSelector(
  [selectInstagram],
  (instagram) => instagram.singleHighlightCollections
);

export const selectUserCollections = createSelector(
  [selectInstagram],
  (instagram) => instagram.userCollections
);

export const selectHashTagCollections = createSelector(
  [selectInstagram],
  (instagram) => instagram.hashTagCollections
);

export const selectHighlightCollections = createSelector(
  [selectInstagram],
  (instagram) => instagram.highlightCollections
);

export const selectStoryCollections = createSelector(
  [selectInstagram],
  (instagram) => instagram.storyCollections
);

export const selectHashTagPostType = createSelector(
  [selectInstagram],
  (instagram) => instagram.hashTagForm
);

export const selectSources = createSelector(
  [selectInstagram],
  (instagram) => instagram.source
);

export const selectCredentials = createSelector(
  [selectInstagram],
  (instagram) => instagram.credentials
);

export const selectStoryForm = createSelector(
  [selectInstagram],
  (instagram) => instagram.storyForm
);

export const selectErrors = createSelector(
  [selectInstagram],
  (instagram) => instagram.errorMessage
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
  [selectInstagram],
  (instagram) => instagram.isFetching
);

export const selectIsSlideCollectionFetching = createSelector(
  [selectInstagram],
  (instagram) => instagram.isSlide
);

export const selectIsSingleHighlightCollectionFetching = createSelector(
  [selectInstagram],
  (instagram) => instagram.isSingleHighlight
);

export const selectIsCollectionsLoaded = createSelector(
  [selectInstagram],
  (instagram) => !!instagram.collections
);

export const selectDownloadData = createSelector(
  [selectInstagram],
  (instagram) => !!instagram.downloadData
);
