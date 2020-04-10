import Axios from 'axios';

export const paymentVerifyApi = async (token, txref) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  const url = process.env.REACT_APP_API + process.env.REACT_APP_VERIFY_PAYMENT + txref;
  const collectionsMap = await Axios.get(url, {
    headers: headers
  });
  return collectionsMap;
};
