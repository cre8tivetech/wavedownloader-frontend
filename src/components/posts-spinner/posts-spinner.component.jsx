import React, { useState, useEffect } from 'react';
import './posts-spinner.style.scss';
import LoadingBar from 'react-top-loading-bar';
import { selectError } from '../../redux/instagram/instagram.selector';
import { createStructuredSelector } from 'reselect';
const PostsSpinner = (WrappedComponent) => {
  const Spinner = ({
    isLoading,
    isSlide,
    postError,
    history,
    ...otherProps
  }) => {
    const [loadBar, setLoadBar] = useState();
    const [barColor, setBarColor] = useState(
      'linear-gradient(92deg, #038125 0%, #fbff00 100%)'
    );
    // const [errorMessage] = useState();
    const [errorDisplay, setErrorDisplay] = useState('none');
    const reload = () => {
      window.location.reload(false);
    };
    useEffect(() => {
      if (postError) {
        setLoadBar(99.9);
        setBarColor('red');
        setTimeout(() => {
          setErrorDisplay('block');
          setTimeout(() => {
            history.push('/');
            setErrorDisplay('none');
          }, 6000);
        }, 2000);
      }
    }, [setLoadBar, setBarColor, setErrorDisplay, postError]);

    return isLoading ? (
      <div className="spinner-section">
        <LoadingBar
          progress={loadBar}
          height={3}
          color={barColor}
          onLoaderFinished={() => setLoadBar(99)}
        />
        <div style={{ display: errorDisplay }} className="message">
          <span className="message-close">&times;</span>
          <p>
            <i
              className="fad fa-bug"
              style={{ color: 'var(--color-light)' }}
            ></i>
            {postError ? postError : null}
          </p>
        </div>
        <div className="spinner-card">
          <div className="spinner-card__reload">
            <i
              onClick={() => {
                reload();
              }}
              className="fad fa-sync-alt"
              style={{ color: 'var(--color-primary)' }}
            ></i>
          </div>
          <div className="spinner-card__detail">
            <div className="spinner-card__detail--image">
              <div className="spinner-card__detail--image-img loading"></div>
              <div className="spinner-card__detail--image-name">
                <div className="loading"></div>
                <div className="loading"></div>
                <div className="loading"></div>
              </div>
            </div>
            <div className="spinner-card__detail--info">
              <div className="loading"></div>
              <div className="loading"></div>
              <div className="loading"></div>
              <div className="loading"></div>
              <div className="loading"></div>
            </div>
            <div className="spinner-card__detail--more">
              <div className="spinner-card__detail--more-img">
                <div className="loading"></div>
                <div className="loading"></div>
                <div className="loading"></div>
              </div>
              <div className="spinner-card__detail--more-name">
                <div className="loading"></div>
                <div className="loading"></div>
                <div className="loading"></div>
              </div>
            </div>
          </div>
          <div className="spinner-card__collections">
            <ul className="spinner-card__collections--box">
              <li className="spinner-card__collections--box-list loading"></li>
              <li className="spinner-card__collections--box-list loading"></li>
              <li className="spinner-card__collections--box-list loading"></li>
              <li className="spinner-card__collections--box-list loading"></li>
              <li className="spinner-card__collections--box-list loading"></li>
              <li className="spinner-card__collections--box-list loading"></li>
            </ul>
          </div>
        </div>
      </div>
    ) : (
      <WrappedComponent {...otherProps} />
    );
  };
  createStructuredSelector({
    errorMessage: selectError,
  });
  return Spinner;
};

export default PostsSpinner;
