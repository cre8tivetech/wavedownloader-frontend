import React, { useState, useEffect } from "react";
import LoadingBar from "react-top-loading-bar";
// import "../../pages/posts/posts.styles.scss";
// import "./post-collection-preview.styles.scss";
import Axios from "axios";
import { withRouter } from "react-router-dom";
import { fetchHighlightPostsDownload } from "../../redux/posts/posts.actions";
import { connect } from "react-redux";

const HighlightCollectionPreview = ({
  owner,
  post,
  length,
  history,
  fetchHighlightPostsDownload
}) => {
  // const { url, setUrl } = useState();
  const {
    profile_pic_url,
    username,
    full_name,
    followers,
    following,
    biography,
    is_verified
  } = owner;
  const [downloading, setDownloading] = useState("loader hide");
  const [downloadBtn, setDownloadBtn] = useState("show");
  const [view, setView] = useState();
  const [loadBar, setLoadBar] = useState();
  useEffect(() => {
    // console.log(history.location);
    setLoadBar(100);
     
    // setUrl(history.location.data.url);
    if (post.is_video) {
      setView("post-card__detail--more-views show");
      // setCollectionType(
      //   <i
      //     className="fad fa-play play"
      //     style={{ color: 'var(--color-light)' }}
      //   ></i>
      // );
    } else {
      setView("post-card__detail--more-views hide");
      // setCollectionType('');
    }
    if (!post.text) {
      post.text = "No caption text for this post";
    }
    // return () => {
    //   console.log("will unmount");
    // };
  }, [setLoadBar]);

  function downloadFile(idcode, e) {
    e.preventDefault();
    // console.log(e.currentTarget.querySelector('div').className);
    const loaderbtn = e.currentTarget.querySelector("div");
    // const downloadbtn = e.target;
    const downloadbtn = e.target;
    loaderbtn.className = "loader show";
    downloadbtn.className = "hide";
     
    setTimeout(() => {
      fetchHighlightPostsDownload(idcode);
    }, 2000);
     
    setDownloading("loader show");
    setDownloadBtn("hide");
     
    setTimeout(() => {
      loaderbtn.className = "loader hide";
      downloadbtn.className = "show";
      history.push("/posts");
    }, 3000);
    // return await values.add('<div className="show"></div>');
    // await e.target.classList.add('show');
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
                  @{full_name}
                  {is_verified ? (
                    <i
                      className="fa fa-badge-check"
                      style={{ color: "var(--color-verify)" }}
                    ></i>
                  ) : null}
                </strong>
              </p>
              <p>
                <small>{username}</small>
              </p>
            </div>
          </div>
          <div className="post-card__detail--info">
            {/* <img src={} alt="" /> */}
            <i
              className="fad fa-book-user"
              style={{ color: "var(--color-primary-light)" }}
            ></i>
            <p>{biography}</p>
          </div>
          <div className="post-card__detail--more">
            {/* <img src={} alt="" /> */}
            <div className="post-card__detail--more-like">
              <i
                className="fad fa-users"
                style={{ color: "var(--color-tertiary)" }}
              ></i>
              <p>{followers}</p>
            </div>
            <div className="post-card__detail--more-comment">
              <i
                className="fad fa-user-friends"
                style={{ color: "var(--color-secondary)" }}
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
                <div className="post-card__collections--card-media">
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
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat"
                      }}
                    ></div>
                  )}
                  {item.is_video ? (
                    <a
                      onClick={e => downloadFile(item.video_url, e, ".mp4")}
                      target="__blank"
                      className="post-card__collections--card-media_download-btn"
                      data-method="get"
                    >
                      <div className="loader hide"></div>
                      <p className="show">
                        Save <i className="fad fa-save"></i>
                      </p>
                    </a>
                  ) : (
                    <a
                      onClick={e => downloadFile(item.id, e)}
                      target="__blank"
                      className="post-card__collections--card-media_download-btn"
                      data-method="get"
                    >
                      <div className="loader hide"></div>
                      <p>
                        Save <i className="fad fa-save"></i>
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
const mapDispatchToProps = dispatch => ({
  fetchHighlightPostsDownload: shortcode =>
    dispatch(fetchHighlightPostsDownload(shortcode))
});

export default withRouter(
  connect(null, mapDispatchToProps)(HighlightCollectionPreview)
);
