import SoundCloudActionTypes from './soundcloud.types';

const INITIAL_STATE = {
  videoData: null,
  downloadData: null,
  isFetching: false,
  isSlide: false,
  errorMessage: null,
};

const youtubeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SoundCloudActionTypes.CLEAR_SOUNDCLOUD_DATA:
      return {
        ...state,
        videoData: null,
        downloadData: null,
        isFetching: false,
        isSlide: false,
        errorMessage: null,
        
      };

    case SoundCloudActionTypes.SOUNDCLOUD_VIDEO_START:
      return {
        ...state,
        isFetching: true,
        errorMessage: null,
        videoData: null,
      };
    case SoundCloudActionTypes.SOUNDCLOUD_VIDEO_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
        videoData: null,
      };
    case SoundCloudActionTypes.SOUNDCLOUD_VIDEO_SUCCESS:
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
