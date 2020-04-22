import React, { useState, useEffect, useCallback } from 'react';
import LoadingBar from 'react-top-loading-bar';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { signInStart } from '../../redux/user/user.actions';
import { connect } from 'react-redux';
import './forgetPassword.styles.scss';
import { selectError } from '../../redux/user/user.selector';
const ForgotPassword = ({ signInStart, error }) => {
  const [loadBar, setLoadBar] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [userCredentials, setCredentials] = useState({
    email: '',
  });

  const { email } = userCredentials;
  const startLoader = useCallback(() => {
    setLoadBar(100);
  }, []);
  const onLoaderFinished = () => {
    setLoadBar(0);
  };
  useEffect(() => {
    if (error) {
      setErrorMessage(<div className="errorMessage">{error}</div>);
    }
    startLoader();
  }, [error]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const btn = event.currentTarget.querySelector('button');
    const loaderbtn = btn.querySelector('div');

    const downloadbtn = btn.querySelector('p');

    loaderbtn.className = 'loader show';
    downloadbtn.className = 'hide';
    setCredentials({
      email: '',
    });
    await signInStart(email);
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
    <div className="signin-signup card">
      <LoadingBar
        progress={loadBar}
        height={3}
        color="linear-gradient(92deg, #038125 0%, #fbff00 100%)"
        onLoaderFinished={() => onLoaderFinished}
      />
      <p className="signin-signup__header">
        <strong>Forget Password</strong>
      </p>

      <div className="signin-signup__form">
        {errorMessage}
        <form onSubmit={handleSubmit} className="form">
          <div className="form__group">
            <div className="form__input">
              <i
                className="fad fa-envelope"
                style={{ color: 'var(--color-primary)' }}
              ></i>
              <input
                type="email"
                className="form__input--box"
                placeholder="Type Your Email"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
                required
              />
              <label htmlFor="email" className="form__input--label">
                Email
              </label>
            </div>
          </div>
          <div className="form__group">
            <button type="submit" className=" submit_btn btn btn--green">
              <div className="loader hide"></div>
              <p>Send</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  error: selectError,
});
const mapDispatchToProps = (dispatch) => ({
  signInStart: (email, password) => dispatch(signInStart({ email, password })),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)
);
