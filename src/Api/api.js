import Axios from 'axios';

export const singlePostApi = async (url, token) => {
  const apiUrl =
    process.env.REACT_APP_API + process.env.REACT_APP_SINGLE_POST + url;
  const collectionsMap = await Axios.get(apiUrl);
  return collectionsMap;
};

export const usernamePostApi = async (username, numberOfPost, token) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  const apiUrl =
    process.env.REACT_APP_API +
    process.env.REACT_APP_USERNAME_POST +
    username +
    process.env.REACT_APP_LIMIT +
    numberOfPost;
  const collectionsMap = await Axios.get(apiUrl, {
    headers: headers,
  });
  return collectionsMap;
};

export const hashtagPostApi = async (hashTag, token) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  const url =
    process.env.REACT_APP_API + process.env.REACT_APP_HASHTAG_POST + hashTag;
  const collectionsMap = await Axios.get(url, {
    headers: headers,
  });
  return collectionsMap;
};

export const highlightPostApi = async (username, token) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  const url =
    process.env.REACT_APP_API + process.env.REACT_APP_HIGHLIGHT_POST + username;
  const collectionsMap = await Axios.get(url, {
    headers: headers,
  });
  return collectionsMap;
};

export const storyPostApi = async (username, token) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  const url =
    process.env.REACT_APP_API + process.env.REACT_APP_STORY_POST + username;
  const collectionsMap = await Axios.get(url, {
    headers: headers,
  });
  return collectionsMap;
};

export const idcodePostApi = async (idcode, token) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  const url =
    process.env.REACT_APP_API +
    process.env.REACT_APP_SINGLE_HIGHLIGHT_POST +
    idcode;
  const collectionsMap = await Axios.get(url, { headers: headers });
  return collectionsMap;
};

export const shortcodePostApi = async (shortcode, token) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  const url =
    process.env.REACT_APP_API +
    process.env.REACT_APP_SINGLE_POST +
    process.env.REACT_APP_INSTAGRAM +
    shortcode;
  const collectionsMap = await Axios.get(url, { headers: headers });
  return collectionsMap;
};

export const saveDownloadApi = async (token, downloadData) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  const url = process.env.REACT_APP_API + process.env.REACT_APP_SAVE_DOWNLOAD;
  const data = downloadData;
  const collectionsMap = await Axios.patch(url, data, {
    headers: headers,
  });
  return collectionsMap;
};

export const getDownloadsApi = async (token) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  const url = process.env.REACT_APP_API + process.env.REACT_APP_GET_DOWNLOADS;
  const collectionsMap = await Axios.get(url, { headers: headers });
  return collectionsMap;
};

export const getSubscriptionApi = async (token) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  const url =
    process.env.REACT_APP_API + process.env.REACT_APP_GET_SUBSCRIPTION;
  const collectionsMap = await Axios.get(url, { headers: headers });
  return collectionsMap;
};
