import { createSelector } from 'reselect';

const selectSoundCloud = (state) => state.soundcloud;

export const selectCollections = createSelector(
  [selectSoundCloud],
  (soundcloud) => soundcloud.videoData
);

export const selectSoundCloudUser = createSelector(
  [selectSoundCloud],
  (soundcloud) => soundcloud.soundcloudUser
);

export const selectErrors = createSelector(
  [selectSoundCloud],
  (soundcloud) => soundcloud.errorMessage
);

export const selectError = createSelector([selectErrors], (error) =>
  error ? error : null
);

export const selectIsCollectionFetching = createSelector(
  [selectSoundCloud],
  (soundcloud) => soundcloud.isFetching
);

export const selectIsCollectionsLoaded = createSelector(
  [selectSoundCloud],
  (soundcloud) => !!soundcloud.videoData
);

export const selectDownloadData = createSelector(
  [selectSoundCloud],
  (soundcloud) => !!soundcloud.downloadData
);
