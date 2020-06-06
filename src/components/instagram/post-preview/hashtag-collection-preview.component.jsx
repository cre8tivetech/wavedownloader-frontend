import React, { useState, useEffect } from 'react';
import LoadingBar from 'react-top-loading-bar';
import { useHistory } from 'react-router-dom';
import '../../../pages/instagram/posts.styles.scss';
import slideLayer from '../../../assets/slide.svg';
import videoLayer from '../../../assets/video.svg';
import photoLayer from '../../../assets/photo.svg';
import './post-collection-preview.styles.scss';
import { withRouter } from 'react-router-dom';
import { fetchHashTagPostsDownload } from '../../../redux/instagram/instagram.actions';
import { connect } from 'react-redux';

const HashTagCollectionPreview = ({
  data,
  postType,
  downloadName,
  fetchHashTagPostsDownload,
}) => {
  const history = useHistory();
  const { top_post, most_recent_post } = data;
  const {
    name,
    profile_pic_url,
    hashtag_count,
    related_hashtags,
  } = data.hashtag;

  const [downloading, setDownloading] = useState('loader hide');
  const [downloadBtn, setDownloadBtn] = useState('show');
  const [loadBar, setLoadBar] = useState();
  // const []
  useEffect(() => {
    // console.log(history);
    setLoadBar(100);
  }, [setLoadBar]);

  function downloadFile(shortcode, e) {
    e.preventDefault();
    const loaderbtn = e.currentTarget.querySelector('div');
    const downloadbtn = e.target;
    loaderbtn.className = 'loader show';
    downloadbtn.className = 'hide';
    fetchHashTagPostsDownload(shortcode);
    loaderbtn.className = 'loader hide';
    downloadbtn.className = 'show';
    history.push('/posts');
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
              <p className="hashtag_name">
                <strong>#{name}</strong>
              </p>
              <p>
                <i
                  className="fad fa-clipboard-list hashtag_post-icon"
                  style={{ color: 'var(--color-grey-dark-1)' }}
                ></i>
                <small>
                  <strong>{hashtag_count}</strong> posts
                </small>
              </p>
            </div>
          </div>
          <div className="post-card__detail--info">
            <i
              className="fad fa-hashtag hashtag-icon"
              style={{ color: 'var(--color-primary-light)' }}
            ></i>
            <div className="related_hashtags">
              {related_hashtags.map((tag, i) => (
                <p key={i}>#{tag},</p>
              ))}
            </div>
          </div>
        </div>
        <div className="post-card__collections">
          {postType === 'all' || postType === 'top' ? (
            <div className="post-card__collections--box">
              <div className="topORmost-title">
                <p>Top Posts</p>
              </div>
              <div className="topORmost-collections">
                {top_post
                  //.filter((item, idx) => item.__typename === 'GraphImage')
                  .map((item, i) => (
                    <div key={i} className="post-card__collections--card">
                      <div className="post-card__collections--card-media">
                        <div
                          className="post-card__collections--card-media_box"
                          style={{
                            backgroundImage: `url(${item.display_url})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                          }}
                        >
                          {item.__typename === 'GraphSidecar' ? (
                            <img
                              className="layer-icon"
                              src={slideLayer}
                              alt=""
                            />
                          ) : item.__typename === 'GraphVideo' ? (
                            <img
                              className="layer-icon"
                              src={videoLayer}
                              alt=""
                            />
                          ) : item.__typename === 'GraphImage' ? (
                            <img
                              className="layer-icon"
                              src={photoLayer}
                              alt=""
                            />
                          ) : null}
                        </div>
                        <a
                          onClick={(e) => downloadFile(item.shortcode, e)}
                          target="__blank"
                          className="post-card__collections--card-media_download-btn"
                          data-method="get"
                        >
                          <div className="loader hide"></div>
                          <p>
                            Save <i className="fad fa-download"></i>
                          </p>
                        </a>
                      </div>
                    </div>
                    // <CollectionItem key={item.id} item={item} />
                  ))}
              </div>
            </div>
          ) : null}
          {postType === 'all' || postType === 'most' ? (
            <div className="post-card__collections--box">
              <div className="topORmost-title">
                <p>Most Recent</p>
              </div>
              <div className="topORmost-collections">
                {most_recent_post
                  //.filter((item, idx) => item.__typename === 'GraphImage')
                  .map((item, i) => (
                    <div key={i} className="post-card__collections--card">
                      <div className="post-card__collections--card-media">
                        <div
                          className="post-card__collections--card-media_box"
                          style={{
                            backgroundImage: `url(${item.display_url})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                          }}
                        >
                          {item.__typename === 'GraphSidecar' ? (
                            <img
                              className="layer-icon"
                              src={slideLayer}
                              alt=""
                            />
                          ) : item.__typename === 'GraphVideo' ? (
                            <img
                              className="layer-icon"
                              src={videoLayer}
                              alt=""
                            />
                          ) : item.__typename === 'GraphImage' ? (
                            <img
                              className="layer-icon"
                              src={photoLayer}
                              alt=""
                            />
                          ) : null}
                        </div>
                        <a
                          onClick={(e) => downloadFile(item.shortcode, e)}
                          target="__blank"
                          className="post-card__collections--card-media_download-btn"
                          data-method="get"
                        >
                          <div className="loader hide"></div>
                          <p>
                            Save <i className="fad fa-download"></i>
                          </p>
                        </a>
                      </div>
                    </div>
                    // <CollectionItem key={item.id} item={item} />
                  ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchHashTagPostsDownload: (shortcode) =>
    dispatch(fetchHashTagPostsDownload(shortcode)),
});

export default withRouter(
  connect(null, mapDispatchToProps)(HashTagCollectionPreview)
);
