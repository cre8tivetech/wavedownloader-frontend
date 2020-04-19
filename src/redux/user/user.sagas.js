import { takeLatest, put, all, call, delay } from 'redux-saga/effects';
import { select } from 'redux-saga/effects';
import UserActionTypes from './user.types';
import { signUpApi, signInApi, signInByTokenApi } from '../../Api/auth';
import { paymentVerifyApi } from '../../Api/payment';
import {
  setToken,
  setDownloads,
  setMessage,
  setSubscription,
  signInSuccess,
  signInFailure,
  signOutStart,
  signOutSuccess,
  signOutFailure,
  signUpFailure,
  signUpSuccess,
} from './user.actions';


// const userActive = state => state.user.currentUser;
const userToken = (state) => state.user.token.key;
const userExpire = (state) => state.user.token.expire;

export function* getSnapshotFromUserAuth(userAuth) {
  try {
    const data = yield put(
      signInSuccess(userAuth)
    );
  } catch (error) {
    yield put(
      signInFailure(
        error.response
          ? error.response.data.message || error.response.data.error
          : 'No Internet!!.  Poor internet connection, Please check your connectivity, and try again later'
      )
    );

  }
}

export function* signIn({ payload: { email, password } }) {
  
  try {
    const result = yield signInApi(email, password).then(function(response) {
      return response.data.data;
    });
    const token = {
      key: result.token,
      expire: tokenExpiration()
    }
    yield put(setToken(token));
    yield put(setSubscription(result.subscription));
    yield put(setDownloads(result.downloads));
    yield getSnapshotFromUserAuth(result.user);
    
  } catch (error) {
    yield put(signInFailure(error.response ? error.response.data.message || error.response.data.error  : "No Internet!!.  Poor internet connection, Please check your connectivity, and try again later"));
  }
}

export function* signByToken({ payload: { token } }) {
  try {
    const result = yield signInByTokenApi(token).then(function (response) {
      return response.data.data;
    });
    const token = {
      key: result.token,
      expire: tokenExpiration()
    }
    yield put(setToken(token));
    yield put(setSubscription(result.subscription));
    yield put(setDownloads(result.downloads));
    yield getSnapshotFromUserAuth(result.user);
  } catch (error) {
    yield put(signInFailure(error.response ? error.response.data.message || error.response.data.error  : "No Internet!!.  Poor internet connection, Please check your connectivity, and try again later"));
  }
}

const tokenExpiration = () =>  {
  const loginExp = new Date();
  const timeExp = loginExp.setHours(loginExp.getHours() + 12);
  const result = new Date(timeExp);
  return result ;
}

export function* isUserAuthenticated() {
  try {
    const expire = yield select(userExpire);
    if (new Date(expire) <= new Date(Date.now())) {
      const message = "Login Session as expired, 🙏 Please re-login!!"; 
      yield put(setMessage(message));
      yield put(signOutStart());
    }
  } catch (error) {
    yield delay(5000);
    yield put(setMessage(null));
  }
}

export function* signOut() {
  try {
    yield delay(3000);
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

export function* signUp({ payload: { userName, email, password } }) {
  try {
    // const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    const result = yield signUpApi(userName, email, password).then(function(response) {
      return response.data.data;
    });
    yield put(signUpSuccess(result));
  } catch (error) {
    yield put(signUpFailure(error.response ? error.response.data.message || error.response.data.error  : "No Internet!!.  Poor internet connection, Please check your connectivity, and try again later"));
  }
}

export function* makePayment({ payload: txref  }) {
  const token = yield select(userToken);

  try {
    const result = yield paymentVerifyApi(token, txref).then(function(
      response
    ) {
      return response.data.data;
    });
    yield put(setSubscription(result.subscription));
    yield getSnapshotFromUserAuth(result.user);
  } catch (error) {
    yield put(signUpFailure(error));
  }
}

// export function* signInAfterSignUp({ payload: { user, additionalData } }) {
//   yield getSnapshotFromUserAuth(user, additionalData);
// }

export function* onSignInStart() {
  yield takeLatest(UserActionTypes.SIGN_IN_START, signIn);
}

export function* onSignInByTokenStart() {
  yield takeLatest(UserActionTypes.SIGN_IN_BY_TOKEN_START, signByToken);
}

export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* onUserPaymentStart() {
  yield takeLatest(UserActionTypes.USER_PAYMENT_START, makePayment);
}

// export function* onSignUpSuccess() {
//   yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
// }

export function* userSagas() {
  yield all([
    call(onSignInStart),
    call(onSignInByTokenStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onUserPaymentStart),
    // call(onSignUpSuccess),
  ]);
}
