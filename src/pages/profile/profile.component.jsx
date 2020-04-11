import React, { useState, useEffect } from "react";
import LoadingBar from "react-top-loading-bar";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import "./profile.styles.scss";
import { Link, withRouter } from "react-router-dom";
import {
  selectCurrentUser,
  selectSubscription
} from "../../redux/user/user.selector";
import { signOutStart } from "../../redux/user/user.actions";
import downloads from "../../assets/download(1).svg";
import confirmation from "../../assets/mail(1).svg";
import sub_time from "../../assets/sale(1).svg";
import plan from "../../assets/subscription(1).svg";

const Profile = ({ user, subscription, signOutStart }) => {
  const [loadBar, setLoadBar] = useState(0);
  const [subDays, setSubDays] = useState();
  const startLoader = () => {
    setLoadBar(100);
  };
  const onLoaderFinished = () => {
    setLoadBar(0);
  };
  useEffect(() => {
    startLoader();
    console.log(subscription);
    console.log(new Date(subscription.expired_at));
    console.log(subDaysRemaining());
    console.log(example());
    console.log(user);
  });
  const subDaysRemaining = () => {
    if (user.is_subscribed) {
      const date1 = subscription.subscribed_at.split("-");
      const date2 = subscription.expired_at.split("-");
      const firstDate = new Date(date1[0], date1[1], date1[2].split("T")[0]);
      const secondDate = new Date(date2[0], date2[1], date2[2].split("T")[0]);
      const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

      const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
      console.log(diffDays);
      setSubDays(diffDays);
    } else {
      setSubDays(0);
    }
  };
  const example = () => {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = new Date(2008, 1, 12);
    const secondDate = new Date(2008, 1, 22);
    console.log(firstDate.getTime());

    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
    console.log(diffDays);
  };
  return (
    <div className="profile-section">
      <LoadingBar
        progress={loadBar}
        height={3}
        color="linear-gradient(92deg, #038125 0%, #fbff00 100%)"
        onLoaderFinished={() => onLoaderFinished}
      />
      <div className="profile-section__box card">
        <div className="profile-section__box--details">
          <div className="profile-section__box--details--left">
            <div className="profile-section__box--details--left-image">
              {user.full_name.charAt(0).toUpperCase()}
            </div>
            <p>
              {user.full_name} <small>{user.email}</small>
            </p>
          </div>
          <div className="profile-section__box--details--right">
            <p onClick={signOutStart}>
              <strong>Logout</strong>
            </p>
            <div>
              <i
                className="fad fa-history"
                style={{ color: "var(--color-primary)" }}
              ></i>
              Download History
            </div>
            <div>
              <Link to="/pricing">
                <i
                  className="fa fa-badge-dollar"
                  style={{ color: "var(--color-primary)" }}
                ></i>
                Pricing
              </Link>
            </div>
          </div>
        </div>
        <div className="profile-section__box--overview">
          <p>
            <strong>My Overview</strong>
          </p>
          <div className="profile-section__box--overview_container">
            <div className="profile-section__box--overview_container_box">
              <img
                className="profile-section__box--overview_container_box-img"
                src={plan}
                alt=""
              />
              <p>Subscription Plan</p>
              {user.is_subscribed ? (
                <strong style={{ color: "var(--color-danger-1)" }}>
                  {subscription.subscribed_type}
                </strong>
              ) : (
                <strong style={{ color: "var(--color-danger-1)" }}>NO</strong>
              )}
            </div>
            <div className="profile-section__box--overview_container_box">
              <img
                className="profile-section__box--overview_container_box-img"
                src={confirmation}
                alt=""
              />
              <p>Email Confirmation</p>
              {user.is_email_confirm ? (
                <strong style={{ color: "var(--color-danger-1)" }}>YES</strong>
              ) : (
                <strong style={{ color: "var(--color-danger-1)" }}>NO</strong>
              )}
            </div>
            <div className="profile-section__box--overview_container_box">
              <img
                className="profile-section__box--overview_container_box-img"
                src={sub_time}
                alt=""
              />
              <p>Subscription Time</p>
              <strong style={{ color: "var(--color-danger-1)" }}>
                {subDays} Days
              </strong>
            </div>
            <div className="profile-section__box--overview_container_box">
              <img
                className="profile-section__box--overview_container_box-img"
                src={downloads}
                alt=""
              />
              <p>Total Downloads</p>
              <strong style={{ color: "var(--color-danger-1)" }}>0</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
  subscription: selectSubscription
});
const mapDispatchToProps = dispatch => ({
  signOutStart: () => dispatch(signOutStart())
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Profile)
);