import { all, call } from 'redux-saga/effects';
import { instagramSagas } from './instagram/instagram.sagas';
import { youtubeSagas } from './youtube/youtube.sagas';
import { userSagas } from './user/user.sagas';
// import { cartSagas } from './cart/cart.sagas';

export default function* rootSaga() {
  yield all([
    call(instagramSagas),
    call(youtubeSagas),
    call(userSagas),
    // call(cartSagas)
  ]);
}
