import React, { useState, useEffect } from "react";
import LoadingBar from "react-top-loading-bar";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { signInStart } from "../../redux/user/user.actions";
import { connect } from "react-redux";
import "./signin-signup.styles.scss";
import { selectError } from "../../redux/user/user.selector";
const SignIn = ({ signInStart, error }) => {
  const [loadBar, setLoadBar] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [userCredentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  const { email, password } = userCredentials;
  const startLoader = () => {
    setLoadBar(100);
  };
  const onLoaderFinished = () => {
    setLoadBar(0);
  };
  useEffect(() => {
    if (error) {
      setErrorMessage(<div className="errorMessage">{error}</div>);
    }
    startLoader();
  }, [error]);
  const handleSubmit = async event => {
    event.preventDefault();
    const btn = event.currentTarget.querySelector("button");
    const loaderbtn = btn.querySelector("div");
    console.log(loaderbtn);
    const downloadbtn = btn.querySelector("p");
    console.log(downloadbtn);
    loaderbtn.className = "loader show";
    downloadbtn.className = "hide";
    setCredentials({
      email: "",
      password: ""
    });
    await signInStart(email, password);
    setTimeout(() => {
      loaderbtn.className = "loader hide";
      downloadbtn.className = "show";
    }, 15000);
  };

  const handleChange = event => {
    const { name, value } = event.target;

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
      <div className="signin-signup__type">
        <Link to="/signin" className="btn active">
          <p>Sign In</p>
        </Link>
        <Link to="/signup" className="btn">
          <p>Sign Up</p>
        </Link>
      </div>
      <div className="signin-signup__form">
        {errorMessage}
        <form onSubmit={handleSubmit} className="form">
          <div className="form__group">
            <div className="form__input">
              <i
                className="fad fa-envelope"
                style={{ color: "var(--color-primary)" }}
              ></i>
              <input
                type="email"
                className="form__input--box"
                placeholder="Email"
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

            <div className="form__input">
              <i
                className="fad fa-lock"
                style={{ color: "var(--color-primary)" }}
              ></i>
              <input
                type="password"
                className="form__input--box"
                placeholder="Password"
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
                required
              />
              <label htmlFor="password" className="form__input--label">
                Password
              </label>
            </div>
          </div>
          <div className="form__group">
            <button type="submit" className=" submit_btn btn btn--green">
              <div className="loader hide"></div>
              <p>Sign In</p>
            </button>
            <Link to="/signin" className="auth-link">
              <p>Forgot your password?</p>
            </Link>
            <Link to="/signin" className="auth-link">
              <p>Don't have an account? Signup</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  error: selectError
});
const mapDispatchToProps = dispatch => ({
  signInStart: (email, password) => dispatch(signInStart({ email, password }))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignIn));
