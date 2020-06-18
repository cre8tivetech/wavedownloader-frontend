import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import LoadingBar from 'react-top-loading-bar';
import { withRouter } from 'react-router-dom';
import { saveDownload } from '../../../redux/instagram/instagram.actions';
import { selectCurrentUser } from '../../../redux/user/user.selector';
import { createStructuredSelector } from 'reselect';
import TwitterImage from '../../../assets/img/twitter.png';

const PostPreview = ({
  uploader,
  duration,
  title,
  upload_date,
  thumbnail,
  repost_count,
  like_count,
  url,
  location,
  twitterUser,
  history,
  // saveDownload,
  user,
}) => {
  const [loadBar, setLoadBar] = useState();
  const [time, setTime] = useState();
  const [publishDate, setPublishDate] = useState();

  useEffect(() => {
    setLoadBar(100);

    if (!title) {
      title = 'No caption text for this post';
    }

    // Add - to date
    setPublishDate(
      `${upload_date.slice(0, 4)}-${upload_date.slice(4, 6)}-${upload_date.slice(6, 8)}`
    );

  }, [setLoadBar, user]);

  const download = (e, url) => {
    e.preventDefault();
    const loaderbtn = e.currentTarget.querySelector('div');
    const downloadbtn = e.target;
    loaderbtn.className = 'loader show';
    downloadbtn.className = 'hide';
    const downloadName = makeDownloadName(10) + '.mp4';
    const apiUrl = process.env.REACT_APP_API + 'download?url=' + encodeURIComponent(url) + '&filename=' + encodeURIComponent(downloadName)
    console.log(apiUrl)
    setTimeout(() => {
      window.location.href = apiUrl
      loaderbtn.className = 'loader hide';
      downloadbtn.className = 'show';
    }, 500)
  }

  function makeDownloadName(length) {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789wavedownloaderJOshmatJjenUche007AdaStepheNNwakwuoInstagram';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
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
            <img src={TwitterImage} alt="" />
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
            {location.pathname.match('getWdBot')? (<h3>{twitterUser}'s Download</h3>) 
            :
            <>
              <i
                className="fad fa-pen-alt"
                style={{ color: 'var(--color-primary-light)' }}
              ></i>
              <p>{title}</p>
            </>
            }          
          </div>
          <div className="post-card__detail--more">
            <div className="post-card__detail--more-like">
              <i
                className="fad fa-heart"
                style={{ color: 'var(--color-danger-1)' }}
              ></i>
              <p>{like_count}</p>
            </div>
            {/* <div className="post-card__detail--more-comment">
              <i
                className="fad fa-clock"
                style={{ color: 'var(--color-secondary)' }}
              ></i>
              <p>{time}</p>
            </div> */}
            <div className="post-card__detail--more-views show">
              <i
                className="fad fa-retweet"
                style={{ color: 'var(--color-tertiary)' }}
              ></i>
              <p>{repost_count}</p>
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
