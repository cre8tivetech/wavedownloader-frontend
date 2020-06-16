import FacebookActionTypes from './facebook.types';

const INITIAL_STATE = {
  videoData: null,
  downloadData: null,
  isFetching: false,
  isSlide: false,
  errorMessage: null,
};

const facebookReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FacebookActionTypes.CLEAR_FACEBOOK_DATA:
      return {
        ...state,
        videoData: null,
        downloadData: null,
        isFetching: false,
        isSlide: false,
        errorMessage: null,
      };
    case FacebookActionTypes.FACEBOOK_VIDEO_START:
      return {
        ...state,
        isFetching: true,
        errorMessage: null,
        videoData: null,
      };
    case FacebookActionTypes.FACEBOOK_VIDEO_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
        videoData: null,
      };
    case FacebookActionTypes.FACEBOOK_VIDEO_SUCCESS:
      console.log(action.payload.data.data)
      return {
        ...state,
        isFetching: false,
        videoData: action.payload.data.data,
        errorMessage: null,
      };
    default:
      return state;
  }
};

export default facebookReducer;
