import React from "react";
import { Link } from "react-router-dom";
import privateImage from "../../assets/private-account.svg"
import "./error404.styles.scss";
const PrivateUser = (credentials) => {
  const {userName} = credentials;
  return (
    <div className="error404-section card">
      <img src={privateImage} alt=""/>
      <h2>Private User</h2>
      <h3>
        Sorry <span>{userName}</span> is a private user 
      </h3>
      <h4>You send us a mail <span>wavedownloader@gmail.com</span> specifying the name of the private user e.g({userName}). We will send you a feedback message as soon as they accept our request</h4>
      <Link to="/">
        <div className="btn">
          <i className="fad fa-long-arrow-left"></i> Go back
        </div>
      </Link>
    </div>
  );
};
export default PrivateUser;
