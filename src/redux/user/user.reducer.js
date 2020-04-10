import UserActionTypes from './user.types';

const INITIAL_STATE = {
  currentUser: null,
  downloads: null,
  subscription: null,
  message: null,
  token: null,
  success: null,
  error: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //Either any of the cases
    case UserActionTypes.CHECK_USER_SESSION:
      return {
        ...state,
        error: null,
        success: null,
      };
    case UserActionTypes.SET_TOKEN:
      return {
        ...state,
        token: action.payload,
        error: null,
        success: null,
      };
    case UserActionTypes.SET_DOWNLOADS:
      return {
        ...state,
        downloads: action.payload,
        error: null,
        success: null,
      };
    case UserActionTypes.SET_SUBSCRIPTION:
      return {
        ...state,
        subscription: action.payload,
        error: null,
        success: null,
      };
    case UserActionTypes.SET_MESSAGE:
      return {
        ...state,
        message: action.payload,
        error: null,
        success: null,
      };
    case UserActionTypes.SIGN_UP_START:
      return {
        ...state,
        currentUser: null,
        token: null,
        error: null,
        success: null,
      };
    case UserActionTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
        success: action.payload,
        error: null,
      };
    case UserActionTypes.SIGN_IN_START:
      return {
        ...state,
        currentUser: null,
        token: null,
        error: null,
      };
    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null,
      };
    case UserActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        token: null,
        error: null,
      };
    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_OUT_FAILURE:
    case UserActionTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
