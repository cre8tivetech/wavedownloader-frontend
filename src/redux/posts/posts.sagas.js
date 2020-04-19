import { takeLatest, call, put, all } from 'redux-saga/effects';
import PostActionTypes from './posts.types';
import {select} from 'redux-saga/effects'
import {
  singlePostApi,
  usernamePostApi,
  hashtagPostApi,
  storyPostApi,
  highlightPostApi,
  shortcodePostApi,
  idcodePostApi,
} from '../../Api/api';
import {
  fetchSinglePostsSuccess,
  fetchSingleCollectionPostsSuccess,
  fetchSingleHighlightCollectionPostsSuccess,

  fetchUserNamePostsSuccess,
  fetchHashTagPostsSuccess,
  fetchHighlightPostsSuccess,
  fetchStoryPostsSuccess,
  fetchPostsFailure,
} from './posts.actions';

const link = state => state.posts.source;
const credentials = state => state.posts.credentials;
const shortcode = state => state.posts.shortcode;
const idcode = state => state.posts.idcode;
const hashTagForm = state => state.posts.hashTagForm;
const highlightForm = state => state.posts.highlightForm;
const storyUserName = state => state.posts.storyForm;
const userToken = (state) => state.user.token;

export function* fetchPostsAsync() {
  const url = yield select(link);
  const shortCode = yield select(shortcode);
  const idCode = yield select(idcode);
  try {
    if(url) {
      const result = yield singlePostApi(url).then(function(response) {
        return response;
      });
      
      if (result.data.__typename === "GraphSidecar"){
        yield put(fetchSingleCollectionPostsSuccess(result));    
      } else if (result.data.__typename === 'GraphImage' ||  result.data.__typename === 'GraphVideo') {
        yield put(fetchSinglePostsSuccess(result.data));
      }
    } else if (shortCode) {
      const result = yield shortcodePostApi(shortCode).then(function(response) {
        return response;
      });
      if(result.data.__typename === "GraphSidecar"){
        yield put(fetchSingleCollectionPostsSuccess(result));    
      }else if (result.data.__typename === 'GraphImage' ||  result.data.__typename === 'GraphVideo') {
        yield put(fetchSinglePostsSuccess(result.data));
      }
    }else if(idCode) {
      const result = yield idcodePostApi(idCode).then(function(response) {
        return response;
      });
      if(result.data.__typename === "GraphHighlightReel"){
        yield put(fetchSingleHighlightCollectionPostsSuccess(result.data));    
      }
    }
  } catch (error) {
    yield put(fetchPostsFailure(error.response ? error.response.data.message || error.response.data.error  : "No Internet!!.  Poor internet connection, Please check your connectivity, and try again later"));
  }
}

export function* fetchUserNamePostsAsync() {
  const {userName, numberOfPost} = yield select(credentials);
  const token = yield select(userToken);
  try {
    const result = yield usernamePostApi(userName, numberOfPost, token.key).then(
      function(response) {
        return response;
      }
    );
    // yield console.log(result);
    yield put(fetchUserNamePostsSuccess(result));
  } catch (error) {
    yield put(fetchPostsFailure(error.response ? error.response.data.message || error.response.data.error  : "No Internet!!.  Poor internet connection, Please check your connectivity, and try again later"));
  }
}

export function* fetchHashTagPostsAsync() {
  const { hashTag, postType } = yield select(hashTagForm);
   const token = yield select(userToken);
  try {
    const result = yield hashtagPostApi(hashTag, token.key).then(function(
      response
    ) {
      return response;
    });
    yield put(fetchHashTagPostsSuccess(result));
  } catch (error) {
    yield put(fetchPostsFailure(error.response ? error.response.data.message || error.response.data.error  : "No Internet!!.  Poor internet connection, Please check your connectivity, and try again later"));
  }
}

export function* fetchHighlightPostsAsync() {

  const username = yield select(highlightForm);
  const token = yield select(userToken);
  try {
    const result = yield highlightPostApi(username, token.key).then(function(
      response
    ) {
      return response;
    });
    yield put(fetchHighlightPostsSuccess(result.data));
  } catch (error) {
    yield put(fetchPostsFailure(error.response ? error.response.data.message || error.response.data.error  : "No Internet!!.  Poor internet connection, Please check your connectivity, and try again later"));
  }
}

export function* fetchStoryPostsAsync() {
  const userName = yield select(storyUserName);
  const token = yield select(userToken);
  try {
      const result = yield storyPostApi(userName, token.key).then(function(response) {
        return response;
      });
      console.log(result);
        yield put(fetchStoryPostsSuccess(result.data));
  } catch (error) {
    if (error.response.data.message === "No story to show") {
      console.log("No story");
      yield put(fetchStoryPostsSuccess(error.response.data));
    }else {
    yield put(fetchPostsFailure(error.response ? error.response.data.message || error.response.data.error  : "No Internet!!.  Poor internet connection, Please check your connectivity, and try again later"));
    }
  }
}

// SINGLE POST ADD
export function* fetchPostsUrl({ payload: { url } }) {
         try {
           const data = yield {url:url};
           yield put(fetchPostsAdd(data));
         } catch (error) {
           yield put(fetchPostsFailure(error.message));
         }
       }

export function* fetchPostsAdd() {
  yield takeLatest(
    PostActionTypes.FETCH_POSTS_ADD,
    fetchPostsUrl
  );
}

// USERNAME POST DOWNLOAD
export function* fetchUserNamePosts({ payload: { shortcode } }) {
  try {
    const data = yield { shortcode: shortcode };
    yield put(fetchUserNamePostDownload(data));
  } catch (error) {
    yield put(fetchPostsFailure(error.message));
  }
}

export function* fetchUserNamePostDownload() {
  yield takeLatest(
    PostActionTypes.FETCH_USERNAME_POSTS_DOWNLOAD, 
    fetchUserNamePosts
  );
}


// USERNAME POST ADD
export function* fetchPostsCredentials({ payload: { userName, numberOfPost } }) {
         try {
           const data = yield { userName, numberOfPost };
           yield put(fetchUserNamePostsCredentials(data));
         } catch (error) {
           yield put(fetchPostsFailure(error.message));
         }
       }

export function* fetchUserNamePostsCredentials() {
  yield takeLatest(PostActionTypes.FETCH_USERNAME_POSTS_ADD, fetchPostsCredentials);
}


// HASHTAG POST DOWNLOAD SAGAS
export function* fetchHashTagPosts({ payload: { shortcode } }) {
  try {
    const data = yield { shortcode: shortcode };
    yield put(fetchHashTagPostDownload(data));
  } catch (error) {
    yield put(fetchPostsFailure(error.message));
  }
}

export function* fetchHashTagPostDownload() {
  yield takeLatest(
    PostActionTypes.FETCH_USERNAME_POSTS_DOWNLOAD,
    fetchHashTagPosts
  );
}


// HASHTAG POST ADD SAGAS
export function* fetchPostsHashTagForm({
  payload: { hashTag, postType },
}) {
  try {
    const data = yield { hashTag, postType };
    yield put(fetchHashTagPostsFormData(data));
  } catch (error) {
    
    yield put(fetchPostsFailure(error.message));
  }
}

export function* fetchHashTagPostsFormData() {
  yield takeLatest(
    PostActionTypes.FETCH_HASHTAG_POSTS_ADD,
    fetchPostsHashTagForm
  );
}

// HIGHLIGHT POST ADD SAGAS
export function* fetchHighlightForm({
  payload: { username },
}) {
  try {
    const data = yield {username};
    yield put(fetchHighlightPostsFormData(data));
  } catch (error) {
    yield put(fetchPostsFailure(error.message));
  }
}

export function* fetchHighlightPostsFormData() {
  yield takeLatest(
    PostActionTypes.FETCH_HIGHLIGHT_POSTS_ADD,
    fetchHighlightForm
  );
}

// HIGHLIGHT POST DOWNLOAD
export function* fetchHighlightPosts({ payload: { idcode } }) {
  try {
    const data = yield { idcode: idcode };
    yield put(fetchHighlightPostDownload(data));
  } catch (error) {
    yield put(fetchPostsFailure(error.message));
  }
}

export function* fetchHighlightPostDownload() {
  yield takeLatest(
    PostActionTypes.FETCH_HIGHLIGHT_POSTS_DOWNLOAD, 
    fetchHighlightPosts
  );
}

// STORY POST ADD SAGAS
export function* fetchStoryPost({ payload: { storyForm } }) {
         try {
           const data = yield { storyForm };
           yield put(fetchStoryCredentials(data));
         } catch (error) {
           yield put(fetchPostsFailure(error.message));
         }
       }

export function* fetchStoryCredentials() {
  yield takeLatest(
    PostActionTypes.FETCH_STORY_POSTS_ADD,
    fetchStoryPost
  );
}

// POST START SAGAS //
export function* fetchPostsStart() {
  yield takeLatest(
    PostActionTypes.FETCH_POSTS_START,
    fetchPostsAsync
  );
}

export function* onFetchUserNamePostsStart() {
  yield takeLatest(
    PostActionTypes.FETCH_USERNAME_POSTS_START,
    fetchUserNamePostsAsync
  );
}

export function* onFetchHashTagPostsStart() {
  yield takeLatest(
    PostActionTypes.FETCH_HASHTAG_POSTS_START,
    fetchHashTagPostsAsync
  );
}

export function* onFetchHighlightPostsStart() {
  yield takeLatest(
    PostActionTypes.FETCH_HIGHLIGHT_POSTS_START,
    fetchHighlightPostsAsync
  );
}

export function* onFetchStoryPostsStart () {
  yield takeLatest(
    PostActionTypes.FETCH_STORY_POSTS_START,
    fetchStoryPostsAsync
  );
}

// MAIN SAGA
export function* postsSagas() {
  yield all([
    call(fetchPostsStart),
    call(onFetchUserNamePostsStart),
    call(onFetchHashTagPostsStart),
    call(onFetchHighlightPostsStart),
    call(onFetchStoryPostsStart),
  ]);
}




