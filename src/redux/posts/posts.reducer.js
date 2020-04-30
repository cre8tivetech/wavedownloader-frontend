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
  downloadData: null,
  isFetching: false,
  isSlide: false,
  isSingleHighlight: false,
  errorMessage: null,
};

const postsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PostsActionTypes.FETCH_POSTS_ADD:
      return {
        ...state,
        userCollections: null,
        collections: null,
        slideCollections: null,
        source: action.payload,
        isFetching: true,
        isSlide: false,
        isSingleHighlight: false,
        errorMessage: null,
      };
    case PostsActionTypes.FETCH_POSTS_START:
      return {
        ...state,
        isFetching: true,
        errorMessage: null,
      };
    case PostsActionTypes.FETCH_SINGLE_POSTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        // slideCollections: null,
        // singleHighlightCollections: null,
        collections: action.payload,
        // userCollections: null,
        errorMessage: null,
      };

    case PostsActionTypes.FETCH_SINGLE_POSTS_COLLECTION_SUCCESS:
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
      return {
        ...state,
        isFetching: true,
        errorMessage: null,
      };

    case PostsActionTypes.FETCH_USERNAME_POSTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isSlide: false,
        isSingleHighlight: false,
        slideCollections: null,
        hashTagCollections: null,
        storyCollections: null,
        userCollections: action.payload,
        errorMessage: null,
      };

    case PostsActionTypes.FETCH_USERNAME_POSTS_DOWNLOAD:
      return {
        ...state,
        isFetching: true,
        shortcode: action.payload,
      };

    // HASHTAG POSTS

    case PostsActionTypes.FETCH_HASHTAG_POSTS_ADD:
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
      return {
        ...state,
        isFetching: true,
        errorMessage: null,
      };

    case PostsActionTypes.FETCH_HASHTAG_POSTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isSlide: false,
        isSingleHighlight: false,
        collections: null,
        userCollections: null,
        slideCollections: null,
        storyCollections: null,
        hashTagCollections: action.payload,
        errorMessage: null,
      };

    case PostsActionTypes.FETCH_HASHTAG_POSTS_DOWNLOAD:
      return {
        ...state,
        isFetching: true,
        shortcode: action.payload,
      };

    // HIGHLIGHT POSTS

    case PostsActionTypes.FETCH_HIGHLIGHT_POSTS_ADD:
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
      return {
        ...state,
        isFetching: true,
        errorMessage: null,
      };

    case PostsActionTypes.FETCH_HIGHLIGHT_POSTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isSlide: false,
        isSingleHighlight: false,
        collections: null,
        userCollections: null,
        hashTagCollections: null,
        slideCollections: null,
        storyCollections: null,
        highlightCollections: action.payload,
        errorMessage: null,
      };

    case PostsActionTypes.FETCH_HIGHLIGHT_POSTS_DOWNLOAD:
      return {
        ...state,
        isFetching: true,
        idcode: action.payload,
      };

    // STORY POSTS

    case PostsActionTypes.FETCH_STORY_POSTS_ADD:
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
      return {
        ...state,
        isFetching: true,
        errorMessage: null,
      };

    case PostsActionTypes.FETCH_STORY_POSTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isSlide: false,
        isSingleHighlight: false,
        collections: null,
        userCollections: null,
        slideCollections: null,
        hashTagCollections: null,
        storyCollections: action.payload,
        errorMessage: null,
      };

    // SET DOWNLOAD
    case PostsActionTypes.SET_DOWNLOAD_DATA:
      return {
        ...state,
        downloadData: action.payload,
        isFetching: true,
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
