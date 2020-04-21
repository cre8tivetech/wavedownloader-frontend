import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    signInByTokenStart(token);
    currentUser &&
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
    // setText1('Done');
  }, [
    signInByTokenStart,
    // currentUser,
    // setTimeout,
    // setText1,
    // setText2,
    // setConfirmImage,
    // token,
  ]);

  return (
    <div className="confirmation-section card">
      <img src={confirmImage} alt="" />
      <h1 style={{ color: textColor }}>{text1}</h1>
      <h2>{text2}</h2>
      {/* <Link to="/">
        <div className="btn">
          <i className="fad fa-long-arrow-left"></i> Go back
        </div>
      </Link> */}
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
