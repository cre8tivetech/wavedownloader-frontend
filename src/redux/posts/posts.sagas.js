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

export function* fetchPostsAsync() {
  yield console.log('I am fired');
  const url = yield select(link);
  const shortCode = yield select(shortcode);
  const idCode = yield select(idcode);
  try {
    if(url) {
    const result = yield singlePostApi(url).then(function(response) {
      return response;
    });
    yield console.log(result);
    if(result.data.__typename === "GraphSidecar"){
      console.log("SLidecard post");
      yield put(fetchSingleCollectionPostsSuccess(result));    
      }else if (result.data.__typename === 'GraphImage' ||  result.data.__typename === 'GraphVideo') {
        console.log("Single post initiated");
        yield put(fetchSinglePostsSuccess(result.data));
      }
    } else if (shortCode) {
      const result = yield shortcodePostApi(shortCode).then(function(response) {
        return response;
      });
      yield console.log(result);
      if(result.data.__typename === "GraphSidecar"){
        console.log("SLidecard post");
        yield put(fetchSingleCollectionPostsSuccess(result));    
      }else if (result.data.__typename === 'GraphImage' ||  result.data.__typename === 'GraphVideo') {
        console.log("Single post initiated");
        yield put(fetchSinglePostsSuccess(result.data));
      }
    }else if(idCode) {
      const result = yield idcodePostApi(idCode).then(function(response) {
        return response;
      });
      yield console.log(result);
      if(result.data.__typename === "GraphHighlightReel"){
        console.log("Single Highlight post");
        yield put(fetchSingleHighlightCollectionPostsSuccess(result.data));    
      }
    }
  } catch (error) {
    yield put(fetchPostsFailure(error.response.data.message));
  }
}

export function* fetchUserNamePostsAsync() {
  yield console.log('I am fired');
  const {userName, numberOfPost} = yield select(credentials);
  yield console.log(userName);
  yield console.log(numberOfPost);
  try {
    const result = yield usernamePostApi(userName, numberOfPost).then(
      function(response) {
        return response;
      }
    );
    yield console.log(result.data);
      console.log('Username post initiated');
      yield put(fetchUserNamePostsSuccess(result));
  } catch (error) {
    yield put(fetchPostsFailure(error.response.data.message));
  }
}

export function* fetchHashTagPostsAsync() {
  yield console.log('I am fired');
  const { hashTag, postType } = yield select(hashTagForm);
  yield console.log(hashTag);
  yield console.log(postType);
  try {
    const result = yield hashtagPostApi(hashTag).then(function(
      response
    ) {
      return response;
    });
    yield console.log(result.data);
    console.log('HashTag post initiated');
    yield put(fetchHashTagPostsSuccess(result));
  } catch (error) {
    yield put(fetchPostsFailure(error.response.data.message));
  }
}

export function* fetchHighlightPostsAsync() {
  yield console.log('I am fired');
  const username = yield select(highlightForm);
  yield console.log(username);
  try {
    const result = yield highlightPostApi(username).then(function(
      response
    ) {
      return response;
    });
    yield console.log(result.data);
    console.log('HashTag post initiated');
    yield put(fetchHighlightPostsSuccess(result.data));
  } catch (error) {
    yield put(fetchPostsFailure(error.response.data.message));
  }
}

export function* fetchStoryPostsAsync() {
  yield console.log('I am fired');
  const userName = yield select(storyUserName);
  try {
      const result = yield storyPostApi(userName).then(function(response) {
        return response;
      });
      yield console.log(result);
        console.log('Single post initiated');
        yield put(fetchStoryPostsSuccess(result.data));
  } catch (error) {
    yield put(fetchPostsFailure(error.response.data.message));
  }
}


// SINGLE POST ADD
export function* fetchPostsUrl({ payload: { url } }) {
         yield console.log('I am fired');
         try {
           const data = yield {url:url};
           // yield console.log(data);
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
  yield console.log('I am fired');
  try {
    const data = yield { shortcode: shortcode };
    // yield console.log(data);
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
         yield console.log('I am fired');
         try {
           const data = yield { userName, numberOfPost };
           // yield console.log(data);
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
  yield console.log('I am fired');
  try {
    const data = yield { shortcode: shortcode };
    // yield console.log(data);
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
  yield console.log('I am fired');
  try {
    const data = yield { hashTag, postType };
    // yield console.log(data);
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
  yield console.log('I am fired');
  try {
    const data = yield {username};
    // yield console.log(data);
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
  yield console.log('I am fired');
  try {
    const data = yield { idcode: idcode };
    // yield console.log(data);
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
         yield console.log('I am fired');
         try {
           const data = yield { storyForm };
           // yield console.log(data);
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




