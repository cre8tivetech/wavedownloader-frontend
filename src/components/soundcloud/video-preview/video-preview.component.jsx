import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import LoadingBar from 'react-top-loading-bar';
import { withRouter } from 'react-router-dom';
import { saveDownload } from '../../../redux/instagram/instagram.actions';
import { selectCurrentUser } from '../../../redux/user/user.selector';
import { createStructuredSelector } from 'reselect';
import SoundCloudImage from '../../../assets/img/soundcloud.png';

const PostPreview = ({
  post_id,
  source_link,
  uploader,
  duration,
  title,
  upload_date,
  thumbnail,
  view_count,
  like_count,
  url,
  history,
  saveDownload,
  user,
}) => {
  const [loadBar, setLoadBar] = useState();
  const [time, setTime] = useState();
  const [publishDate, setPublishDate] = useState();
  const [downloadExt, setDownloadExt] = useState('mp4');

  useEffect(() => {
    setLoadBar(100);

    if (!title) {
      title = 'No caption text for this post';
    }

    // Add - to date
    setPublishDate(
      `${upload_date.slice(0, 4)}-${upload_date.slice(4, 6)}-${upload_date.slice(6, 8)}`
    );

    // Convert seconds to HH-MM-SS format
    const measuredTime = new Date(null);
    measuredTime.setSeconds(parseInt(duration));
    const HMSTime = measuredTime.toISOString().substr(11, 8);
    const H = HMSTime.split(':')[0];
    const M = HMSTime.split(':')[1];
    const S = HMSTime.split(':')[2];
    if (H == '00') {
      setTime(M + ':' + S);
    } else {
      setTime(HMSTime);
    }
  }, [setLoadBar, user]);

  const downloadData = {
    site: 'soundcloud',   
    post: {
      post_id: post_id,
      source_link: source_link,
      display_url: thumbnail,
      is_audio: true
    } 
  };

  const download = (e, url, ext) => {
    e.preventDefault();
    const searchBtn = document.querySelector('.post-card__search');
    const loaderbtn = e.currentTarget.querySelector('div');
    const downloadbtn = e.target;
    loaderbtn.className = 'loader show';
    downloadbtn.className = 'hide';
    const downloadName = title + '.' + ext;
    const apiUrl = process.env.REACT_APP_API + 'download?url=' + encodeURIComponent(url) + '&filename=' + encodeURIComponent(downloadName)
    console.log(apiUrl)
    setTimeout(() => {
      user && saveDownload(downloadData);
      window.location.href = apiUrl
      loaderbtn.className = 'loader hide';
      downloadbtn.className = 'show';
      searchBtn.className = 'post-card__search show-search';
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
            <img src={SoundCloudImage} alt="" />
            <div className="post-card__detail--image-name">
              <p>
                <strong>{uploader}</strong>
              </p>
              <p>
                <i
                  className="fad fa-calendar-alt"
                  style={{ color: 'var(--color-grey-dark-1)' }}
                ></i>
                <small> {publishDate}</small>
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
            {/* <div className="post-card__detail--more-like">
              <i
                className="fad fa-heart"
                style={{ color: 'var(--color-danger-1)' }}
              ></i>
              <p>{like_count}</p>
            </div> */}
            <div className="post-card__detail--more-comment">
              <i
                className="fad fa-clock"
                style={{ color: 'var(--color-secondary)' }}
              ></i>
              <p>{time}</p>
            </div>
            <div className="post-card__detail--more-views show">
              <i
                className="fad fa-eye"
                style={{ color: 'var(--color-tertiary)' }}
              ></i>
              <p>{view_count}</p>
            </div>
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
                onClick={(e) => download(e, url, 'mp3')}
                href={url}
                target="__blank"
                className="post-card__collections--card-media_download-btn"
                download={title + '.' + 'mp3'}
                data-type={'mp3'}
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
