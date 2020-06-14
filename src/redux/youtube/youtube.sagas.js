import { takeLatest, call, put, all } from 'redux-saga/effects';
import YoutubeActionTypes from './youtube.types';
import {
  youtubeVideoApi,
} from '../../Api/api';
import {
  youtubeVideoFailure,
  youtubeVideoSuccess
} from './youtube.actions';

export function* fetchYoutubeVideoAsync({ payload: url }) {
  console.log('url: ', url)
  try {
    const result = yield youtubeVideoApi(url).then(function (response) {
      return response;
    });
    yield put(youtubeVideoSuccess(result));
  } catch (error) {
    yield put(
      youtubeVideoFailure(
        error.response
          ? error.response.data.message || error.response.data.error
          : 'Oops!!, Poor internet connection, Please check your connectivity, And try again'
      )
    );
  }
}

export function* fetchYoutubeVideo() {
  yield takeLatest(YoutubeActionTypes.YOUTUBE_VIDEO_START, fetchYoutubeVideoAsync);
}

// MAIN SAGA
export function* youtubeSagas() {
  yield all([
    call(fetchYoutubeVideo),
  ]);
}
