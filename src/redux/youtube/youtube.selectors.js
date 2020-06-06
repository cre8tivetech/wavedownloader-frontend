import { createSelector } from 'reselect';

const selectYoutube = (state) => state.youtube;

export const selectCollections = createSelector(
  [selectYoutube],
  (youtube) => youtube.videoData
);

// export const selectSlideCollection = createSelector(
//   [selectYoutube],
//   (youtube) => youtube.slideCollections
// );

// export const selectCredentials = createSelector(
//   [selectYoutube],
//   (youtube) => youtube.credentials
// );

export const selectErrors = createSelector(
  [selectYoutube],
  (youtube) => youtube.errorMessage
);

// export const selectSource = createSelector([selectSources], (source) =>
//   source ? source : null
// );

export const selectError = createSelector([selectErrors], (error) =>
  error ? error : null
);

export const selectIsCollectionFetching = createSelector(
  [selectYoutube],
  (youtube) => youtube.isFetching
);

export const selectIsCollectionsLoaded = createSelector(
  [selectYoutube],
  (youtube) => !!youtube.videoData
);

export const selectDownloadData = createSelector(
  [selectYoutube],
  (youtube) => !!youtube.downloadData
);
