import { takeLatest, call, put, all } from 'redux-saga/effects';
import FacebookActionTypes from './facebook.types';
import {
  facebookVideoApi,
} from '../../Api/api';
import {
  facebookVideoFailure,
  facebookVideoSuccess
} from './facebook.actions';

export function* fetchFacebookVideoAsync({ payload: url }) {
  console.log('url: ', url)
  try {
    const result = yield facebookVideoApi(url).then(function (response) {
      return response;
    });
    yield put(facebookVideoSuccess(result));
  } catch (error) {
    yield put(
      facebookVideoFailure(
        error.response
          ? error.response.data.message || error.response.data.error
          : 'Oops!!, Poor internet connection, Please check your connectivity, And try again'
      )
    );
  }
}

export function* fetchFacebookVideo() {
  yield takeLatest(FacebookActionTypes.FACEBOOK_VIDEO_START, fetchFacebookVideoAsync);
}

// MAIN SAGA
export function* facebookSagas() {
  yield all([
    call(fetchFacebookVideo),
  ]);
}
