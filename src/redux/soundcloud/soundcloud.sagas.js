import { takeLatest, call, put, all } from 'redux-saga/effects';
import SoundCloudActionTypes from './soundcloud.types';
import {
  soundcloudVideoApi,
} from '../../Api/api';
import {
  soundcloudVideoFailure,
  soundcloudVideoSuccess,
} from './soundcloud.actions';

export function* fetchSoundCloudVideoAsync({ payload: url }) {
  console.log('url: ', url)
  try {
    const result = yield soundcloudVideoApi(url).then(function (response) {
      return response;
    });
    yield put(soundcloudVideoSuccess(result));
  } catch (error) {
    yield put(
      soundcloudVideoFailure(
        error.response
          ? error.response.data.message || error.response.data.error
          : 'Oops!!, Poor internet connection, Please check your connectivity, And try again'
      )
    );
  }
}

export function* fetchSoundCloudVideo() {
  yield takeLatest(SoundCloudActionTypes.SOUNDCLOUD_VIDEO_START, fetchSoundCloudVideoAsync);
}

// MAIN SAGA
export function* soundcloudSagas() {
  yield all([
    call(fetchSoundCloudVideo),
  ]);
}
