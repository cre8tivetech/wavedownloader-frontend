import { all, call } from 'redux-saga/effects';
import { instagramSagas } from './instagram/instagram.sagas';
import { youtubeSagas } from './youtube/youtube.sagas';
import { twitterSagas } from './twitter/twitter.sagas';
import { userSagas } from './user/user.sagas';

export default function* rootSaga() {
  yield all([
    call(instagramSagas),
    call(youtubeSagas),
    call(twitterSagas),
    call(userSagas),
  ]);
}
