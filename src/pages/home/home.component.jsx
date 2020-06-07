import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import LoadingBar from 'react-top-loading-bar';
import { useHistory } from 'react-router-dom';
import Accordion from '../../components/accordion/accordion.component';
import { ProFeaturesInstagram, ProFeaturesYoutube, SupportedResources } from '../../components/pro-features/pro-features.component';
import { Link, withRouter } from 'react-router-dom';
import { fetchPostsAdd } from '../../redux/instagram/instagram.actions';
import { fetchVideoStart } from '../../redux/youtube/youtube.actions';
import './home.styles.scss';

const Home = ({ fetchPostsAdd, fetchVideoStart }) => {
  const [loadBar, setLoadBar] = useState(0);
  const [url, setUrl] = useState('');
  const [error, setError] = useState(false);
  const startLoader = useCallback(() => {
    setLoadBar(100);
  }, []);
  const onLoaderFinished = () => {
    setLoadBar(0);
  };
  const history = useHistory();
  useEffect(() => {
    startLoader();
  }, [startLoader]);
  useCallback(() => {
    startLoader();
  }, [startLoader]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(false)
    const checkUrl = url.split('/')[2]
    if (checkUrl.includes('instagram')) {
      fetchPostsAdd(url);
      history.push('/instagram/posts');
    }
    else if (checkUrl.includes('youtube') || checkUrl.includes('youtu')) {
      console.log('url: ', url)
      fetchVideoStart(url);
      history.push('/youtube/video');
    }
    else {
      setError(true)
    }
  };
  const handleChange = (event) => {
    setUrl(event.target.value);
  };
  return (
    <div className="home-section">
      <LoadingBar
        progress={loadBar}
        height={3}
        color="linear-gradient(92deg, #038125 0%, #fbff00 100%)"
        onLoaderFinished={() => onLoaderFinished}
      />
    
      <div className="download card">
        <p className="download__text download__text--1">
          Online Post & Video Downloader
        </p>
        {/* <div className="download__text download__text--2">
          <p>
            <span>NEW</span>Download Youtube Videos
          </p>
        </div> */}
        <div className="download__form">
          <form onSubmit={handleSubmit} className="form">
            <div className="form__group">
              <div className="form__input">
                <i
                  className="fad fa-link"
                  style={{ color: 'var(--color-primary)' }}
                ></i>
                <input
                  type="text"
                  className="form__input--box"
                  placeholder="Enter post or video URL here"
                  value={url}
                  onChange={handleChange}
                  id="url"
                  required
                />
                <label htmlFor="url" className="form__input--label">
                  URL
                </label>
              </div>
              {error && (<span className="url-error">wavedownloader does not support downloading from this website</span>)}
            </div>
            <div className="form__group">
              <button type="submit" className="btn btn--green">
                Download ➤
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="premium-features">
        <h3>Supported Resources</h3>
        <SupportedResources />
      </div>

      <div className="premium-features">
        <h3>Premium Features</h3>
        <ProFeaturesInstagram />
        <ProFeaturesYoutube />
      </div>

      <div className="update-faq card">
        <div className="update">
          <div className="update__title">
            <p>
              <i
                className="fad fa-bells"
                style={{ color: 'var(--color-primary-light)' }}
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
                    style={{ color: 'var(--color-danger-1)' }}
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
                    style={{ color: 'var(--color-dark)' }}
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
                    style={{ color: 'var(--color-dark)' }}
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
                style={{ color: 'var(--color-primary)' }}
              ></i>
              Frequently asked question
            </p>
          </div>
          <div className="faq__content">
            <Accordion
              title="How do I download instagram post?"
              content={`<div class="collapsible-body" style="display: block;"><span>Wavedownloader makes that <b>really easy</b>! 
        
              <p>
                <u>Desktop</u><br>
                1. Go to the Instagram post you'd like to download.<br>
                2. Copy the URL<br>
                3. Go <a href="/">HERE</a> and paste it into the top input box (the one that says "Enter URL")<br>
                4. Click "DOWNLOAD"<br>
                5. You will be directed to a page displaying the image with the ability to download the image there!<br>
              </p>
              <p>
                <u>Mobile</u><br>
                1. Go to the Instagram post you'd like to download.<br>
                2. Tap the three vertical dots at the right upper corner of the screen.<br>
                3. Click "Copy Link<br>
                3. Go <a href="/">HERE</a> and paste it into the top input box (the one that says "Enter URL")<br>
                4. Click "DOWNLOAD"<br>
                5. You will be directed to a page displaying the image with the ability to download the image there!<br>
              </p>
              </span></div>`}
            />
            <Accordion
              title="Can I download all posts from an instagram user?"
              content={`<div class="collapsible-body" style="display: block;"><span><b>Yes!</b>
                You can do this using one of our instagram premium features "POST BY USERNAME".
                You will need to signup for Wavedownloader PRO to have access to this feature.
              </span></div>`}
            />
            <Accordion
              title="Can I download posts by instagram hashtag?"
              content={`<div class="collapsible-body" style="display: block;"><span><b>Yes!</b>
                You can do this using one of our instagram premium features "POST BY HASHTAG".
                You will need to signup for Wavedownloader PRO to have access to this feature.
              </span></div>`}
            />
            <Accordion
              title="Can I download instagram user highlight?"
              content={`<div class="collapsible-body" style="display: block;"><span><b>Yes!</b>
                You can do this using one of our instagram premium features "HIGHLIGHT".
                You will need to signup for Wavedownloader PRO to have access to this feature.
              </span></div>`}
            />
            <Accordion
               title="Can I download instagram user stories?"
               content={`<div class="collapsible-body" style="display: block;"><span><b>Yes!</b>
                 You can do this using one of our instagram premium features "STORIES".
                 You will need to signup for Wavedownloader PRO to have access to this feature.
               </span></div>`}
            />
            <Accordion
              title="Is it safe to reupload?"
              content={`<div class="collapsible-body" style="display: block;"><span><b>Yes!</b>
              As you may not know, many people have been getting banned recently for using automated 
              tools. They are not safe! Wave downloader however is 100% safe.
            </span></div>`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => ({
  fetchPostsAdd: (url) => dispatch(fetchPostsAdd(url)),
  fetchVideoStart: (url) => dispatch(fetchVideoStart(url)),
});
export default withRouter(connect(null, mapDispatchToProps)(Home));
