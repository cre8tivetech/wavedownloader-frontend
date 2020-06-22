import React, { useState, useEffect } from "react";
import LoadingBar from "react-top-loading-bar";
import Axios from "axios";
import { withRouter } from "react-router-dom";

const StoryCollectionPreview = ({ owner, post, history }) => {
  const {
    profile_pic_url,
    username,
    full_name,
    followers,
    following,
    biography,
    is_verified
  } = owner;
  const [loadBar, setLoadBar] = useState();
  useEffect(() => {
    setLoadBar(100);
    if (!post.text) {
      post.text = "No caption text for this post";
    }
  }, [setLoadBar, post.text]);

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

  async function downloadFile(url, e, mediatype) {
    e.preventDefault();
    const loaderbtn = e.currentTarget.querySelector("div");
    const downloadName = makeDownloadName(10);
    const downloadbtn = e.target;
    loaderbtn.className = "loader show";
    downloadbtn.className = "hide";
     
    const method = "GET";
     
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
          downloadName + mediatype
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
                <strong>
                  @{full_name}{" "}
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
                      onClick={(e) =>
                        download(e, item.video_url)
                      }
                      href={item.video_url}
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
                      onClick={e => downloadFile(item.image_url, e, ".jpg")}
                      href={item.image_url}
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
        <div className="post-card__search">
          <button onClick={() => history.push('/')} type="submit" className="btn btn--green">
          <i className="fad fa-search" style={{ color: 'var(--color-text)' }}></i> Search Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(StoryCollectionPreview);
