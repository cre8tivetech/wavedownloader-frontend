import { createSelector } from 'reselect';

const selectTwitter = (state) => state.twitter;

export const selectCollections = createSelector(
  [selectTwitter],
  (twitter) => twitter.videoData
);

export const selectErrors = createSelector(
  [selectTwitter],
  (twitter) => twitter.errorMessage
);

export const selectError = createSelector([selectErrors], (error) =>
  error ? error : null
);

export const selectIsCollectionFetching = createSelector(
  [selectTwitter],
  (twitter) => twitter.isFetching
);

export const selectIsCollectionsLoaded = createSelector(
  [selectTwitter],
  (twitter) => !!twitter.videoData
);

export const selectDownloadData = createSelector(
  [selectTwitter],
  (twitter) => !!twitter.downloadData
);
