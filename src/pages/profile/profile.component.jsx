import React, { useState, useEffect, useCallback } from 'react';
import LoadingBar from 'react-top-loading-bar';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import './profile.styles.scss';
import { Link, withRouter } from 'react-router-dom';
import {
  selectCurrentUser,
  selectSubscription,
  selectMessage,
} from '../../redux/user/user.selector';
import {
  signOutStart,
  checkUserSession,
  resendConfirmEmail,
} from '../../redux/user/user.actions';
import downloads from '../../assets/download(1).svg';
import confirmation from '../../assets/mail(1).svg';
import sub_time from '../../assets/sale(1).svg';
import plan from '../../assets/subscription(1).svg';

const Profile = ({
  user,
  subscription,
  signOutStart,
  checkUserSession,
  resendConfirmEmail,
  message,
}) => {
  const [loadBar, setLoadBar] = useState(0);
  const [logout, setLogout] = useState('Logout');
  const [subDays, setSubDays] = useState();
  const [confirmText, setConfirmText] = useState('Resend Confirmation Email');
  const startLoader = useCallback(() => {
    setLoadBar(100);
  }, []);
  const onLoaderFinished = () => {
    setLoadBar(0);
  };
  useEffect(() => {
    checkUserSession();
    subDaysRemaining();
    startLoader();
    if (message) {
      setConfirmText('Resend Confirmation Email');
    }
  }, [checkUserSession, message]);

  const signOut = () => {
    setLogout('Logging out...');
    signOutStart();
    setTimeout(() => {
      setLogout('Logout');
    }, 3000);
  };

  const resendEmailConfirm = () => {
    setConfirmText('Sending Email...');
    resendConfirmEmail();
  };

  const subDaysRemaining = () => {
    if (user.is_subscribed) {
      // const subDate = subscription.subscribed_at.split("-");
      const expDate = subscription.expired_at.split('-');
      const thisDate = new Date(Date.now());
      const expiredDate = new Date(
        expDate[0],
        expDate[1],
        expDate[2].split('T')[0]
      );
      const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

      const diffDays = Math.round(Math.abs((expiredDate - thisDate) / oneDay));
      setSubDays(diffDays);
    } else {
      setSubDays(0);
    }
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
            <Link className="home" to="/">
              <i
                className="fad fa-home"
                style={{ color: 'var(--color-primary)' }}
              ></i>
              <p>Home</p>
            </Link>
            <div className="profile-section__box--details--left-box">
              <div className="profile-section__box--details--left-box-image">
                {user.full_name.charAt(0).toUpperCase()}
              </div>
              <Link to="/profile">
                <div className="profile-section__box--details--left-box-user">
                  <p className="profile-section__box--details--left-box-user_name">
                    {user.full_name}{' '}
                    {user.is_subscribed ? (
                      <i
                        className="fad fa-badge-check"
                        style={{ color: 'var(--color-primary)' }}
                      ></i>
                    ) : null}
                  </p>
                  <p className="profile-section__box--details--left-box-user_email">
                    <small> {user.email} </small>
                  </p>
                </div>
              </Link>
            </div>
          </div>
          <div className="profile-section__box--details--right">
            <p onClick={() => signOut()}>
              <strong>{logout}</strong>
            </p>
            {user && user.is_email_confirm ? (
              <div>
                <i
                  className="fad fa-history"
                  style={{ color: 'var(--color-primary)' }}
                ></i>
                Download History
              </div>
            ) : null}
            <div>
              <Link to="/pricing">
                <i
                  className="fad fa-badge-dollar"
                  style={{ color: 'var(--color-primary)' }}
                ></i>
                Pricing
              </Link>
            </div>
            {user && user.is_email_confirm ? (
              <div>
                <Link to="/change-password">
                  <i
                    className="fad fa-user-lock"
                    style={{ color: 'var(--color-primary)' }}
                  ></i>
                  Change Password
                </Link>
              </div>
            ) : null}
          </div>
        </div>
        <div className="profile-section__box--overview">
          <p>
            <strong>My Overview</strong>
          </p>
          {!user.is_email_confirm ? (
            <p className="resendBtn btn" onClick={() => resendEmailConfirm()}>
              &#128233; {confirmText}
            </p>
          ) : null}

          <div className="profile-section__box--overview_container">
            <div className="profile-section__box--overview_container_box">
              <img
                className="profile-section__box--overview_container_box-img"
                src={plan}
                alt=""
              />
              <p>Subscription Plan</p>
              {user.is_subscribed ? (
                <strong style={{ color: 'var(--color-danger-1)' }}>
                  {subscription.subscribed_type}
                </strong>
              ) : (
                <strong style={{ color: 'var(--color-danger-1)' }}>FREE</strong>
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
                <strong style={{ color: 'var(--color-danger-1)' }}>YES</strong>
              ) : (
                <strong style={{ color: 'var(--color-danger-1)' }}>NO</strong>
              )}
            </div>
            <div className="profile-section__box--overview_container_box">
              <img
                className="profile-section__box--overview_container_box-img"
                src={sub_time}
                alt=""
              />
              <p>Subscription Time</p>
              <strong style={{ color: 'var(--color-danger-1)' }}>
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
              <strong style={{ color: 'var(--color-danger-1)' }}>0</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
  subscription: selectSubscription,
  message: selectMessage,
});
const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
  resendConfirmEmail: () => dispatch(resendConfirmEmail()),
  checkUserSession: () => dispatch(checkUserSession()),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Profile)
);
