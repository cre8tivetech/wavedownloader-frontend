import TwitterActionTypes from './twitter.types';

const INITIAL_STATE = {
  videoData: null,
  downloadData: null,
  isFetching: false,
  isSlide: false,
  errorMessage: null,
};

const youtubeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TwitterActionTypes.CLEAR_TWITTER_DATA:
      return {
        ...state,
        videoData: null,
        downloadData: null,
        isFetching: false,
        isSlide: false,
        errorMessage: null,
      };
    case TwitterActionTypes.TWITTER_VIDEO_START:
      return {
        ...state,
        isFetching: true,
        errorMessage: null,
        videoData: null,
      };
    case TwitterActionTypes.TWITTER_VIDEO_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
        videoData: null,
      };
    case TwitterActionTypes.TWITTER_VIDEO_SUCCESS:
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

export default youtubeReducer;
