import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import SEO from '../../components/seo/seo.component';
import LoadingBar from 'react-top-loading-bar';
import { useHistory } from 'react-router-dom';
import Accordion from '../../components/accordion/accordion.component';
import {
  ProFeaturesInstagram,
  ProFeaturesYoutube,
  SupportedResources,
} from '../../components/pro-features/pro-features.component';
import { Link, withRouter } from 'react-router-dom';
import {
  fetchPostsAdd,
  clearInstagramData,
} from '../../redux/instagram/instagram.actions';
import {
  fetchVideoStart,
  clearYouTubeData,
} from '../../redux/youtube/youtube.actions';
import './home.styles.scss';
import Footer from '../../components/footer/footer.component';

const Home = ({
  fetchPostsAdd,
  fetchVideoStart,
  clearInstagramData,
  clearYouTubeData,
}) => {
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
  useMemo(() => {
    clearInstagramData();
    clearYouTubeData();
  }, []);
  useEffect(() => {
    startLoader();
  }, [startLoader]);
  useCallback(() => {
    startLoader();
  }, [startLoader]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(false);
    const checkUrl = url.split('/')[2];
    if (checkUrl.includes('instagram')) {
      fetchPostsAdd(url);
      history.push('/instagram/posts');
    } else if (checkUrl.includes('youtube') || checkUrl.includes('youtu')) {
      console.log('url: ', url);
      fetchVideoStart(url);
      history.push('/youtube/video');
    } else {
      setError(true);
    }
  };
  const handleChange = (event) => {
    setUrl(event.target.value);
  };
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
                {error && (
                  <span className="url-error">
                    wavedownloader does not support downloading from this
                    website
                  </span>
                )}
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
          <h3>Supported Sites</h3>
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
                    Live (8 June 2020):
                  </strong>
                  Finally!!, WaveDownloader is now live, you can download
                  Instagram videos and YouTube videos .
                </p>
              </div>
              <div className="update__content update__content--updates">
                <p>
                  <strong>
                    <i
                      className="fad fa-cog"
                      style={{ color: 'var(--color-dark)' }}
                    ></i>
                    UPDATE (7 June 2020):
                  </strong>
                  We fixed some bugs and made improvements to the downloader.
                  Video thumbnails work with almost all videos now thanks to a
                  new algorithm.
                </p>
              </div>
              <div className="update__content update__content--news">
                <p>
                  <strong>
                    <i
                      className="fad fa-star"
                      style={{ color: 'var(--color-dark)' }}
                    ></i>
                    UPDATE (1 June 2020):
                  </strong>
                  We improved the downloader to support the new URL architecture
                  of YouTube. We also fixed the thumbnail, video duration as
                  well as video titles and descriptions that weren&apos;t
                  showing most of the time. Don&apos;t hesitate to leave your
                  feedback!
                </p>
              </div>
              <div className="update__content update__content--updates">
                <p>
                  <strong>
                    <i
                      className="fad fa-cog"
                      style={{ color: 'var(--color-dark)' }}
                    ></i>
                    UPDATE (20 May 2020):
                  </strong>
                  We fixed some bugs and made app mobile responsive, support
                  99.9% of smartphones and tablet
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
      <Footer />
    </div>
  );
};
const mapDispatchToProps = (dispatch) => ({
  fetchPostsAdd: (url) => dispatch(fetchPostsAdd(url)),
  fetchVideoStart: (url) => dispatch(fetchVideoStart(url)),
  clearInstagramData: () => dispatch(clearInstagramData()),
  clearYouTubeData: () => dispatch(clearYouTubeData()),
});
export default withRouter(connect(null, mapDispatchToProps)(Home));
