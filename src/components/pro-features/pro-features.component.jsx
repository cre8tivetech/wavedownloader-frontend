import React from 'react';
import { Link } from 'react-router-dom';
import InstagramLogo from '../../assets/img/instagram.png';
import YoutubeLogo from '../../assets/img/youtube.png';

export const ProFeaturesInstagram = () => {
  return (
    <div className="card">
      <div className="feature-icon"><img src={InstagramLogo} alt='instagram logo' /></div>
      <div className="options">
        <Link to="/instagram/post-by-username" className="btn">
          <span>Pro</span>
          <p>Posts By Username</p>
        </Link>
        <Link to="/instagram/post-by-hashtag" className="btn">
          <span>Pro</span>
          <p>Posts By Hashtag</p>
        </Link>
        <Link to="/instagram/highlight" className="btn">
          <span>Pro</span>
          <p>Highlight</p>
        </Link>
        <Link to="/instagram/stories" className="btn">
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