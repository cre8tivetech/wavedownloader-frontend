import PostsActionTypes from './posts.types';

const INITIAL_STATE = {
  collections: null,
  userCollections: null,
  hashTagCollections: null,
  storyCollections: null,
  slideCollections: null,
  credentials: null,
  storyForm: null,
  hashTagForm: null,
  shortcode: null,
  source: null,
  isFetching: false,
  isSlide: false,
  errorMessage: null,
};

const postsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PostsActionTypes.FETCH_POSTS_ADD:
      console.log('adding');
      return {
        ...state,
        userCollections: null,
        collections: null,
        slideCollections: null,
        source: action.payload,
        isFetching: true,
        isSlide: false,
        errorMessage: null,
      };
    case PostsActionTypes.FETCH_POSTS_START:
      console.log('starting');
      return {
        ...state,
        isFetching: true,
        errorMessage: null,
      };
    case PostsActionTypes.FETCH_SINGLE_POSTS_SUCCESS:
      console.log('working');
      return {
        ...state,
        isFetching: false,
        slideCollections: null,
        collections: action.payload,
        userCollections: null,
        errorMessage: null,
      };

    case PostsActionTypes.FETCH_SINGLE_POSTS_COLLECTION_SUCCESS:
      console.log('slide');
      return {
        ...state,
        isFetching: false,
        isSlide: true,
        collections: null,
        slideCollections: action.payload,
        errorMessage: null,
      };

    // USERNAME POST
    case PostsActionTypes.FETCH_USERNAME_POSTS_ADD:
      console.log('username collection added');
      return {
        ...state,
        credentials: action.payload,
        source: null,
        collections: null,
        slideCollections: null,
        hashTagCollections: null,
        storyCollections: null,
        isFetching: true,
        errorMessage: null,
      };

    case PostsActionTypes.FETCH_USERNAME_POSTS_START:
      console.log('username collection start');
      return {
        ...state,
        isFetching: true,
        errorMessage: null,
      };

    case PostsActionTypes.FETCH_USERNAME_POSTS_SUCCESS:
      console.log('username collection success');
      return {
        ...state,
        isFetching: false,
        isSlide: false,
        slideCollections: null,
        hashTagCollections: null,
        storyCollections: null,
        userCollections: action.payload,
        errorMessage: null,
      };

    case PostsActionTypes.FETCH_USERNAME_POSTS_DOWNLOAD:
      console.log('username download fetching');
      return {
        ...state,
        isFetching: true,
        shortcode: action.payload,
      };

    // HASHTAG POSTS

    case PostsActionTypes.FETCH_HASHTAG_POSTS_ADD:
      console.log('hashtag collection added');
      return {
        ...state,
        hashTagForm: action.payload,
        source: null,
        collections: null,
        slideCollections: null,
        isFetching: true,
        errorMessage: null,
      };

    case PostsActionTypes.FETCH_HASHTAG_POSTS_START:
      console.log('hashtag collection start');
      return {
        ...state,
        isFetching: true,
        errorMessage: null,
      };

    case PostsActionTypes.FETCH_HASHTAG_POSTS_SUCCESS:
      console.log('hashtag collection success');
      return {
        ...state,
        isFetching: false,
        isSlide: false,
        collections: null,
        userCollections: null,
        slideCollections: null,
        storyCollections: null,
        hashTagCollections: action.payload,
        errorMessage: null,
      };

    case PostsActionTypes.FETCH_HASHTAG_POSTS_DOWNLOAD:
      console.log('hashTag download fetching');
      return {
        ...state,
        isFetching: true,
        shortcode: action.payload,
      };

    // STORY POSTS

    case PostsActionTypes.FETCH_STORY_POSTS_ADD:
      console.log('story collection added');
      return {
        ...state,
        credentials: null,
        hashTagForm: null,
        storyForm: action.payload,
        source: null,
        collections: null,
        slideCollections: null,
        isFetching: true,
        errorMessage: null,
      };

    case PostsActionTypes.FETCH_STORY_POSTS_START:
      console.log('hashtag collection start');
      return {
        ...state,
        isFetching: true,
        errorMessage: null,
      };

    case PostsActionTypes.FETCH_STORY_POSTS_SUCCESS:
      console.log('hashtag collection success');
      return {
        ...state,
        isFetching: false,
        isSlide: false,
        collections: null,
        userCollections: null,
        slideCollections: null,
        hashTagCollections: null,
        storyCollections: action.payload,
        errorMessage: null,
      };

    case PostsActionTypes.FETCH_POSTS_FAILURE:
      return {
        ...state,
        isFetching: true,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default postsReducer;
