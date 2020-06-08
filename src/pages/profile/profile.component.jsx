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
  selectDownload,
  selectIsLoading,
} from '../../redux/user/user.selector';
import {
  signOutStart,
  checkUserSession,
  resendConfirmEmailStart,
  setLoading,
} from '../../redux/user/user.actions';
import downloadImage from '../../assets/download(1).svg';
import confirmation from '../../assets/mail(1).svg';
import sub_time from '../../assets/sale(1).svg';
import plan from '../../assets/subscription(1).svg';
import { getDownload } from '../../redux/instagram/instagram.actions';

const Profile = ({
  user,
  subscription,
  download,
  signOutStart,
  checkUserSession,
  resendConfirmEmailStart,
  message,
  isLoading,
  setLoading,
  // getDownload,
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
    // getDownload();
    checkUserSession();
    subDaysRemaining();
    setLoading(false);
    startLoader();
    // console.log(download.length);
    // console.log(message);
    if (!isLoading) {
      setConfirmText('Resend Confirmation Email');
    }
  }, [checkUserSession, isLoading]);

  const signOut = () => {
    setLogout('Logging out...');
    signOutStart();
    setTimeout(() => {
      setLogout('Logout');
    }, 3000);
  };

  const resendEmailConfirm = () => {
    setConfirmText('Sending Email...');
    resendConfirmEmailStart();
  };

  const subDaysRemaining = () => {
    if (user.is_subscribed) {
      //NOTE  DATE CONSTRUCTOR USES 0 FOR JAN, (THEREFORE JAN = JAN - 1)
      const expDate = subscription.expired_at.split('-');
      const nowDate = new Date(Date.now());
      const thisDate = new Date(Date.now());
      const expiredDate = new Date(
        expDate[0],
        expDate[1] - 1,
        expDate[2].split('T')[0]
      );
      const oneDay = 24 * 3600 * 1000; // hours*minutes*seconds*milliseconds
      const diffDays = Math.round(Math.abs((thisDate - expiredDate) / oneDay));
      // var timeDiff = Math.abs(thisDate.getTime() - expiredDate.getTime());
      // var diffDays = Math.ceil(timeDiff / (24 * 3600 * 1000));
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
            {user && user.is_email_confirm && user.is_subscribed ? (
              <div>
                <Link to="/download-history">
                  <i
                    className="fad fa-badge-dollar"
                    style={{ color: 'var(--color-primary)' }}
                  ></i>
                  Download History
                </Link>
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
                {!user.is_subscribed ? 'NO' : subDays + ' Days'}
              </strong>
            </div>
            <div className="profile-section__box--overview_container_box">
              <img
                className="profile-section__box--overview_container_box-img"
                src={downloadImage}
                alt=""
              />
              <p>Total Downloads</p>
              <strong style={{ color: 'var(--color-danger-1)' }}>
                {download.length}
              </strong>
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
  download: selectDownload,
  isLoading: selectIsLoading,
});
const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
  resendConfirmEmailStart: () => dispatch(resendConfirmEmailStart()),
  checkUserSession: () => dispatch(checkUserSession()),
  setLoading: (condition) => dispatch(setLoading(condition)),
  // getDownload: () => dispatch(getDownload()),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Profile)
);
