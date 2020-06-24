import React from 'react';
import { Link } from 'react-router-dom';
import InstagramLogo from '../../assets/img/instagram.png';
import YoutubeLogo from '../../assets/img/youtube.png';

export const ProFeaturesInstagram = () => {
  return (
    <div className="card">
      <div className="feature-icon"><img src={InstagramLogo} alt='instagram logo' /></div>
      <div className="options">
        <Link to="/instagram/post-by-username" className="options--active">
          <span>Pro</span>
          <p>Posts By Username</p>
        </Link>
        <Link to="/instagram/post-by-hashtag" className="options--active">
          <span>Pro</span>
          <p>Posts By Hashtag</p>
        </Link>
        <Link to="/instagram/highlight" className="options--active">
          <span>Pro</span>
          <p>Highlight</p>
        </Link>
        <Link to="/instagram/stories" className="options--active">
          <span>Pro</span>
          <p>Stories</p>
        </Link>
      </div>
    </div>
  )
}

export const ProFeaturesYoutube = () => {
  return (
    <div className="card">
      <div className="feature-icon"><img src={YoutubeLogo} alt='instagram logo' /></div>
      <div className="options">
        <Link to="#" className="options--disabled">
          <span>Coming Soon</span>
          <p>Video Playlist</p>
        </Link>
      </div>
    </div>
  )
}

export const SupportedResources = () => {
  return (
    <div className="card">
      {/* <div className="feature-icon"><img src={YoutubeLogo} alt='instagram logo' /></div> */}
      <div className="options">
        <a target="__blank" href="https://instagram.com" className="options--active">
          <p>instagram.com</p>
        </a>
        <a target="__blank" href="https://youtube.com" className="options--active">
          <p>youtube.com</p>
        </a>
        <a target="__blank" href="https://twitter.com" className="options--active"> 
          <p>twitter.com</p>
        </a>
        <a target="__blank" href="https://facebook.com" className="options--active">
          <p>facebook.com</p>
        </a>
        <a target="__blank" href="https://soundcloud.com" className="options--active">
          <p>soundcloud.com</p>
        </a>
        <a target="__blank" href="https://vimeo.com" className="options--active">
          <span>Coming Soon</span>
          <p>vimeo.com</p>
        </a>
        <a target="__blank" href="https://dailymotion.com" className="options--active">
          <span>Coming Soon</span>
          <p>dailymotion.com</p>
        </a>
        <a target="__blank" href="https://reddit.com" className="options--active">
          <span>Coming Soon</span>
          <p>reddit.com</p>
        </a>
      </div>
    </div>
  )
}