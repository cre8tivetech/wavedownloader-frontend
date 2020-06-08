import YoutubeActionTypes from './youtube.types';

export const clearYouTubeData = () => ({
  type: YoutubeActionTypes.CLEAR_YOUTUBE_DATA,
});

export const fetchVideoStart = (url) => ({
  type: YoutubeActionTypes.FETCH_VIDEO_START,
  payload: url,
});

export const fetchVideoSuccess = (data) => ({
  type: YoutubeActionTypes.FETCH_VIDEO_SUCCESS,
  payload: data,
});

export const fetchVideoFailure = (errorMessage) => ({
  type: YoutubeActionTypes.FETCH_VIDEO_FAILURE,
  payload: errorMessage,
});

export const fetchVideoDownloadStart = (url) => ({
  type: YoutubeActionTypes.FETCH_VIDEO_DOWNLOAD_START,
  payload: url,
});

export const fetchVideoDownloadSuccess = (data) => ({
  type: YoutubeActionTypes.FETCH_VIDEO_DOWNLOAD_SUCCESS,
  payload: data,
});

export const fetchVideoDownloadFailure = (errorMessage) => ({
  type: YoutubeActionTypes.FETCH_VIDEO_DOWNLOAD_FAILURE,
  payload: errorMessage,
});
