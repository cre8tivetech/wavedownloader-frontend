import PostsActionTypes from './posts.types';

const INITIAL_STATE = {
  collections: null,
  userCollections: null,
  hashTagCollections: null,
  storyCollections: null,
  highlightCollections: null,
  singleHighlightCollections: null,
  slideCollections: null,
  credentials: null,
  storyForm: null,
  highlightForm: null,
  hashTagForm: null,
  shortcode: null,
  idcode: null,
  source: null,
  isFetching: false,
  isSlide: false,
  isSingleHighlight: false,
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
        isSlide: false,isSingleHighlight: false,
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
        singleHighlightCollections: null,
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
        singleHighlightCollections: null,
        slideCollections: action.payload,
        errorMessage: null,
      };

    case PostsActionTypes.FETCH_SINGLE_HIGHLIGHT_POSTS_COLLECTION_SUCCESS:
      console.log('slide');
      return {
        ...state,
        isFetching: false,
        isSlide: false,
        isSingleHighlight: true,
        collections: null,
        slideCollections: null,
        singleHighlightCollections: action.payload,
        errorMessage: null,
      };


    // USERNAME POST
    case PostsActionTypes.FETCH_USERNAME_POSTS_ADD:
      console.log('username collection added');
      return {
        ...state,
        credentials: action.payload,
        idcode: null,
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
        isSlide: false,isSingleHighlight: false,
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
        idcode: null,
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
        isSlide: false,isSingleHighlight: false,
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

    // HIGHLIGHT POSTS

    case PostsActionTypes.FETCH_HIGHLIGHT_POSTS_ADD:
      console.log('highlight collection added');
      return {
        ...state,
        highlightForm: action.payload,
        hashTagForm: null,
        storyForm: null,
        shortcode: null,
        source: null,
        collections: null,
        slideCollections: null,
        isFetching: true,
        errorMessage: null,
      };

    case PostsActionTypes.FETCH_HIGHLIGHT_POSTS_START:
      console.log('highlight collection start');
      return {
        ...state,
        isFetching: true,
        errorMessage: null,
      };

    case PostsActionTypes.FETCH_HIGHLIGHT_POSTS_SUCCESS:
      console.log('highlight collection success');
      return {
        ...state,
        isFetching: false,
        isSlide: false,isSingleHighlight: false,
        collections: null,
        userCollections: null,
        hashTagCollections: null,
        slideCollections: null,
        storyCollections: null,
        highlightCollections: action.payload,
        errorMessage: null,
      };

    case PostsActionTypes.FETCH_HIGHLIGHT_POSTS_DOWNLOAD:
      console.log('highlight download fetching');
      return {
        ...state,
        isFetching: true,
        idcode: action.payload,
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
        isSlide: false,isSingleHighlight: false,
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
