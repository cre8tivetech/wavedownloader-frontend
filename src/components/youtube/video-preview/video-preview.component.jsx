import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import LoadingBar from 'react-top-loading-bar';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import { saveDownload } from '../../../redux/instagram/instagram.actions';
import { selectCurrentUser } from '../../../redux/user/user.selector';
import { createStructuredSelector } from 'reselect';
import YoutubeImage from '../../../assets/img/youtube.png'

const PostPreview = ({
  author,
  formats,
  lengthSeconds,
  title,
  shortDescription,
  thumbnail,
  videoId,
  viewCount,
  history,
  saveDownload,
  user,
}) => {
  // const { url, setUrl } = useState();
  const [loadBar, setLoadBar] = useState();
  const [time, setTime] = useState();
  const [videoItag, setVideoItag] = useState(formats.find(i => i.itag === 22) ? 22 : 18);
  const [format, setFormat] = useState('mp4');

  useEffect(() => {
    setLoadBar(100);

    if (!title) {
      title = 'No caption text for this post';
    }

    // Convert seconds to HH-MM-SS format
    const measuredTime = new Date(null);
    measuredTime.setSeconds(parseInt(lengthSeconds));
    const HMSTime = measuredTime.toISOString().substr(11, 8);
    const H = HMSTime.split(':')[0]
    const M = HMSTime.split(':')[1]
    const S = HMSTime.split(':')[2]
    if (H == '00') {
      setTime(M + ':' + S)
    }
    else {
      setTime(HMSTime)
    }
  }, [setLoadBar, user]);

  const changeOption = (e) => {
    // const format = document.getElementById("format").value;
    const { value } = e.currentTarget

    setVideoItag(value)
    if (value == 1) {
      setFormat('mp3')
    }
    else {
      setFormat('mp4')
    }
    console.log(videoItag)
    console.log(format)

  };

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
            <img src={YoutubeImage} alt="" />
            <div className="post-card__detail--image-name">
              <p>
                <strong>{author}</strong>
              </p>
              {/* <p>
                <small>{owner.username}</small>
              </p> */}
              <p>
                <i
                  className="fad fa-calendar-alt"
                  style={{ color: 'var(--color-grey-dark-1)' }}
                ></i>
                {/* <small>{post.posted_on.date}</small> */}
                <small>Today</small>
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
              <p>{viewCount}</p>
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
              <p>{viewCount}</p>
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
                // onClick={(e) => downloadFile(post.display_url, e, '.jpg')}
                href={`${process.env.REACT_APP_API}youtube/download/?videoId=${videoId}&title=${title}&itag=${videoItag}&format=${format}`}
                className="post-card__collections--card-media_download-btn"
                // data-method="get"
              >
                <div className="loader hide"></div>
                <p>
                  Download <i className="fad fa-download"></i>
                </p>
              </a>
            </div>
          </div>
        </div>
        <div className="post-card__select">
          <select onChange={(e) => changeOption(e)} id="format" defaultValue={22}>
            {formats.map(i => (<option value={i.itag} key={i.itag}>
              {i.container.split('/')[1].toUpperCase() + ' ' + i.qualityLabel.split('p')[0]}
              </option>)
            )}
            <option value={1}>MP3 Audio</option>
          </select>
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
