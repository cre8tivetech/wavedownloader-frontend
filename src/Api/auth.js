import Axios from 'axios';
export const signUpApi = async (username, email, password) => {
  const collectionsMap = await Axios.post(
    process.env.REACT_APP_API + process.env.REACT_APP_SIGNUP,
    {
      email: email,
      full_name: username,
      password: password,
    }
  );
  return collectionsMap;
};

export const signInApi = async (email, password) => {
  const collectionsMap = await Axios.post(
    process.env.REACT_APP_API + process.env.REACT_APP_SIGNIN,
    {
      email: email,
      password: password,
    }
  );
  return collectionsMap;
};

export const signInByTokenApi = async (token) => {
  const collectionsMap = await Axios.post(
    process.env.REACT_APP_API + process.env.REACT_APP_SIGNBYTOKEN,
    {
      token,
    }
  );
  return collectionsMap;
};

export const resendConfirmEmailApi = async (token) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  const url =
    process.env.REACT_APP_API + process.env.REACT_APP_RESEND_CONFIRM_EMAIL;
  const collectionsMap = await Axios.get(url, {
    headers: headers,
  });
  return collectionsMap;
};

export const changePasswordApi = async (token, old_password, new_password) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  const url = process.env.REACT_APP_API + process.env.REACT_APP_CHANGE_PASSWORD;
  const data = { old_password, new_password };
  const collectionsMap = await Axios.patch(url, data, {
    headers: headers,
  });
  return collectionsMap;
};

export const forgetPasswordApi = async (email) => {
  const url = process.env.REACT_APP_API + process.env.REACT_APP_FORGET_PASSWORD;
  const data = email;
  const collectionsMap = await Axios.post(url, data);
  return collectionsMap;
};

export const resetPasswordApi = async (token, password) => {
  const collectionsMap = await Axios.patch(
    process.env.REACT_APP_API + process.env.REACT_APP_RESET_PASSWORD + token,
    {
      password,
    }
  );
  return collectionsMap;
};
