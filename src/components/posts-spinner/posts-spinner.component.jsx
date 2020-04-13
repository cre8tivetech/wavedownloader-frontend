import React, { useState, useEffect } from "react";
import "./posts-spinner.style.scss";
import LoadingBar from "react-top-loading-bar";
import { selectError } from "../../redux/posts/posts.selector";
import { createStructuredSelector } from "reselect";
const PostsSpinner = WrappedComponent => {
  const Spinner = ({ isLoading, isSlide, postError, ...otherProps }) => {
    const [loadBar, setLoadBar] = useState();
    const [barColor, setBarColor] = useState(
      "linear-gradient(92deg, #038125 0%, #fbff00 100%)"
    );
    const [errorMessage, setErrorMessage] = useState();
    const [errorDisplay, setErrorDIsplay] = useState("none");
    const reload = () => {
      window.location.reload(false);
    };
    useEffect(() => {
      if (postError) {
        setLoadBar(99.9);
        setBarColor("red");
        console.log(postError);
        setTimeout(() => {
          setErrorDIsplay("block");
        }, 3000);
        setTimeout(() => {
          setErrorDIsplay("none");
        }, 10000);
      }
      // else if (postError === null) {
      //   setLoadBar(99.9);
      //   setBarColor("linear-gradient(92deg, #038125 0%, #fbff00 100%)");
      //   setErrorDIsplay("none");
      //   setTimeout(() => {
      //     setBarColor("red");
      //     setErrorDIsplay("block");
      //     setErrorMessage(
      //       "Sorry, No internet connection. Please try again later!"
      //     );
      //   }, 5000);
      //   setTimeout(() => {
      //     setErrorDIsplay("none");
      //   }, 10000);
      // } else {
      //   setLoadBar(99.9);
      //   setBarColor("red");
      //   setTimeout(() => {
      //     setErrorDIsplay("none");
      //     setErrorMessage(
      //       "__Sorry, No internet connection. Please try again later"
      //     );
      //     setErrorDIsplay("block");
      //   }, 5000);

      //   setTimeout(() => {
      //     setErrorDIsplay("none");
      //   }, 10000);
      // }
    }, [setLoadBar, setBarColor, setErrorDIsplay, postError]);

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
              style={{ color: "var(--color-light)" }}
            ></i>
            {postError ? postError : errorMessage}
          </p>
        </div>
        <div className="spinner-card">
          <div className="spinner-card__reload">
            <i
              onClick={() => {
                reload();
              }}
              className="fad fa-sync-alt"
              style={{ color: "var(--color-primary)" }}
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
    errorMessage: selectError
  });
  return Spinner;
};

export default PostsSpinner;
