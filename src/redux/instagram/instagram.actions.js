import InstagramActionTypes from './instagram.types';

export const clearInstagramData = () => ({
  type: InstagramActionTypes.CLEAR_INSTAGRAM_DATA,
});

export const fetchPostsAdd = (url) => ({
  type: InstagramActionTypes.FETCH_POSTS_ADD,
  payload: url,
});

export const fetchPostsStart = (url) => ({
  type: InstagramActionTypes.FETCH_POSTS_START,
  payload: url,
});

export const fetchSinglePostsSuccess = (data) => ({
  type: InstagramActionTypes.FETCH_SINGLE_POSTS_SUCCESS,
  payload: data,
});
export const fetchSingleCollectionPostsSuccess = (data) => ({
  type: InstagramActionTypes.FETCH_SINGLE_POSTS_COLLECTION_SUCCESS,
  payload: data,
});
export const fetchSingleHighlightCollectionPostsSuccess = (data) => ({
  type: InstagramActionTypes.FETCH_SINGLE_HIGHLIGHT_POSTS_COLLECTION_SUCCESS,
  payload: data,
});

// USERNAME POST credentials

export const fetchUserNamePostsAdd = (credentials) => ({
  type: InstagramActionTypes.FETCH_USERNAME_POSTS_ADD,
  payload: credentials,
});

export const fetchUserNamePostsStart = (datas) => ({
  type: InstagramActionTypes.FETCH_USERNAME_POSTS_START,
  payload: datas,
});

export const fetchUserNamePostsSuccess = (data) => ({
  type: InstagramActionTypes.FETCH_USERNAME_POSTS_SUCCESS,
  payload: data,
});

export const fetchUserNamePostsDownload = (shortcode) => ({
  type: InstagramActionTypes.FETCH_USERNAME_POSTS_DOWNLOAD,
  payload: shortcode,
});

// HASH TAG POST
export const fetchHashTagPostsAdd = (hashTagFormData) => ({
  type: InstagramActionTypes.FETCH_HASHTAG_POSTS_ADD,
  payload: hashTagFormData,
});

export const fetchHashTagPostsStart = (datas) => ({
  type: InstagramActionTypes.FETCH_HASHTAG_POSTS_START,
  payload: datas,
});

export const fetchHashTagPostsSuccess = (data) => ({
  type: InstagramActionTypes.FETCH_HASHTAG_POSTS_SUCCESS,
  payload: data,
});

export const fetchHashTagPostsDownload = (shortcode) => ({
  type: InstagramActionTypes.FETCH_HASHTAG_POSTS_DOWNLOAD,
  payload: shortcode,
});

// HIGHLIGHT POST
export const fetchHighlightPostsAdd = (highlightForm) => ({
  type: InstagramActionTypes.FETCH_HIGHLIGHT_POSTS_ADD,
  payload: highlightForm,
});

export const fetchHighlightPostsStart = (datas) => ({
  type: InstagramActionTypes.FETCH_HIGHLIGHT_POSTS_START,
  payload: datas,
});

export const fetchHighlightPostsSuccess = (data) => ({
  type: InstagramActionTypes.FETCH_HIGHLIGHT_POSTS_SUCCESS,
  payload: data,
});

export const fetchHighlightPostsDownload = (idcode) => ({
  type: InstagramActionTypes.FETCH_HIGHLIGHT_POSTS_DOWNLOAD,
  payload: idcode,
});

// STORIES POST
export const fetchStoryPostsAdd = (credentials) => ({
  type: InstagramActionTypes.FETCH_STORY_POSTS_ADD,
  payload: credentials,
});

export const fetchStoryPostsStart = (datas) => ({
  type: InstagramActionTypes.FETCH_STORY_POSTS_START,
  payload: datas,
});

export const fetchStoryPostsSuccess = (data) => ({
  type: InstagramActionTypes.FETCH_STORY_POSTS_SUCCESS,
  payload: data,
});

export const setDownloadData = (data) => ({
  type: InstagramActionTypes.SET_DOWNLOAD_DATA,
  payload: data,
});

export const saveDownload = (downloadData) => ({
  type: InstagramActionTypes.SAVE_DOWNLOAD,
  payload: downloadData,
});

export const getDownload = () => ({
  type: InstagramActionTypes.GET_DOWNLOAD,
});

export const getSubscription = () => ({
  type: InstagramActionTypes.GET_SUBSCRIPTION,
});

// FAILURE TO GET POST ACTION
export const fetchPostsFailure = (errorMessage) => ({
  type: InstagramActionTypes.FETCH_POSTS_FAILURE,
  payload: errorMessage,
});

// export const fetchCollectionsStartAsync = () => {
//   return dispatch => {

//   };
// };
