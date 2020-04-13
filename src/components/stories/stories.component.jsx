import React, { useState, useEffect } from "react";
import Accordion from "../accordion/accordion.component";
import LoadingBar from "react-top-loading-bar";
import { useHistory, withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { fetchStoryPostsAdd } from "../../redux/posts/posts.actions";
import { connect } from "react-redux";
import { checkUserSession } from "../../redux/user/user.actions";

const Stories = ({
    fetchStoryPostsAdd,
    checkUserSession
  }) => {
  const [loadBar, setLoadBar] = useState(0);
  const [username, setUsername] = useState("");
  const startLoader = () => {
    setLoadBar(100);
  };
  const onLoaderFinished = () => {
    setLoadBar(0);
  };
  const history = useHistory();
  useEffect(() => {
    checkUserSession();
    startLoader();
  }, [checkUserSession, startLoader]);

  const handleSubmit = event => {
    event.preventDefault();
    fetchStoryPostsAdd(username);
    history.push("/story-posts");
  };
  const handleChange = event => {
    setUsername(event.target.value);
  };
  return (
    <div className="home-section">
      <LoadingBar
        progress={loadBar}
        height={3}
        color="linear-gradient(92deg, #038125 0%, #fbff00 100%)"
        onLoaderFinished={() => onLoaderFinished}
      />
      <div className="options card">
        <Link to="/single-post" className="btn">
          <p>Single Post</p>
        </Link>
        <Link to="/post-by-username" className="btn">
          <span>Pro</span>
          <p>Posts By Username</p>
        </Link>
        <Link to="/post-by-hashtag" className="btn">
          <span>Pro</span>
          <p>Posts By Hashtag</p>
        </Link>
        <Link to="/highlight" className="btn">
          <span>Pro</span>
          <p>Highlight</p>
        </Link>
        <Link to="/stories" className="btn options--active">
          <span>Pro</span>
          <p>Stories</p>
        </Link>
      </div>
      <div className="download card">
        <p className="download__text download__text--1">
          Download Instagram Stories!
        </p>
        <div className="download__text download__text--2">
          <p>
            <span>NEW</span>{" "}
            <small>Files encrypted are changed for faster reuploading!</small>
          </p>
        </div>
        <div className="download__form">
          <form onSubmit={handleSubmit} className="form">
            <div className="form__group">
              {/* UserName */}
              <div className="form__input">
                <i
                  className="fad fa-user"
                  style={{ color: "var(--color-primary)" }}
                ></i>
                <input
                  type="text"
                  className="form__input--box"
                  placeholder="Username"
                  id="username"
                  value={username}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="username" className="form__input--label">
                  UserName
                </label>
              </div>
            </div>
            <div className="form__group">
              <button type="submit" className="btn btn--green">
                Download ➤
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="update-faq card">
        <div className="update">
          <div className="update__title">
            <p>
              <i
                className="fad fa-bells"
                style={{ color: "var(--color-primary-light)" }}
              ></i>
              Updates
            </p>
          </div>
          <div className="update__box">
            <div className="update__content update__content--greetings">
              <p>
                <strong>
                  <i
                    className="fad fa-gifts"
                    style={{ color: "var(--color-danger-1)" }}
                  ></i>
                  Season Greetings 2019 Everyone!UPDATE (23 December 2019):
                </strong>
                We send you our warmest greetings of this festive season and
                best wishes for happiness this New Year. We fixed an issue with
                some URL types: mobile links (m.facebook.com) and the new
                fbwat.ch links are supported. The Downloader is now working
                fully working as usual. Thanks for submitting bugs and issues.
              </p>
            </div>
            <div className="update__content update__content--updates">
              <p>
                <strong>
                  <i
                    className="fad fa-cog"
                    style={{ color: "var(--color-dark)" }}
                  ></i>
                  UPDATE (15 November 2019):
                </strong>
                We improved the downloader to support the new URL architecture
                of Facebook. We also fixed the thumbnail, video duration as well
                as video titles and descriptions that weren&apos;t showing most
                of the time. Don&apos;t hesitate to leave your feedback!
              </p>
            </div>
            <div className="update__content update__content--news">
              <p>
                <strong>
                  <i
                    className="fad fa-star"
                    style={{ color: "var(--color-dark)" }}
                  ></i>
                  UPDATE (12 October 2018):
                </strong>
                We fixed some bugs and made improvements to the downloader.
                Video thumbnails work with almost all videos now thanks to a new
                algorithm. We are having some issues with the Chrome Extension
                and we are working on fixing them..
              </p>
            </div>
          </div>
        </div>

        <div className="faq">
          <div className="faq__title">
            <p>
              <i
                className="fad fa-question-circle"
                style={{ color: "var(--color-primary)" }}
              ></i>
              Frequently asked question
            </p>
          </div>
          <div className="faq__content">
            <Accordion
              title="What is your return policy?"
              content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            />
            <Accordion
              title="How do I track my order?"
              content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            />
            <Accordion
              title="Can I purchase items again?"
              content="
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </br>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </br>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              "
            />
            <Accordion
              title="How do I track my order?"
              content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            />
            <Accordion
              title="How do I track my order?"
              content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            />
            <Accordion
              title="What is your return policy?"
              content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            />
          </div>
        </div>
      </div>
    </div>
  );
};
const mapDispatchToProps = dispatch => ({
  fetchStoryPostsAdd: username => dispatch(fetchStoryPostsAdd(username)),
  checkUserSession: () => dispatch(checkUserSession()),
});
export default withRouter(connect(null, mapDispatchToProps)(Stories));
