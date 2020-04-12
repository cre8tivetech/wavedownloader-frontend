import React, { useState, useEffect } from "react";
import LoadingBar from "react-top-loading-bar";
import { useHistory } from "react-router-dom";
import "../../pages/posts/posts.styles.scss";
import slideLayer from "../../assets/slide.svg";
import videoLayer from "../../assets/video.svg";
import photoLayer from "../../assets/photo.svg";
import "./post-collection-preview.styles.scss";
import { withRouter } from "react-router-dom";
import { fetchUserNamePostsDownload } from "../../redux/posts/posts.actions";
import { connect } from "react-redux";

const UserNameCollectionPreview = ({
  data,
  downloadName,
  fetchUserNamePostsDownload
}) => {
  // const { url, setUrl } = useState();
  // const [media, setMedia] = useState(__typename);
  const [mediaUrl, setMediaUrl] = useState();
  const [view, setView] = useState();
  const [event, setEvent] = useState();
  const [collectionType, setCollectionType] = useState();
  const history = useHistory();
  const {
    profile_pic_url,
    username,
    full_name,
    followers,
    following,
    biography,
    is_verified
  } = data.owner;
  const [downloading, setDownloading] = useState("loader hide");
  const [downloadBtn, setDownloadBtn] = useState("show");
  const [loadBar, setLoadBar] = useState();
  // const []
  useEffect(() => {
    console.log(history);
    console.log(data);
    setLoadBar(100);
  }, [setLoadBar]);

  function downloadFile(shortcode, e) {
    e.preventDefault();
    // console.log(e.currentTarget.querySelector('div').className);
    const loaderbtn = e.currentTarget.querySelector("div");
    // const downloadbtn = e.target;
    const downloadbtn = e.target;
    loaderbtn.className = "loader show";
    downloadbtn.className = "hide";
    console.log(downloadBtn);
    setTimeout(() => {
      console.log("Downloading post");
      fetchUserNamePostsDownload(shortcode);
    }, 2000);
    console.log(loaderbtn);
    // setDownloading("loader show");
    setDownloadBtn("hide");
    console.log("downloaded");
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
          {data.post
            // .filter((item, idx) => idx < 10)
            .map((item, i) => (
              <div key={i} className="post-card__collections--card">
                <div className="post-card__collections--card-media">
                  <div
                    className="post-card__collections--card-media_box"
                    style={{
                      backgroundImage: `url(${item.display_url})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat"
                    }}
                  >
                    {item.__typename === "GraphSidecar" ? (
                      <img className="layer-icon" src={slideLayer} alt="" />
                    ) : item.__typename === "GraphVideo" ? (
                      <img className="layer-icon" src={videoLayer} alt="" />
                    ) : item.__typename === "GraphImage" ? (
                      <img className="layer-icon" src={photoLayer} alt="" />
                    ) : null}
                  </div>
                  <a
                    onClick={e => downloadFile(item.shortcode, e)}
                    target="__blank"
                    className="post-card__collections--card-media_download-btn"
                    data-method="get"
                  >
                    <div className="loader hide"></div>
                    <p>
                      Save <i className="fad fa-save"></i>
                    </p>
                  </a>
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
  fetchUserNamePostsDownload: shortcode =>
    dispatch(fetchUserNamePostsDownload(shortcode))
});

export default withRouter(
  connect(null, mapDispatchToProps)(UserNameCollectionPreview)
);
