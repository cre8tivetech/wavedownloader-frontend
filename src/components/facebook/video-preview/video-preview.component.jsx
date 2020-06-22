import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import LoadingBar from 'react-top-loading-bar';
import { withRouter } from 'react-router-dom';
import { saveDownload } from '../../../redux/instagram/instagram.actions';
import { selectCurrentUser } from '../../../redux/user/user.selector';
import { createStructuredSelector } from 'reselect';
import FacebookImage from '../../../assets/img/facebook.png';

const PostPreview = ({
  post_id,
  source_link,
  uploader,
  title,
  thumbnail,
  url,
  history,
  saveDownload,
  user,
}) => {
  const [loadBar, setLoadBar] = useState();
  // const [time, setTime] = useState();

  useEffect(() => {
    setLoadBar(100);

    if (!title) {
      title = 'No caption text for this post';
    }

  }, [setLoadBar, user]);

  const downloadData = {
    site: 'facebook',   
    post: {
      post_id: post_id,
      source_link: source_link,
      display_url: thumbnail,
      is_video: true
    } 
  };

  const download = (e, url) => {
    e.preventDefault();
    const loaderbtn = e.currentTarget.querySelector('div');
    const downloadbtn = e.target;
    loaderbtn.className = 'loader show';
    downloadbtn.className = 'hide';
    const downloadName = title + '.mp4';
    const apiUrl = process.env.REACT_APP_API + 'download?url=' + encodeURIComponent(url) + '&filename=' + encodeURIComponent(downloadName)
    console.log(apiUrl)
    setTimeout(() => {
      user && saveDownload(downloadData);
      window.location.href = apiUrl
      loaderbtn.className = 'loader hide';
      downloadbtn.className = 'show';
    }, 500)
  }

  return (
    <div className="post-section">
      <LoadingBar
        progress={loadBar}
        height={3}
        color="linear-gradient(92deg, #038125 0%, #fbff00 100%)"
        onLoaderFinished={() => setLoadBar(0)}
      />
      <div className="post-card">
        <div className="post-card__detail">
          <div className="post-card__detail--image">
            <img src={FacebookImage} alt="" />
            <div className="post-card__detail--image-name">
              <p>
                <strong>{uploader}</strong>
              </p>
            </div>
          </div>
          <div className="post-card__detail--info">
            <i
              className="fad fa-pen-alt"
              style={{ color: 'var(--color-primary-light)' }}
            ></i>
            <p>{title}</p>
          </div>
          <div className="post-card__detail--more">
          </div>
        </div>
        <div className="post-card__collections single">
          <div className="post-card__collections--card">
            <div className="post-card__collections--card-media">
              <div
                className="post-card__collections--card-media_box"
                style={{
                  backgroundImage: `url(${thumbnail})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                }}
              ></div>
              <a               
                onClick={(e) => download(e, url)}
                href={url}
                target="__blank"
                className="post-card__collections--card-media_download-btn"
                download={title + '.mp4'}
                data-type="mp4"
              >
                <div className="loader hide"></div>
                <p>
                  Download <i className="fad fa-download"></i>
                </p>
              </a>
            </div>
          </div>
        </div>
        <div className="post-card__search">
          <button onClick={() => history.push('/')} type="submit" className="btn btn--green">
          <i className="fad fa-search" style={{ color: 'var(--color-text)' }}></i> Search Again
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  saveDownload: (downloadData) => dispatch(saveDownload(downloadData)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PostPreview)
);
