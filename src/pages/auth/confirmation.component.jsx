import React, { useEffect, useState, useMemo } from 'react';
import { Link, useHistory } from 'react-router-dom';
import imageLoading from '../../assets/Ripple-2.svg';
import imageLoaded from '../../assets/thumbs-up.gif';
import './confirmation.styles.scss';
import { connect } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { createStructuredSelector } from 'reselect';
import { signInByTokenStart } from '../../redux/user/user.actions';
const Confirmation = ({ currentUser, signInByTokenStart }) => {
  const [confirmImage, setConfirmImage] = useState(imageLoading);
  const [textColor, setTextColor] = useState();
  const [text1, setText1] = useState('Confirming Email...');
  const [text2, setText2] = useState('Please Wait...');
  const history = useHistory();
  const data = history.location.search;
  const result = data.split('=');
  const getToken = result[1].split('&');
  const token = getToken[0];

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

  useMemo(() => {
    signInByTokenStart(token);
  }, [signInByTokenStart]);
  useEffect(() => {
    checkMode();
    // !currentUser && console.log('NO token');
    currentUser &&
      currentUser.is_email_confirm &&
      setTimeout(() => {
        setConfirmImage(imageLoaded);
        setTextColor('var(--color-primary)');
        setText1('Email confirmed successfully');
        setText2('');
        setTimeout(() => {
          setText2('You will be automatically logged in shortly....');
        }, 3000);
        setTimeout(() => {
          history.push('/profile');
        }, 8000);
      }, 8000);
  }, [currentUser]);

  return (
    <div className="confirmation-section card">
      <img src={confirmImage} alt="" />
      <h1 style={{ color: textColor }}>{text1}</h1>
      <h2>{text2}</h2>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => ({
  signInByTokenStart: (token) => dispatch(signInByTokenStart(token)),
});
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);
