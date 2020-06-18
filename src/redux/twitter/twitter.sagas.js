import { takeLatest, call, put, all } from 'redux-saga/effects';
import TwitterActionTypes from './twitter.types';
import {
  twitterVideoApi,
} from '../../Api/api';
import {
  twitterVideoFailure,
  twitterVideoSuccess,
} from './twitter.actions';

export function* fetchTwitterVideoAsync({ payload: url }) {
  console.log('url: ', url)
  try {
    const result = yield twitterVideoApi(url).then(function (response) {
      return response;
    });
    yield put(twitterVideoSuccess(result));
  } catch (error) {
    yield put(
      twitterVideoFailure(
        error.response
          ? error.response.data.message || error.response.data.error
          : 'Oops!!, Poor internet connection, Please check your connectivity, And try again'
      )
    );
  }
}

export function* fetchTwitterVideo() {
  yield takeLatest(TwitterActionTypes.TWITTER_VIDEO_START, fetchTwitterVideoAsync);
}

// MAIN SAGA
export function* twitterSagas() {
  yield all([
    call(fetchTwitterVideo),
  ]);
}
