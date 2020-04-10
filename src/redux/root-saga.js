import { all, call } from 'redux-saga/effects';
import { postsSagas } from './posts/posts.sagas';
import { userSagas } from './user/user.sagas';
// import { cartSagas } from './cart/cart.sagas';

export default function* rootSaga() {
  yield all([
    call(postsSagas),
    call(userSagas),
    // call(cartSagas)
  ]);
}
