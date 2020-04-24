import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import imageLoading from '../../assets/Ripple-2.svg';
import imageLoaded from '../../assets/thumbs-up.gif';
import './resetPassword.styles.scss';
import { connect } from 'react-redux';
import { selectMessage } from '../../redux/user/user.selector';
import { createStructuredSelector } from 'reselect';
import {
  signInByTokenStart,
  resetPassword,
  setMessage,
} from '../../redux/user/user.actions';
const ResetPassword = ({
  message,
  resetPassword,
  setMessage,
  signInByTokenStart,
}) => {
  const [confirmImage, setConfirmImage] = useState(imageLoading);
  const [textColor, setTextColor] = useState();
  const [text1, setText1] = useState('Getting ready...');
  const [text2, setText2] = useState('Please Wait...');
  const history = useHistory();
  const token = history.location.search;

  const [userCredentials, setCredentials] = useState({
    new_password: '',
  });
  const { new_password } = userCredentials;
  // const result = data.split('=');
  // const getToken = result[1].split('&');
  // const token = getToken[0];
  // console.log(data);

  const mode = localStorage.getItem('mode');

  const checkMode = () => {
    if (mode === 'dark') {
      const root = document.querySelector(':root');
      root.style.setProperty('--color-bg', '#030805');
      root.style.setProperty('--color-bg-2', '#050c07');
      root.style.setProperty('--color-light', '#030805');
      root.style.setProperty('--color-card', '#050e08');
      root.style.setProperty('--color-text-1', '#a3a3a3');
      root.style.setProperty('--color-text-2', '#cccccc');
      root.style.setProperty('--color-btn-hover', '#0b1d12');
      root.style.setProperty('--scrollbarBG', '#020503');
      root.style.setProperty('--box-shadow', 'rgba(255,255,255,0.35)');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const btn = event.currentTarget.querySelector('button');
    const loaderbtn = btn.querySelector('div');

    const downloadbtn = btn.querySelector('p');

    loaderbtn.className = 'loader show';
    downloadbtn.className = 'hide';
    setCredentials({
      new_password: '',
    });
    await resetPassword(token, new_password);
    setTimeout(() => {
      loaderbtn.className = 'loader hide';
      downloadbtn.className = 'show';
    }, 8000);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    // setErrorMessage('');
    setCredentials({ ...userCredentials, [name]: value });
  };

  useEffect(() => {
    checkMode();
    // signInByTokenStart(token);
    if (!message)
      setTimeout(() => {
        // setConfirmImage(imageLoaded);
        // setTextColor('var(--color-primary)');
        // setText1('Resetting successfully');
        setText2('');
        setTimeout(() => {
          setText2(null);
        }, 1000);
      }, 5000);
    console.log(message);
    if (message)
      if (message.type === 'success') {
        setConfirmImage(imageLoaded);
        setText1('Password Was Resetted Successfully');
        setText2('Redirecting to login page....');
        setTimeout(() => {
          setText2(null);
          history.push('/signin');
        }, 8000);
      }
    //  history.push('/');
  }, [signInByTokenStart, message]);

  if (text2)
    return (
      <div className="confirmation-section card">
        <img src={confirmImage} alt="" />
        <h1 style={{ color: textColor }}>{text1}</h1>
        <h2>{text2}</h2>
      </div>
    );
  else
    return (
      <div className="resetPassword-section card">
        <h1>Reset Password</h1>
        <form onSubmit={handleSubmit} className="form">
          <div className="form__group">
            <div className="form__input">
              <i
                className="fad fa-lock"
                style={{ color: 'var(--color-primary)' }}
              ></i>
              <input
                type="password"
                className="form__input--box"
                placeholder="Type Your New Password"
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
              <p>Reset</p>
            </button>
          </div>
        </form>
      </div>
    );
};
const mapDispatchToProps = (dispatch) => ({
  signInByTokenStart: (token) => dispatch(signInByTokenStart(token)),
  resetPassword: (token, new_password) =>
    dispatch(resetPassword({ token, new_password })),
  setMessage: () => dispatch(setMessage()),
});
const mapStateToProps = createStructuredSelector({
  message: selectMessage,
});
export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
