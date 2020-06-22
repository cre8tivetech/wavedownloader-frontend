import { takeLatest, put, all, call, delay } from 'redux-saga/effects';
import { select } from 'redux-saga/effects';
import UserActionTypes from './user.types';
import {
  signUpApi,
  signInApi,
  signInByTokenApi,
  resendConfirmEmailApi,
  changePasswordApi,
  forgetPasswordApi,
  resetPasswordApi,
} from '../../Api/auth';
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
  // resendConfirmEmailSuccess,
  forgetPasswordSuccess,
  // userPaymentSucesss,
  userPaymentFailure,
} from './user.actions';
import { getDownloadsApi, getSubscriptionApi } from '../../Api/api';

// const userActive = state => state.user.currentUser;
const userToken = (state) => state.user.token.key;
const userExpire = (state) => state.user.token.expire;

export function* getSnapshotFromUserAuth(userAuth) {
  try {
    yield put(signInSuccess(userAuth));
  } catch (error) {
    yield put(
      signInFailure(
        error.response
          ? error.response.data.message || error.response.data.error
          : 'Oops!!, Poor internet connection, Please check your connectivity, And try again'
      )
    );
  }
}

export function* signIn({ payload: { email, password } }) {
  try {
    const result = yield signInApi(email, password).then(function (response) {
      return response.data.data;
    });
    const token = {
      key: result.token,
      expire: tokenExpiration(),
    };
    if (result) {
      const download = yield getDownloadsApi(token.key).then(function (
        response
      ) {
        return response.data.data;
      });
      const subscription = yield getSubscriptionApi(token.key).then(function (
        response
      ) {
        return response.data.data;
      });
      yield put(setToken(token));
      yield put(setSubscription(subscription.subscription));
      yield put(setDownloads(download.downloads));
      yield getSnapshotFromUserAuth(result.user);
    }
  } catch (error) {
    yield put(
      signInFailure(
        error.response
          ? error.response.data.message || error.response.data.error
          : 'Sign in failed, Please check your connectivity, And try again'
      )
    );
  }
}

export function* signByToken({ payload: token }) {
  try {
    const result = yield signInByTokenApi(token).then(function (response) {
      return response.data.data;
    });
    const tokens = {
      key: result.token,
      expire: tokenExpiration(),
    };
    if (result) {
      const download = yield getDownloadsApi(tokens.key).then(function (
        response
      ) {
        return response.data.data;
      });
      const subscription = yield getSubscriptionApi(tokens.key).then(function (
        response
      ) {
        return response.data.data;
      });
      yield put(setToken(tokens));
      yield put(setSubscription(subscription.subscription));
      yield put(setDownloads(download.downloads));
      yield getSnapshotFromUserAuth(result.user);
    }
  } catch (error) {
    yield put(
      signInFailure(
        error.response
          ? error.response.data.message || error.response.data.error
          : 'Oops!!, Poor internet connection, Please check your connectivity, And try again'
      )
    );
  }
}

const tokenExpiration = () => {
  const loginExp = new Date();
  const timeExp = loginExp.setHours(loginExp.getHours() + 12);
  // const timeExp = loginExp.setSeconds(loginExp.getSeconds() + 10);
  const result = new Date(timeExp);
  return result;
};

export function* isResendConfirmEmail() {
  const token = yield select(userToken);
  try {
    const result = yield resendConfirmEmailApi(token).then(function (response) {
      return response.data.data;
    });
    if (result) {
      // yield put(resendConfirmEmailSuccess(""));
      yield put(setMessage({ type: 'success', message: result.message }));
      yield delay(6000);
      yield put(setMessage(null));
    }
  } catch (error) {
    yield put(
      setMessage({
        type: 'error',
        message: error.response
          ? error.response.data.message || error.response.data.error
          : 'Oops!!, Poor internet connection, Please check your connectivity, And try again',
      })
    );
    yield delay(8000);
    yield put(setMessage(null));
  }
}

export function* isChangePassword({ payload: { old_password, new_password } }) {
  const token = yield select(userToken);
  try {
    const result = yield changePasswordApi(
      token,
      old_password,
      new_password
    ).then(function (response) {
      return response.data.data;
    });
    if (result) {
      yield put(setMessage({ type: 'success', message: result.message }));
      yield delay(6000);
      yield put(setMessage(null));
    }
  } catch (error) {
    yield put(
      setMessage({
        type: 'error',
        message: error.response
          ? error.response.data.message || error.response.data.error
          : 'Oops!!, Poor internet connection, Please check your connectivity, And try again',
      })
    );
    yield delay(8000);
    yield put(setMessage(null));
  }
}

export function* isForgetPassword({ payload: email }) {
  try {
    const result = yield forgetPasswordApi(email).then(function (response) {
      return response.data.data;
    });
    if (result) {
      yield put(forgetPasswordSuccess());
      yield put(setMessage({ type: 'success', message: result.message }));
      yield delay(8000);
      yield put(setMessage(null));
    }
  } catch (error) {
    yield put(
      setMessage({
        type: 'error',
        message: error.response
          ? error.response.data.message || error.response.data.error
          : 'Oops!!, Poor internet connection, Please check your connectivity, And try again',
      })
    );
    yield delay(8000);
    yield put(setMessage(null));
  }
}

export function* isResetPassword({ payload: { token, new_password } }) {
  try {
    const result = yield resetPasswordApi(token, new_password).then(function (
      response
    ) {
      return response.data.data;
    });
    if (result) {
      yield put(setMessage({ type: 'success', message: result.message }));
      yield delay(6000);
      yield put(setMessage(null));
    }
  } catch (error) {
    yield put(
      setMessage({
        type: 'error',
        message: error.response
          ? error.response.data.message || error.response.data.error
          : 'Oops!!, Poor internet connection, Please check your connectivity, And try again',
      })
    );
    yield delay(5000);
    yield put(setMessage(null));
  }
}

export function* isUserAuthenticated() {
  try {
    const expire = yield select(userExpire);
    if (new Date(expire) <= new Date(Date.now())) {
      const message = 'Login Session as expired, 🙏 Please re-login!!';
      yield put(setMessage({ type: 'error', message: message }));
      yield delay(3000);
      yield put(signOutStart());
      yield delay(2000);
      yield put(setMessage(null));
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
    const result = yield signUpApi(userName, email, password).then(function (
      response
    ) {
      return response.data.data;
    });
    yield put(signUpSuccess(result));
  } catch (error) {
    yield put(
      signUpFailure(
        error.response
          ? error.response.data.message || error.response.data.error
          : 'Oops!!, Poor internet connection, Please check your connectivity, And try again'
      )
    );
  }
}

export function* makePayment({ payload: txref }) {
  const token = yield select(userToken);

  try {
    const result = yield paymentVerifyApi(token, txref).then(function (
      response
    ) {
      return response.data.data;
    });
    yield put(setSubscription(result.subscription));
    yield getSnapshotFromUserAuth(result.user);
    yield put(setMessage({ type: 'success', message: result.message }));
    yield delay(6000);
    yield put(setMessage(null));
  } catch (error) {
    // yield put(())
    yield put(
      userPaymentFailure({
        type: 'error',
        message: error.response
          ? error.response.data.message || error.response.data.error
          : 'Oops!!, Poor internet connection, Please check your connectivity, And try again',
      })
    );
    // yield delay(6000);
    // yield put(setMessage(null));
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

export function* onResendConfirmEmail() {
  yield takeLatest(
    UserActionTypes.RESEND_CONFIRM_EMAIL_START,
    isResendConfirmEmail
  );
}

export function* onChangePassword() {
  yield takeLatest(UserActionTypes.CHANGE_PASSWORD, isChangePassword);
}

export function* onForgetPassword() {
  yield takeLatest(UserActionTypes.FORGET_PASSWORD_START, isForgetPassword);
}

export function* onResetPassword() {
  yield takeLatest(UserActionTypes.RESET_PASSWORD, isResetPassword);
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
    call(onResendConfirmEmail),
    call(onChangePassword),
    call(onForgetPassword),
    call(onResetPassword),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onUserPaymentStart),
    // call(onSignUpSuccess),
  ]);
}
