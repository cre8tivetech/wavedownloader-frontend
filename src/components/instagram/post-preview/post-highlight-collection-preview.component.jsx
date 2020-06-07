import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import LoadingBar from 'react-top-loading-bar';
import '../../../pages/instagram/posts.styles.scss';
import './post-collection-preview.styles.scss';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import { saveDownload } from '../../../redux/instagram/instagram.actions';
import { setMessage } from '../../../redux/user/user.actions';
import { createStructuredSelector } from 'reselect';
import {
  selectCurrentUser,
  selectIsLoading,
} from '../../../redux/user/user.selector';

const PostHighlightCollectionPreview = ({
  owner,
  post,
  saveDownload,
  setMessage,
  user,
}) => {
  const {
    profile_pic_url,
    username,
    full_name,
    biography,
    followers,
    following,
    is_verified,
  } = owner;
  const [loadBar, setLoadBar] = useState();

  useEffect(() => {
    setLoadBar(100);
    // return () => {
    //   console.log('will unmount');
    // };
  }, [setLoadBar]);

  async function downloadFile(post, url, e, mediatype) {
    if (!post || !url || !e || !mediatype) {
      setMessage({ type: 'error', message: 'Post already deleted by owner' });
      return setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
    e.preventDefault();
    // console.log(e.currentTarget.querySelector('div').className);
    let __typename;
    if (post.is_video) __typename = 'GraphVideo';
    if (!post.is_video) __typename = 'GraphImage';
    const downloadData = { owner, post, __typename };
    const loaderbtn = e.currentTarget.querySelector('div');
    const downloadName = makeDownloadName(10);
    const downloadbtn = e.target;
    loaderbtn.className = 'loader show';
    downloadbtn.className = 'hide';
    const method = 'GET';
    const min = 1;
    const max = 100;
    const rand = min + Math.random() * (max - min);
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
        {
          user && user.is_subscribed && saveDownload(downloadData);
        }
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
            <img src={profile_pic_url} alt="" />
            <div className="post-card__detail--image-name">
              <p>
                <strong>
                  @{full_name}{' '}
                  {is_verified ? (
                    <i
                      className="fa fa-badge-check"
                      style={{ color: 'var(--color-verify)' }}
                    ></i>
                  ) : null}
                </strong>
              </p>
              <p>
                <small>{username}</small>
              </p>
              {/* <p>
                <i
                  className="fad fa-calendar-alt"
                  style={{ color: 'var(--color-grey-dark-1)' }}
                ></i>
                 <small>{posted_on.date}</small> 
              </p> */}
            </div>
          </div>
          <div className="post-card__detail--info">
            {/* <img src={} alt="" /> */}
            <i
              className="fad fa-book-user"
              style={{ color: 'var(--color-primary-light)' }}
            ></i>
            <p>{biography}</p>
          </div>
          <div className="post-card__detail--more">
            {/* <img src={} alt="" /> */}
            <div className="post-card__detail--more-like">
              <i
                className="fad fa-users"
                style={{ color: 'var(--color-tertiary)' }}
              ></i>
              <p>{followers}</p>
            </div>
            <div className="post-card__detail--more-comment">
              <i
                className="fad fa-user-friends"
                style={{ color: 'var(--color-secondary)' }}
              ></i>
              <p>{following}</p>
            </div>
          </div>
        </div>
        <div className="post-card__collections multiple">
          {post
            // .filter((item, idx) => idx < 10)
            .map((item, i) => (
              <div key={i} className="post-card__collections--card">
                <div className="post-card__collections--card-media ">
                  {item.is_video ? (
                    <div className="post-card__collections--card-media_box">
                      <video
                        controls
                        controlsList="nodownload"
                        src={item.video_url}
                      ></video>
                    </div>
                  ) : (
                    <div
                      className="post-card__collections--card-media_box"
                      style={{
                        backgroundImage: `url(${item.display_url})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                      }}
                    ></div>
                  )}
                  {item.is_video ? (
                    <a
                      onClick={(e) =>
                        downloadFile(item, item.video_url, e, '.mp4')
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
                        downloadFile(item, item.display_url, e, '.jpg')
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
              // <CollectionItem key={item.id} item={item} />
            ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
  isLoading: selectIsLoading,
});

const mapDispatchToProps = (dispatch) => ({
  setMessage: (message) => dispatch(setMessage(message)),
  saveDownload: (downloadData) => dispatch(saveDownload(downloadData)),
});

export default withRouter(
  connect(null, mapDispatchToProps)(PostHighlightCollectionPreview)
);