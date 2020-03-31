import Axios from "axios";

export const singlePostApi = async (url) => {
  console.log(
    process.env.REACT_APP_API + process.env.REACT_APP_SINGLE_POST + url
  );
  const collectionsMap = await Axios.get(
    process.env.REACT_APP_API + process.env.REACT_APP_SINGLE_POST + url
  );
  console.log(process.env.REACT_APP_API);
  console.log(process.env.REACT_APP_SHORT_CODE_POST);
  return collectionsMap;
};

export const usernamePostApi = async (username, numberOfPost) => {
  const collectionsMap = await Axios.get(
    process.env.REACT_APP_API +
      process.env.REACT_APP_USERNAME_POST +
      username +
      process.env.REACT_APP_LIMIT +
      numberOfPost
  );
  return collectionsMap;
};

export const hashtagPostApi = async (hashTag) => {
  const collectionsMap = await Axios.get(
    process.env.REACT_APP_API +
      process.env.REACT_APP_HASHTAG_POST +
      hashTag
  );
  return collectionsMap;
};

export const highlightPostApi = async username => {
  const collectionsMap = await Axios.get(
    process.env.REACT_APP_API + process.env.REACT_APP_HIGHLIGHT_POST + username
  );
  return collectionsMap;
};

export const storyPostApi = async username => {
  const collectionsMap = await Axios.get(
    process.env.REACT_APP_API + process.env.REACT_APP_STORY_POST + username
  );
  return collectionsMap;
};

export const idcodePostApi = async idcode => {
  const collectionsMap = await Axios.get(
    process.env.REACT_APP_API +
      process.env.REACT_APP_SINGLE_HIGHLIGHT_POST +
      idcode
  );
  return collectionsMap;
};

export const shortcodePostApi = async shortcode => {
  const collectionsMap = await Axios.get(
    process.env.REACT_APP_API +
      process.env.REACT_APP_SINGLE_POST +
      process.env.REACT_APP_INSTAGRAM +
      shortcode
  );
  return collectionsMap;
};