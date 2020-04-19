import React from 'react';
import { Link } from 'react-router-dom';
import crying from '../../assets/crying1.svg';
import './no-story.styles.scss';
const NoStory = ({ userName }) => {
  console.log(userName);
  return (
    <div className="noStory-section card">
      <img src={crying} alt="" />
      <h1>SORRY!</h1>
      <h2>
        No Story for <span>@{userName}</span>
      </h2>
      <h2>
        Or <span>@{userName}</span> Might be a private user{' '}
      </h2>
      <h3>
        If Private User, You can send us a mail @{' '}
        <span>wavedownloader@gmail.com</span> specifying the name of the private
        user e.g({userName}). We will send you a feedback message as soon as
        they accept our request
      </h3>

      <Link to="/">
        <div className="btn">
          <i className="fad fa-long-arrow-left"> </i> Go back
        </div>
      </Link>
    </div>
  );
};
export default NoStory;
