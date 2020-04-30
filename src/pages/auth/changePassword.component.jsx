import React, { useState, useEffect, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selector';
import {
  checkUserSession,
  changePassword,
  signOutStart,
} from '../../redux/user/user.actions';
import './changePassword.styles.scss';

const ChangePassword = ({
  user,
  signOutStart,
  changePassword,
  checkUserSession,
  message,
}) => {
  const [loadBar, setLoadBar] = useState(0);
  const [logout, setLogout] = useState('Logout');
  const startLoader = useCallback(() => {
    setLoadBar(100);
  }, []);
  const onLoaderFinished = () => {
    setLoadBar(0);
  };
  useEffect(() => {
    checkUserSession();
    startLoader();
  }, [checkUserSession, message]);

  const signOut = () => {
    setLogout('Logging out...');
    signOutStart();
    setTimeout(() => {
      setLogout('Logout');
    }, 3000);
  };

  const [errorMessage, setErrorMessage] = useState('');
  const [userCredentials, setCredentials] = useState({
    old_password: '',
    new_password: '',
  });

  const { old_password, new_password } = userCredentials;
  // useEffect(() => {
  //   if (error) {
  //     setErrorMessage(<div className="errorMessage">{error}</div>);
  //   }
  //   startLoader();
  // }, [error]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const btn = event.currentTarget.querySelector('button');
    const loaderbtn = btn.querySelector('div');

    const downloadbtn = btn.querySelector('p');

    loaderbtn.className = 'loader show';
    downloadbtn.className = 'hide';
    setCredentials({
      old_password: '',
      new_password: '',
    });
    await changePassword(old_password, new_password);
    setTimeout(() => {
      loaderbtn.className = 'loader hide';
      downloadbtn.className = 'show';
    }, 15000);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setErrorMessage('');
    setCredentials({ ...userCredentials, [name]: value });
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
          </div>
        </div>
        <div className="changePassword-section">
          <p>
            <strong>Change Password</strong>
          </p>
          <div className="changePassword-section__container">
            <form onSubmit={handleSubmit} className="form">
              <div className="form__group">
                <div className="form__input">
                  <i
                    className="fad fa-lock-open-alt"
                    style={{ color: 'var(--color-primary)' }}
                  ></i>
                  <input
                    type="password"
                    className="form__input--box"
                    placeholder="Old Password"
                    id="old_password"
                    name="old_password"
                    value={old_password}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="old_password" className="form__input--label">
                    Old Password
                  </label>
                </div>

                <div className="form__input">
                  <i
                    className="fad fa-lock"
                    style={{ color: 'var(--color-primary)' }}
                  ></i>
                  <input
                    type="password"
                    className="form__input--box"
                    placeholder="New Password"
                    id="new_password"
                    name="new_password"
                    value={new_password}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="new_password" className="form__input--label">
                    New Password
                  </label>
                </div>
              </div>
              <div className="form__group">
                <button type="submit" className="reset_btn btn btn--green">
                  <div className="loader hide"></div>
                  <p>Submit</p>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
});
const mapDispatchToProps = (dispatch) => ({
  changePassword: (old_password, new_password) =>
    dispatch(changePassword({ old_password, new_password })),
  checkUserSession: () => dispatch(checkUserSession()),
  signOutStart: () => dispatch(signOutStart()),
});
export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
