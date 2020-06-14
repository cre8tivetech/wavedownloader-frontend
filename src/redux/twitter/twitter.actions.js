import TwitterActionTypes from './twitter.types';

export const clearTwitterData = () => ({
  type: TwitterActionTypes.CLEAR_TWITTER_DATA,
});

export const twitterVideoStart = (url) => ({
  type: TwitterActionTypes.TWITTER_VIDEO_START,
  payload: url,
});

export const twitterVideoSuccess = (data) => ({
  type: TwitterActionTypes.TWITTER_VIDEO_SUCCESS,
  payload: data,
});

export const twitterVideoFailure = (errorMessage) => ({
  type: TwitterActionTypes.TWITTER_VIDEO_FAILURE,
  payload: errorMessage,
});
