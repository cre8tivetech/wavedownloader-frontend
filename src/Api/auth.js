import Axios from 'axios';
export const signUpApi = async (username, email, password) => {
  console.log(
    process.env.REACT_APP_API + process.env.REACT_APP_SIGNUP
  );
  const collectionsMap = await Axios.post(
    process.env.REACT_APP_API + process.env.REACT_APP_SIGNUP, {
      email: email,
      full_name: username,
      password: password
    }
  )
  return collectionsMap;
};

export const signInApi = async (email, password) => {
  console.log(process.env.REACT_APP_API + process.env.REACT_APP_SIGNIN);
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
  console.log(process.env.REACT_APP_API + process.env.REACT_APP_SIGNIN);
  const collectionsMap = await Axios.post(
    process.env.REACT_APP_API + process.env.REACT_APP_SIGNIN,
    {
      token,
    }
  );
  return collectionsMap;
};