import PostsActionTypes from './posts.types';

export const fetchPostsAdd = url => ({
  type: PostsActionTypes.FETCH_POSTS_ADD,
  payload: url,
});

export const fetchPostsStart = (url) => ({
  type: PostsActionTypes.FETCH_POSTS_START,
  payload: url,
});

export const fetchSinglePostsSuccess = data => ({
  type: PostsActionTypes.FETCH_SINGLE_POSTS_SUCCESS,
  payload: data,
});
export const fetchSingleCollectionPostsSuccess = data => ({
  type: PostsActionTypes.FETCH_SINGLE_POSTS_COLLECTION_SUCCESS,
  payload: data,
});

// USERNAME POST credentials

export const fetchUserNamePostsAdd = credentials => ({
  type: PostsActionTypes.FETCH_USERNAME_POSTS_ADD,
  payload: credentials,
});

export const fetchUserNamePostsStart = datas => ({
  type: PostsActionTypes.FETCH_USERNAME_POSTS_START,
  payload: datas,
});

export const fetchUserNamePostsSuccess = data => ({
  type: PostsActionTypes.FETCH_USERNAME_POSTS_SUCCESS,
  payload: data,
});

export const fetchUserNamePostsDownload = shortcode => ({
  type: PostsActionTypes.FETCH_USERNAME_POSTS_DOWNLOAD,
  payload: shortcode,
});


// HASH TAG POST
export const fetchHashTagPostsAdd = hashTagFormData => ({
  type: PostsActionTypes.FETCH_HASHTAG_POSTS_ADD,
  payload: hashTagFormData,
});

export const fetchHashTagPostsStart = datas => ({
  type: PostsActionTypes.FETCH_HASHTAG_POSTS_START,
  payload: datas,
});

export const fetchHashTagPostsSuccess = data => ({
  type: PostsActionTypes.FETCH_HASHTAG_POSTS_SUCCESS,
  payload: data,
});

export const fetchHashTagPostsDownload = shortcode => ({
  type: PostsActionTypes.FETCH_HASHTAG_POSTS_DOWNLOAD,
  payload: shortcode,
});


// STORIES POST
export const fetchStoryPostsAdd = credentials => ({
  type: PostsActionTypes.FETCH_STORY_POSTS_ADD,
  payload: credentials,
});

export const fetchStoryPostsStart = datas => ({
  type: PostsActionTypes.FETCH_STORY_POSTS_START,
  payload: datas,
});

export const fetchStoryPostsSuccess = data => ({
  type: PostsActionTypes.FETCH_STORY_POSTS_SUCCESS,
  payload: data,
});


// FAILURE TO GET POST ACTION
export const fetchPostsFailure = errorMessage => ({
  type: PostsActionTypes.FETCH_POSTS_FAILURE,
  payload: errorMessage,
});

// export const fetchCollectionsStartAsync = () => {
//   return dispatch => {

//   };
// };
