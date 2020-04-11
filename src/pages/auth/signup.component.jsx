import React, { useState, useEffect } from "react";
import LoadingBar from "react-top-loading-bar";
import { createStructuredSelector } from "reselect";
import { Link } from "react-router-dom";
import { signUpStart } from "../../redux/user/user.actions";
import { connect } from "react-redux";
import { selectError, selectSuccess } from "../../redux/user/user.selector";
import "./signin-signup.styles.scss";
const SignUp = ({ signUpStart, success, error }) => {
  const [loadBar, setLoadBar] = useState(0);
  const [message, setMessage] = useState("");
  const [userCredentials, setCredentials] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const { userName, email, password, confirmPassword } = userCredentials;
  const startLoader = () => {
    setLoadBar(100);
  };
  const onLoaderFinished = () => {
    setLoadBar(0);
  };
  useEffect(() => {
    console.log(success);
    if (error) {
      setMessage(<div className="errorMessage">{error}</div>);
    }
    if (success) {
      setMessage(<div className="successMessage">{success}</div>);
    }
    startLoader();
  }, [success, error]);
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
      userName: "",
      email: "",
      password: "",
      confirmPassword: ""
    });

    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }
    signUpStart(userName, email, password);
    setTimeout(() => {
      loaderbtn.className = "loader hide";
      downloadbtn.className = "show";
    }, 7000);
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
        <Link to="/signin" className="btn">
          <p>Sign In</p>
        </Link>
        <Link to="/signup" className="btn active">
          <p>Sign Up</p>
        </Link>
      </div>
      <div className="signin-signup__form">
        {message}

        <form onSubmit={handleSubmit} className="form">
          <div className="form__group">
            {/* UserName */}
            <div className="form__input">
              <i
                className="fad fa-user"
                style={{ color: "var(--color-primary)" }}
              ></i>
              <input
                type="text"
                className="form__input--box"
                placeholder="Username"
                id="userName"
                name="userName"
                value={userName}
                onChange={handleChange}
                required
              />
              <label htmlFor="userName" max="11" className="form__input--label">
                UserName
              </label>
            </div>

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

            <div className="form__input">
              <i
                className="fad fa-lock"
                style={{ color: "var(--color-primary)" }}
              ></i>
              <input
                type="password"
                className="form__input--box"
                placeholder="confirm password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                required
              />
              <label htmlFor="confirmPassword" className="form__input--label">
                Confirm Password
              </label>
            </div>
          </div>
          <div className="form__group">
            <button type="submit" className=" submit_btn btn btn--green">
              <div className="loader hide"></div>
              <p>Sign Up</p>
            </button>
            <Link to="/signin" className="auth-link">
              <p>Already a member? Sign In</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  error: selectError,
  success: selectSuccess
});

const mapDispatchToProps = dispatch => ({
  signUpStart: (userName, email, password) =>
    dispatch(signUpStart({ userName, email, password }))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
