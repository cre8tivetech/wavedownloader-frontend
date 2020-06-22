import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import SEO from '../../components/seo/seo.component';
import LoadingBar from 'react-top-loading-bar';
import { useHistory } from 'react-router-dom';

import { withRouter } from 'react-router-dom';

import {
  twitterVideoStart,
  setTwitterUser,
  clearTwitterData,
} from '../../redux/twitter/twitter.actions';

import '../home/home.styles.scss';

const Home = ({
  twitterVideoStart,
  setTwitterUser,
  clearTwitterData,
  location
}) => {
  const [loadBar, setLoadBar] = useState(0);
  const startLoader = useCallback(() => {
    setLoadBar(100);
  }, []);
  const onLoaderFinished = () => {
    setLoadBar(0);
  };
  const history = useHistory();
  useMemo(() => {
    clearTwitterData();
  }, [clearTwitterData]);
  useEffect(() => {
    startLoader();
  }, [startLoader]);

  useEffect(() => {
    
    const data = location.search;
    if (!data) {
      history.push('/')
    } else {
      const result = data.split('?url=');
      const getUrlAndUser = result[1].split('&user=');
      const url = decodeURIComponent(getUrlAndUser[0]);
      const user = decodeURIComponent(getUrlAndUser[1])
      const checkUrl = url.split('/')[2];
      if (checkUrl.includes('twitter')) {
        console.log('url: ', url);
        console.log('user: ', user);
        twitterVideoStart(url);
        setTwitterUser(user);
        history.push('/getWdBot');
      } else {
        history.push('/');
      }
    }
    
  }, [history, location.search, setTwitterUser, twitterVideoStart]);

  useCallback(() => {
    startLoader();
  }, [startLoader]);

  return (
    <div className="home-section">
      <SEO title="An online post and video downloader" />
      <LoadingBar
        progress={loadBar}
        height={3}
        color="linear-gradient(92deg, #038125 0%, #fbff00 100%)"
        onLoaderFinished={() => onLoaderFinished}
      />
      <div className="home-container">
        loading...
      </div>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => ({
  twitterVideoStart: (url) => dispatch(twitterVideoStart(url)),
  setTwitterUser: (user) => dispatch(setTwitterUser(user)),
  clearTwitterData: () => dispatch(clearTwitterData()),
});
export default withRouter(connect(null, mapDispatchToProps)(Home));
