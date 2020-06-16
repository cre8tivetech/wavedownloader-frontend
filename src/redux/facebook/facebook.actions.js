import FacebookActionTypes from './facebook.types';

export const clearFacebookData = () => ({
  type: FacebookActionTypes.CLEAR_FACEBOOK_DATA,
});

export const facebookVideoStart = (url) => ({
  type: FacebookActionTypes.FACEBOOK_VIDEO_START,
  payload: url,
});

export const facebookVideoSuccess = (data) => ({
  type: FacebookActionTypes.FACEBOOK_VIDEO_SUCCESS,
  payload: data,
});

export const facebookVideoFailure = (errorMessage) => ({
  type: FacebookActionTypes.FACEBOOK_VIDEO_FAILURE,
  payload: errorMessage,
});
