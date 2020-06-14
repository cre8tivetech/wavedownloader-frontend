import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import LoadingBar from 'react-top-loading-bar';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import { saveDownload } from '../../../redux/instagram/instagram.actions';
import { selectCurrentUser } from '../../../redux/user/user.selector';
import { createStructuredSelector } from 'reselect';
import YoutubeImage from '../../../assets/img/youtube.png';

const PostPreview = ({
  uploader,
  formats,
  duration,
  title,
  upload_date,
  thumbnail,
  videoId,
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
  const [downloadUrl, setDownloadUrl] = useState(url);
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

  const changeOption = (e) => {
    const { value } = e.currentTarget;
    console.log(value)
    console.log(formats.find((i) => i.itag === value).url)
    setDownloadUrl(
      formats.find((i) => i.itag === value).url
    )
    setDownloadExt(
      formats.find((i) => i.itag === value).ext === 'm4a'? 'mp3' : formats.find((i) => i.itag === value).ext
    )
  };

  async function downloadFile(url, e, mediatype) {
    e.preventDefault();
    console.log(url, mediatype);
    // const downloadData = { owner, post, __typename };
    // console.log(e.currentTarget.querySelector('div').className);
    const loaderbtn = e.currentTarget.querySelector('div');
    const downloadName = title;
    const downloadbtn = e.target;
    loaderbtn.className = 'loader show';
    downloadbtn.className = 'hide';

    const method = 'GET';
    const min = 1;
    const max = 100;

    await Axios.request({
      url,
      method,
      responseType: 'blob', //important
    })
      .then(({ data }) => {
        const downloadUrl = window.URL.createObjectURL(new Blob([data]));

        const link = document.createElement('a');

        link.href = downloadUrl;

        link.setAttribute(
          'download',
          downloadName +'.'+ mediatype
        ); //any other extension

        document.body.appendChild(link);

        link.click();

        link.remove();
        if (link.remove()) {
        }
      })
      .then(() => {
        loaderbtn.className = 'loader hide';
        downloadbtn.className = 'show';
        // {
        //   user && user.is_subscribed && saveDownload(downloadData);
        // }
      }).catch(e => {
        loaderbtn.className = 'loader hide';
        downloadbtn.className = 'show';
      })
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
            <img src={YoutubeImage} alt="" />
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
            <div className="post-card__detail--more-like">
              <i
                className="fad fa-heart"
                style={{ color: 'var(--color-danger-1)' }}
              ></i>
              <p>{like_count}</p>
            </div>
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
                onClick={(e) => downloadFile(downloadUrl, e, downloadExt)}
                href={downloadUrl}
                target="__blank"
                className="post-card__collections--card-media_download-btn"
                download={title + '.' + downloadExt}
                data-type={downloadExt}
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
          <select
            onChange={(e) => changeOption(e)}
            id="format"
            defaultValue={22}
          >
            {formats.map((i) => (
              <option data-url={i.url} value={i.itag} key={i.itag}>
                {i.ext.toUpperCase() + ' ' + i.format_note}
              </option>
            ))}
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
