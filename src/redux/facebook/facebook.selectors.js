import { createSelector } from 'reselect';

const selectFacebook = (state) => state.facebook;

export const selectCollections = createSelector(
  [selectFacebook],
  (facebook) => facebook.videoData
);

export const selectErrors = createSelector(
  [selectFacebook],
  (facebook) => facebook.errorMessage
);

export const selectError = createSelector([selectErrors], (error) =>
  error ? error : null
);

export const selectIsCollectionFetching = createSelector(
  [selectFacebook],
  (facebook) => facebook.isFetching
);

export const selectIsCollectionsLoaded = createSelector(
  [selectFacebook],
  (facebook) => !!facebook.videoData
);

export const selectDownloadData = createSelector(
  [selectFacebook],
  (facebook) => !!facebook.downloadData
);
