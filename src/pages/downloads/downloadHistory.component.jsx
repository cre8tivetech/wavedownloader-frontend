import React, { useState, useEffect, useCallback } from 'react';
import LoadingBar from 'react-top-loading-bar';
import Axios from 'axios';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import slideLayer from '../../assets/slide.svg';
import videoLayer from '../../assets/video.svg';
import photoLayer from '../../assets/photo.svg';
import './downloads.styles.scss';
import { Link, withRouter } from 'react-router-dom';
import {
  selectCurrentUser,
  selectSubscription,
  selectMessage,
  selectDownload,
} from '../../redux/user/user.selector';
import {
  signOutStart,
  checkUserSession,
  resendConfirmEmailStart,
} from '../../redux/user/user.actions';
import { getDownload } from '../../redux/instagram/instagram.actions';
import { setMessage } from '../../redux/user/user.actions';

const DownloadHistory = ({
  user,
  download,
  signOutStart,
  checkUserSession,
  resendConfirmEmailStart,
  message,
  getDownload,
  setMessage,
}) => {
  const [loadBar, setLoadBar] = useState(0);
  const [logout, setLogout] = useState('Logout');
  const [allDownloads, setAllDownloads] = useState(download);
  const [confirmText, setConfirmText] = useState('Resend Confirmation Email');
  const [select1, setSelect1] = useState('download-selection__btn btn');
  const [select2, setSelect2] = useState('download-selection__btn btn active');
  const [select3, setSelect3] = useState('download-selection__btn btn');
  const startLoader = useCallback(() => {
    setLoadBar(100);
  }, []);
  const onLoaderFinished = () => {
    setLoadBar(0);
  };
  useEffect(() => {
    checkUserSession();
    getDownload();
    startLoader();
    if (message) {
      setConfirmText('Resend Confirmation Email');
    }
  }, [checkUserSession, getDownload]);

  const signOut = () => {
    setLogout('Logging out...');
    signOutStart();
    setTimeout(() => {
      setLogout('Logout');
    }, 3000);
  };

  const resendEmailConfirm = () => {
    setConfirmText('Sending Email...');
    resendConfirmEmailStart();
  };

  const mySelection = (type, e) => {
    e.preventDefault();

    if (type === 'image') {
      setAllDownloads(
        download.filter((item, idx) => item.__typename === 'GraphImage')
      );
      setSelect1('download-selection__btn btn active');
      setSelect2('download-selection__btn btn');
      setSelect3('download-selection__btn btn');
    }

    if (type === 'all') {
      setAllDownloads(download.filter((item, idx) => idx > 0));
      setSelect1('download-selection__btn btn');
      setSelect2('download-selection__btn btn active');
      setSelect3('download-selection__btn btn');
    }

    if (type === 'video') {
      setAllDownloads(
        download.filter((item, idx) => item.__typename === 'GraphVideo')
      );
      setSelect1('download-selection__btn btn');
      setSelect2('download-selection__btn btn');
      setSelect3('download-selection__btn btn active');
    }
  };

  async function downloadFile(url, e, mediatype) {
    if (!url || !e || !mediatype) {
      setMessage({ type: 'error', message: 'Post already deleted by owner' });
      return setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
    e.preventDefault();
    // console.log(e.currentTarget.querySelector('div').className);
    const loaderbtn = e.currentTarget.querySelector('div');
    const downloadName = makeDownloadName(10);
    const downloadbtn = e.target;
    loaderbtn.className = 'loader show';
    downloadbtn.className = 'hide';

    const method = 'GET';

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
          'wavedownloader-' + downloadName + mediatype
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
      })
      .catch((error) => {
        console.log(error.message);
      });
    // return await values.add('<div className="show"></div>');
    // await e.target.classList.add('show');
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
    <div className="profile-section">
      <LoadingBar
        progress={loadBar}
        height={3}
        color="linear-gradient(92deg, #038125 0%, #fbff00 100%)"
        onLoaderFinished={() => onLoaderFinished}
      />
      <div className="profile-section__box card">
        <div className="profile-section__box--details">
          <div className="profile-section__box--details--left">
            <Link className="home" to="/">
              <i
                className="fad fa-home"
                style={{ color: 'var(--color-primary)' }}
              ></i>
              <p>Home</p>
            </Link>
            <div className="profile-section__box--details--left-box">
              <div className="profile-section__box--details--left-box-image">
                {user.full_name.charAt(0).toUpperCase()}
              </div>
              <Link to="/profile">
                <div className="profile-section__box--details--left-box-user">
                  <p className="profile-section__box--details--left-box-user_name">
                    {user.full_name}{' '}
                    {user.is_subscribed ? (
                      <i
                        className="fad fa-badge-check"
                        style={{ color: 'var(--color-primary)' }}
                      ></i>
                    ) : null}
                  </p>
                  <p className="profile-section__box--details--left-box-user_email">
                    <small> {user.email} </small>
                  </p>
                </div>
              </Link>
            </div>
          </div>
          <div className="profile-section__box--details--right">
            <p onClick={() => signOut()}>
              <strong>{logout}</strong>
            </p>
            <div>
              <Link to="/pricing">
                <i
                  className="fad fa-badge-dollar"
                  style={{ color: 'var(--color-primary)' }}
                ></i>
                Pricing
              </Link>
            </div>
            {user && user.is_email_confirm ? (
              <div>
                <Link to="/change-password">
                  <i
                    className="fad fa-user-lock"
                    style={{ color: 'var(--color-primary)' }}
                  ></i>
                  Change Password
                </Link>
              </div>
            ) : null}
          </div>
        </div>
        <div className="profile-section__box--myDownloads">
          <p>
            <strong>My Downloads</strong>
          </p>
          {!user.is_email_confirm ? (
            <p className="resendBtn btn" onClick={() => resendEmailConfirm()}>
              &#128233; {confirmText}
            </p>
          ) : null}

          <div className="post-card">
            <div className="download-selection">
              <div className={select1} onClick={(e) => mySelection('image', e)}>
                <p>Image</p>
              </div>
              <div className={select2} onClick={(e) => mySelection('all', e)}>
                <p>All</p>
              </div>
              <div className={select3} onClick={(e) => mySelection('video', e)}>
                <p>Video</p>
              </div>
            </div>
            <div className="post-card__collections multiple">
              {allDownloads.map((item, i) => (
                <div key={i} className="post-card__collections--card">
                  <div className="post-card__collections--card-media">
                    <div
                      className="post-card__collections--card-media_box"
                      style={{
                        backgroundImage: `url(${item.post.display_url})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                      }}
                    >
                      <div className="viewer">
                        <div className="viewer__profile">
                          <div>{/* <p>Brodashaggi</p> */}</div>
                        </div>
                      </div>
                      <div className="user-icon">
                        <img src={item.owner.profile_pic_url} alt="" />
                        {/* <p>{item.owner.username}</p> */}
                      </div>

                      {item.__typename === 'GraphSidecar' ? (
                        <img className="layer-icon" src={slideLayer} alt="" />
                      ) : item.__typename === 'GraphVideo' ? (
                        <img className="layer-icon" src={videoLayer} alt="" />
                      ) : item.__typename === 'GraphImage' ? (
                        <img className="layer-icon" src={photoLayer} alt="" />
                      ) : null}
                    </div>
                    {item.post.is_video ? (
                      <a
                        onClick={(e) =>
                          downloadFile(item.post.video_url, e, '.mp4')
                        }
                        target="__blank"
                        className="post-card__collections--card-media_download-btn"
                        data-method="get"
                      >
                        <div className="loader hide"></div>
                        <p className="show">
                          Download <i className="fad fa-download"></i>
                        </p>
                      </a>
                    ) : (
                      <a
                        onClick={(e) =>
                          downloadFile(item.post.display_url, e, '.jpg')
                        }
                        target="__blank"
                        className="post-card__collections--card-media_download-btn"
                        data-method="get"
                      >
                        <div className="loader hide"></div>
                        <p>
                          Download <i className="fad fa-download"></i>
                        </p>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
  subscription: selectSubscription,
  message: selectMessage,
  download: selectDownload,
});
const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
  resendConfirmEmailStart: () => dispatch(resendConfirmEmailStart()),
  checkUserSession: () => dispatch(checkUserSession()),
  getDownload: () => dispatch(getDownload()),
  setMessage: (message) => dispatch(setMessage(message)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DownloadHistory)
);
