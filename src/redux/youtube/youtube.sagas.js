import { takeLatest, call, put, all, delay } from 'redux-saga/effects';
import YoutubeActionTypes from './youtube.types';
import { select } from 'redux-saga/effects';
import {
  youtubeVideoApi,
} from '../../Api/api';
import {
  fetchVideoFailure,
  fetchVideoSuccess
} from './youtube.actions';
// import { setMessage, setDownloads } from '../user/user.actions';

export function* fetchVideoAsync({ payload: url }) {
  console.log('url: ', url)
  try {
    const result = yield youtubeVideoApi(url).then(function (response) {
      return response;
    });
    yield put(fetchVideoSuccess(result));
  } catch (error) {
    yield put(
      fetchVideoFailure(
        error.response
          ? error.response.data.message || error.response.data.error
          : 'Oops!!, Poor internet connection, Please check your connectivity, And try again'
      )
    );
  }
}


// // SAVE DOWNLOAD
// export function* saveDownloadAsync({ payload: downloadData }) {
//   const token = yield select(userToken);
//   try {
//     const result = yield saveDownloadApi(token.key, downloadData).then(
//       function (response) {
//         return response.data.data;
//       }
//     );
//     if (result)
//       yield put(setMessage({ type: 'success', message: result.message }));
//     yield put(setDownloads(result.downloads));
//     yield delay(6000);
//     yield put(setMessage(null));

//     // yield put(fetchStoryPostsSuccess(result.data));
//   } catch (error) {
//     if (error.response)
//       yield put(
//         fetchPostsFailure(
//           error.response
//             ? error.response.data.message || error.response.data.error
//             : 'Oops!!, Poor internet connection, Please check your connectivity, And try again'
//         )
//       );
//     else if (error.message === 'Network Error')
//       yield put(
//         fetchPostsFailure(
//           'Oops!!, Poor internet connection, Please check your connectivity, And try again'
//         )
//       );
//   }
// }

// // GET DOWNLOAD
// export function* getDownloadAsync() {
//   const token = yield select(userToken);
//   try {
//     const result = yield getDownloadsApi(token.key).then(function (response) {
//       return response.data.data;
//     });
//     yield put(setDownloads(result.downloads));
//   } catch (error) {}
// }

export function* fetchVideo() {
  yield takeLatest(YoutubeActionTypes.FETCH_VIDEO_START, fetchVideoAsync);
}

// export function* onSaveDownload() {
//   yield takeLatest(InstagramActionTypes.SAVE_DOWNLOAD, saveDownloadAsync);
// }

// export function* onGetDownload() {
//   yield takeLatest(InstagramActionTypes.GET_DOWNLOAD, getDownloadAsync);
// }

// MAIN SAGA
export function* youtubeSagas() {
  yield all([
    call(fetchVideo),
    // call(onSaveDownload),
    // call(onGetDownload),
  ]);
}
