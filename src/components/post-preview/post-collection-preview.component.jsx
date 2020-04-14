import React, { useState, useEffect } from "react";
import LoadingBar from "react-top-loading-bar";
import "../../pages/posts/posts.styles.scss";
import "./post-collection-preview.styles.scss";
import Axios from "axios";
import { withRouter } from "react-router-dom";

const PostCollectionPreview = ({ data, downloadName, history }) => {
  const [view, setView] = useState();
  const results = data.post.filter((datas, i) => {
    return datas;
  });
  const {
    like_count,
    comment_count,
    text,
    video_view_count,
    is_video,
    posted_on
  } = results[0];
  const { profile_pic_url, username, full_name } = data.owner;
  const [loadBar, setLoadBar] = useState();
  // const []
  useEffect(() => {
    setLoadBar(100);    
    if (is_video) {
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
    // return () => {
    //   console.log('will unmount');
    // };
  }, [setLoadBar]);

  async function downloadFile(url, e, mediatype) {
    e.preventDefault();
    // console.log(e.currentTarget.querySelector('div').className);
    const loaderbtn = e.currentTarget.querySelector("div");
    const downloadName = makeDownloadName(10);
    const downloadbtn = e.target;
    loaderbtn.className = "loader show";
    downloadbtn.className = "hide";
     
    const method = "GET";
    const min = 1;
    const max = 100;
    const rand = min + Math.random() * (max - min);
     
     
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
         
        loaderbtn.className = "loader hide";
        downloadbtn.className = "show";
      });
    // return await values.add('<div className="show"></div>');
    // await e.target.classList.add('show');
  }
  function makeDownloadName(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789wavedownloaderJOshmatJjenUche007AdaStepheNNwakwuoInstagram";
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
                <strong>@{full_name}</strong>
              </p>
              <p>
                <small>{username}</small>
              </p>
              <p>
                <i
                  className="fad fa-calendar-alt"
                  style={{ color: "var(--color-grey-dark-1)" }}
                ></i>
                <small>{posted_on.date}</small>
              </p>
            </div>
          </div>
          <div className="post-card__detail--info">
            {/* <img src={} alt="" /> */}
            <i
              className="fad fa-pen-alt"
              style={{ color: "var(--color-primary-light)" }}
            ></i>
            <p>{text}</p>
          </div>
          <div className="post-card__detail--more">
            {/* <img src={} alt="" /> */}
            <div className="post-card__detail--more-like">
              <i
                className="fad fa-heart"
                style={{ color: "var(--color-danger-1)" }}
              ></i>
              <p>{like_count}</p>
            </div>
            <div className="post-card__detail--more-comment">
              <i
                className="fad fa-comment"
                style={{ color: "var(--color-secondary)" }}
              ></i>
              <p>{comment_count}</p>
            </div>
            <div className={view}>
              <i
                className="fad fa-eye"
                style={{ color: "var(--color-tertiary)" }}
              ></i>
              <p>{video_view_count}</p>
            </div>
          </div>
        </div>
        <div className="post-card__collections multiple">
          {data.post
            // .filter((item, idx) => idx < 10)
            .map((item, i) => (
              <div key={i} className="post-card__collections--card">
                <div className="post-card__collections--card-media ">
                  {is_video ? (
                    <video
                      controls
                      controlsList="nodownload"
                      src={item.video_url}
                    ></video>
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
                  {is_video ? (
                    <a
                      onClick={e => downloadFile(item.video_url, e, ".mp4")}
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
                      onClick={e => downloadFile(item.display_url, e, ".jpg")}
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

export default withRouter(PostCollectionPreview);
