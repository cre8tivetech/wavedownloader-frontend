import PostsActionTypes from './posts.types';

export const fetchPostsAdd = url => ({
  type: PostsActionTypes.FETCH_POSTS_ADD,
  payload: url,
});

export const fetchPostsStart = url => ({
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

export const fetchPostsFailure = errorMessage => ({
  type: PostsActionTypes.FETCH_POSTS_FAILURE,
  payload: errorMessage,
});
