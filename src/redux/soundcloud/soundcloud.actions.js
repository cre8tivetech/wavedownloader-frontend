import SoundCloudActionTypes from './soundcloud.types';

export const clearSoundCloudData = () => ({
  type: SoundCloudActionTypes.CLEAR_SOUNDCLOUD_DATA,
});

export const soundcloudVideoStart = (url) => ({
  type: SoundCloudActionTypes.SOUNDCLOUD_VIDEO_START,
  payload: url,
});

export const soundcloudVideoSuccess = (data) => ({
  type: SoundCloudActionTypes.SOUNDCLOUD_VIDEO_SUCCESS,
  payload: data,
});

export const soundcloudVideoFailure = (errorMessage) => ({
  type: SoundCloudActionTypes.SOUNDCLOUD_VIDEO_FAILURE,
  payload: errorMessage,
});
