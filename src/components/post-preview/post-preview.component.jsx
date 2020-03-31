import React, { useState, useEffect } from "react";
import LoadingBar from "react-top-loading-bar";
// import "../../pages/posts/posts.styles.scss";
// import "./post-collection-preview.styles.scss";
import Axios from "axios";
import { withRouter } from "react-router-dom";

const PostPreview = ({ __typename, owner, post, history, downloadName }) => {
  // const { url, setUrl } = useState();
  const [media, setMedia] = useState(__typename);
  const [download, setDownload] = useState();
  const [view, setView] = useState();
  const [loadBar, setLoadBar] = useState();
  useEffect(() => {
    console.log(history.location);
    setLoadBar(100);
    console.log(owner);
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

  async function downloadFile(url, e, mediatype) {
    e.preventDefault();
    // console.log(e.currentTarget.querySelector('div').className);
    const loaderbtn = e.currentTarget.querySelector("div");
    // const downloadbtn = e.target;
    const downloadbtn = e.target;
    loaderbtn.className = "loader show";
    downloadbtn.className = "hide";
    // console.log(downloadBtn);
    console.log(loaderbtn);
    // setDownloading('loader show');
    // setDownloadBtn('hide');
    const method = "GET";
    const min = 1;
    const max = 100;
    const rand = min + Math.random() * (max - min);
    console.log(rand);
    console.log(mediatype);
    await Axios.request({
      url,
      method,
      responseType: "blob" //important
    })
      .then(({ data }) => {
        const downloadUrl = window.URL.createObjectURL(new Blob([data]));

        const link = document.createElement("a");

        link.href = downloadUrl;

        link.setAttribute(
          "download",
          "wavedownloader-" + downloadName + mediatype
        ); //any other extension

        document.body.appendChild(link);

        link.click();

        link.remove();
        if (link.remove()) {
        }
      })
      .then(() => {
        console.log("downloaded");
        loaderbtn.className = "loader hide";
        downloadbtn.className = "show";
      });
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
            <img src={owner.profile_pic_url} alt="" />
            <div className="post-card__detail--image-name">
              <p>
                <strong>@{owner.full_name}</strong>
              </p>
              <p>
                <small>{owner.username}</small>
              </p>
              <p>
                <i
                  className="fad fa-calendar-alt"
                  style={{ color: "var(--color-grey-dark-1)" }}
                ></i>
                <small>{post.posted_on.date}</small>
              </p>
            </div>
          </div>
          <div className="post-card__detail--info">
            <i
              className="fad fa-pen-alt"
              style={{ color: "var(--color-primary-light)" }}
            ></i>
            <p>{post.text}</p>
          </div>
          <div className="post-card__detail--more">
            <div className="post-card__detail--more-like">
              <i
                className="fad fa-heart"
                style={{ color: "var(--color-danger-1)" }}
              ></i>
              <p>{post.like_count}</p>
            </div>
            <div className="post-card__detail--more-comment">
              <i
                className="fad fa-comment"
                style={{ color: "var(--color-secondary)" }}
              ></i>
              <p>{post.comment_count}</p>
            </div>
            <div className={view}>
              <i
                className="fad fa-eye"
                style={{ color: "var(--color-tertiary)" }}
              ></i>
              <p>{post.video_view_count}</p>
            </div>
          </div>
        </div>
        <div className="post-card__collections single">
          <div className="post-card__collections--card">
            <div className="post-card__collections--card-media">
              {post.is_video ? (
                <video
                  controls
                  controlsList="nodownload"
                  src={post.video_url}
                ></video>
              ) : (
                <div
                  style={{
                    backgroundImage: `url(${post.display_url})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat"
                  }}
                ></div>
              )}
              {post.is_video ? (
                <a
                  onClick={e => downloadFile(post.video_url, e, ".mp4")}
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
                  onClick={e => downloadFile(post.display_url, e, ".jpg")}
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
        </div>
      </div>
    </div>
  );
};

export default withRouter(PostPreview);
