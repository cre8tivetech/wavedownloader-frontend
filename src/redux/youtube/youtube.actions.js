import YoutubeActionTypes from './youtube.types';

export const clearYouTubeData = () => ({
  type: YoutubeActionTypes.CLEAR_YOUTUBE_DATA,
});

export const youtubeVideoStart = (url) => ({
  type: YoutubeActionTypes.YOUTUBE_VIDEO_START,
  payload: url,
});

export const youtubeVideoSuccess = (data) => ({
  type: YoutubeActionTypes.YOUTUBE_VIDEO_SUCCESS,
  payload: data,
});

export const youtubeVideoFailure = (errorMessage) => ({
  type: YoutubeActionTypes.YOUTUBE_VIDEO_FAILURE,
  payload: errorMessage,
});
